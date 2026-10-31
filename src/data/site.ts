import type { CallToAction, ContactInfo, NavItem } from "@/types/content";
import { personal } from "./personal";

/** Primary navigation. `href` is typed as `AppRoute` — locales never appear in it. */
export const navigation: NavItem[] = [
  { id: "home", href: "/", label: { en: "Home", ar: "الرئيسية" } },
  { id: "about", href: "/about", label: { en: "About", ar: "نبذة" } },
  {
    id: "services",
    href: "/services",
    label: { en: "Services", ar: "الخدمات" },
  },
  { id: "work", href: "/work", label: { en: "Work", ar: "الأعمال" } },
  {
    id: "certificates",
    href: "/certificates",
    label: { en: "Certificates", ar: "الشهادات" },
  },
  { id: "contact", href: "/contact", label: { en: "Contact", ar: "تواصل" } },
];

export const contact: ContactInfo = {
  email: personal.email,
  phone: personal.phone,
  location: personal.location,
  responseTime: {
    en: "Usually replies within one business day",
    ar: "أرد عادةً خلال يوم عمل واحد",
  },
  availability: {
    en: "Open to freelance projects and long-term collaborations",
    ar: "متاح لمشاريع العمل الحر والتعاون طويل الأمد",
  },
};

/**
 * The closing invitation reused by the Home page and internal pages.
 *
 * Phrased around the whole application rather than an interface, so a visitor
 * who needs an API or a database does not read this as out of scope.
 */
export const cta: CallToAction = {
  eyebrow: { en: "Next step", ar: "الخطوة التالية" },
  title: {
    en: "Have a web application to build?",
    ar: "لديك تطبيق ويب تريد بناءه؟",
  },
  description: {
    en: "A full web application, an API, a database, or a fix to something you already have — tell me what you are building and what it needs to achieve, and I will reply with a clear plan.",
    ar: "تطبيق ويب كامل أو واجهة API أو قاعدة بيانات أو إصلاح لمشروع قائم — أخبرني بما تبنيه وما تريد تحقيقه، وسأرد عليك بخطة واضحة.",
  },
  primary: {
    label: { en: "Start a project", ar: "ابدأ مشروعًا" },
    href: "/contact",
  },
  secondary: {
    label: { en: "View my work", ar: "اطّلع على أعمالي" },
    href: "/work",
  },
};
