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
  height: 1000, // 16:10, the project-cover aspect ratio for the whole site.
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
      en: "A fashion storefront, cart and admin dashboard built as a single React.js application.",
      ar: "واجهة متجر أزياء وسلة شراء ولوحة تحكم إدارية، مبنية بالكامل كتطبيق React.js واحد.",
    },
    description: {
      en: "A fashion e-commerce experience built entirely in React: a browsable catalogue with category landing sections, a persistent cart with discount codes and live totals, and an admin dashboard for tracking revenue, orders and traffic — all sharing one component system and one client-side router.",
      ar: "تجربة تسوّق للأزياء مبنية بالكامل بـ React: كتالوج قابل للتصفح بأقسام رئيسية للفئات، وسلة شراء دائمة تدعم أكواد الخصم والمجاميع الفورية، ولوحة تحكم إدارية لمتابعة الإيرادات والطلبات والزيارات — جميعها تشترك في نظام مكوّنات واحد وموجّه تصفّح واحد من جهة العميل.",
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
      en: "The brand needed one codebase that could carry a public storefront, a cart people trust with their order, and a back-office view non-technical staff could read at a glance — without splitting into separate apps or reaching for a heavier framework than the project needed.",
      ar: "احتاجت العلامة التجارية إلى قاعدة كود واحدة تجمع بين واجهة متجر عامة، وسلة شراء يثق بها الزوّار، وواجهة إدارية يسهل على غير التقنيين قراءتها — دون تقسيم المشروع إلى تطبيقات منفصلة أو اللجوء إلى إطار عمل أثقل مما يحتاجه المشروع.",
    },
    solution: {
      en: "Built as a single React.js application: React Router switches between the storefront, cart and admin views without a page reload, a shared cart context keeps item counts and totals in sync wherever they appear, and the dashboard reuses the same typed product and order data to drive its stat cards and charts.",
      ar: "بُني المشروع كتطبيق React.js واحد: يتولى React Router التنقّل بين واجهة المتجر والسلة ولوحة التحكم دون إعادة تحميل الصفحة، بينما يحافظ سياق (Context) مشترك للسلة على تزامن الكميات والمجاميع أينما ظهرت، وتعتمد لوحة التحكم على نفس بيانات المنتجات والطلبات المحدّدة الأنواع لعرض بطاقاتها ورسومها البيانية.",
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
        en: "Cart items, quantities and totals live in a single React context, so the header mini-cart, the cart page and the order summary can never drift out of sync.",
        ar: "تعيش عناصر السلة وكمياتها ومجاميعها في سياق React واحد، فلا تنحرف سلة الرأس المصغّرة وصفحة السلة وملخص الطلب عن بعضها.",
      },
      {
        en: "React Router keeps the storefront, cart and admin dashboard in one client-rendered app, switching views without a full page reload.",
        ar: "يحافظ React Router على واجهة المتجر والسلة ولوحة التحكم داخل تطبيق واحد يُعرض من المتصفح، متنقّلًا بين الواجهات دون إعادة تحميل كاملة للصفحة.",
      },
      {
        en: "The admin dashboard's stat cards and charts read from the same typed product and order data as the storefront, rather than a separate mock dataset.",
        ar: "تقرأ بطاقات لوحة التحكم ورسومها البيانية من نفس بيانات المنتجات والطلبات المحدّدة الأنواع المستخدمة في المتجر، بدل الاعتماد على بيانات وهمية منفصلة.",
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
          en: "Admin dashboard",
          ar: "لوحة تحكم إدارية",
        },
        description: {
          en: "Revenue, active users, orders and page views sit alongside charts for weekly trends and product distribution.",
          ar: "الإيرادات والمستخدمون النشطون والطلبات وزيارات الصفحات إلى جانب رسوم بيانية لتوجّهات الأسبوع وتوزيع المنتجات.",
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
      en: "A bilingual dashboard for tracking income, expenses and financial activity.",
      ar: "لوحة تحكم ثنائية اللغة لتتبع الدخل والمصروفات والنشاط المالي.",
    },
    description: {
      en: "A personal finance platform where users sign in, log income and expenses, and review a filterable transaction history alongside a clear financial summary — with full Arabic/English support, RTL/LTR layouts and light/dark themes.",
      ar: "منصة مالية شخصية يسجّل فيها المستخدمون الدخول، ويرصدون دخلهم ومصروفاتهم، ويستعرضون سجل معاملات قابلاً للتصفية إلى جانب ملخّص مالي واضح — بدعم كامل للعربية والإنجليزية، وتخطيطي RTL وLTR، ووضعين فاتح وداكن.",
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
      en: "Built a React front end that talks to a Laravel REST API over Axios: a multi-page dashboard summarizes income, expenses and balance, transactions can be filtered by type, date or status, and Google Sign-In plus email verification and password reset round out account management — all wrapped in full Arabic/English, RTL/LTR and light/dark support.",
      ar: "بُنيت واجهة React تتواصل مع REST API مبني بـ Laravel عبر Axios: تلخّص لوحة تحكم متعددة الصفحات الدخل والمصروفات والرصيد، ويمكن تصفية المعاملات حسب النوع أو التاريخ أو الحالة، وتكتمل إدارة الحساب بتسجيل الدخول عبر Google والتحقق من البريد الإلكتروني وإعادة تعيين كلمة المرور — كل ذلك ضمن دعم كامل للعربية والإنجليزية، واتجاهي RTL وLTR، والوضعين الفاتح والداكن.",
    },
    responsibilities: [
      {
        en: "Front-end architecture and routing",
        ar: "بنية الواجهة الأمامية والتنقّل",
      },
      {
        en: "REST API integration",
        ar: "التكامل مع REST API",
      },
      {
        en: "Authentication and account flows (Google Sign-In, email verification, password reset)",
        ar: "تدفقات المصادقة وإدارة الحساب (تسجيل الدخول عبر Google، التحقق من البريد الإلكتروني، إعادة تعيين كلمة المرور)",
      },
      {
        en: "Bilingual and theme support (Arabic/English, RTL/LTR, light/dark)",
        ar: "دعم ثنائي اللغة والسمات (عربي/إنجليزي، RTL/LTR، فاتح/داكن)",
      },
    ],
    technicalDecisions: [
      {
        en: "Axios centralizes API calls to the Laravel backend, with interceptors handling authentication tokens and error responses in one place.",
        ar: "يتولى Axios مركزة طلبات API نحو خلفية Laravel، مع معالجات تعترض الرموز المميزة للمصادقة واستجابات الأخطاء في مكان واحد.",
      },
      {
        en: "React Router drives the multi-page dashboard, so transactions, summaries and account settings each get their own route instead of one monolithic view.",
        ar: "يقود React Router لوحة التحكم متعددة الصفحات، فتحصل المعاملات والملخصات وإعدادات الحساب كل منها على مسار خاص بدل شاشة واحدة ضخمة.",
      },
      {
        en: "Validation runs on both the Laravel API and the React forms, so a rejected transaction never reaches the database without a clear reason surfacing in the UI.",
        ar: "يعمل التحقق على مستوى Laravel API ونماذج React معًا، فلا تصل معاملة مرفوضة إلى قاعدة البيانات دون سبب واضح يظهر في الواجهة.",
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
          en: "Secure account management",
          ar: "إدارة حساب آمنة",
        },
        description: {
          en: "Google Sign-In, email verification and password reset cover the full account lifecycle.",
          ar: "يغطي تسجيل الدخول عبر Google والتحقق من البريد الإلكتروني وإعادة تعيين كلمة المرور دورة حياة الحساب كاملة.",
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
        en: "One dashboard covering income, expenses and account management end to end",
        ar: "لوحة تحكم واحدة تغطي الدخل والمصروفات وإدارة الحساب من البداية إلى النهاية",
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
      en: "An AI-powered platform for simulating and evaluating voice-based job interviews, with anti-cheating monitoring and company-side campaign management.",
      ar: "منصة تعمل بالذكاء الاصطناعي لمحاكاة وتقييم مقابلات العمل الصوتية، مع مراقبة لمنع الغش وإدارة حملات توظيف للشركات.",
    },
    description: {
      en: "A graduation project from the Islamic University of Gaza: an end-to-end job interview simulation and management platform, not just a question generator. Candidates answer Technical, Behavioral and HR questions by voice and receive a 0–10 evaluation across clarity, relevance, depth and confidence, while a proctoring layer monitors for tab switches, fullscreen exits and other suspicious behavior. Companies can create jobs and interview campaigns, import candidates from Excel, send invitations by email and review results from a dedicated dashboard. The next direction is real-time voice conversation, where the AI interviewer can respond instantly and be interrupted mid-sentence, moving the experience closer to a natural human interview.",
      ar: "مشروع تخرّج من الجامعة الإسلامية بغزة: منصة متكاملة لمحاكاة وإدارة مقابلات العمل من البداية إلى النهاية، وليست مجرّد مولّد أسئلة. يجيب المرشحون بصوتهم عن أسئلة تقنية وسلوكية وأسئلة موارد بشرية، ويحصلون على تقييم من 0 إلى 10 يغطي الوضوح والملاءمة والعمق والثقة، بينما تراقب طبقة لمنع الغش سلوكيات مثل تبديل التبويبات والخروج من وضع ملء الشاشة وغيرها من المؤشرات المريبة. كما تتيح المنصة للشركات إنشاء وظائف وحملات مقابلات، واستيراد بيانات المرشحين من ملفات إكسل، وإرسال دعوات عبر البريد الإلكتروني، ومراجعة النتائج من لوحة تحكم مخصّصة. والاتجاه القادم هو محادثة صوتية لحظية، يستجيب فيها المحاور الذكي فورًا ويمكن مقاطعته أثناء حديثه، لتقترب التجربة أكثر من مقابلة بشرية طبيعية.",
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
      en: "Traditional interview prep gives candidates little more than a list of sample questions, with no realistic practice and no structured feedback — and companies hiring at volume have no scalable way to run consistent, monitored interviews before a person ever gets involved.",
      ar: "لا يقدّم التحضير التقليدي للمقابلات للمرشحين أكثر من قائمة أسئلة نموذجية، دون تدريب واقعي أو تغذية راجعة منظّمة — بينما تفتقر الشركات التي توظّف بأعداد كبيرة إلى وسيلة قابلة للتوسّع لإجراء مقابلات متّسقة ومراقَبة قبل أن يتدخّل أي شخص بشريًا.",
    },
    solution: {
      en: "Built a three-layer system end to end: a React + Vite front end with full Arabic/English support, a Laravel API on MySQL with Sanctum authentication, and a Python/Flask service handling audio processing and Whisper speech-to-text, with Laravel Reverb driving real-time updates. Candidates answer Technical, Behavioral and HR questions by voice; the system scores each response from 0–10 across clarity, relevance, depth and confidence, handles edge cases like silent answers, and applies penalties when its MediaPipe-based proctoring — tab-switch detection, fullscreen monitoring and copy restrictions — flags suspicious behavior. On the company side, recruiters create jobs and interview campaigns, import candidates from Excel, send invitations by email, and review results from a dedicated dashboard, with identity verification before an interview begins.",
      ar: "بُني النظام على ثلاث طبقات متكاملة من الصفر: واجهة أمامية بـ React وVite تدعم العربية والإنجليزية بالكامل، وAPI مبني بـ Laravel فوق MySQL مع مصادقة عبر Sanctum، وخدمة بـ Python وFlask تتولّى معالجة الصوت وتحويله إلى نص عبر Whisper، مع اعتماد Laravel Reverb لتشغيل التحديثات اللحظية. يجيب المرشحون بصوتهم عن أسئلة تقنية وسلوكية وأسئلة موارد بشرية؛ ويقيّم النظام كل إجابة من 0 إلى 10 عبر معايير الوضوح والملاءمة والعمق والثقة، ويتعامل مع حالات خاصة كالإجابات الصامتة، ويطبّق عقوبات عندما ترصد طبقة المراقبة المعتمدة على MediaPipe — كشف تبديل التبويبات ومراقبة وضع ملء الشاشة وتقييد النسخ — سلوكًا مريبًا. أمّا في جانب الشركات، فيمكن لفرق التوظيف إنشاء وظائف وحملات مقابلات، واستيراد المرشحين من ملفات إكسل، وإرسال الدعوات عبر البريد الإلكتروني، ومراجعة النتائج من لوحة تحكم مخصّصة، مع التحقق من الهوية قبل بدء أي مقابلة.",
    },
    responsibilities: [
      {
        en: "Full-stack architecture across the React front end, Laravel API and Python/Flask audio service",
        ar: "بنية متكاملة (Full-stack) تمتد عبر واجهة React الأمامية وAPI مبني بـLaravel وخدمة الصوت بـPython/Flask",
      },
      {
        en: "React + Vite front end with Arabic/English and RTL/LTR support",
        ar: "واجهة أمامية بـReact وVite تدعم العربية والإنجليزية والاتجاهين RTL وLTR",
      },
      {
        en: "Laravel API design (MySQL, Sanctum authentication, Reverb real-time events)",
        ar: "تصميم API بـLaravel (MySQL، مصادقة Sanctum، أحداث لحظية عبر Reverb)",
      },
      {
        en: "Whisper-based speech-to-text integration for voice interview answers",
        ar: "دمج تحويل الصوت إلى نص عبر Whisper لإجابات المقابلة الصوتية",
      },
      {
        en: "Anti-cheating and proctoring system (tab-switch detection, fullscreen monitoring, MediaPipe)",
        ar: "نظام لمنع الغش والمراقبة (كشف تبديل التبويبات، مراقبة وضع ملء الشاشة، MediaPipe)",
      },
      {
        en: "Company-side tools: job and campaign creation, Excel candidate import, email invitations",
        ar: "أدوات جانب الشركات: إنشاء الوظائف والحملات، استيراد المرشحين من إكسل، إرسال دعوات بالبريد الإلكتروني",
      },
    ],
    technicalDecisions: [
      {
        en: "Voice answers are transcribed with Whisper before evaluation, so the scoring engine works from text rather than raw audio, keeping clarity, relevance, depth and confidence scoring consistent across responses.",
        ar: "تُحوَّل الإجابات الصوتية إلى نص عبر Whisper قبل التقييم، فيعمل محرّك التقييم على النص بدل الصوت الخام، ما يحافظ على اتّساق تقييم الوضوح والملاءمة والعمق والثقة عبر الإجابات.",
      },
      {
        en: "Laravel Reverb powers the parts of the interview flow that need to feel live, keeping the front end informed without polling the API.",
        ar: "يشغّل Laravel Reverb الأجزاء التي تحتاج إلى إحساس لحظي في تدفق المقابلة، فتبقى الواجهة الأمامية على اطّلاع دون الحاجة لاستطلاع API بشكل متكرر.",
      },
      {
        en: "Proctoring signals — tab switches, fullscreen exits, MediaPipe-based checks — feed into the same evaluation pipeline as the answer scores, so suspicious behavior can adjust a candidate's final result rather than living in a separate report.",
        ar: "تغذّي إشارات المراقبة (تبديل التبويبات، الخروج من وضع ملء الشاشة، الفحوصات المعتمدة على MediaPipe) خط التقييم نفسه الذي تمر به درجات الإجابات، فيمكن للسلوك المريب أن يؤثّر في النتيجة النهائية للمرشح بدل أن يبقى في تقرير منفصل.",
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
          en: "Detailed AI evaluation",
          ar: "تقييم مفصّل بالذكاء الاصطناعي",
        },
        description: {
          en: "Every answer receives an overall score from 0–10 plus clarity, relevance, depth and confidence metrics, with handling for silent answers.",
          ar: "تحصل كل إجابة على درجة عامة من 0 إلى 10 إضافة إلى مقاييس الوضوح والملاءمة والعمق والثقة، مع معالجة خاصة للإجابات الصامتة.",
        },
      },
      {
        id: "proctoring",
        title: {
          en: "Anti-cheating & proctoring",
          ar: "منع الغش والمراقبة",
        },
        description: {
          en: "Tab-switch detection, fullscreen monitoring, copy restrictions and MediaPipe-based checks can apply a penalty when suspicious behavior is detected.",
          ar: "يمكن لكشف تبديل التبويبات، ومراقبة وضع ملء الشاشة، وتقييد النسخ، والفحوصات المعتمدة على MediaPipe تطبيق عقوبة عند رصد سلوك مريب.",
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
        en: "A complete voice-interview loop — question, transcription, AI evaluation — running across three coordinated services",
        ar: "حلقة مقابلة صوتية كاملة — من السؤال إلى التفريغ النصي إلى التقييم بالذكاء الاصطناعي — تعمل عبر ثلاث خدمات متكاملة",
      },
      {
        en: "A working proctoring layer that factors monitoring signals directly into the candidate's evaluation",
        ar: "طبقة مراقبة فعّالة تُدخل إشارات الرصد مباشرة ضمن تقييم المرشح",
      },
      {
        en: "Company-side tooling — campaigns, Excel import, email invitations and a results dashboard — alongside the candidate experience",
        ar: "أدوات لجانب الشركات — الحملات، والاستيراد من إكسل، ودعوات البريد الإلكتروني، ولوحة تحكم للنتائج — إلى جانب تجربة المرشح",
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
      en: "A bilingual smash burger restaurant website with an interactive shopping cart, category-filtered menu and direct WhatsApp ordering.",
      ar: "موقع مطعم برغر ثنائي اللغة يضم سلة شراء تفاعلية وقائمة طعام قابلة للتصفية حسب الفئة وطلبًا مباشرًا عبر واتساب.",
    },
    description: {
      en: "The official website for Nesto Burgers, a smash burger restaurant in Nablus: a menu browsable by category, special offers, a shopping cart for building an order, and a gallery and customer reviews — all in Arabic and English with automatic RTL/LTR switching. Orders can be placed through the site's own cart or sent directly over WhatsApp.",
      ar: "الموقع الرسمي لمطعم Nesto Burgers، مطعم سماش برغر في نابلس: قائمة طعام قابلة للتصفّح حسب الفئة، وعروض خاصة، وسلة شراء لتجهيز الطلب، ومعرض صور وآراء للزبائن — كل ذلك بالعربية والإنجليزية مع تبديل تلقائي للاتجاه بين RTL وLTR. يمكن إتمام الطلب عبر سلة الموقع أو مباشرة عبر واتساب.",
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
      en: "Built as a React.js single-page site: the menu, offers, gallery and reviews are organized into clear sections, a shopping cart lets customers build an order and add items by category, and checkout hands off to WhatsApp for the actual conversation with the restaurant — sidestepping the need for a payments backend while still giving customers a real cart experience. Full Arabic/English content with automatic RTL/LTR layout switching runs through every section, and the site deploys to Netlify.",
      ar: "بُني الموقع كصفحة واحدة (SPA) بتقنية React.js: تُنظَّم القائمة والعروض والمعرض والآراء في أقسام واضحة، وتتيح سلة شراء للزبائن تجهيز طلبهم بإضافة العناصر حسب الفئة، وتنتقل عملية إتمام الطلب إلى واتساب للتواصل الفعلي مع المطعم — متجاوزة الحاجة إلى نظام دفع خلفي مع إبقاء تجربة سلة شراء حقيقية للزبون. يمتد الدعم الكامل للعربية والإنجليزية مع تبديل تلقائي لاتجاه RTL/LTR عبر كل قسم، ويُنشر الموقع عبر Netlify.",
    },
    responsibilities: [
      {
        en: "End-to-end front-end build in React.js",
        ar: "بناء الواجهة الأمامية بالكامل بتقنية React.js",
      },
      {
        en: "Bilingual content and automatic RTL/LTR layout switching",
        ar: "محتوى ثنائي اللغة وتبديل تلقائي للاتجاه بين RTL وLTR",
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
        en: "The cart is client-side state only — there is no order backend — so checkout hands the assembled order off to WhatsApp instead of a payment flow, matching how the restaurant actually takes orders today.",
        ar: "تعتمد السلة على حالة جهة العميل فقط دون نظام طلبات خلفي، لذا تنتقل عملية إتمام الطلب بتسليم الطلب المجهّز إلى واتساب بدل تدفّق دفع إلكتروني، بما يطابق طريقة استقبال المطعم للطلبات فعليًا اليوم.",
      },
      {
        en: "Menu items are filtered by category on the client, so browsing burgers, sides and drinks feels instant with no round trip for every filter change.",
        ar: "تُصفَّى عناصر القائمة حسب الفئة من جهة العميل، فيبدو تصفّح البرغر والمقبّلات والمشروبات فوريًا دون طلب جديد عند كل تغيير للتصفية.",
      },
      {
        en: "Direction-aware styling runs the same component tree in both languages, so Arabic and English never diverge into separate layouts to maintain.",
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
          en: "Customers build an order in the cart, then complete it through the website or directly over WhatsApp.",
          ar: "يجهّز الزبائن طلبهم عبر السلة، ثم يُتمّونه من خلال الموقع أو مباشرة عبر واتساب.",
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
          ar: "يتبدّل كل قسم تلقائيًا بين RTL وLTR، دون تخطيط منفصل يتطلّب الصيانة لكل لغة.",
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
        en: "A live, production restaurant website in daily use — not a demo",
        ar: "موقع مطعم فعلي قيد الاستخدام اليومي — وليس عرضًا تجريبيًا",
      },
      {
        en: "One React codebase serving both Arabic and English with no duplicated layouts",
        ar: "قاعدة كود React واحدة تخدم العربية والإنجليزية دون تكرار للتخطيطات",
      },
      {
        en: "A cart-to-WhatsApp ordering flow that matches how the restaurant actually operates",
        ar: "تدفّق طلب من السلة إلى واتساب يطابق طريقة عمل المطعم الفعلية",
      },
    ],
  },
];
