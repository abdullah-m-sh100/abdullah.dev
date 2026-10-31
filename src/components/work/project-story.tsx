import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';
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
 * One row of the narrative: a label on the reading-start side, the content
 * beside it. Rows are divided by hairlines and the label does not wrap the
 * content, so a long solution and a short challenge each take only the height
 * they need. The earlier side-by-side pair put both in ~270px columns inside a
 * prose-width container, which stretched the longer one to ~650px beside a
 * short neighbour.
 */
function StoryRow({
  index,
  children,
  heading,
}: {
  index: number;
  heading: ReactNode;
  children: ReactNode;
}) {
  return (
    <Reveal
      index={index}
      className="border-border grid gap-x-12 gap-y-4 border-t py-10 first:border-t-0 first:pt-0 lg:grid-cols-12"
    >
      <div className="lg:col-span-4">{heading}</div>
      <div className="lg:col-span-8">{children}</div>
    </Reveal>
  );
}

/** Sage tick used by every list in the story, so the lists read as one family. */
function Tick({ icon = 'check' }: { icon?: 'check' | 'award' }) {
  return (
    <span className="text-secondary bg-secondary-subtle mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full">
      <Icon name={icon} className="size-3" />
    </span>
  );
}

/**
 * The case-study narrative: challenge, solution, technical approach,
 * responsibilities and results.
 *
 * Every one of these five fields is optional on `Project`, so each block is
 * only rendered when its content exists — a project with just a challenge and
 * a solution still produces a clean page instead of empty headings.
 *
 * Split into two Sections with different surfaces on purpose: the narrative
 * reads as editorial rows on the page ground, then responsibilities and
 * results sit in two cards on the muted band, giving the page a surface change
 * partway through a long read, per CLAUDE.md §21's request for visual
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

  let row = 0;

  return (
    <>
      {hasProseContent ? (
        <Section aria-labelledby={proseHeadingId}>
          <Container>
            {challenge ? (
              <StoryRow
                index={row++}
                heading={
                  <h2 id="case-study-challenge" className="text-h3">
                    {labels.challenge}
                  </h2>
                }
              >
                <p className="text-foreground max-w-prose-comfortable text-lead">
                  {localize(challenge, locale)}
                </p>
              </StoryRow>
            ) : null}

            {solution ? (
              <StoryRow
                index={row++}
                heading={
                  <h2 id="case-study-solution" className="text-h3">
                    {labels.solution}
                  </h2>
                }
              >
                <p className="text-muted-foreground max-w-prose-comfortable leading-relaxed">
                  {localize(solution, locale)}
                </p>
              </StoryRow>
            ) : null}

            {technicalDecisions?.length ? (
              <StoryRow
                index={row++}
                heading={
                  <h2
                    id={!challenge && !solution ? proseHeadingId : undefined}
                    className="text-h3"
                  >
                    {labels.technicalApproach}
                  </h2>
                }
              >
                <ul className="flex max-w-prose-comfortable flex-col gap-4">
                  {localizeList(technicalDecisions, locale).map((decision) => (
                    <li key={decision} className="flex items-start gap-3 leading-relaxed">
                      <Tick />
                      <span className="text-muted-foreground">{decision}</span>
                    </li>
                  ))}
                </ul>
              </StoryRow>
            ) : null}
          </Container>
        </Section>
      ) : null}

      {hasListContent ? (
        <Section surface="muted" aria-labelledby={listHeadingId}>
          <Container>
            <div className="grid gap-6 lg:grid-cols-2">
              {responsibilities?.length ? (
                <Reveal>
                  <Card className="h-full p-6 sm:p-8">
                    <h2 id="case-study-responsibilities" className="text-h3">
                      {labels.responsibilities}
                    </h2>
                    <ul className="mt-6 flex flex-col gap-4">
                      {localizeList(responsibilities, locale).map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <Tick />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ) : null}

              {results?.length ? (
                <Reveal index={1}>
                  <Card className="h-full p-6 sm:p-8">
                    <h2
                      id={!responsibilities?.length ? listHeadingId : undefined}
                      className="text-h3"
                    >
                      {labels.results}
                    </h2>
                    <ul className="mt-6 flex flex-col gap-4">
                      {localizeList(results, locale).map((item) => (
                        <li key={item} className="flex items-start gap-3 text-sm">
                          <Tick icon="award" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ) : null}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
