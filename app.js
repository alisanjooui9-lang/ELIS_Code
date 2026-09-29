/* =========================================================
   ELIS CODE — APP CORE
   ELIS Studio
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     CONFIG
     ========================================================= */

  const APP = {
    name: "ELIS Code",
    version: "1.0.0",
    storage: {
      user: "elis_code_user",
      progress: "elis_code_progress",
      projects: "elis_code_projects",
      session: "elis_code_session"
    }
  };

  /* =========================================================
     STATE
     ========================================================= */

  const state = {
    currentPage: "home",
    currentDomain: null,
    currentChapter: null,
    currentStage: null,
    modalOpen: false,
    user: null,
    progress: {},
    projects: []
  };

  /* =========================================================
     DOM
     ========================================================= */

  const $ = (selector, parent = document) =>
    parent.querySelector(selector);

  const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];

  /* =========================================================
     STORAGE
     ========================================================= */

  function loadState() {
    try {
      const savedUser = localStorage.getItem(APP.storage.user);
      const savedProgress = localStorage.getItem(APP.storage.progress);
      const savedProjects = localStorage.getItem(APP.storage.projects);

      state.user = savedUser ? JSON.parse(savedUser) : null;
      state.progress = savedProgress ? JSON.parse(savedProgress) : {};
      state.projects = savedProjects ? JSON.parse(savedProjects) : [];
    } catch (error) {
      console.error("ELIS storage error:", error);

      state.user = null;
      state.progress = {};
      state.projects = [];
    }
  }

  function saveUser() {
    if (!state.user) {
      localStorage.removeItem(APP.storage.user);
      return;
    }

    localStorage.setItem(
      APP.storage.user,
      JSON.stringify(state.user)
    );
  }

  function saveProgress() {
    localStorage.setItem(
      APP.storage.progress,
      JSON.stringify(state.progress)
    );
  }

  function saveProjects() {
    localStorage.setItem(
      APP.storage.projects,
      JSON.stringify(state.projects)
    );
  }

  /* =========================================================
     SECURITY / TEXT HELPERS
     ========================================================= */

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function safeURL(value) {
    try {
      const url = new URL(value);

      if (
        url.protocol === "http:" ||
        url.protocol === "https:"
      ) {
        return url.href;
      }

      return "#";
    } catch {
      return "#";
    }
  }

  function slugToTitle(id) {
    return String(id || "")
      .replaceAll("-", " ")
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  /* =========================================================
     USER
     ========================================================= */

  function createUser({
    name,
    username,
    email,
    password
  }) {
    const user = {
      id:
        "ELIS-" +
        Date.now().toString(36).toUpperCase(),

      name,
      username,
      email,

      /*
       * Prototype only.
       * A real production system should NEVER store
       * passwords in localStorage.
       */
      password,

      xp: 0,
      coins: 500,
      level: 1,

      completedLessons: [],
      completedChapters: [],
      achievements: [],

      createdAt: new Date().toISOString()
    };

    state.user = user;
    saveUser();

    localStorage.setItem(
      APP.storage.session,
      "active"
    );

    updateNavbar();

    return user;
  }

  function loginUser(identifier, password) {
    const saved = localStorage.getItem(APP.storage.user);

    if (!saved) {
      return false;
    }

    try {
      const user = JSON.parse(saved);

      const validIdentifier =
        user.username === identifier ||
        user.email === identifier;

      if (
        validIdentifier &&
        user.password === password
      ) {
        state.user = user;

        localStorage.setItem(
          APP.storage.session,
          "active"
        );

        updateNavbar();

        return true;
      }
    } catch {
      return false;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem(APP.storage.session);

    state.user = null;

    updateNavbar();
    goHome();

    toast(
      "از حساب خارج شدید.",
      "info"
    );
  }

  /* =========================================================
     XP / COINS / LEVEL
     ========================================================= */

  function xpForNextLevel(level) {
    return 500 + (level - 1) * 250;
  }

  function addXP(amount) {
    if (!state.user) return;

    const safeAmount = Math.max(
      0,
      Number(amount) || 0
    );

    state.user.xp += safeAmount;

    let required = xpForNextLevel(
      state.user.level
    );

    while (state.user.xp >= required) {
      state.user.xp -= required;
      state.user.level += 1;

      state.user.coins += 100;

      toast(
        `🎉 سطح ${state.user.level} باز شد!`,
        "success"
      );

      required = xpForNextLevel(
        state.user.level
      );
    }

    saveUser();
    updateNavbar();
  }

  function addCoins(amount) {
    if (!state.user) return;

    state.user.coins += Math.max(
      0,
      Number(amount) || 0
    );

    saveUser();
    updateNavbar();
  }

  /* =========================================================
     PROGRESS
     ========================================================= */

  function getDomainProgress(domainId) {
    return (
      state.progress[domainId] || {
        completed: [],
        chapters: []
      }
    );
  }

  function ensureDomainProgress(domainId) {
    if (!state.progress[domainId]) {
      state.progress[domainId] = {
        completed: [],
        chapters: []
      };

      saveProgress();
    }

    return state.progress[domainId];
  }

  function isStageCompleted(domainId, stageId) {
    const progress =
      getDomainProgress(domainId);

    return progress.completed.includes(stageId);
  }

  function completeStage(
    domainId,
    chapterIndex,
    stageIndex
  ) {
    const domain =
      ELIS_DATA.getDomainById(domainId);

    if (!domain) return;

    const progress =
      ensureDomainProgress(domainId);

    const stageId =
      `${domainId}-${chapterIndex}-${stageIndex}`;

    if (progress.completed.includes(stageId)) {
      return;
    }

    progress.completed.push(stageId);

    if (
      !progress.chapters.includes(
        chapterIndex
      )
    ) {
      progress.chapters.push(
        chapterIndex
      );
    }

    saveProgress();

    if (state.user) {
      if (
        !state.user.completedLessons.includes(
          stageId
        )
      ) {
        state.user.completedLessons.push(
          stageId
        );
      }

      addXP(50);
      addCoins(10);

      saveUser();
    }

    toast(
      "مرحله با موفقیت کامل شد! +50 XP",
      "success"
    );

    renderDomainPath(domain);
  }

  function getProgressPercentage(domain) {
    const progress =
      getDomainProgress(domain.id);

    const target =
      domain.lessonsTarget || 1000;

    const completed =
      progress.completed.length;

    return Math.min(
      100,
      Math.round(
        (completed / target) * 100
      )
    );
  }

  /* =========================================================
     NAVBAR
     ========================================================= */

  function updateNavbar() {
    const userArea =
      $("#userArea");

    if (!userArea) return;

    if (!state.user) {
      userArea.innerHTML = `
        <button
          class="nav-login-btn"
          type="button"
          data-action="auth"
        >
          ورود / ثبت‌نام
        </button>
      `;

      return;
    }

    const xp = Math.max(
      0,
      Number(state.user.xp) || 0
    );

    const coins = Math.max(
      0,
      Number(state.user.coins) || 0
    );

    userArea.innerHTML = `
      <div class="user-mini">
        <div class="user-mini-avatar">
          ${escapeHTML(
            state.user.name
              .charAt(0)
              .toUpperCase()
          )}
        </div>

        <div class="user-mini-info">
          <strong>
            ${escapeHTML(state.user.name)}
          </strong>

          <span>
            Lv.${state.user.level}
            · ${xp} XP
            · 🪙 ${coins}
          </span>
        </div>

        <button
          class="user-menu-btn"
          type="button"
          data-action="profile"
          aria-label="پروفایل"
        >
          ›
        </button>
      </div>
    `;
  }

  /* =========================================================
     PAGE ROOT
     ========================================================= */

  function pageContainer() {
    return $("#pageContainer");
  }

  function setPage(html) {
    const container =
      pageContainer();

    if (!container) return;

    container.innerHTML = html;

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  /* =========================================================
     HOME
     ========================================================= */

  function renderHome() {
    state.currentPage = "home";
    state.currentDomain = null;

    const domains =
      ELIS_DATA.getActiveDomains();

    const domainCount =
      domains.length;

    const lessonTarget =
      ELIS_DATA.getTotalLessonTarget();

    const projectCount =
      state.projects.length;

    setPage(`
      <section class="hero-section">

        <div class="hero-glow"></div>

        <div class="hero-content">

          <div class="hero-badge">
            <span>✦</span>
            ELIS STUDIO PRESENTS
          </div>

          <h1>
            بیشتر از یک آموزش.
            <br>
            <strong>یک دنیای کامل برای ساختن.</strong>
          </h1>

          <p>
            ELIS Code یک مسیر جامع برای یادگیری
            برنامه‌نویسی، هوش مصنوعی، وب، بازی،
            امنیت و فناوری است؛ از اولین خط کد
            تا ساخت پروژه‌های واقعی.
          </p>

          <div class="hero-actions">

            <button
              class="primary-btn"
              type="button"
              data-action="domains"
            >
              🚀 شروع یادگیری
            </button>

            <button
              class="secondary-btn"
              type="button"
              data-action="projects"
            >
              🌌 دنیای پروژه‌ها
            </button>

          </div>

        </div>

        <div class="hero-orbit">

          <div class="orbit-ring ring-one"></div>
          <div class="orbit-ring ring-two"></div>
          <div class="orbit-ring ring-three"></div>

          <div class="hero-core">
            <span>ELIS</span>
            <small>CODE</small>
          </div>

          <div class="orbit-node node-one">🐍</div>
          <div class="orbit-node node-two">🤖</div>
          <div class="orbit-node node-three">🎮</div>
          <div class="orbit-node node-four">🌐</div>

        </div>

      </section>

      <section class="stats-section">

        <div class="stats-grid">

          <div class="stat-card">
            <strong>${domainCount}+</strong>
            <span>مسیر فعال</span>
          </div>

          <div class="stat-card">
            <strong>${lessonTarget.toLocaleString()}</strong>
            <span>هدف درس‌ها</span>
          </div>

          <div class="stat-card">
            <strong>${projectCount}</strong>
            <span>پروژه ثبت‌شده</span>
          </div>

          <div class="stat-card">
            <strong>∞</strong>
            <span>ایده برای ساختن</span>
          </div>

        </div>

      </section>

      <section class="home-section">

        <div class="section-heading">

          <div>
            <span class="eyebrow">
              LEARNING UNIVERSE
            </span>

            <h2>
              دنیای ELIS Code
            </h2>

            <p>
              هر مهارت یک مسیر مستقل دارد.
            </p>
          </div>

          <button
            class="text-btn"
            type="button"
            data-action="domains"
          >
            مشاهده همه →
          </button>

        </div>

        <div class="domain-preview-grid">
          ${domains
            .slice(0, 8)
            .map(domainCard)
            .join("")}
        </div>

      </section>

      <section class="feature-section">

        <div class="feature-grid">

          <article class="feature-card">
            <span class="feature-icon">🗺️</span>
            <h3>مسیر مرحله‌ای</h3>
            <p>
              یادگیری از مرحله‌های کوچک شروع
              می‌شود و به پروژه‌های واقعی می‌رسد.
            </p>
          </article>

          <article class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>XP و Level</h3>
            <p>
              با انجام درس‌ها، تمرین‌ها و چالش‌ها
              پیشرفت خودت را ثبت کن.
            </p>
          </article>

          <article class="feature-card">
            <span class="feature-icon">🏆</span>
            <h3>آزمون و گواهی</h3>
            <p>
              در پایان مسیر، آزمون نهایی و
              گواهی ELIS Code در نظر گرفته می‌شود.
            </p>
          </article>

          <article class="feature-card">
            <span class="feature-icon">🛠️</span>
            <h3>ساخت آزاد</h3>
            <p>
              بعد از یادگیری، پروژه خودت را بساز
              و در دنیای پروژه‌های ELIS نمایش بده.
            </p>
          </article>

        </div>

      </section>

      <section class="cta-section">

        <div>
          <span class="eyebrow">
            YOUR NEXT LEVEL
          </span>

          <h2>
            آماده‌ای اولین مسیرت را شروع کنی؟
          </h2>

          <p>
            یک دامنه انتخاب کن و وارد مسیر شو.
          </p>
        </div>

        <button
          class="primary-btn"
          type="button"
          data-action="domains"
        >
          🚀 انتخاب مسیر
        </button>

      </section>
    `);

    updateNavbar();
  }

  /* =========================================================
     DOMAIN CARD
     ========================================================= */

  function domainCard(domain) {
    const progress =
      getProgressPercentage(domain);

    const colors = [
      "🐍",
      "🌐",
      "🎨",
      "⚡",
      "🧠",
      "🤖",
      "🎮",
      "🔐",
      "☁️",
      "🛠️"
    ];

    const icon =
      domain.icon ||
      colors[
        Math.abs(
          domain.id
            .split("")
            .reduce(
              (sum, char) =>
                sum + char.charCodeAt(0),
              0
            )
        ) % colors.length
      ];

    return `
      <article
        class="domain-card"
        data-domain-id="${escapeHTML(domain.id)}"
      >

        <div class="domain-card-top">

          <span class="domain-icon">
            ${icon}
          </span>

          <span class="domain-arrow">
            →
          </span>

        </div>

        <h3>
          ${escapeHTML(domain.title)}
        </h3>

        <p>
          ${escapeHTML(domain.description)}
        </p>

        <div class="domain-meta">
          <span>
            🎯 ${domain.lessonsTarget || 1000} درس
          </span>

          <span>
            ${progress}%
          </span>
        </div>

        <div class="progress-bar">
          <span
            style="width:${progress}%"
          ></span>
        </div>

        <button
          type="button"
          class="domain-open-btn"
          data-domain="${escapeHTML(domain.id)}"
        >
          مشاهده مسیر
        </button>

      </article>
    `;
  }

  /* =========================================================
     DOMAINS
     ========================================================= */

  function renderDomains() {
    state.currentPage = "domains";

    const active =
      ELIS_DATA.getActiveDomains();

    const coming =
      ELIS_DATA.comingSoon || [];

    setPage(`
      <section class="page-header">

        <span class="eyebrow">
          ELIS CODE UNIVERSE
        </span>

        <h1>
          مسیر یادگیری خودت را انتخاب کن
        </h1>

        <p>
          هر دامنه یک مسیر مستقل با درس،
          تمرین، پروژه و آزمون دارد.
        </p>

      </section>

      <section class="domains-page">

        <div class="domains-toolbar">

          <div class="search-box">
            <span>⌕</span>

            <input
              id="domainSearch"
              type="search"
              placeholder="جستجوی مسیر..."
              autocomplete="off"
            >
          </div>

          <div class="domain-counter">
            ${active.length} مسیر فعال
          </div>

        </div>

        <div
          class="all-domains-grid"
          id="allDomainsGrid"
        >
          ${active
            .map(domainCard)
            .join("")}
        </div>

      </section>

      <section class="coming-section">

        <div class="section-heading">

          <div>
            <span class="eyebrow">
              NEXT UNIVERSES
            </span>

            <h2>
              به‌زودی
            </h2>

            <p>
              جهان ELIS Code در حال بزرگ‌تر شدن است.
            </p>
          </div>

        </div>

        <div class="coming-grid">
          ${comingSoonCards(coming)}
        </div>

      </section>
    `);

    const search =
      $("#domainSearch");

    if (search) {
      search.addEventListener(
        "input",
        () => {
          const query =
            search.value
              .trim()
              .toLowerCase();

          const cards =
            $$(".domain-card", $("#allDomainsGrid"));

          cards.forEach(card => {
            const text =
              card.textContent
                .toLowerCase();

            card.style.display =
              !query || text.includes(query)
                ? ""
                : "none";
          });
        }
      );
    }

    updateNavbar();
  }

  function comingSoonCards(items) {
    return items
      .slice(0, 12)
      .map(item => {
        const title =
          typeof item === "string"
            ? item
            : item.title || item.name;

        return `
          <article
            class="coming-card"
          >
            <div class="coming-lock">
              🔒
            </div>

            <h3>
              ${escapeHTML(title)}
            </h3>

            <span>
              COMING SOON
            </span>
          </article>
        `;
      })
      .join("");
  }

  /* =========================================================
     DOMAIN INTRO
     ========================================================= */

  function renderDomainIntro(domainId) {
    const domain =
      ELIS_DATA.getDomainById(domainId);

    if (!domain) {
      toast(
        "مسیر پیدا نشد.",
        "error"
      );

      renderDomains();
      return;
    }

    state.currentPage =
      "domain-intro";

    state.currentDomain =
      domain;

    const progress =
      getProgressPercentage(domain);

    const chapters =
      domain.chapters || [];

    setPage(`
      <section class="domain-intro">

        <button
          class="back-btn"
          type="button"
          data-action="domains"
        >
          ← بازگشت به مسیرها
        </button>

        <div class="domain-intro-hero">

          <div class="domain-intro-icon">
            ${domain.icon || "🚀"}
          </div>

          <div class="domain-intro-copy">

            <span class="eyebrow">
              ELIS CODE PATH
            </span>

            <h1>
              ${escapeHTML(domain.title)}
            </h1>

            <p>
              ${escapeHTML(domain.description)}
            </p>

            <div class="intro-stats">

              <span>
                🎯 ${domain.lessonsTarget || 1000} درس
              </span>

              <span>
                📚 ${chapters.length || "∞"} فصل
              </span>

              <span>
                📈 ${progress}% پیشرفت
              </span>

            </div>

            <button
              class="primary-btn large"
              type="button"
              data-start-domain="${escapeHTML(domain.id)}"
            >
              🚀 شروع مسیر
            </button>

          </div>

        </div>

      </section>

      <section class="learn-section">

        <div class="section-heading">

          <div>
            <span class="eyebrow">
              WHAT YOU WILL LEARN
            </span>

            <h2>
              در این مسیر چه چیزهایی یاد می‌گیری؟
            </h2>
          </div>

        </div>

        <div class="learn-list">

          ${(domain.learn || [])
            .map(
              (item, index) => `
                <div class="learn-item">
                  <span>
                    ${String(index + 1).padStart(2, "0")}
                  </span>

                  <p>
                    ${escapeHTML(item)}
                  </p>

                  <b>✓</b>
                </div>
              `
            )
            .join("")}

        </div>

      </section>

      <section class="path-preview-section">

        <div class="section-heading">

          <div>
            <span class="eyebrow">
              PATH PREVIEW
            </span>

            <h2>
              ساختار مسیر
            </h2>

            <p>
              از مفاهیم پایه شروع می‌کنی و
              قدم‌به‌قدم به ساخت پروژه می‌رسی.
            </p>
          </div>

        </div>

        <div class="path-preview">

          <div class="preview-step">
            <strong>01</strong>
            <span>مبانی</span>
          </div>

          <div class="preview-line"></div>

          <div class="preview-step">
            <strong>02</strong>
            <span>تمرین</span>
          </div>

          <div class="preview-line"></div>

          <div class="preview-step">
            <strong>03</strong>
            <span>چالش</span>
          </div>

          <div class="preview-line"></div>

          <div class="preview-step">
            <strong>04</strong>
            <span>پروژه</span>
          </div>

          <div class="preview-line"></div>

          <div class="preview-step special">
            <strong>★</strong>
            <span>آزمون نهایی</span>
          </div>

        </div>

      </section>
    `);
  }

  /* =========================================================
     CHAPTER DATA
     ========================================================= */

  function createFallbackChapters(domain) {
    const count = 10;

    return Array.from(
      { length: count },
      (_, index) => ({
        id: index + 1,
        title:
          index === 0
            ? "شروع و مبانی"
            : index === count - 1
              ? "پروژه نهایی"
              : `فصل ${index + 1}`,

        description:
          index === 0
            ? "شروع مسیر و ساخت پایه‌های اصلی."
            : index === count - 1
              ? "ترکیب مهارت‌ها برای ساخت پروژه."
              : `ادامه مسیر ${domain.title}`,

        lessons: 10
      })
    );
  }

  /* =========================================================
     DOMAIN PATH
     ========================================================= */

  function renderDomainPath(domain) {
    state.currentPage =
      "domain-path";

    state.currentDomain =
      domain;

    const chapters =
      domain.chapters &&
      domain.chapters.length
        ? domain.chapters
        : createFallbackChapters(domain);

    const progress =
      getDomainProgress(domain.id);

    const completedCount =
      progress.completed.length;

    setPage(`
      <section class="path-page">

        <div class="path-header">

          <div>

            <button
              class="back-btn"
              type="button"
              data-domain-back="${escapeHTML(domain.id)}"
            >
              ← معرفی مسیر
            </button>

            <span class="eyebrow">
              LEARNING MAP
            </span>

            <h1>
              مسیر ${escapeHTML(domain.title)}
            </h1>

            <p>
              مرحله‌به‌مرحله جلو برو، تمرین کن،
              پروژه بساز و سطح خودت را بالا ببر.
            </p>

          </div>

          <div class="path-progress-card">

            <strong>
              ${completedCount}
            </strong>

            <span>
              مرحله کامل‌شده
            </span>

            <div class="progress-bar">
              <span
                style="width:${getProgressPercentage(domain)}%"
              ></span>
            </div>

          </div>

        </div>

        <div class="game-map">

          <div class="map-line"></div>

          ${chapters
            .map(
              (chapter, index) =>
                renderChapter(
                  domain,
                  chapter,
                  index,
                  progress
                )
            )
            .join("")}

          <div class="final-exam-node">

            <div class="final-icon">
              🏆
            </div>

            <div>
              <span class="eyebrow">
                FINAL
              </span>

              <h2>
                آزمون نهایی
              </h2>

              <p>
                پس از تکمیل مسیر در دسترس قرار می‌گیرد.
              </p>
            </div>

            <button
              class="secondary-btn"
              type="button"
              data-final-exam="${escapeHTML(domain.id)}"
            >
              مشاهده
            </button>

          </div>

        </div>

        <section class="free-build-banner">

          <div>

            <span class="eyebrow">
              AFTER THE PATH
            </span>

            <h2>
              حالا نوبت ساختن است.
            </h2>

            <p>
              بعد از یادگیری می‌توانی پروژه آزاد
              خودت را ثبت کنی.
            </p>

          </div>

          <button
            class="primary-btn"
            type="button"
            data-action="freebuild"
          >
            🛠️ ساخت آزاد
          </button>

        </section>

      </section>
    `);
  }

  function renderChapter(
    domain,
    chapter,
    chapterIndex,
    progress
  ) {
    const lessons =
      Number(chapter.lessons) || 10;

    const completedInChapter =
      progress.completed.filter(
        id =>
          id.startsWith(
            `${domain.id}-${chapterIndex}-`
          )
      ).length;

    return `
      <section
        class="map-chapter
          ${chapterIndex % 2 === 0
            ? "chapter-left"
            : "chapter-right"}"
      >

        <div class="chapter-heading">

          <div class="chapter-number">
            ${chapterIndex + 1}
          </div>

          <div>
            <span class="eyebrow">
              CHAPTER ${chapterIndex + 1}
            </span>

            <h2>
              ${escapeHTML(
                chapter.title ||
                `فصل ${chapterIndex + 1}`
              )}
            </h2>

            <p>
              ${escapeHTML(
                chapter.description ||
                "مسیر یادگیری این فصل."
              )}
            </p>
          </div>

        </div>

        <div class="stage-row">

          ${Array.from(
            { length: lessons },
            (_, stageIndex) =>
              renderStage(
                domain,
                chapter,
                chapterIndex,
                stageIndex,
                progress
              )
          ).join("")}

        </div>

        <div class="chapter-status">

          <span>
            ${completedInChapter}/${lessons}
          </span>

          <div class="progress-bar">
            <span
              style="width:${Math.min(
                100,
                (completedInChapter / lessons) *
                  100
              )}%"
            ></span>
          </div>

        </div>

      </section>
    `;
  }

  function renderStage(
    domain,
    chapter,
    chapterIndex,
    stageIndex,
    progress
  ) {
    const stageId =
      `${domain.id}-${chapterIndex}-${stageIndex}`;

    const completed =
      progress.completed.includes(stageId);

    /*
     * Only the first unfinished stage is active.
     * This keeps the map game-like.
     */
    const previousId =
      stageIndex === 0
        ? null
        : `${domain.id}-${chapterIndex}-${stageIndex - 1}`;

    const previousCompleted =
      stageIndex === 0 ||
      progress.completed.includes(
        previousId
      );

    const unlocked =
      completed || previousCompleted;

    let icon = "🔒";

    if (completed) {
      icon = "✓";
    } else if (unlocked) {
      icon =
        stageIndex % 5 === 4
          ? "⭐"
          : "▶";
    }

    return `
      <button
        type="button"
        class="stage-node
          ${completed ? "completed" : ""}
          ${unlocked ? "unlocked" : "locked"}"
        ${unlocked
          ? `data-stage-domain="${escapeHTML(domain.id)}"
             data-stage-chapter="${chapterIndex}"
             data-stage-index="${stageIndex}"`
          : "disabled"}
        aria-label="مرحله ${stageIndex + 1}"
      >

        <span class="stage-icon">
          ${icon}
        </span>

        <small>
          ${stageIndex + 1}
        </small>

      </button>
    `;
  }

  /* =========================================================
     STAGE
     ========================================================= */

  function openStage(
    domainId,
    chapterIndex,
    stageIndex
  ) {
    const domain =
      ELIS_DATA.getDomainById(domainId);

    if (!domain) return;

    const chapters =
      domain.chapters &&
      domain.chapters.length
        ? domain.chapters
        : createFallbackChapters(domain);

    const chapter =
      chapters[chapterIndex];

    if (!chapter) return;

    const stageNumber =
      stageIndex + 1;

    state.currentChapter =
      chapter;

    state.currentStage = {
      chapterIndex,
      stageIndex
    };

    openModal(`
      <div class="stage-modal">

        <div class="stage-modal-icon">
          ${stageIndex % 5 === 4
            ? "⭐"
            : "🚀"}
        </div>

        <span class="eyebrow">
          CHAPTER ${chapterIndex + 1}
        </span>

        <h2>
          مرحله ${stageNumber}
        </h2>

        <h3>
          ${escapeHTML(
            chapter.title ||
            `فصل ${chapterIndex + 1}`
          )}
        </h3>

        <p>
          این مرحله در نسخه آموزشی بعدی
          با محتوای واقعی، تمرین و چالش
          تکمیل می‌شود.
        </p>

        <div class="stage-info">

          <div>
            <span>🎯</span>
            <strong>+50 XP</strong>
          </div>

          <div>
            <span>🪙</span>
            <strong>+10 سکه</strong>
          </div>

        </div>

        <div class="modal-actions">

          <button
            class="primary-btn"
            type="button"
            data-complete-stage
          >
            ✓ تکمیل آزمایشی مرحله
          </button>

          <button
            class="secondary-btn"
            type="button"
            data-close-modal
          >
            بستن
          </button>

        </div>

      </div>
    `);

    const complete =
      $("[data-complete-stage]");

    if (complete) {
      complete.addEventListener(
        "click",
        () => {
          completeStage(
            domainId,
            chapterIndex,
            stageIndex
          );

          closeModal();
        }
      );
    }
  }

  /* =========================================================
     PROJECTS
     ========================================================= */

  function renderProjects() {
    state.currentPage =
      "projects";

    const projects =
      state.projects;

    setPage(`
      <section class="page-header">

        <span class="eyebrow">
          PROJECT UNIVERSE
        </span>

        <h1>
          دنیای پروژه‌های ELIS
        </h1>

        <p>
          پروژه‌هایی که یادگیرندگان ساخته‌اند.
        </p>

      </section>

      <section class="projects-page">

        <div class="project-toolbar">

          <div>
            <h2>
              پروژه‌های ثبت‌شده
            </h2>

            <span>
              ${projects.length} پروژه
            </span>
          </div>

          <button
            class="primary-btn"
            type="button"
            data-action="freebuild"
          >
            + ثبت پروژه
          </button>

        </div>

        <div class="project-grid">

          ${
            projects.length
              ? projects
                  .map(projectCard)
                  .join("")
              : emptyProjects()
          }

        </div>

      </section>

      <section class="project-idea-section">

        <div>

          <span class="eyebrow">
            BUILD SOMETHING
          </span>

          <h2>
            فقط یاد نگیر؛ بساز.
          </h2>

          <p>
            یک ایده انتخاب کن و مهارت‌هایی که
            یاد گرفته‌ای را در یک پروژه واقعی
            استفاده کن.
          </p>

        </div>

        <button
          class="primary-btn"
          type="button"
          data-action="freebuild"
        >
          🛠️ ساخت آزاد
        </button>

      </section>
    `);
  }

  function projectCard(project) {
    const image =
      project.image &&
      safeURL(project.image);

    const link =
      project.link &&
      safeURL(project.link);

    return `
      <article class="project-card">

        <div class="project-cover">

          ${
            image && image !== "#"
              ? `
                <img
                  src="${image}"
                  alt="${escapeHTML(project.name)}"
                  loading="lazy"
                >
              `
              : `
                <div class="project-placeholder">
                  🚀
                </div>
              `
          }

        </div>

        <div class="project-body">

          <span class="project-tech">
            ${escapeHTML(
              project.tech || "ELIS Code"
            )}
          </span>

          <h3>
            ${escapeHTML(project.name)}
          </h3>

          <p>
            ${escapeHTML(project.description)}
          </p>

          ${
            link && link !== "#"
              ? `
                <a
                  class="project-link"
                  href="${link}"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  مشاهده پروژه →
                </a>
              `
              : `
                <span class="project-no-link">
                  بدون لینک
                </span>
              `
          }

        </div>

      </article>
    `;
  }

  function emptyProjects() {
    return `
      <div class="empty-state">

        <div>
          🌌
        </div>

        <h3>
          هنوز پروژه‌ای ثبت نشده
        </h3>

        <p>
          اولین پروژه را تو بساز.
        </p>

        <button
          class="primary-btn"
          type="button"
          data-action="freebuild"
        >
          شروع ساخت
        </button>

      </div>
    `;
  }

  /* =========================================================
     FREE BUILD
     ========================================================= */

  function renderFreeBuild() {
    state.currentPage =
      "freebuild";

    if (!state.user) {
      setPage(`
        <section class="auth-required">

          <div class="auth-required-icon">
            🔐
          </div>

          <h1>
            ورود لازم است
          </h1>

          <p>
            برای ثبت پروژه باید وارد حساب
            ELIS Code شوی.
          </p>

          <button
            class="primary-btn"
            type="button"
            data-action="auth"
          >
            ورود / ثبت‌نام
          </button>

        </section>
      `);

      return;
    }

    const domains =
      ELIS_DATA.getActiveDomains();

    setPage(`
      <section class="free-build-page">

        <div class="page-header">

          <span class="eyebrow">
            FREE BUILD
          </span>

          <h1>
            پروژه خودت را بساز
          </h1>

          <p>
            اینجا جایی است که یادگیری تبدیل
            به یک محصول واقعی می‌شود.
          </p>

        </div>

        <form
          id="freeBuildForm"
          class="free-build-form"
        >

          <div class="form-section">

            <h2>
              اطلاعات پروژه
            </h2>

            <div class="form-grid">

              <label>
                <span>نام پروژه *</span>

                <input
                  name="name"
                  required
                  maxlength="80"
                  placeholder="مثلاً ELIS Calculator"
                >
              </label>

              <label>
                <span>تکنولوژی *</span>

                <input
                  name="tech"
                  required
                  maxlength="120"
                  placeholder="Python, HTML, JavaScript..."
                >
              </label>

            </div>

            <label>
              <span>توضیحات پروژه *</span>

              <textarea
                name="description"
                required
                maxlength="1000"
                rows="6"
                placeholder="پروژه‌ات چه کاری انجام می‌دهد؟"
              ></textarea>
            </label>

            <div class="form-grid">

              <label>
                <span>لینک پروژه</span>

                <input
                  name="link"
                  type="url"
                  placeholder="https://..."
                >
              </label>

              <label>
                <span>لینک تصویر</span>

                <input
                  name="image"
                  type="url"
                  placeholder="https://..."
                >
              </label>

            </div>

          </div>

          <div class="form-section">

            <h2>
              مسیر مرتبط
            </h2>

            <label>
              <span>دامنه</span>

              <select name="domain">

                <option value="">
                  انتخاب دامنه
                </option>

                ${domains
                  .map(
                    domain => `
                      <option value="${escapeHTML(domain.id)}">
                        ${escapeHTML(domain.title)}
                      </option>
                    `
                  )
                  .join("")}

              </select>

            </label>

          </div>

          <div class="form-submit-row">

            <button
              class="primary-btn large"
              type="submit"
            >
              🚀 ثبت پروژه
            </button>

            <button
              class="secondary-btn"
              type="button"
              data-action="projects"
            >
              انصراف
            </button>

          </div>

        </form>

      </section>
    `);

    const form =
      $("#freeBuildForm");

    if (!form) return;

    form.addEventListener(
      "submit",
      handleFreeBuildSubmit
    );
  }

  function handleFreeBuildSubmit(event) {
    event.preventDefault();

    if (!state.user) {
      toast(
        "ابتدا وارد حساب شوید.",
        "error"
      );

      return;
    }

    const form =
      event.currentTarget;

    const formData =
      new FormData(form);

    const name =
      String(
        formData.get("name") || ""
      ).trim();

    const tech =
      String(
        formData.get("tech") || ""
      ).trim();

    const description =
      String(
        formData.get("description") || ""
      ).trim();

    const link =
      String(
        formData.get("link") || ""
      ).trim();

    const image =
      String(
        formData.get("image") || ""
      ).trim();

    const domain =
      String(
        formData.get("domain") || ""
      ).trim();

    if (
      !name ||
      !tech ||
      !description
    ) {
      toast(
        "لطفاً فیلدهای ضروری را کامل کن.",
        "error"
      );

      return;
    }

    if (link) {
      const safeLink =
        safeURL(link);

      if (safeLink === "#") {
        toast(
          "لینک پروژه معتبر نیست.",
          "error"
        );

        return;
      }
    }

    if (image) {
      const safeImage =
        safeURL(image);

      if (safeImage === "#") {
        toast(
          "لینک تصویر معتبر نیست.",
          "error"
        );

        return;
      }
    }

    const project = {
      id:
        "project-" +
        Date.now(),

      name,
      tech,
      description,
      link,
      image,
      domain,

      ownerId:
        state.user.id,

      ownerName:
        state.user.name,

      createdAt:
        new Date().toISOString()
    };

    state.projects.unshift(
      project
    );

    saveProjects();

    addXP(100);
    addCoins(50);

    toast(
      "🚀 پروژه با موفقیت ثبت شد! +100 XP",
      "success"
    );

    renderProjects();
  }

  /* =========================================================
     ABOUT
     ========================================================= */

  function renderAbout() {
    state.currentPage =
      "about";

    setPage(`
      <section class="about-page">

        <div class="page-header">

          <span class="eyebrow">
            ABOUT ELIS
          </span>

          <h1>
            ELIS Code چیست؟
          </h1>

          <p>
            یک دنیای آموزشی برای یادگیری فناوری
            و تبدیل ایده‌ها به پروژه‌های واقعی.
          </p>

        </div>

        <div class="about-grid">

          <article class="about-card">

            <span>🎯</span>

            <h2>
              هدف
            </h2>

            <p>
              یادگیری فقط حفظ کردن کد نیست.
              هدف ELIS Code این است که کاربر
              بتواند با دانشی که یاد گرفته،
              چیزی واقعی بسازد.
            </p>

          </article>

          <article class="about-card">

            <span>🧩</span>

            <h2>
              مسیرها
            </h2>

            <p>
              Python، Web، AI، Game،
              Cybersecurity و ده‌ها حوزه
              دیگر مسیرهای مستقل خودشان
              را دارند.
            </p>

          </article>

          <article class="about-card">

            <span>🌌</span>

            <h2>
              آینده
            </h2>

            <p>
              ELIS Code قرار است از یک سایت
              آموزشی ساده به یک دنیای بزرگ
              برای یادگیری و ساختن تبدیل شود.
            </p>

          </article>

        </div>

        <div class="about-timeline">

          <div>
            <strong>01</strong>
            <span>یاد بگیر</span>
          </div>

          <div>
            <strong>02</strong>
            <span>تمرین کن</span>
          </div>

          <div>
            <strong>03</strong>
            <span>چالش حل کن</span>
          </div>

          <div>
            <strong>04</strong>
            <span>پروژه بساز</span>
          </div>

          <div>
            <strong>05</strong>
            <span>آزمون بده</span>
          </div>

          <div>
            <strong>06</strong>
            <span>گواهی بگیر</span>
          </div>

        </div>

      </section>
    `);
  }

  /* =========================================================
     AUTH
     ========================================================= */

  function renderAuth(mode = "login") {
    state.currentPage =
      "auth";

    const isLogin =
      mode === "login";

    setPage(`
      <section class="auth-page">

        <div class="auth-box">

          <div class="auth-logo">
            ELIS
            <small>CODE</small>
          </div>

          <span class="eyebrow">
            ${isLogin
              ? "WELCOME BACK"
              : "JOIN ELIS CODE"}
          </span>

          <h1>
            ${isLogin
              ? "خوش برگشتی."
              : "حساب ELIS خودت را بساز."}
          </h1>

          <p>
            ${isLogin
              ? "وارد شو و مسیر یادگیریت را ادامه بده."
              : "پیشرفت، XP و پروژه‌هایت را ذخیره کن."}
          </p>

          <form id="authForm">

            ${
              !isLogin
                ? `
                  <label>
                    <span>نام</span>

                    <input
                      name="name"
                      required
                      maxlength="60"
                      placeholder="علی رضایی"
                    >
                  </label>

                  <label>
                    <span>نام کاربری</span>

                    <input
                      name="username"
                      required
                      maxlength="30"
                      pattern="[A-Za-z0-9_]+"
                      placeholder="elis_user"
                    >
                  </label>
                `
                : ""
            }

            <label>
              <span>
                ${isLogin
                  ? "ایمیل یا نام کاربری"
                  : "ایمیل"}
              </span>

              <input
                name="identifier"
                type="${isLogin ? "text" : "email"}"
                required
                maxlength="120"
                placeholder="${isLogin
                  ? "نام کاربری یا ایمیل"
                  : "example@email.com"}"
              >
            </label>

            ${
              !isLogin
                ? `
                  <label>
                    <span>ایمیل</span>

                    <input
                      name="email"
                      type="email"
                      required
                      maxlength="120"
                      placeholder="example@email.com"
                    >
                  </label>
                `
                : ""
            }

            <label>
              <span>رمز عبور</span>

              <input
                name="password"
                type="password"
                required
                minlength="4"
                maxlength="100"
                placeholder="رمز عبور"
              >
            </label>

            <button
              class="primary-btn large"
              type="submit"
            >
              ${isLogin
                ? "ورود به ELIS"
                : "ساخت حساب"}
            </button>

          </form>

          <button
            class="auth-switch"
            type="button"
            data-auth-mode="${isLogin
              ? "register"
              : "login"}"
          >
            ${isLogin
              ? "حساب نداری؟ ثبت‌نام کن"
              : "قبلاً حساب ساخته‌ای؟ وارد شو"}
          </button>

          <p class="auth-note">
            نسخه فعلی برای GitHub Pages طراحی شده
            و اطلاعات حساب فقط روی همین دستگاه
            ذخیره می‌شود.
          </p>

        </div>

      </section>
    `);

    const form =
      $("#authForm");

    if (form) {
      form.addEventListener(
        "submit",
        event =>
          handleAuthSubmit(
            event,
            isLogin
          )
      );
    }
  }

  function handleAuthSubmit(
    event,
    isLogin
  ) {
    event.preventDefault();

    const form =
      event.currentTarget;

    const data =
      new FormData(form);

    const password =
      String(
        data.get("password") || ""
      );

    if (isLogin) {
      const identifier =
        String(
          data.get("identifier") || ""
        ).trim();

      if (
        loginUser(
          identifier,
          password
        )
      ) {
        toast(
          "خوش برگشتی 👻",
          "success"
        );

        goHome();
      } else {
        toast(
          "اطلاعات ورود صحیح نیست.",
          "error"
        );
      }

      return;
    }

    const name =
      String(
        data.get("name") || ""
      ).trim();

    const username =
      String(
        data.get("username") || ""
      ).trim();

    const email =
      String(
        data.get("email") || ""
      ).trim();

    if (
      !name ||
      !username ||
      !email ||
      !password
    ) {
      toast(
        "همه فیلدها را کامل کن.",
        "error"
      );

      return;
    }

    if (
      !/^[A-Za-z0-9_]+$/.test(
        username
      )
    ) {
      toast(
        "نام کاربری فقط باید شامل حروف انگلیسی، عدد و _ باشد.",
        "error"
      );

      return;
    }

    const existing =
      localStorage.getItem(
        APP.storage.user
      );

    if (existing) {
      try {
        const oldUser =
          JSON.parse(existing);

        if (
          oldUser.username ===
          username
        ) {
          toast(
            "این نام کاربری قبلاً استفاده شده.",
            "error"
          );

          return;
        }

        if (
          oldUser.email ===
          email
        ) {
          toast(
            "این ایمیل قبلاً استفاده شده.",
            "error"
          );

          return;
        }
      } catch {}
    }

    createUser({
      name,
      username,
      email,
      password
    });

    toast(
      "حساب ساخته شد. خوش آمدی! 🚀",
      "success"
    );

    goHome();
  }

  /* =========================================================
     PROFILE
     ========================================================= */

  function renderProfile() {
    state.currentPage =
      "profile";

    if (!state.user) {
      renderAuth();

      return;
    }

    const level =
      state.user.level;

    const currentXP =
      state.user.xp;

    const requiredXP =
      xpForNextLevel(level);

    const xpPercent =
      Math.min(
        100,
        Math.round(
          (currentXP / requiredXP) * 100
        )
      );

    const completed =
      state.user
        .completedLessons
        .length;

    const achievements =
      state.user.achievements || [];

    setPage(`
      <section class="profile-page">

        <div class="profile-hero">

          <div class="profile-avatar">
            ${escapeHTML(
              state.user.name
                .charAt(0)
                .toUpperCase()
            )}
          </div>

          <div>

            <span class="eyebrow">
              ELIS EXPLORER
            </span>

            <h1>
              ${escapeHTML(
                state.user.name
              )}
            </h1>

            <p>
              @${escapeHTML(
                state.user.username
              )}
            </p>

          </div>

          <button
            class="secondary-btn"
            type="button"
            data-logout
          >
            خروج
          </button>

        </div>

        <div class="profile-stats">

          <div class="profile-stat">
            <strong>
              ${level}
            </strong>
            <span>Level</span>
          </div>

          <div class="profile-stat">
            <strong>
              ${currentXP}
            </strong>
            <span>XP</span>
          </div>

          <div class="profile-stat">
            <strong>
              🪙 ${state.user.coins}
            </strong>
            <span>Coins</span>
          </div>

          <div class="profile-stat">
            <strong>
              ${completed}
            </strong>
            <span>Lessons</span>
          </div>

        </div>

        <section class="level-card">

          <div class="level-card-top">

            <div>
              <span>
                Level ${level}
              </span>

              <strong>
                ${currentXP} / ${requiredXP} XP
              </strong>
            </div>

            <span>
              ${xpPercent}%
            </span>

          </div>

          <div class="progress-bar large">
            <span
              style="width:${xpPercent}%"
            ></span>
          </div>

        </section>

        <section class="profile-achievements">

          <div class="section-heading">

            <div>
              <span class="eyebrow">
                ACHIEVEMENTS
              </span>

              <h2>
                دستاوردها
              </h2>
            </div>

          </div>

          <div class="achievement-grid">

            ${renderAchievements(
              achievements
            )}

          </div>

        </section>

        <section class="profile-actions">

          <button
            class="primary-btn"
            type="button"
            data-action="domains"
          >
            🗺️ ادامه یادگیری
          </button>

          <button
            class="secondary-btn"
            type="button"
            data-action="freebuild"
          >
            🛠️ ساخت آزاد
          </button>

        </section>

      </section>
    `);
  }

  function renderAchievements(
    achievements
  ) {
    const defaultAchievements = [
      {
        id: "first-step",
        icon: "👣",
        title: "اولین قدم",
        description: "شروع مسیر"
      },
      {
        id: "xp-500",
        icon: "⚡",
        title: "500 XP",
        description: "کسب 500 XP"
      },
      {
        id: "project",
        icon: "🛠️",
        title: "سازنده",
        description: "ثبت اولین پروژه"
      },
      {
        id: "level-5",
        icon: "🔥",
        title: "Level 5",
        description: "رسیدن به سطح 5"
      },
      {
        id: "explorer",
        icon: "🌌",
        title: "کاوشگر",
        description: "شروع چند مسیر"
      },
      {
        id: "builder",
        icon: "🚀",
        title: "Builder",
        description: "ساخت پروژه واقعی"
      }
    ];

    return defaultAchievements
      .map(item => {
        const unlocked =
          achievements.includes(
            item.id
          );

        return `
          <div
            class="achievement
              ${unlocked ? "unlocked" : "locked"}"
          >

            <span>
              ${unlocked
                ? item.icon
                : "🔒"}
            </span>

            <div>
              <strong>
                ${item.title}
              </strong>

              <small>
                ${item.description}
              </small>
            </div>

          </div>
        `;
      })
      .join("");
  }

  /* =========================================================
     CERTIFICATE
     ========================================================= */

  function renderCertificate(domainId) {
    const domain =
      ELIS_DATA.getDomainById(
        domainId
      );

    if (!domain) return;

    const progress =
      getDomainProgress(
        domainId
      );

    const required =
      domain.lessonsTarget ||
      1000;

    if (
      progress.completed.length <
      required
    ) {
      openModal(`
        <div class="stage-modal">

          <div class="stage-modal-icon">
            🔒
          </div>

          <h2>
            گواهی هنوز باز نشده
          </h2>

          <p>
            برای دریافت گواهی باید
            مسیر ${escapeHTML(domain.title)}
            را کامل کنی.
          </p>

          <div class="modal-actions">

            <button
              class="secondary-btn"
              type="button"
              data-close-modal
            >
              بستن
            </button>

          </div>

        </div>
      `);

      return;
    }

    openModal(`
      <div class="certificate-preview">

        <div class="certificate-logo">
          ELIS CODE
        </div>

        <span>
          CERTIFICATE OF COMPLETION
        </span>

        <h2>
          ${escapeHTML(
            state.user?.name ||
            "کاربر ELIS"
          )}
        </h2>

        <p>
          مسیر
          <strong>
            ${escapeHTML(domain.title)}
          </strong>
          را با موفقیت به پایان رسانده است.
        </p>

        <div class="certificate-id">
          ID:
          ELIS-${domain.id.toUpperCase()}-${Date.now()
            .toString(36)
            .toUpperCase()}
        </div>

        <div class="certificate-sign">
          <span>
            ELIS Studio
          </span>

          <small>
            ELIS Code
          </small>
        </div>

      </div>
    `);
  }

  /* =========================================================
     MODAL
     ========================================================= */

  function openModal(content) {
    const modal =
      $("#globalModal");

    if (!modal) return;

    modal.innerHTML = `
      <div
        class="modal-backdrop"
        data-close-modal
      ></div>

      <div
        class="modal-panel"
        role="dialog"
        aria-modal="true"
      >

        <button
          class="modal-close"
          type="button"
          data-close-modal
          aria-label="بستن"
        >
          ×
        </button>

        ${content}

      </div>
    `;

    modal.classList.add(
      "open"
    );

    state.modalOpen = true;

    document.body.classList.add(
      "modal-open"
    );
  }

  function closeModal() {
    const modal =
      $("#globalModal");

    if (!modal) return;

    modal.classList.remove(
      "open"
    );

    modal.innerHTML = "";

    state.modalOpen = false;

    document.body.classList.remove(
      "modal-open"
    );
  }

  /* =========================================================
     TOAST
     ========================================================= */

  function toast(
    message,
    type = "info"
  ) {
    const container =
      $("#toastContainer");

    if (!container) return;

    const item =
      document.createElement(
        "div"
      );

    item.className =
      `toast toast-${type}`;

    item.innerHTML = `
      <span class="toast-icon">
        ${
          type === "success"
            ? "✓"
            : type === "error"
              ? "!"
              : "i"
        }
      </span>

      <span class="toast-message">
        ${escapeHTML(message)}
      </span>
    `;

    container.appendChild(item);

    requestAnimationFrame(() => {
      item.classList.add(
        "show"
      );
    });

    setTimeout(() => {
      item.classList.remove(
        "show"
      );

      setTimeout(() => {
        item.remove();
      }, 300);
    }, 3000);
  }

  /* =========================================================
     NAVIGATION
     ========================================================= */

  function goHome() {
    renderHome();
  }

  function showDomains() {
    renderDomains();
  }

  function showProjects() {
    renderProjects();
  }

  function showAbout() {
    renderAbout();
  }

  function showAuth() {
    renderAuth(
      state.user
        ? "login"
        : "login"
    );
  }

  function showProfile() {
    renderProfile();
  }

  function showFreeBuild() {
    renderFreeBuild();
  }

  function openDomain(domainId) {
    renderDomainIntro(
      domainId
    );
  }

  /* =========================================================
     EVENT DELEGATION
     ========================================================= */

  function setupEvents() {
    document.addEventListener(
      "click",
      event => {
        const target =
          event.target.closest(
            "[data-action], [data-domain], [data-start-domain], [data-stage-domain], [data-domain-back], [data-final-exam], [data-auth-mode], [data-logout], [data-close-modal]"
          );

        if (!target) return;

        /* Main actions */
        const action =
          target.dataset.action;

        if (action === "home") {
          goHome();
          return;
        }

        if (action === "domains") {
          showDomains();
          return;
        }

        if (action === "projects") {
          showProjects();
          return;
        }

        if (action === "about") {
          showAbout();
          return;
        }

        if (action === "auth") {
          showAuth();
          return;
        }

        if (action === "profile") {
          showProfile();
          return;
        }

        if (
          action ===
          "freebuild"
        ) {
          showFreeBuild();
          return;
        }

        /* Domain */
        if (target.dataset.domain) {
          openDomain(
            target.dataset.domain
          );

          return;
        }

        /* Start path */
        if (
          target.dataset.startDomain
        ) {
          const domain =
            ELIS_DATA.getDomainById(
              target.dataset.startDomain
            );

          if (domain) {
            renderDomainPath(
              domain
            );
          }

          return;
        }

        /* Back from path */
        if (
          target.dataset.domainBack
        ) {
          renderDomainIntro(
            target.dataset.domainBack
          );

          return;
        }

        /* Stage */
        if (
          target.dataset.stageDomain
        ) {
          openStage(
            target.dataset.stageDomain,
            Number(
              target.dataset.stageChapter
            ),
            Number(
              target.dataset.stageIndex
            )
          );

          return;
        }

        /* Final exam */
        if (
          target.dataset.finalExam
        ) {
          const domain =
            ELIS_DATA.getDomainById(
              target.dataset.finalExam
            );

          if (!domain) return;

          openModal(`
            <div class="stage-modal">

              <div class="stage-modal-icon">
                🏆
              </div>

              <span class="eyebrow">
                FINAL EXAM
              </span>

              <h2>
                آزمون نهایی
              </h2>

              <p>
                آزمون نهایی مسیر
                ${escapeHTML(domain.title)}
                بعد از تکمیل کامل درس‌ها
                فعال خواهد شد.
              </p>

              <div class="modal-actions">

                <button
                  class="secondary-btn"
                  type="button"
                  data-close-modal
                >
                  بستن
                </button>

              </div>

            </div>
          `);

          return;
        }

        /* Auth switch */
        if (
          target.dataset.authMode
        ) {
          renderAuth(
            target.dataset.authMode
          );

          return;
        }

        /* Logout */
        if (
          target.dataset.logout !==
          undefined
        ) {
          logout();
          return;
        }

        /* Close modal */
        if (
          target.dataset.closeModal !==
          undefined
        ) {
          closeModal();
        }
      }
    );

    /* Close modal with ESC */
    document.addEventListener(
      "keydown",
      event => {
        if (
          event.key === "Escape" &&
          state.modalOpen
        ) {
          closeModal();
        }
      }
    );
  }

  /* =========================================================
     ACHIEVEMENT CHECK
     ========================================================= */

  function checkAchievements() {
    if (!state.user) return;

    if (
      state.user.completedLessons
        .length >= 1
    ) {
      unlockAchievement(
        "first-step"
      );
    }

    const totalXP =
      calculateTotalXP();

    if (totalXP >= 500) {
      unlockAchievement(
        "xp-500"
      );
    }

    if (
      state.projects.some(
        project =>
          project.ownerId ===
          state.user.id
      )
    ) {
      unlockAchievement(
        "project"
      );
    }

    if (
      state.user.level >= 5
    ) {
      unlockAchievement(
        "level-5"
      );
    }
  }

  function calculateTotalXP() {
    if (!state.user) return 0;

    return (
      state.user.xp +
      Math.max(
        0,
        state.user.level - 1
      ) *
        500
    );
  }

  function unlockAchievement(id) {
    if (!state.user) return;

    if (
      !state.user.achievements
    ) {
      state.user.achievements = [];
    }

    if (
      state.user.achievements.includes(
        id
      )
    ) {
      return;
    }

    state.user.achievements.push(
      id
    );

    saveUser();
  }

  /* =========================================================
     DATA VALIDATION
     ========================================================= */

  function validateData() {
    if (
      typeof ELIS_DATA ===
      "undefined"
    ) {
      console.error(
        "ELIS_DATA was not found."
      );

      setPage(`
        <section class="error-state">

          <h1>
            خطای بارگذاری
          </h1>

          <p>
            فایل data.js پیدا نشد.
          </p>

        </section>
      `);

      return false;
    }

    return true;
  }

  /* =========================================================
     PUBLIC API
     ========================================================= */

  const ELIS = {
    start() {
      if (!validateData()) {
        return;
      }

      loadState();
      setupEvents();
      updateNavbar();
      checkAchievements();
      renderHome();
    },

    goHome,
    showDomains,
    showProjects,
    showAbout,
    showAuth,
    showProfile,
    showFreeBuild,

    openDomain,
    renderDomainPath,

    closeModal,

    addXP,
    addCoins,

    getState() {
      return state;
    }
  };

  window.ELIS = ELIS;

})();
