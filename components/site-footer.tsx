"use client";

import { usePathname } from "next/navigation";
import { CopyEmailAction, TextAction } from "@/components/text-action";
import { formatUpdated, site } from "@/lib/content";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/about") {
    return null;
  }

  const onCase = pathname.startsWith("/work/");
  const updated = formatUpdated(site.updatedAt);

  return (
    <footer className="site-footer">
      {onCase ? (
        <p className="site-footer__note">{site.caseClose}</p>
      ) : site.githubHref ? (
        <p className="site-footer__updated">
          <a href={site.githubHref}>{updated}</a>
        </p>
      ) : (
        <p className="site-footer__updated">{updated}</p>
      )}
      <div className="site-footer__actions">
        <TextAction href={site.resumeHref} iconSrc="/icons/resume.svg">
          Resume
        </TextAction>
        <TextAction href={site.linkedinHref} iconSrc="/icons/linkedin.svg">
          LinkedIn
        </TextAction>
        <CopyEmailAction email={site.email} />
      </div>
    </footer>
  );
}
