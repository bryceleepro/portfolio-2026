import type { Metadata } from "next";
import { aboutCopy, aboutTitle } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="about">
      <h1 className="page-title">{aboutTitle}</h1>
      {aboutCopy.map((paragraph) => (
        <p className="case-copy" key={paragraph}>
          {paragraph}
        </p>
      ))}
    </main>
  );
}
