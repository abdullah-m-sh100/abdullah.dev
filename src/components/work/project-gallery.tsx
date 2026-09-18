import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { SectionHeading } from '@/components/ui/section-heading';
import { ProjectCover } from '@/components/work/project-cover';
import type { ImageAsset, Locale } from '@/types/content';

type ProjectGalleryProps = {
  images: readonly ImageAsset[];
  locale: Locale;
  title: string;
};

/**
 * Screenshot gallery.
 *
 * Reuses `ProjectCover` per tile rather than a new image component, only
 * overriding its aspect ratio to 4:3 — the second ratio CLAUDE.md §29 allows,
 * used here to visually distinguish gallery tiles from the 16:10 cover shown
 * everywhere else. The caller renders this component only when a project has
 * gallery images, so there is no empty state to design here; when real
 * screenshots replace the placeholder, this component needs no changes.
 */
export function ProjectGallery({ images, locale, title }: ProjectGalleryProps) {
  return (
    <Section surface="muted" aria-labelledby="case-study-gallery">
      <Container size="wide">
        <SectionHeading id="case-study-gallery" title={title} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <Reveal key={image.src + index} as="li" index={index} className="group">
              <ProjectCover
                image={image}
                locale={locale}
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-4/3"
              />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
