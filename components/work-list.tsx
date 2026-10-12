import NextLink from "next/link";
import { Chip } from "@/components/chip";
import { MediaFrame } from "@/components/media-frame";
import { getCaseStudy } from "@/lib/case-studies";
import { works } from "@/lib/content";

export function WorkList() {
  return (
    <ul className="work-list">
      {works.map((item) => {
        const study = getCaseStudy(item.slug);
        const title = study?.title ?? item.title;
        const year = item.year;

        return (
          <li key={item.slug}>
            <NextLink href={`/work/${item.slug}`} className={`work-card work-card--${item.slug}`}>
              <MediaFrame
                src={item.thumb}
                alt=""
                crop={item.thumbCrop}
                className="work-card__media"
              />
              <span className="work-card__meta">
                <Chip className="chip chip--emphasis">{item.company}</Chip>
                <span className="work-card__title-row">
                  <Chip className="chip chip--meta">{title}</Chip>
                </span>
                <Chip className="chip chip--meta work-card__year">{year}</Chip>
              </span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
