import type { Certificate } from '@/types/content';

/**
 * Real certificates, sourced from the certificate images in
 * `public/Certificates/`. Only information visible on each certificate is
 * recorded — `issueDate` and `credentialId` are left unset rather than
 * guessed wherever the source image doesn't print one (see `Certificate`'s
 * JSDoc). `order` curates display order within each `featured` bucket; the
 * three featured entries are the structured, hands-on front-end programs
 * most relevant to Abdullah's specialization, kept first regardless of date.
 */
export const certificates: Certificate[] = [
  {
    id: 'cert-code-center-frontend-web-dev',
    slug: 'front-end-web-development-intensive-training',
    category: 'web',
    order: 1,
    featured: true,
    issueDate: '2026-06-02',
    title: {
      en: 'Front-End Web Development — Intensive Training Program',
      ar: 'تطوير الواجهات الأمامية — برنامج تدريبي مكثف',
    },
    issuer: {
      en: 'Code Center for Training and Development',
      ar: 'مركز شيفرة للتدريب والتطوير',
    },
    description: {
      en: 'An intensive program covering HTML, CSS, JavaScript, and responsive interface development, completed with a final grade of Excellent (A+).',
      ar: 'برنامج مكثف في HTML وCSS وJavaScript وتطوير الواجهات المتجاوبة، أُنجز بتقدير ممتاز (A+).',
    },
    image: {
      src: '/Certificates/frontend web dev.jpg',
      width: 429,
      height: 552,
      alt: {
        en: 'Front-End Web Development intensive training certificate from Code Center for Training and Development',
        ar: 'شهادة برنامج تطوير الواجهات الأمامية المكثف من مركز شيفرة للتدريب والتطوير',
      },
    },
    skills: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'Frontend Development', 'Git'],
  },
  {
    id: 'cert-gazatech-reactjs',
    slug: 'reactjs-training-program',
    category: 'web',
    order: 2,
    featured: true,
    issueDate: '2025-11-23',
    title: {
      en: 'React.js Training Program',
      ar: 'برنامج تدريبي في React.js',
    },
    issuer: {
      en: 'GazaTech Builders',
      ar: 'غزة تك بيلدرز',
    },
    description: {
      en: '120 hours of hands-on training in building interfaces and applications with React.js.',
      ar: 'تدريب عملي لمدة 120 ساعة على تطوير واجهات وتطبيقات باستخدام React.js.',
    },
    image: {
      src: '/Certificates/react.js.jpg',
      width: 418,
      height: 591,
      alt: {
        en: 'React.js training certificate from GazaTech Builders',
        ar: 'شهادة التدريب في React.js من غزة تك بيلدرز',
      },
    },
    skills: [
      'React.js',
      'JavaScript',
      'Component-Based Development',
      'Frontend Development',
      'Responsive UI',
      'Web Applications',
    ],
  },
  {
    id: 'cert-gsg-code2career-frontend',
    slug: 'code2career-frontend-path-training',
    category: 'web',
    order: 3,
    featured: true,
    // No issue date is printed on this certificate — left unset rather than guessed.
    title: {
      en: '100-Hour Code2Career Frontend Path Training',
      ar: 'برنامج Code2Career التدريبي لمسار تطوير الواجهات الأمامية – 100 ساعة',
    },
    issuer: {
      en: 'Gaza Sky Geeks',
      ar: 'غزة سكاي جيكس',
    },
    description: {
      en: 'A 100-hour training program in front-end development and working within development teams.',
      ar: 'برنامج تدريبي لمدة 100 ساعة في تطوير الواجهات الأمامية والعمل ضمن فرق تطوير.',
    },
    image: {
      src: '/Certificates/GazaSkyGeeks-frontend.jpg',
      width: 854,
      height: 566,
      alt: {
        en: 'Code2Career Frontend Path Training certificate of achievement from Gaza Sky Geeks and Mercy Corps',
        ar: 'شهادة إنجاز برنامج Code2Career لمسار تطوير الواجهات الأمامية من غزة سكاي جيكس وميرسي كور',
      },
    },
    skills: ['Frontend Development', 'JavaScript', 'React', 'Web Development', 'Git', 'Team Collaboration'],
  },
  {
    id: 'cert-langchain-python-foundation',
    slug: 'introduction-to-langchain-python',
    category: 'ai',
    order: 4,
    featured: false,
    issueDate: '2026-08-24',
    credentialId: 'c4teresgc0',
    title: {
      en: 'Foundation: Introduction to LangChain – Python',
      ar: 'أساسيات LangChain باستخدام Python',
    },
    issuer: {
      en: 'LangChain Academy',
      ar: 'أكاديمية LangChain',
    },
    description: {
      en: 'A foundational course on building applications powered by language models with LangChain and Python.',
      ar: 'دورة تأسيسية في بناء تطبيقات تعتمد على النماذج اللغوية باستخدام LangChain وPython.',
    },
    image: {
      src: '/Certificates/Introduction to LangChain - Python.jpg',
      width: 784,
      height: 552,
      alt: {
        en: 'Foundation: Introduction to LangChain - Python course completion certificate from LangChain Academy',
        ar: 'شهادة إتمام دورة أساسيات LangChain باستخدام Python من أكاديمية LangChain',
      },
    },
    skills: ['LangChain', 'Python', 'LLM Applications', 'Generative AI'],
  },
  {
    id: 'cert-anthropic-ai-fluency',
    slug: 'ai-fluency-framework-and-foundations',
    category: 'ai',
    order: 5,
    featured: false,
    // No issue date is printed on this certificate — left unset rather than guessed.
    title: {
      en: 'AI Fluency: Framework & Foundations',
      ar: 'الطلاقة في الذكاء الاصطناعي: الإطار والأساسيات',
    },
    issuer: {
      en: 'Anthropic',
      ar: 'Anthropic',
    },
    description: {
      en: 'A course on understanding AI capabilities and collaborating effectively and responsibly with AI tools.',
      ar: 'دورة في فهم قدرات الذكاء الاصطناعي والتعاون الفعّال والمسؤول مع أدواته.',
    },
    image: {
      src: '/Certificates/Ai-Fluency.jpg',
      width: 742,
      height: 562,
      alt: {
        en: 'AI Fluency: Framework and Foundations certificate of completion from Anthropic',
        ar: 'شهادة إتمام برنامج الطلاقة في الذكاء الاصطناعي: الإطار والأساسيات من Anthropic',
      },
    },
    skills: ['AI Fluency', 'Generative AI', 'AI Collaboration', 'Responsible AI'],
  },
  {
    id: 'cert-anthropic-claude-api',
    slug: 'claude-with-the-anthropic-api',
    category: 'ai',
    order: 6,
    featured: false,
    // No issue date is printed on this certificate — left unset rather than guessed.
    title: {
      en: 'Claude with the Anthropic API',
      ar: 'تطوير التطبيقات باستخدام Claude وواجهة Anthropic API',
    },
    issuer: {
      en: 'Anthropic',
      ar: 'Anthropic',
    },
    description: {
      en: 'Training on integrating Claude models into applications with the Anthropic API.',
      ar: 'تدريب على دمج نماذج Claude في التطبيقات باستخدام Anthropic API.',
    },
    image: {
      src: '/Certificates/Building with the Claude API.jpg',
      width: 744,
      height: 560,
      alt: {
        en: 'Claude with the Anthropic API certificate of completion from Anthropic',
        ar: 'شهادة إتمام برنامج تطوير التطبيقات باستخدام Claude وواجهة Anthropic API من Anthropic',
      },
    },
    skills: ['Claude', 'Anthropic API', 'LLM Integration', 'Generative AI', 'API Development'],
  },
  {
    id: 'cert-anthropic-claude-code-101',
    slug: 'claude-code-101',
    category: 'ai',
    order: 7,
    featured: false,
    // No issue date is printed on this certificate — left unset rather than guessed.
    title: {
      en: 'Claude Code 101',
      ar: 'أساسيات Claude Code',
    },
    issuer: {
      en: 'Anthropic',
      ar: 'Anthropic',
    },
    description: {
      en: 'An introductory course on using Claude Code in software development tasks.',
      ar: 'دورة تمهيدية في استخدام Claude Code ضمن مهام تطوير البرمجيات.',
    },
    image: {
      src: '/Certificates/Code CIaude.jpg',
      width: 695,
      height: 527,
      alt: {
        en: 'Claude Code 101 certificate of completion from Anthropic',
        ar: 'شهادة إتمام برنامج أساسيات Claude Code من Anthropic',
      },
    },
    skills: ['Claude Code', 'AI-Assisted Development', 'Software Development', 'Developer Tools', 'Generative AI'],
  },
];
