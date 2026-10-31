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
    en: "I usually reply within one business day.",
    ar: "أرد عادةً خلال يوم عمل واحد.",
  },
  availability: {
    en: "Open to freelance projects and long-term collaborations",
    ar: "متاح لمشاريع العمل الحر والتعاون طويل الأمد",
  },
};

/**
 * The closing invitation reused by the Home page and internal pages.
 *
 * Phrased around the visitor's project rather than a technique, so someone
 * with an idea, a link to a site they already have, or an improvement in mind
 * all read it as written for them.
 */
export const cta: CallToAction = {
  eyebrow: { en: "Next step", ar: "الخطوة التالية" },
  title: {
    en: "Have a project or an improvement in mind?",
    ar: "هل لديك مشروع أو تطوير تحتاجه؟",
  },
  description: {
    en: "Share your idea or a link to your current project so we can discuss what you need and the next step.",
    ar: "شارك معي فكرتك أو رابط مشروعك الحالي، لنناقش المطلوب والخطوة المناسبة للبدء.",
  },
  primary: {
    label: { en: "Discuss your project", ar: "ناقش مشروعك معي" },
    href: "/contact",
  },
  secondary: {
    label: { en: "View my work", ar: "اطّلع على أعمالي" },
    href: "/work",
  },
};
