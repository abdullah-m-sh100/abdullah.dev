import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/cn';

type TechnologyListProps = {
  technologies: readonly string[];
  /** Accessible name for the list, e.g. "Technologies used". */
  label: string;
  /** Extra entries collapse into a "+N" badge instead of wrapping forever. */
  max?: number;
  className?: string;
};

/**
 * Technology tags for a project.
 *
 * Shared by every project layout so the tag treatment can never drift between
 * the Home showcase, the list rows and the Work page.
 */
export function TechnologyList({
  technologies,
  label,
  max = 4,
  className,
}: TechnologyListProps) {
  const visible = technologies.slice(0, max);
  const remaining = technologies.length - visible.length;

  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {visible.map((technology) => (
        <li key={technology}>
          <Badge variant="outline" size="sm">
            {technology}
          </Badge>
        </li>
      ))}
      {remaining > 0 ? (
        <li>
          <Badge variant="outline" size="sm">
            {`+${remaining}`}
          </Badge>
        </li>
      ) : null}
    </ul>
  );
}
