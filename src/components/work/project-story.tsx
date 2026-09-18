import { Container } from '@/components/ui/container';
import { Icon } from '@/components/ui/icon';
import { Section } from '@/components/ui/section';
import { Reveal } from '@/components/motion/reveal';
import { localize, localizeList } from '@/i18n/localize';
import type { Locale, Project } from '@/types/content';

type ProjectStoryProps = {
  project: Project;
  locale: Locale;
  labels: {
    challenge: string;
    solution: string;
    technicalApproach: string;
    responsibilities: string;
    results: string;
  };
};

/**
 * The case-study narrative: challenge, solution, technical approach,
 * responsibilities and results.
 *
 * Every one of these five fields is optional on `Project`, so each block is
 * only rendered when its content exists — a project with just a challenge and
 * a solution still produces a clean page instead of empty headings.
 *
 * Split into two Sections with different surfaces and container widths on
 * purpose: the prose (challenge/solution/technical approach) reads best at
 * `prose` measure, while responsibilities/results are short list items that
 * can comfortably use the wider `content` measure — giving the page a surface
 * change partway through a long read, per CLAUDE.md §21's request for visual
 * continuity through surface rather than identical bands.
 */
export function ProjectStory({ project, locale, labels }: ProjectStoryProps) {
  const { challenge, solution, technicalDecisions, responsibilities, results } = project;

  const hasProseContent = Boolean(challenge || solution || technicalDecisions?.length);
  const hasListContent = Boolean(responsibilities?.length || results?.length);

  const proseHeadingId = challenge
    ? 'case-study-challenge'
    : solution
      ? 'case-study-solution'
      : 'case-study-technical-approach';

  const listHeadingId = responsibilities?.length ? 'case-study-responsibilities' : 'case-study-results';

  return (
    <>
      {hasProseContent ? (
        <Section spacing="default" aria-labelledby={proseHeadingId}>
          <Container size="prose">
            {challenge || solution ? (
              <div className="grid gap-10 sm:grid-cols-2">
                {challenge ? (
                  <Reveal variant="slide-start">
                    <h2 id="case-study-challenge" className="text-h3">
                      {labels.challenge}
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {localize(challenge, locale)}
                    </p>
                  </Reveal>
                ) : null}

                {solution ? (
                  <Reveal variant="slide-end" index={1}>
                    <h2 id="case-study-solution" className="text-h3">
                      {labels.solution}
                    </h2>
                    <p className="text-muted-foreground mt-4 leading-relaxed">
                      {localize(solution, locale)}
                    </p>
                  </Reveal>
                ) : null}
              </div>
            ) : null}

            {technicalDecisions?.length ? (
              <Reveal index={2} className={challenge || solution ? 'mt-14' : undefined}>
                <h2
                  id={!challenge && !solution ? proseHeadingId : undefined}
                  className="text-h3"
                >
                  {labels.technicalApproach}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {localizeList(technicalDecisions, locale).map((decision) => (
                    <li key={decision} className="flex items-start gap-3 leading-relaxed">
                      <Icon name="check" className="text-secondary mt-1 size-4 shrink-0" />
                      <span className="text-muted-foreground">{decision}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {hasListContent ? (
        <Section surface="muted" spacing="default" aria-labelledby={listHeadingId}>
          <Container>
            <div className="grid gap-10 sm:grid-cols-2">
              {responsibilities?.length ? (
                <Reveal>
                  <h2 id="case-study-responsibilities" className="text-h3">
                    {labels.responsibilities}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {localizeList(responsibilities, locale).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Icon name="check" className="text-secondary mt-0.5 size-4 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {results?.length ? (
                <Reveal index={1}>
                  <h2
                    id={!responsibilities?.length ? listHeadingId : undefined}
                    className="text-h3"
                  >
                    {labels.results}
                  </h2>
                  <ul className="mt-5 flex flex-col gap-3">
                    {localizeList(results, locale).map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Icon name="award" className="text-secondary mt-0.5 size-4 shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
