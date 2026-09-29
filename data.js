/* =========================================================
   ELIS CODE — DATA
   50 ACTIVE DOMAINS + FUTURE DOMAINS
   ========================================================= */

const ELIS_DATA = {

  /* =======================================================
     ACTIVE DOMAINS
  ======================================================= */

  domains: [

    {
      id: "python",
      name: "Python",
      icon: "🐍",
      color: "#3776ab",
      status: "active",
      lessonsTarget: 1000,
      description:
        "از مبانی Python تا ساخت برنامه‌های واقعی، API، اتوماسیون، داده و هوش مصنوعی.",
      learn: [
        "مبانی برنامه‌نویسی",
        "متغیرها و انواع داده",
        "شرط‌ها و حلقه‌ها",
        "توابع",
        "لیست، دیکشنری و مجموعه‌ها",
        "برنامه‌نویسی شیءگرا",
        "کار با فایل‌ها",
        "خطاها و Exception",
        "دیتابیس",
        "API",
        "اتوماسیون",
        "ساخت پروژه واقعی",
        "Python برای هوش مصنوعی"
      ],
      chapters: [
        {
          id: "python-1",
          title: "فصل ۱ — شروع Python",
          stages: [
            "Python چیست؟",
            "اولین برنامه",
            "print",
            "متغیرها",
            "انواع داده",
            "ورودی کاربر",
            "تمرین فصل"
          ]
        },
        {
          id: "python-2",
          title: "فصل ۲ — منطق برنامه",
          stages: [
            "عملگرها",
            "شرط if",
            "elif و else",
            "حلقه for",
            "حلقه while",
            "break و continue",
            "چالش منطقی"
          ]
        },
        {
          id: "python-3",
          title: "فصل ۳ — ساختار داده",
          stages: [
            "List",
            "Tuple",
            "Set",
            "Dictionary",
            "کار با داده‌ها",
            "تمرین ترکیبی"
          ]
        },
        {
          id: "python-4",
          title: "فصل ۴ — توابع",
          stages: [
            "Function",
            "پارامترها",
            "Return",
            "Scope",
            "Lambda",
            "توابع پیشرفته"
          ]
        },
        {
          id: "python-5",
          title: "فصل ۵ — پروژه‌های Python",
          stages: [
            "طراحی پروژه",
            "مدیریت فایل",
            "مدیریت خطا",
            "ساخت ابزار",
            "پروژه عملی",
            "آزمون فصل"
          ]
        },
        {
          id: "python-6",
          title: "فصل ۶ — ورود به دنیای حرفه‌ای",
          stages: [
            "OOP",
            "Modules",
            "Packages",
            "Database",
            "API",
            "Automation",
            "پروژه نهایی"
          ]
        }
      ]
    },


    {
      id: "html",
      name: "HTML",
      icon: "🌐",
      color: "#e34c26",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساختار وب را از پایه یاد بگیر و صفحات واقعی و حرفه‌ای بساز.",
      learn: [
        "ساختار HTML",
        "تگ‌ها",
        "لینک‌ها",
        "تصاویر",
        "فرم‌ها",
        "جدول‌ها",
        "Semantic HTML",
        "دسترسی‌پذیری",
        "ساخت صفحات واقعی"
      ],
      chapters: [
        {
          id: "html-1",
          title: "فصل ۱ — شروع HTML",
          stages: [
            "HTML چیست؟",
            "ساخت اولین صفحه",
            "تگ‌ها",
            "عنوان‌ها",
            "متن‌ها",
            "لینک‌ها",
            "تمرین"
          ]
        },
        {
          id: "html-2",
          title: "فصل ۲ — محتوای وب",
          stages: [
            "تصاویر",
            "لیست‌ها",
            "جدول‌ها",
            "ویدئو",
            "صوت",
            "Embed"
          ]
        },
        {
          id: "html-3",
          title: "فصل ۳ — فرم‌ها",
          stages: [
            "Form",
            "Input",
            "Button",
            "Select",
            "Textarea",
            "Validation"
          ]
        },
        {
          id: "html-4",
          title: "فصل ۴ — ساخت صفحه واقعی",
          stages: [
            "Header",
            "Navigation",
            "Main",
            "Section",
            "Footer",
            "ساخت صفحه کامل"
          ]
        },
        {
          id: "html-5",
          title: "فصل ۵ — HTML حرفه‌ای",
          stages: [
            "Semantic HTML",
            "Accessibility",
            "SEO پایه",
            "ساختار استاندارد",
            "پروژه عملی"
          ]
        },
        {
          id: "html-6",
          title: "فصل ۶ — پروژه HTML",
          stages: [
            "طراحی پروژه",
            "ساخت صفحات",
            "اتصال صفحات",
            "فرم واقعی",
            "آزمون",
            "پروژه نهایی"
          ]
        }
      ]
    },


    {
      id: "css",
      name: "CSS",
      icon: "🎨",
      color: "#264de4",
      status: "active",
      lessonsTarget: 1000,
      description:
        "طراحی رابط‌های زیبا، واکنش‌گرا و حرفه‌ای برای وب.",
      learn: [
        "Selectors",
        "Colors",
        "Box Model",
        "Flexbox",
        "Grid",
        "Responsive Design",
        "Animation",
        "Transitions",
        "طراحی رابط حرفه‌ای"
      ],
      chapters: [
        {
          id: "css-1",
          title: "فصل ۱ — شروع CSS",
          stages: [
            "CSS چیست؟",
            "اتصال CSS",
            "Selector",
            "رنگ",
            "فونت",
            "پس‌زمینه"
          ]
        },
        {
          id: "css-2",
          title: "فصل ۲ — Layout",
          stages: [
            "Box Model",
            "Margin",
            "Padding",
            "Border",
            "Display",
            "Position"
          ]
        },
        {
          id: "css-3",
          title: "فصل ۳ — Flexbox",
          stages: [
            "Flex",
            "Direction",
            "Alignment",
            "Gap",
            "ساخت Navbar",
            "ساخت Layout"
          ]
        },
        {
          id: "css-4",
          title: "فصل ۴ — Grid",
          stages: [
            "Grid",
            "Columns",
            "Rows",
            "Cards",
            "Gallery",
            "Dashboard"
          ]
        },
        {
          id: "css-5",
          title: "فصل ۵ — Responsive",
          stages: [
            "Media Query",
            "Mobile First",
            "Tablet",
            "Desktop",
            "Responsive Cards",
            "پروژه"
          ]
        },
        {
          id: "css-6",
          title: "فصل ۶ — طراحی حرفه‌ای",
          stages: [
            "Transition",
            "Animation",
            "Gradient",
            "Glass Effect",
            "UI System",
            "پروژه نهایی"
          ]
        }
      ]
    },


    {
      id: "javascript",
      name: "JavaScript",
      icon: "⚡",
      color: "#f7df1e",
      status: "active",
      lessonsTarget: 1000,
      description:
        "منطق و تعامل وب را بساز و صفحات ساده را به برنامه‌های واقعی تبدیل کن.",
      learn: [
        "Syntax",
        "Variables",
        "Conditions",
        "Loops",
        "Functions",
        "Arrays",
        "Objects",
        "DOM",
        "Events",
        "Async JavaScript",
        "API",
        "پروژه‌های واقعی"
      ],
      chapters: [
        {
          id: "js-1",
          title: "فصل ۱ — شروع JavaScript",
          stages: [
            "JavaScript چیست؟",
            "Variables",
            "Data Types",
            "Operators",
            "Input",
            "Output"
          ]
        },
        {
          id: "js-2",
          title: "فصل ۲ — منطق",
          stages: [
            "if",
            "else",
            "for",
            "while",
            "Functions",
            "Scope"
          ]
        },
        {
          id: "js-3",
          title: "فصل ۳ — داده‌ها",
          stages: [
            "Array",
            "Object",
            "Methods",
            "Destructuring",
            "Spread",
            "تمرین"
          ]
        },
        {
          id: "js-4",
          title: "فصل ۴ — Web DOM",
          stages: [
            "DOM",
            "Selectors",
            "Events",
            "Forms",
            "Dynamic UI",
            "پروژه"
          ]
        },
        {
          id: "js-5",
          title: "فصل ۵ — Async و API",
          stages: [
            "Promise",
            "Async",
            "Await",
            "Fetch",
            "JSON",
            "API Project"
          ]
        },
        {
          id: "js-6",
          title: "فصل ۶ — پروژه حرفه‌ای",
          stages: [
            "ساخت اپ وب",
            "مدیریت State",
            "اتصال API",
            "ذخیره داده",
            "تست",
            "پروژه نهایی"
          ]
        }
      ]
    },


    {
      id: "typescript",
      name: "TypeScript",
      icon: "🔷",
      color: "#3178c6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "JavaScript حرفه‌ای‌تر با سیستم Type و معماری بهتر.",
      learn: [
        "Types",
        "Interfaces",
        "Generics",
        "Classes",
        "Modules",
        "Type Safety",
        "پروژه‌های واقعی"
      ]
    },


    {
      id: "cpp",
      name: "C++",
      icon: "🟥",
      color: "#00599c",
      status: "active",
      lessonsTarget: 1000,
      description:
        "برنامه‌نویسی قدرتمند، الگوریتم و ساخت نرم‌افزارهای سریع.",
      learn: [
        "Syntax",
        "Variables",
        "Functions",
        "Pointers",
        "OOP",
        "STL",
        "Algorithms",
        "Projects"
      ]
    },


    {
      id: "c",
      name: "C",
      icon: "🔵",
      color: "#555555",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مبانی عمیق برنامه‌نویسی و کار با حافظه.",
      learn: [
        "Syntax",
        "Memory",
        "Pointers",
        "Functions",
        "Structures",
        "Files",
        "Projects"
      ]
    },


    {
      id: "csharp",
      name: "C#",
      icon: "🟣",
      color: "#68217a",
      status: "active",
      lessonsTarget: 1000,
      description:
        "برنامه‌نویسی مدرن برای نرم‌افزار، بازی و سرویس‌های مختلف.",
      learn: [
        "C# Basics",
        "OOP",
        "Collections",
        "LINQ",
        "Async",
        "Game Development",
        "Projects"
      ]
    },


    {
      id: "java",
      name: "Java",
      icon: "☕",
      color: "#f89820",
      status: "active",
      lessonsTarget: 1000,
      description:
        "یادگیری Java از پایه تا ساخت برنامه‌های واقعی.",
      learn: [
        "Syntax",
        "OOP",
        "Collections",
        "Exceptions",
        "Threads",
        "APIs",
        "Projects"
      ]
    },


    {
      id: "kotlin",
      name: "Kotlin",
      icon: "🟪",
      color: "#7f52ff",
      status: "active",
      lessonsTarget: 1000,
      description:
        "زبان مدرن برای توسعه نرم‌افزار و Android.",
      learn: [
        "Kotlin Basics",
        "OOP",
        "Collections",
        "Coroutines",
        "Android",
        "Projects"
      ]
    },


    {
      id: "swift",
      name: "Swift",
      icon: "🍎",
      color: "#f05138",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت برنامه‌های مدرن برای اکوسیستم Apple.",
      learn: [
        "Swift Basics",
        "SwiftUI",
        "Data",
        "Networking",
        "iOS Apps",
        "Projects"
      ]
    },


    {
      id: "dart",
      name: "Dart",
      icon: "🎯",
      color: "#0175c2",
      status: "active",
      lessonsTarget: 1000,
      description:
        "زبان Dart و پایه‌های ساخت برنامه‌های مدرن.",
      learn: [
        "Dart Basics",
        "OOP",
        "Async",
        "Collections",
        "Flutter Foundation"
      ]
    },


    {
      id: "flutter",
      name: "Flutter",
      icon: "💙",
      color: "#02569b",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت اپلیکیشن‌های چندسکویی با Flutter.",
      learn: [
        "Widgets",
        "Layouts",
        "Navigation",
        "State",
        "API",
        "Database",
        "Real Apps"
      ]
    },


    {
      id: "php",
      name: "PHP",
      icon: "🐘",
      color: "#777bb4",
      status: "active",
      lessonsTarget: 1000,
      description:
        "توسعه سمت سرور و ساخت وب‌سایت‌های پویا.",
      learn: [
        "PHP Basics",
        "Forms",
        "Sessions",
        "Database",
        "Authentication",
        "APIs",
        "Projects"
      ]
    },


    {
      id: "go",
      name: "Go",
      icon: "🐹",
      color: "#00add8",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت سرویس‌های سریع و مقیاس‌پذیر.",
      learn: [
        "Go Basics",
        "Concurrency",
        "HTTP",
        "APIs",
        "Services",
        "Projects"
      ]
    },


    {
      id: "rust",
      name: "Rust",
      icon: "🦀",
      color: "#dea584",
      status: "active",
      lessonsTarget: 1000,
      description:
        "برنامه‌نویسی سریع و امن با Rust.",
      learn: [
        "Rust Basics",
        "Ownership",
        "Borrowing",
        "Traits",
        "Concurrency",
        "Projects"
      ]
    },


    {
      id: "react",
      name: "React",
      icon: "⚛️",
      color: "#61dafb",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت رابط‌های کاربری مدرن و تعاملی.",
      learn: [
        "Components",
        "Props",
        "State",
        "Hooks",
        "Routing",
        "API",
        "Projects"
      ]
    },


    {
      id: "nodejs",
      name: "Node.js",
      icon: "🟢",
      color: "#339933",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت Backend و سرویس‌های JavaScript.",
      learn: [
        "Node Basics",
        "Modules",
        "HTTP",
        "Express",
        "Database",
        "Authentication",
        "APIs"
      ]
    },


    {
      id: "web-development",
      name: "Web Development",
      icon: "🌐",
      color: "#00d9ff",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت وب‌سایت و وب‌اپلیکیشن از پایه تا Full Stack.",
      learn: [
        "Frontend",
        "Backend",
        "API",
        "Database",
        "Authentication",
        "Deployment",
        "Real Projects"
      ]
    },


    {
      id: "fullstack",
      name: "Full Stack",
      icon: "🧩",
      color: "#8b5cf6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مسیر کامل ساخت محصولات وب.",
      learn: [
        "Frontend",
        "Backend",
        "Database",
        "API",
        "Security",
        "Deployment",
        "Projects"
      ]
    },


    {
      id: "api",
      name: "API Development",
      icon: "🔌",
      color: "#14b8a6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت و استفاده حرفه‌ای از API.",
      learn: [
        "HTTP",
        "REST",
        "JSON",
        "Authentication",
        "API Security",
        "Testing",
        "Projects"
      ]
    },


    {
      id: "database",
      name: "Database",
      icon: "🗄️",
      color: "#6366f1",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مدیریت و طراحی سیستم‌های داده.",
      learn: [
        "Database Concepts",
        "Tables",
        "Relations",
        "Queries",
        "Indexes",
        "Security",
        "Projects"
      ]
    },


    {
      id: "sql",
      name: "SQL",
      icon: "🗃️",
      color: "#f59e0b",
      status: "active",
      lessonsTarget: 1000,
      description:
        "یادگیری SQL برای کار حرفه‌ای با داده.",
      learn: [
        "SELECT",
        "INSERT",
        "UPDATE",
        "DELETE",
        "JOIN",
        "Indexes",
        "Advanced Queries"
      ]
    },


    {
      id: "firebase",
      name: "Firebase",
      icon: "🔥",
      color: "#ffca28",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت سریع اپلیکیشن با سرویس‌های Firebase.",
      learn: [
        "Authentication",
        "Firestore",
        "Storage",
        "Hosting",
        "Security Rules",
        "Projects"
      ]
    },


    {
      id: "git",
      name: "Git & GitHub",
      icon: "🐙",
      color: "#f05032",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مدیریت نسخه و همکاری حرفه‌ای روی پروژه‌ها.",
      learn: [
        "Git Basics",
        "Branches",
        "Merge",
        "GitHub",
        "Pull Request",
        "Collaboration"
      ]
    },


    {
      id: "linux",
      name: "Linux",
      icon: "🐧",
      color: "#fcc624",
      status: "active",
      lessonsTarget: 1000,
      description:
        "کار حرفه‌ای با سیستم‌عامل Linux.",
      learn: [
        "Terminal",
        "Files",
        "Permissions",
        "Processes",
        "Networking",
        "Shell"
      ]
    },


    {
      id: "devops",
      name: "DevOps",
      icon: "⚙️",
      color: "#ef4444",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت، تست و انتشار نرم‌افزار به شکل حرفه‌ای.",
      learn: [
        "CI/CD",
        "Containers",
        "Automation",
        "Monitoring",
        "Deployment",
        "Projects"
      ]
    },


    {
      id: "cloud",
      name: "Cloud",
      icon: "☁️",
      color: "#38bdf8",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مبانی و کاربردهای Cloud Computing.",
      learn: [
        "Cloud Concepts",
        "Servers",
        "Storage",
        "Networking",
        "Deployment",
        "Security"
      ]
    },


    {
      id: "ai",
      name: "Artificial Intelligence",
      icon: "🤖",
      color: "#a855f7",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت سیستم‌های هوشمند و آشنایی با دنیای AI.",
      learn: [
        "AI Fundamentals",
        "Models",
        "Datasets",
        "Training",
        "Evaluation",
        "AI Applications",
        "Projects"
      ]
    },


    {
      id: "machine-learning",
      name: "Machine Learning",
      icon: "🧠",
      color: "#8b5cf6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "یادگیری ماشین از مفاهیم پایه تا ساخت مدل.",
      learn: [
        "Data",
        "Features",
        "Training",
        "Classification",
        "Regression",
        "Evaluation",
        "Projects"
      ]
    },


    {
      id: "data-science",
      name: "Data Science",
      icon: "📊",
      color: "#06b6d4",
      status: "active",
      lessonsTarget: 1000,
      description:
        "تحلیل داده و ساخت سیستم‌های داده‌محور.",
      learn: [
        "Python Data",
        "Pandas",
        "Visualization",
        "Statistics",
        "Machine Learning",
        "Projects"
      ]
    },


    {
      id: "ai-agents",
      name: "AI Agents",
      icon: "🕹️",
      color: "#ec4899",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت Agentهای هوشمند و سیستم‌های چندمرحله‌ای.",
      learn: [
        "Agents",
        "Tools",
        "Memory",
        "Planning",
        "Workflows",
        "Evaluation"
      ]
    },


    {
      id: "chatbot",
      name: "Chatbot Development",
      icon: "💬",
      color: "#22c55e",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت چت‌بات‌های کاربردی و هوشمند.",
      learn: [
        "Conversation Design",
        "Rules",
        "NLP",
        "AI Models",
        "Memory",
        "APIs",
        "Projects"
      ]
    },


    {
      id: "automation",
      name: "Automation",
      icon: "⚡",
      color: "#f97316",
      status: "active",
      lessonsTarget: 1000,
      description:
        "خودکارسازی کارهای تکراری با برنامه‌نویسی.",
      learn: [
        "Automation Basics",
        "Scripts",
        "Files",
        "Web Automation",
        "APIs",
        "Bots",
        "Projects"
      ]
    },


    {
      id: "game-development",
      name: "Game Development",
      icon: "🎮",
      color: "#8b5cf6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت بازی از ایده تا محصول قابل اجرا.",
      learn: [
        "Game Design",
        "Gameplay",
        "Physics",
        "UI",
        "Audio",
        "Optimization",
        "Projects"
      ]
    },


    {
      id: "unity",
      name: "Unity",
      icon: "🎲",
      color: "#ffffff",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت بازی و تجربه‌های تعاملی با Unity.",
      learn: [
        "Unity Basics",
        "Scenes",
        "GameObjects",
        "C#",
        "Physics",
        "UI",
        "Publishing"
      ]
    },


    {
      id: "unreal",
      name: "Unreal Engine",
      icon: "🌌",
      color: "#333333",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت بازی‌ها و تجربه‌های سه‌بعدی.",
      learn: [
        "Unreal Basics",
        "Blueprint",
        "C++",
        "Materials",
        "Physics",
        "World Building"
      ]
    },


    {
      id: "android",
      name: "Android Development",
      icon: "📱",
      color: "#3ddc84",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت اپلیکیشن Android.",
      learn: [
        "Android Basics",
        "UI",
        "Navigation",
        "Storage",
        "API",
        "Authentication",
        "Publishing"
      ]
    },


    {
      id: "ios",
      name: "iOS Development",
      icon: "🍎",
      color: "#a3a3a3",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت اپلیکیشن برای iPhone و iPad.",
      learn: [
        "Swift",
        "SwiftUI",
        "Navigation",
        "Data",
        "API",
        "Testing",
        "Publishing"
      ]
    },


    {
      id: "uiux",
      name: "UI/UX",
      icon: "🎨",
      color: "#ec4899",
      status: "active",
      lessonsTarget: 1000,
      description:
        "طراحی تجربه و رابط کاربری حرفه‌ای.",
      learn: [
        "Design Principles",
        "UX",
        "UI",
        "Wireframes",
        "Prototypes",
        "Design Systems"
      ]
    },


    {
      id: "figma",
      name: "Figma",
      icon: "🖌️",
      color: "#f24e1e",
      status: "active",
      lessonsTarget: 1000,
      description:
        "طراحی رابط و نمونه اولیه با Figma.",
      learn: [
        "Tools",
        "Components",
        "Auto Layout",
        "Prototype",
        "Design System",
        "Projects"
      ]
    },


    {
      id: "algorithms",
      name: "Algorithms",
      icon: "🧮",
      color: "#14b8a6",
      status: "active",
      lessonsTarget: 1000,
      description:
        "حل مسئله و الگوریتم‌های برنامه‌نویسی.",
      learn: [
        "Problem Solving",
        "Searching",
        "Sorting",
        "Graphs",
        "Optimization",
        "Challenges"
      ]
    },


    {
      id: "data-structures",
      name: "Data Structures",
      icon: "🧩",
      color: "#6366f1",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساختارهای داده برای برنامه‌نویسی حرفه‌ای.",
      learn: [
        "Arrays",
        "Stacks",
        "Queues",
        "Trees",
        "Graphs",
        "Hash Tables"
      ]
    },


    {
      id: "testing",
      name: "Software Testing",
      icon: "🧪",
      color: "#22c55e",
      status: "active",
      lessonsTarget: 1000,
      description:
        "تست و بررسی کیفیت نرم‌افزار.",
      learn: [
        "Testing Basics",
        "Unit Tests",
        "Integration",
        "Automation",
        "Debugging",
        "Quality"
      ]
    },


    {
      id: "architecture",
      name: "Software Architecture",
      icon: "🏗️",
      color: "#64748b",
      status: "active",
      lessonsTarget: 1000,
      description:
        "طراحی ساختار پروژه‌های نرم‌افزاری بزرگ.",
      learn: [
        "Architecture",
        "Patterns",
        "Modularity",
        "Scalability",
        "Security",
        "Maintainability"
      ]
    },


    {
      id: "cybersecurity",
      name: "Cybersecurity",
      icon: "🔐",
      color: "#ef4444",
      status: "active",
      lessonsTarget: 1000,
      description:
        "یادگیری امنیت سایبری با تمرکز بر دفاع و آزمایش قانونی.",
      learn: [
        "Security Basics",
        "Threats",
        "Web Security",
        "Network Security",
        "Secure Coding",
        "Defensive Labs"
      ]
    },


    {
      id: "ethical-hacking",
      name: "Ethical Hacking",
      icon: "🛡️",
      color: "#dc2626",
      status: "active",
      lessonsTarget: 1000,
      description:
        "آشنایی با تست امنیتی در محیط‌های مجاز و آزمایشگاهی.",
      learn: [
        "Security Concepts",
        "Reconnaissance",
        "Web Security",
        "Network Security",
        "Labs",
        "Reporting"
      ]
    },


    {
      id: "cryptography",
      name: "Cryptography",
      icon: "🔑",
      color: "#f59e0b",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مبانی رمزنگاری و حفاظت از اطلاعات.",
      learn: [
        "Encryption",
        "Hashing",
        "Keys",
        "Digital Signatures",
        "Protocols",
        "Security Concepts"
      ]
    },


    {
      id: "digital-forensics",
      name: "Digital Forensics",
      icon: "🕵️",
      color: "#475569",
      status: "active",
      lessonsTarget: 1000,
      description:
        "مبانی بررسی و تحلیل شواهد دیجیتال در محیط‌های قانونی.",
      learn: [
        "Forensics Basics",
        "Evidence",
        "File Analysis",
        "Logs",
        "Incident Response",
        "Reporting"
      ]
    },


    {
      id: "robotics",
      name: "Robotics",
      icon: "🤖",
      color: "#06b6d4",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ترکیب برنامه‌نویسی، الکترونیک و رباتیک.",
      learn: [
        "Robotics Basics",
        "Sensors",
        "Motors",
        "Control",
        "Programming",
        "Projects"
      ]
    },


    {
      id: "iot",
      name: "IoT",
      icon: "📡",
      color: "#0ea5e9",
      status: "active",
      lessonsTarget: 1000,
      description:
        "ساخت سیستم‌های متصل و هوشمند.",
      learn: [
        "IoT Basics",
        "Sensors",
        "Devices",
        "Networking",
        "Cloud",
        "Projects"
      ]
    }

  ],


  /* =======================================================
     COMING SOON
     ======================================================= */

  comingSoon: [

    "Advanced AI Systems",
    "Computer Vision",
    "Natural Language Processing",
    "Large Language Models",
    "AI Training",
    "Embedded Systems",
    "AR Development",
    "VR Development",
    "Blockchain Development",
    "Smart Contracts",
    "Web3",
    "Game AI",
    "Computer Graphics",
    "Operating Systems",
    "Compiler Development",
    "Distributed Systems",
    "Quantum Computing",
    "Microcontrollers",
    "Electronics Programming",
    "Advanced Networking"
  ]

};


/* =========================================================
   HELPER FUNCTIONS
   ========================================================= */

function getDomainById(id) {
  return ELIS_DATA.domains.find(domain => domain.id === id);
}

function getActiveDomains() {
  return ELIS_DATA.domains.filter(
    domain => domain.status === "active"
  );
}

function getDomainCount() {
  return ELIS_DATA.domains.length;
}

function getTotalLessonTarget() {
  return ELIS_DATA.domains.reduce(
    (total, domain) => total + domain.lessonsTarget,
    0
  );
        }
