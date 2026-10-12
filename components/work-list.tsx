import NextLink from "next/link";
import { Chip } from "@heroui/react";
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
            <NextLink href={`/work/${item.slug}`} className="work-card">
              <MediaFrame
                src={item.thumb}
                alt=""
                crop={item.thumbCrop}
                className="work-card__media"
              />
              <span className="work-card__meta">
                <Chip className="chip chip--emphasis">{item.company}</Chip>
                <Chip className="chip chip--meta">{title}</Chip>
                <Chip className="chip chip--meta">{year}</Chip>
              </span>
            </NextLink>
          </li>
        );
      })}
    </ul>
  );
}
