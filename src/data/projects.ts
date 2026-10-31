import type { ImageAsset, Project } from "@/types/content";

/**
 * TODO: Replace with real case studies, screenshots and links.
 *
 * Every surface that shows projects (Home preview, /work, /work/[slug])
 * reads from this array through the selectors in `src/lib/content/projects.ts`.
 * Do not create a second projects dataset anywhere.
 *
 * `liveUrl` / `githubUrl` are deliberately left unset on every project below —
 * there is no real deployed URL or public repo yet, and a placeholder link
 * would be a dead or misleading action. `ProjectLinks` (rendered from
 * `ProjectOverview`'s facts card) already omits its "Links" row entirely when
 * both are absent; add the real URLs here once they exist and it appears
 * automatically.
 * The same applies to `gallery`: left unset so `ProjectGallery` omits its
 * section rather than repeating the single cover placeholder three times.
 */

/** Shared placeholder cover until real screenshots are added. */
const placeholderCover = (alt: { en: string; ar: string }): ImageAsset => ({
  src: "/images/projects/placeholder-cover.svg",
  width: 1600,
  height: 1200, // 4:3, the project-cover aspect ratio for the whole site.
  alt,
});

export const projects: Project[] = [
  {
    id: "project-commerce",
    slug: "commerce-storefront",
    featured: true,
    date: "2025-06-01",
    // Set to e.g. '/images/projects/commerce-storefront.jpg' to use a real screenshot.
    image: "/Work/ashion.png",
    title: {
      en: "Commerce Storefront",
      ar: "واجهة متجر إلكتروني",
    },
    category: {
      en: "Fashion E-commerce",
      ar: "تجارة إلكترونية للأزياء",
    },
    summary: {
      en: "A fashion storefront with a shopping cart and an admin dashboard, built as a React.js application.",
      ar: "واجهة متجر أزياء مع سلة شراء ولوحة تحكم إدارية، مبنية بتقنية React.js.",
    },
    description: {
      en: "A React.js front-end project for a fashion store: a product catalogue organized by category, a shopping cart with discount codes and live totals, and admin dashboard screens with revenue, order, and traffic indicators. The work covers the storefront, the cart, and the dashboard screens.",
      ar: "مشروع واجهة أمامية بـ React.js لمتجر أزياء: كتالوج منتجات مقسّم حسب الفئات، وسلة شراء تدعم أكواد الخصم والمجاميع الفورية، وشاشات لوحة تحكم إدارية تعرض مؤشرات للإيرادات والطلبات والزيارات. يشمل العمل واجهة المتجر والسلة وشاشات لوحة التحكم.",
    },
    technologies: [
      "React",
      "TypeScript",
      "React Router",
      "Tailwind CSS",
      "REST APIs",
    ],
    coverImage: placeholderCover({
      en: "Commerce storefront project cover",
      ar: "غلاف مشروع واجهة المتجر الإلكتروني",
    }),
    challenge: {
      en: "The goal was one codebase that could carry a public storefront, a cart that is clear to the customer, and a back-office view that non-technical staff can read at a glance, without splitting into separate applications.",
      ar: "كان الهدف قاعدة كود واحدة تجمع واجهة متجر عامة، وسلة شراء واضحة للزبون، وواجهة إدارية يسهل على غير التقنيين قراءتها، دون تقسيم المشروع إلى تطبيقات منفصلة.",
    },
    solution: {
      en: "Built as a single React.js application. React Router moves between the storefront, cart, and admin views without reloading the page, and a shared cart keeps item counts and totals in sync wherever they appear. The dashboard screens use the same product and order data structures as the storefront.",
      ar: "بُني المشروع كتطبيق React.js واحد. ينقل React Router بين واجهة المتجر والسلة ولوحة التحكم دون إعادة تحميل الصفحة، وتحافظ سلة مشتركة على تزامن الكميات والمجاميع أينما ظهرت. وتستخدم شاشات لوحة التحكم بنية بيانات المنتجات والطلبات نفسها المستخدمة في المتجر.",
    },
    responsibilities: [
      {
        en: "Front-end architecture and client-side routing",
        ar: "بنية الواجهة الأمامية والتنقّل من جهة العميل",
      },
      {
        en: "Component system spanning storefront, cart and dashboard",
        ar: "نظام مكوّنات يمتد عبر المتجر والسلة ولوحة التحكم",
      },
      {
        en: "Cart state management",
        ar: "إدارة حالة سلة الشراء",
      },
    ],
    technicalDecisions: [
      {
        en: "Cart data is managed in one place to keep quantities and totals consistent across all views.",
        ar: "تُدار بيانات السلة من مكان واحد، لتبقى الكميات والإجماليات متسقة في جميع الواجهات.",
      },
      {
        en: "React Router keeps the storefront, cart, and dashboard in one application and switches between them without reloading the page.",
        ar: "يجمع React Router المتجر والسلة ولوحة التحكم في تطبيق واحد، وينقل بينها دون إعادة تحميل الصفحة.",
      },
      {
        en: "The dashboard cards and charts read from the same product and order data structures as the storefront.",
        ar: "تقرأ بطاقات لوحة التحكم ورسومها البيانية من بنية بيانات المنتجات والطلبات نفسها المستخدمة في المتجر.",
      },
    ],
    features: [
      {
        id: "catalogue",
        title: {
          en: "Category-driven catalogue",
          ar: "كتالوج مبني على الفئات",
        },
        description: {
          en: "Landing sections for women's, men's and cosmetics lead into a filterable \"new product\" grid.",
          ar: "أقسام رئيسية لأزياء النساء والرجال ومستحضرات التجميل تقود إلى شبكة منتجات جديدة قابلة للتصفية.",
        },
      },
      {
        id: "cart",
        title: {
          en: "Persistent cart with discounts",
          ar: "سلة شراء دائمة مع أكواد خصم",
        },
        description: {
          en: "Quantity steppers, a discount code field and live subtotal/total update as items change.",
          ar: "عدّادات كمية وحقل كود خصم ومجاميع فرعية وإجمالية تتحدّث فور تغيّر العناصر.",
        },
      },
      {
        id: "dashboard",
        title: {
          en: "Admin dashboard screens",
          ar: "شاشات لوحة تحكم إدارية",
        },
        description: {
          en: "Indicators for revenue, orders, and traffic, with charts for weekly trends and product distribution.",
          ar: "مؤشرات للإيرادات والطلبات والزيارات، مع رسوم بيانية لاتجاهات الأسبوع وتوزيع المنتجات.",
        },
      },
    ],
    results: [
      {
        en: "One component system serving both the customer storefront and the admin dashboard",
        ar: "نظام مكوّنات واحد يخدم واجهة المتجر ولوحة التحكم الإدارية معًا",
      },
      {
        en: "Cart state stays consistent across every view without prop drilling",
        ar: "حالة السلة تبقى متّسقة عبر كل الواجهات دون تمرير خصائص متكرر بين المكوّنات",
      },
    ],
  },

  {
    id: "project-smartspend",
    slug: "smartspend",
    featured: true,
    date: "2026-09-18",
    // Set to e.g. '/Work/smartspend.png' once a screenshot is ready.
    image: "/Work/SmartSpend.png",
    title: {
      en: "SmartSpend",
      ar: "SmartSpend",
    },
    category: {
      en: "Personal Finance",
      ar: "إدارة مالية شخصية",
    },
    summary: {
      en: "A bilingual dashboard for recording income and expenses and reviewing transactions and balances in one place.",
      ar: "لوحة تحكم بالعربية والإنجليزية لتسجيل الدخل والمصروفات ومتابعة المعاملات والرصيد من مكان واحد.",
    },
    description: {
      en: "An application for recording income and expenses and reviewing transactions and balances, with Arabic and English support.",
      ar: "تطبيق يساعد المستخدم على تسجيل الدخل والمصروفات ومراجعة المعاملات والرصيد، مع دعم العربية والإنجليزية.",
    },
    technologies: [
      "React",
      "Vite",
      "JavaScript",
      "React Router",
      "Axios",
      "Laravel",
      "MySQL",
    ],
    coverImage: placeholderCover({
      en: "SmartSpend project cover",
      ar: "غلاف مشروع SmartSpend",
    }),
    challenge: {
      en: "People lose track of where their money goes when income and expenses live in scattered notes or spreadsheets, with no single, bilingual view of their financial status.",
      ar: "يفقد الأشخاص تتبّع وجهة أموالهم عندما يتوزّع الدخل والمصروفات بين ملاحظات متفرقة وجداول بيانات، دون رؤية واحدة وواضحة ثنائية اللغة لوضعهم المالي.",
    },
    solution: {
      en: "A React interface connects to a Laravel REST API. A multi-page dashboard summarizes income, expenses, and balance, and transactions can be filtered by type, date, or status. The interface supports Arabic and English with right-to-left and left-to-right layouts, and light and dark themes.",
      ar: "تتصل واجهة React بـ REST API مبني بـ Laravel. تلخّص لوحة تحكم متعددة الصفحات الدخل والمصروفات والرصيد، ويمكن تصفية المعاملات حسب النوع أو التاريخ أو الحالة. وتدعم الواجهة العربية والإنجليزية بتخطيطي اليمين لليسار واليسار لليمين، والوضعين الفاتح والداكن.",
    },
    responsibilities: [
      {
        en: "Front-end architecture and routing",
        ar: "بنية الواجهة الأمامية والتنقّل",
      },
      {
        en: "Connecting the interface to the REST API",
        ar: "ربط الواجهة بـ REST API",
      },
      {
        en: "Front-end screens for sign-in, email verification, and password reset",
        ar: "شاشات الواجهة لتسجيل الدخول والتحقق من البريد الإلكتروني وإعادة تعيين كلمة المرور",
      },
      {
        en: "Bilingual and theme support (Arabic/English, RTL/LTR, light/dark)",
        ar: "دعم ثنائي اللغة والسمات (عربي/إنجليزي، RTL/LTR، فاتح/داكن)",
      },
    ],
    technicalDecisions: [
      {
        en: "Axios centralizes API calls to the Laravel back end, with interceptors handling authentication tokens and error responses in one place.",
        ar: "يجمع Axios طلبات API نحو خلفية Laravel في مكان واحد، مع معالجات تتعامل مع رموز المصادقة واستجابات الأخطاء.",
      },
      {
        en: "React Router drives the multi-page dashboard, so transactions, summaries, and account settings each get their own route instead of one large screen.",
        ar: "يقود React Router لوحة التحكم متعددة الصفحات، فتحصل المعاملات والملخصات وإعدادات الحساب كل منها على مسار خاص بدل شاشة واحدة ضخمة.",
      },
      {
        en: "The forms validate input in the interface and show a clear reason when something is rejected.",
        ar: "تتحقق النماذج من المدخلات في الواجهة وتعرض سببًا واضحًا عند رفض أي بيانات.",
      },
    ],
    features: [
      {
        id: "dashboard",
        title: {
          en: "Financial summary dashboard",
          ar: "لوحة تحكم للملخص المالي",
        },
        description: {
          en: "A multi-page dashboard surfaces income, expenses and balance at a glance.",
          ar: "لوحة تحكم متعددة الصفحات تعرض الدخل والمصروفات والرصيد بنظرة واحدة.",
        },
      },
      {
        id: "transactions",
        title: {
          en: "Filterable transactions",
          ar: "معاملات قابلة للتصفية",
        },
        description: {
          en: "Transactions can be filtered by type, date or status to find any entry quickly.",
          ar: "يمكن تصفية المعاملات حسب النوع أو التاريخ أو الحالة للعثور على أي قيد بسرعة.",
        },
      },
      {
        id: "accounts",
        title: {
          en: "Account screens",
          ar: "شاشات إدارة الحساب",
        },
        description: {
          en: "Interface screens for sign-in (including Google), email verification, and password reset.",
          ar: "شاشات في الواجهة لتسجيل الدخول (بما في ذلك عبر Google) والتحقق من البريد الإلكتروني وإعادة تعيين كلمة المرور.",
        },
      },
      {
        id: "localization",
        title: {
          en: "Full bilingual support",
          ar: "دعم ثنائي اللغة كامل",
        },
        description: {
          en: "Arabic and English with automatic RTL/LTR layouts, plus light and dark themes.",
          ar: "العربية والإنجليزية مع تخطيطات RTL/LTR تلقائية، إضافة إلى السمتين الفاتحة والداكنة.",
        },
      },
    ],
    results: [
      {
        en: "A single dashboard for income, expenses, and account settings",
        ar: "لوحة تحكم واحدة للدخل والمصروفات وإعدادات الحساب",
      },
      {
        en: "Consistent bilingual experience across every screen",
        ar: "تجربة ثنائية اللغة متّسقة في كل شاشة",
      },
    ],
  },
  {
    id: "project-nervu",
    slug: "nervu-ai",
    featured: true,
    date: "2026-09-19",
    image: "/Work/Nervu.png",
    title: {
      en: "Nervu.AI",
      ar: "Nervu.AI",
    },
    category: {
      en: "AI Interview Platform",
      ar: "منصة مقابلات بالذكاء الاصطناعي",
    },
    summary: {
      en: "A platform for practicing voice-based job interviews and receiving structured AI feedback, with tools for managing company interviews.",
      ar: "منصة للتدرب على مقابلات العمل بالصوت، والحصول على تقييم منظّم بالذكاء الاصطناعي، مع أدوات لإدارة مقابلات الشركات.",
    },
    description: {
      en: "A graduation project from the Islamic University of Gaza: a platform where candidates practice voice-based job interviews and receive a structured evaluation of their answers.\n\nThe platform also includes tools for companies to create interview campaigns, import candidates, and review results, along with monitoring of interview behavior during the session.",
      ar: "مشروع تخرج من الجامعة الإسلامية بغزة: منصة يتدرب فيها المتقدمون على مقابلات العمل بالصوت ويحصلون على تقييم منظّم لإجاباتهم.\n\nوتتضمن المنصة أدوات للشركات لإنشاء حملات المقابلات واستيراد المرشحين ومراجعة النتائج، إضافة إلى مراقبة سلوك المقابلة أثناء الجلسة.",
    },
    technologies: [
      "React",
      "Vite",
      "Laravel",
      "Laravel Sanctum",
      "Laravel Reverb",
      "MySQL",
      "Python",
      "Flask",
      "Whisper",
      "MediaPipe",
    ],
    coverImage: placeholderCover({
      en: "Nervu.AI project cover",
      ar: "غلاف مشروع Nervu.AI",
    }),
    challenge: {
      en: "Job candidates need opportunities to practice their answers and receive clear feedback before a real interview. The project also aims to help companies organize initial interviews and review their results in one place.",
      ar: "يحتاج المتقدمون للوظائف إلى فرصة للتدرب على الإجابة وتلقي ملاحظات واضحة قبل المقابلة الفعلية. ويهدف المشروع أيضًا إلى مساعدة الشركات على تنظيم المقابلات الأولية ومراجعة نتائجها من مكان واحد.",
    },
    solution: {
      en: "A system built in three parts: a React + Vite front end with Arabic and English support, a Laravel API with a MySQL database, and a Python/Flask service that handles audio and speech-to-text with Whisper. Candidates answer Technical, Behavioral, and HR questions by voice and receive a score from 0 to 10 for each answer. Companies create jobs and interview campaigns, import candidates from Excel, send invitations by email, and review results in a dedicated dashboard.",
      ar: "نظام مبني من ثلاثة أجزاء: واجهة أمامية بـ React وVite تدعم العربية والإنجليزية، وAPI مبني بـ Laravel مع قاعدة بيانات MySQL، وخدمة بـ Python وFlask تتولّى معالجة الصوت وتحويله إلى نص عبر Whisper. يجيب المرشحون بصوتهم عن أسئلة تقنية وسلوكية وأسئلة موارد بشرية، ويحصلون على درجة من 0 إلى 10 لكل إجابة. وتنشئ الشركات وظائف وحملات مقابلات، وتستورد المرشحين من ملفات إكسل، وترسل الدعوات عبر البريد الإلكتروني، وتراجع النتائج من لوحة تحكم مخصّصة.",
    },
    plannedWork: {
      en: "The next step is real-time voice conversation, where the AI interviewer responds instantly and can be interrupted mid-sentence, bringing the experience closer to a natural interview. This is not part of the current version.",
      ar: "الخطوة التالية هي محادثة صوتية لحظية، يستجيب فيها المحاور الذكي فورًا ويمكن مقاطعته أثناء حديثه، لتقترب التجربة من مقابلة طبيعية. هذه الميزة غير متاحة في النسخة الحالية.",
    },
    responsibilities: [
      {
        en: "React + Vite front end with Arabic/English and RTL/LTR support",
        ar: "واجهة أمامية بـ React وVite تدعم العربية والإنجليزية والاتجاهين RTL وLTR",
      },
    ],
    technicalDecisions: [
      {
        en: "Voice answers are transcribed to text with Whisper before they are evaluated, so every answer goes through the same evaluation steps.",
        ar: "تُحوَّل الإجابات الصوتية إلى نص عبر Whisper قبل تقييمها، فتمر كل إجابة بخطوات التقييم نفسها.",
      },
      {
        en: "Laravel Reverb delivers live updates during the interview flow, so the front end does not need to keep polling the API.",
        ar: "يوفّر Laravel Reverb تحديثات لحظية أثناء المقابلة، فلا تحتاج الواجهة إلى استطلاع API بشكل متكرر.",
      },
      {
        en: "Interview monitoring combines browser-level signals (tab switches, fullscreen exits, copy restrictions) with camera-based checks that use MediaPipe. Flagged behavior feeds into the same evaluation as the answer scores instead of staying in a separate report.",
        ar: "تجمع مراقبة سلوك المقابلة بين إشارات المتصفح (تبديل التبويبات، الخروج من وضع ملء الشاشة، تقييد النسخ) وفحوصات تعتمد على الكاميرا باستخدام MediaPipe. ويدخل السلوك المرصود ضمن التقييم نفسه الذي تمر به درجات الإجابات، بدل أن يبقى في تقرير منفصل.",
      },
    ],
    features: [
      {
        id: "voice-interviews",
        title: {
          en: "Voice-based interview simulation",
          ar: "محاكاة مقابلة بالصوت",
        },
        description: {
          en: "Candidates answer Technical, Behavioral and HR questions out loud, in an experience built to resemble a real interview.",
          ar: "يجيب المرشحون بصوتهم عن أسئلة تقنية وسلوكية وأسئلة موارد بشرية، في تجربة مصمّمة لتقارب المقابلة الحقيقية.",
        },
      },
      {
        id: "evaluation",
        title: {
          en: "Structured AI evaluation",
          ar: "تقييم منظّم بالذكاء الاصطناعي",
        },
        description: {
          en: "Every answer receives a score from 0 to 10, based on criteria that include clarity, relevance, depth, and confidence. Silent answers are handled separately.",
          ar: "تحصل كل إجابة على درجة من 0 إلى 10 وفق معايير تشمل الوضوح والملاءمة والعمق والثقة، مع معالجة خاصة للإجابات الصامتة.",
        },
      },
      {
        id: "proctoring",
        title: {
          en: "Interview monitoring",
          ar: "مراقبة سلوك المقابلة",
        },
        description: {
          en: "Tab switches, fullscreen exits, and copy attempts are detected in the browser, and camera-based checks use MediaPipe. Flagged behavior can apply a penalty to the result.",
          ar: "يُرصد تبديل التبويبات والخروج من وضع ملء الشاشة ومحاولات النسخ في المتصفح، وتُستخدم فحوصات تعتمد على الكاميرا عبر MediaPipe. ويمكن أن يؤدي السلوك المرصود إلى خصم من النتيجة.",
        },
      },
      {
        id: "company-tools",
        title: {
          en: "Company hiring campaigns",
          ar: "حملات توظيف للشركات",
        },
        description: {
          en: "Companies create jobs and interview campaigns, import candidates from Excel, send invitations by email and review results from a dashboard.",
          ar: "تنشئ الشركات وظائف وحملات مقابلات، وتستورد بيانات المرشحين من إكسل، وترسل الدعوات عبر البريد الإلكتروني، وتراجع النتائج من لوحة تحكم.",
        },
      },
    ],
    results: [
      {
        en: "A complete voice-interview flow, from question to transcription to AI evaluation, running across three connected services",
        ar: "مسار مقابلة صوتية كامل، من السؤال إلى التفريغ النصي إلى التقييم بالذكاء الاصطناعي، يعمل عبر ثلاث خدمات مترابطة",
      },
      {
        en: "Interview monitoring signals that are included in the candidate's evaluation",
        ar: "إشارات مراقبة سلوك المقابلة تدخل ضمن تقييم المرشح",
      },
      {
        en: "Company-side tools for campaigns, Excel import, email invitations, and a results dashboard, alongside the candidate experience",
        ar: "أدوات للشركات للحملات والاستيراد من إكسل ودعوات البريد الإلكتروني ولوحة نتائج، إلى جانب تجربة المرشح",
      },
    ],
  },
  {
    id: "project-nesto",
    slug: "nesto-burgers",
    featured: true,
    date: "2026-07-10",
    image: "/Work/nesto.png",
    title: {
      en: "Nesto Burgers",
      ar: "Nesto Burgers",
    },
    category: {
      en: "Restaurant Website",
      ar: "موقع مطعم",
    },
    summary: {
      en: "A bilingual restaurant website for browsing the menu, preparing an order, and sending it through WhatsApp.",
      ar: "موقع مطعم بالعربية والإنجليزية لتصفح القائمة وتجهيز الطلب وإرساله عبر واتساب.",
    },
    description: {
      en: "Customers browse the menu, add items to the cart, and send the prepared order to the restaurant through WhatsApp.\n\nA website for Nesto Burgers, a smash burger restaurant in Nablus, with a menu organized by category, special offers, a photo gallery, and customer reviews. The site is available in Arabic and English, with automatic right-to-left and left-to-right layouts.",
      ar: "يتصفح العميل قائمة الطعام، ويضيف الأصناف إلى السلة، ثم يرسل الطلب المجهّز إلى المطعم عبر واتساب.\n\nموقع لمطعم Nesto Burgers، مطعم سماش برغر في نابلس، يضم قائمة طعام مقسّمة حسب الفئات وعروضًا خاصة ومعرض صور وآراء الزبائن. ويتوفر الموقع بالعربية والإنجليزية مع تبديل تلقائي للاتجاه بين اليمين لليسار واليسار لليمين.",
    },
    technologies: [
      "React",
      "JavaScript",
      "CSS3",
      "Responsive Design",
      "Netlify",
    ],
    coverImage: placeholderCover({
      en: "Nesto Burgers project cover",
      ar: "غلاف مشروع Nesto Burgers",
    }),
    liveUrl: "https://amazing-palmier-108122.netlify.app",
    githubUrl: "https://github.com/Abdullah-m-sh100/Nesto-Burgers",
    challenge: {
      en: "A local smash burger restaurant needed a real online presence — a menu customers could actually browse and order from in either Arabic or English, not a single static page — without the overhead of a full ordering backend.",
      ar: "احتاج مطعم برغر محلي إلى حضور فعلي على الإنترنت — قائمة طعام يمكن للزبائن تصفّحها والطلب منها فعليًا بالعربية أو الإنجليزية، لا مجرّد صفحة ثابتة واحدة — دون الحاجة إلى عبء بناء نظام طلبات خلفي كامل.",
    },
    solution: {
      en: "Built as a React.js single-page site. The menu, offers, gallery, and reviews are organized into clear sections. Customers browse the menu, add items to the cart, and send the prepared order to the restaurant through WhatsApp, so no payment or order-management back end is needed. The content runs in Arabic and English with automatic right-to-left and left-to-right layouts, and the site is deployed on Netlify.",
      ar: "بُني الموقع كصفحة واحدة (SPA) بتقنية React.js. تُنظَّم القائمة والعروض والمعرض والآراء في أقسام واضحة. يتصفح العميل القائمة ويضيف الأصناف إلى السلة، ثم يرسل الطلب المجهّز إلى المطعم عبر واتساب، فلا حاجة إلى نظام دفع أو نظام خلفي لإدارة الطلبات. ويعمل المحتوى بالعربية والإنجليزية مع تبديل تلقائي لاتجاه الصفحة، ويُنشر الموقع عبر Netlify.",
    },
    responsibilities: [
      {
        en: "End-to-end front-end build in React.js",
        ar: "بناء الواجهة الأمامية بالكامل بتقنية React.js",
      },
      {
        en: "Bilingual content and automatic RTL/LTR layout switching",
        ar: "محتوى ثنائي اللغة وتبديل تلقائي للاتجاه بين RTL و LTR",
      },
      {
        en: "Shopping cart and category-filtered menu",
        ar: "سلة الشراء وقائمة الطعام القابلة للتصفية حسب الفئة",
      },
      {
        en: "WhatsApp ordering integration",
        ar: "دمج الطلب المباشر عبر واتساب",
      },
      {
        en: "Responsive layout and Netlify deployment",
        ar: "تخطيط متجاوب ونشر الموقع عبر Netlify",
      },
    ],
    technicalDecisions: [
      {
        en: "The cart is client-side state only, with no order back end, so the prepared order is handed to WhatsApp instead of a payment flow.",
        ar: "تعتمد السلة على حالة جهة العميل فقط دون نظام طلبات خلفي، لذا يُسلَّم الطلب المجهّز إلى واتساب بدل تدفّق دفع إلكتروني.",
      },
      {
        en: "Menu items are filtered by category in the browser, so browsing burgers, sides, and drinks feels instant, with no round trip for every filter change.",
        ar: "تُصفَّى عناصر القائمة حسب الفئة في المتصفح، فيبدو تصفّح البرغر والمقبّلات والمشروبات فوريًا دون طلب جديد عند كل تغيير للتصفية.",
      },
      {
        en: "Direction-aware styling runs the same component tree in both languages, so Arabic and English never split into separate layouts to maintain.",
        ar: "يعتمد التنسيق الحسّاس للاتجاه على شجرة المكوّنات نفسها في كلتا اللغتين، فلا تتفرّع العربية والإنجليزية إلى تخطيطين منفصلين يتطلّبان الصيانة.",
      },
    ],
    features: [
      {
        id: "menu",
        title: {
          en: "Category-filtered menu",
          ar: "قائمة طعام قابلة للتصفية حسب الفئة",
        },
        description: {
          en: "Burgers, sides, drinks and special meals are browsable by category, each with a description and price.",
          ar: "يمكن تصفّح البرغر والمقبّلات والمشروبات والوجبات الخاصة حسب الفئة، مع وصف وسعر لكل عنصر.",
        },
      },
      {
        id: "cart",
        title: {
          en: "Interactive shopping cart",
          ar: "سلة شراء تفاعلية",
        },
        description: {
          en: "Customers add menu items to the cart and send the prepared order to the restaurant through WhatsApp.",
          ar: "يضيف الزبائن أصناف القائمة إلى السلة، ثم يرسلون الطلب المجهّز إلى المطعم عبر واتساب.",
        },
      },
      {
        id: "bilingual",
        title: {
          en: "Full Arabic & English support",
          ar: "دعم كامل للعربية والإنجليزية",
        },
        description: {
          en: "Every section switches between RTL and LTR automatically, with no separate layout to maintain per language.",
          ar: "يتبدّل كل قسم تلقائيًا بين RTL و LTR، دون تخطيط منفصل يتطلّب الصيانة لكل لغة.",
        },
      },
      {
        id: "gallery-reviews",
        title: {
          en: "Gallery & customer reviews",
          ar: "معرض صور وآراء الزبائن",
        },
        description: {
          en: "A visual showcase of the restaurant and menu, alongside customer testimonials and ratings.",
          ar: "عرض بصري للمطعم وقائمة الطعام، إلى جانب آراء الزبائن وتقييماتهم.",
        },
      },
    ],
    results: [
      {
        en: "A bilingual restaurant website for browsing the menu, preparing an order, and sending it through WhatsApp.",
        ar: "واجهة مطعم تتيح تصفح القائمة وتجهيز الطلب وإرساله عبر واتساب، مع دعم العربية والإنجليزية.",
      },
      {
        en: "One React codebase serving both Arabic and English with no duplicated layouts",
        ar: "قاعدة كود React واحدة تخدم العربية والإنجليزية دون تكرار للتخطيطات",
      },
      {
        en: "A cart-to-WhatsApp ordering flow that needs no order back end",
        ar: "تدفّق طلب من السلة إلى واتساب لا يحتاج إلى نظام خلفي للطلبات",
      },
    ],
  },
];
