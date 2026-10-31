import {
  Accessibility,
  ArrowLeft,
  ArrowRight,
  Award,
  Briefcase,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Code,
  Component,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileCode,
  Gauge,
  Globe,
  Languages,
  Layers,
  type LucideIcon,
  Mail,
  MapPin,
  Menu,
  Palette,
  PenTool,
  Plug,
  RefreshCw,
  Rocket,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  X,
  Zap,
} from 'lucide-react';

/**
 * Explicit icon registry.
 *
 * Content files reference icons by name — a serializable string that stays
 * type-safe — and only the icons listed here are ever bundled.
 * Brand/social marks are not here: `lucide-react` v1 dropped them, so they live
 * in `src/components/brand/social-icon.tsx` as inline SVG.
 */
export const icons = {
  accessibility: Accessibility,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  award: Award,
  briefcase: Briefcase,
  calendar: CalendarDays,
  check: Check,
  'chevron-right': ChevronRight,
  clock: Clock,
  code: Code,
  component: Component,
  database: Database,
  download: Download,
  'external-link': ExternalLink,
  eye: Eye,
  'file-code': FileCode,
  gauge: Gauge,
  globe: Globe,
  languages: Languages,
  layers: Layers,
  mail: Mail,
  'map-pin': MapPin,
  menu: Menu,
  palette: Palette,
  'pen-tool': PenTool,
  plug: Plug,
  refresh: RefreshCw,
  rocket: Rocket,
  search: Search,
  'shield-check': ShieldCheck,
  smartphone: Smartphone,
  sparkles: Sparkles,
  target: Target,
  users: Users,
  x: X,
  zap: Zap,
} as const satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

export function getIcon(name: IconName): LucideIcon {
  return icons[name];
}

export type { LucideIcon };
