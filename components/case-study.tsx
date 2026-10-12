import { MediaFrame } from "@/components/media-frame";
import type { CaseBlock, CaseSection } from "@/lib/case-studies";

function CaseBlockView({ block }: { block: CaseBlock }) {
  if (block.type === "p") {
    return <p className="case-copy">{block.text}</p>;
  }

  if (block.type === "ol") {
    return (
      <ol className="case-list">
        {block.items.map((item) => (
          <li key={item.lead}>
            <span className="case-list__lead">{item.lead}:</span> {item.text}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <figure className="case-figure">
      <MediaFrame
        src={block.src}
        alt={block.alt ?? block.caption ?? ""}
        crop={block.crop}
      />
      {block.caption ? (
        <figcaption className="case-figure__caption">{block.caption}</figcaption>
      ) : null}
    </figure>
  );
}

export function CaseStudy({
  title,
  when,
  sections,
}: {
  title: string;
  when?: string;
  sections: CaseSection[];
}) {
  return (
    <article className="case">
      <header className="case__title">
        <h1 className="page-title">{title}</h1>
        {when ? <p className="case__when">{when}</p> : null}
      </header>
      {sections.map((section, sectionIndex) => (
        <section
          className="case-section"
          key={section.heading ?? section.lede ?? sectionIndex}
        >
          {section.heading || section.lede ? (
            <header className="case-section__head">
              {section.heading ? (
                <h2 className="case-section__label">{section.heading}</h2>
              ) : null}
              {section.lede ? (
                section.heading ? (
                  <p className="case-lede">{section.lede}</p>
                ) : (
                  <h2 className="case-lede">{section.lede}</h2>
                )
              ) : null}
            </header>
          ) : null}
          {section.blocks.map((block, index) => (
            <CaseBlockView
              key={`${section.heading ?? section.lede}-${block.type}-${index}`}
              block={block}
            />
          ))}
        </section>
      ))}
    </article>
  );
}
