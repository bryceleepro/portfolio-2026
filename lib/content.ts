import { activitiesCardCrop } from "@/lib/case-studies";
import type { MediaCrop } from "@/lib/media";

/** Site copy and placeholders. Resume href is still a stub. */

export const site = {
  name: "Bryce Lee",
  email: "brycelee@umich.edu",
  resumeHref: "#",
  linkedinHref: "https://www.linkedin.com/in/lee-bryce",
  /** Set once a public repo exists; footer date becomes a link. */
  githubHref: "",
  /** Used until git history exists; then swap to last-commit date. */
  updatedAt: "2026-09-30",
  caseClose: "Thanks for reading! Let's keep in touch.",
};

export const introLead = "Bryce Lee is a";
export const introWhoLabel = "who";
export const introCurrentlyLabel = "currently";

export type IntroVariant = {
  role: string;
  who: string;
  currently: string;
};

/** Index 0 always loads first. Later clicks pick another at random. */
export const introVariants: IntroVariant[] = [
  {
    role: "product designer",
    who: "scales robust systems and enjoys creating crafty interactions",
    currently: "working at Coinbase.",
  },
  {
    role: "graduate from the University of Michigan",
    who: "studied business administration and UX design",
    currently: "giving back by mentoring students.",
  },
  {
    role: "gym rat",
    who: "likes power-building and calisthenics workouts",
    currently: "chasing a bench press PR.",
  },
  {
    role: "League of Legends player",
    who: "enjoys mechanical outplays",
    currently: "playing Yasuo and Cho’ Gath mid.",
  },
  {
    role: "social introvert",
    who: "spends his weekends slowing down with friends and family",
    currently: "living in the suburbs of SE Michigan.",
  },
  {
    role: "(former?) artist",
    who: "loves pen and ink sketching",
    currently: "creating vicariously by visiting art galleries.",
  },
];

export type WorkItem = {
  slug: string;
  company: string;
  title: string;
  year: string;
  /** Home thumbnail. Image, GIF, or video under `/public` (e.g. `/media/work/usdc-earn.mp4`). */
  thumb?: string;
  thumbCrop?: MediaCrop;
};

export const works: WorkItem[] = [
  {
    slug: "activities-timeline",
    company: "Coinbase",
    title: "Activities timeline component redesign",
    year: "2026",
    thumb: "/media/activities/final-iteration.mp4",
    thumbCrop: activitiesCardCrop,
  },
  {
    slug: "usdc-earn",
    company: "Coinbase",
    title: "Scaling the Institutional USDC Experience",
    year: "2025 - present",
    thumb: "/media/usdc/earn-hero-alt-4.png",
  },
];

export const aboutTitle = "Hello! I'm Bryce.";

export const aboutCopy = [
  "I'm a product designer based in Rochester, Michigan.",
  "As a kid, I moved from South Korea to Japan and eventually to the United States. My earliest creative memory is from Shiga, drawing my own manga panels, storylines, and characters. Along the way, I paired my interest in visual communication with a curiosity about understanding the different perspectives around me, which led me to study business and UX design at the University of Michigan. I've previously designed at Fidelity Investments, and now at Coinbase.",
  "Outside of work, I like working out, playing League of Legends, and trying new restaurants around metro Detroit.",
];

export function getWork(slug: string) {
  return works.find((item) => item.slug === slug);
}

export function formatUpdated(isoDate: string) {
  const formatted = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${isoDate}T00:00:00`));

  return `Updated ${formatted}`;
}
