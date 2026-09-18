import { TextLink } from '@/components/ui/text-link';

type ProjectLinksProps = {
  liveUrl?: string;
  githubUrl?: string;
  labels: {
    live: string;
    github: string;
    opensNewTab: string;
  };
};

/**
 * Live project / source links for a case study.
 *
 * Renders nothing when neither URL exists — the caller (`ProjectOverview`)
 * is expected to skip its own "Links" row in that case rather than show one
 * with nothing in it, per CLAUDE.md §20's "only render when URLs exist".
 */
export function ProjectLinks({ liveUrl, githubUrl, labels }: ProjectLinksProps) {
  if (!liveUrl && !githubUrl) return null;

  return (
    <ul className="flex flex-col gap-2">
      {liveUrl ? (
        <li>
          <TextLink href={liveUrl} external externalLabel={labels.opensNewTab}>
            {labels.live}
          </TextLink>
        </li>
      ) : null}
      {githubUrl ? (
        <li>
          <TextLink href={githubUrl} external externalLabel={labels.opensNewTab}>
            {labels.github}
          </TextLink>
        </li>
      ) : null}
    </ul>
  );
}
