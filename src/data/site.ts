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

/** The closing invitation reused by the Home page and internal pages. */
export const cta: CallToAction = {
  eyebrow: { en: "Next step", ar: "الخطوة التالية" },
  title: {
    en: "Have an interface to build?",
    ar: "لديك واجهة تريد بناءها؟",
  },
  description: {
    en: "Tell me what you are building and what it needs to achieve. I will reply with a clear plan.",
    ar: "أخبرني بما تبنيه وما تريد تحقيقه، وسأرد عليك بخطة واضحة.",
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
