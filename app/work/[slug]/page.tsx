import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackToTop } from "@/components/back-to-top";
import { CaseBackLink } from "@/components/case-back-link";
import { CaseStudy } from "@/components/case-study";
import { getCaseStudy } from "@/lib/case-studies";
import { getWork, works } from "@/lib/content";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return works.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  const study = getCaseStudy(slug);
  return { title: study?.title ?? work?.title ?? "Work" };
}

export default async function WorkPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWork(slug);

  if (!work) {
    notFound();
  }

  const study = getCaseStudy(slug);

  return (
    <main className="case-page">
      <p className="case-back">
        <CaseBackLink />
      </p>
      {study ? (
        <CaseStudy
          title={study.title ?? work.title}
          when={study.when}
          sections={study.sections}
        />
      ) : (
        <>
          <h1 className="page-title">{work.title}</h1>
          <p className="blank-copy" />
        </>
      )}
      <p className="case-top">
        <BackToTop />
      </p>
    </main>
  );
}
