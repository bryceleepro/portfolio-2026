import type { MediaCrop } from "@/lib/media";

export type { MediaCrop };

export type CaseListItem = {
  lead: string;
  text: string;
};

export type CaseBlock =
  | { type: "p"; text: string }
  | { type: "ol"; items: CaseListItem[] }
  | {
      type: "figure";
      src?: string;
      alt?: string;
      caption?: string;
      crop?: MediaCrop;
    };

const hd = { width: 1920, height: 1080 };
export const activitiesCardCrop = { ...hd, left: 215, right: 203, bottom: 1 };
export const usdcEarnHero = { width: 4800, height: 2688 };
export const usdcBanners = { width: 6400, height: 5040, top: 471, bottom: 471 };
export const usdcEnrollmentModal = { width: 6400, height: 3600 };

export type CaseSection = {
  heading?: string;
  lede?: string;
  blocks: CaseBlock[];
};

export type CaseStudyContent = {
  title?: string;
  when?: string;
  sections: CaseSection[];
};

export const caseStudies: Record<string, CaseStudyContent> = {
  "activities-timeline": {
    when: "Summer 2025",
    sections: [
    {
      heading: "Context and problem",
      lede: "Prime’s activity timeline wasn’t designed for workflows with multiple required actions",
      blocks: [
        {
          type: "p",
          text: "Coinbase Prime helps institutional teams manage millions of dollars in assets. Each team includes members with different roles and permissions, including designated approvers responsible for authorizing activities. These users rely on the Activities page to track more than 100 activity types, from transfers and wallet creation to team governance. Each activity includes a timeline showing its progress and any actions the team must complete.",
        },
        {
          type: "p",
          text: "The timeline was originally built around consensus approval as the sole required action. As workflows expanded to include video authorization, mobile signing, and other requirements, three limitations became clear:",
        },
        {
          type: "ol",
          items: [
            {
              lead: "Limited status visibility",
              text: "The timeline only showed the status of consensus approvals, but could not display newer actions like video authorizations or mobile signing.",
            },
            {
              lead: "Unscalable hierarchy",
              text: "Every submission for consensus approvals stacked beneath each other, making timelines longer and difficult to scan as they became more complex.",
            },
            {
              lead: "No concurrent actions",
              text: "Teams had to complete one action before the next became available, creating unnecessary delays.",
            },
          ],
        },
      ],
    },
    {
      heading: "Solution",
      lede: "A timeline built for non-sequential actions",
      blocks: [
        {
          type: "p",
          text: "The redesign allowed most required actions to progress in parallel. A user could approve an activity or submit a video authorization without waiting for the team to finish another action, reducing delays and repeat visits.",
        },
        {
          type: "figure",
          src: "/media/activities/solution.mp4",
          alt: "Redesigned activity timeline with required actions progressing in parallel",
          crop: { ...hd, left: 177, right: 178, bottom: 2 },
        },
        {
          type: "p",
          text: "I also refined the timeline as a cohesive system, introducing clearer hierarchy, richer status visibility, and flexible component patterns to scale existing and future workflows. Three key principles shaped the final design.",
        },
      ],
    },
    {
      heading: "Principle 1",
      lede: "Representing parallel actions within a linear timeline",
      blocks: [
        {
          type: "p",
          text: "The timeline needed to represent a non-linear checklist within a linear lifecycle. To keep it simple, I first explored displaying each action as a separate step in the timeline, then more literal nesting patterns that accounted for the different orders in which they could be completed. The first approach implied a fixed sequence; the second introduced complexity that would only grow as activities required more actions.",
        },
        {
          type: "figure",
          src: "/media/activities/iteration-1.png",
          alt: "First timeline iteration with each action as its own step",
          caption:
            "The first iteration was simple, but inaccurately implied a fixed sequence.",
          crop: {
            width: 5280,
            height: 3752,
            left: 845,
            right: 845,
            top: 375,
            bottom: 375,
          },
        },
        {
          type: "figure",
          src: "/media/activities/iteration-2.mp4",
          alt: "Second timeline iteration mapping every action permutation",
          caption:
            "The second iteration was accurate, but mapping every permutation to its sequence became unscalable.",
          crop: { ...hd, left: 325, right: 324 },
        },
        {
          type: "p",
          text: "A feedback session from our account managers clarified what mattered most: clients wanted to distinguish the actions that their team needed to take from the processes handled by the system. This shifted the goal from visualizing every possible sequence to clearly distinguishing team responsibilities from system processes.",
        },
        {
          type: "p",
          text: "I grouped all actions under a single “Actions Required” parent row. Most actions could be taken in any order, while sequential dependencies received a distinct treatment when needed. We also extended this model beyond the timeline, establishing “Actions Required” as a status across Prime’s activity surfaces whenever a team needed to give input. By making this stage explicit, we aimed to give teams greater confidence in what they needed to do and what the system would handle next.",
        },
        {
          type: "figure",
          src: "/media/activities/final-iteration.mp4",
          alt: "Final timeline grouping actions under an Actions Required parent row",
          caption:
            "The final model established “Actions Required” as a distinct status, making team responsibilities easier to recognize.",
          crop: activitiesCardCrop,
        },
      ],
    },
    {
      heading: "Principle 2",
      lede: "Separating progress from actionability",
      blocks: [
        {
          type: "p",
          text: "Early concepts placed CTA buttons directly within the timeline rows. While this made sense at first, it broke down in the context of the full activity page, where the buttons also appeared in the page header. This created competing entry points and added visual noise without making required work easier to find. More fundamentally, embedding actions in the timeline asked it to serve two different jobs: tracking the team’s progress and guiding individual team members on what to do next.",
        },
        {
          type: "p",
          text: "I separated these responsibilities into two components. The timeline remained a shared record of the team’s progress, while a new “Your Actions” section surfaced the tasks available to the individual user. This gave required work greater prominence without cluttering the timeline.",
        },
        {
          type: "figure",
          src: "/media/activities/splitting-actions.mp4",
          alt: "Your Actions section separated from the shared activity timeline",
          caption:
            "Separating CTAs from the timeline gave required work greater visibility across the activity detail page.",
          crop: { ...hd, left: 176, right: 178 },
        },
      ],
    },
    {
      heading: "Principle 3",
      lede: "Preserving clarity and trust across every state",
      blocks: [
        {
          type: "p",
          text: "Institutional teams manage high-stakes activities and need to understand their status at a glance. At every stage, I highlighted the most relevant information by prioritizing clear visual and content design, while using progressive disclosure to keep secondary details accessible.",
        },
        {
          type: "figure",
          src: "/media/activities/copy-logic.mp4",
          alt: "Timeline step titles adapting language by progress and actionability",
          caption:
            "Each title begins with a noun to describe the step, then adapts its language based on progress and actionability.",
          crop: { ...hd, left: 201, right: 200, bottom: 1 },
        },
        {
          type: "figure",
          src: "/media/activities/video-authorization.mp4",
          alt: "Video authorization badges summarizing verification status",
          caption:
            "To preserve scannability for video authorization, badges summarized the submissions’ verification status while rejected submissions were hidden by default.",
          crop: { ...hd, left: 219, right: 203, bottom: 1 },
        },
        {
          type: "p",
          text: "The same focus on clarity and accuracy extended to terminal states. The timeline reflected the final outcome while preserving the history users needed for an audit, even when an activity did not complete as planned.",
        },
        {
          type: "figure",
          src: "/media/activities/error-states.mp4",
          alt: "Error state on the timeline preserving progress and dropping future steps",
          caption:
            "When an activity encountered an error, the timeline preserved its latest progress while removing future steps that were no longer relevant.",
          crop: { ...hd, left: 280, right: 281 },
        },
      ],
    },
    ],
  },
  "usdc-earn": {
    title: "Scaling the Institutional USDC Experience",
    when: "2025 - present",
    sections: [
      {
        heading: "Overview",
        lede: "Expanding how institutions discover, adopt, and earn with USDC",
        blocks: [
          {
            type: "p",
            text: "As a designer on the USDC team, I spent the past year growing USDC adoption and earning opportunities for institutional clients across Coinbase Prime. My work spanned multiple launches for programs such as Rewards, Rebates, PrimePlus, and Agency Lending, with a focus on driving growth through promotions, simplifying enrollment, and evolving the Earn Center as the product suite expanded.",
          },
        ],
      },
      {
        heading: "Focus 1",
        lede: "Driving growth across the USDC journey",
        blocks: [
          {
            type: "p",
            text: "From institutions that had yet to hold USDC or enroll in an earning program to those already earning the highest rate and eligible for additional opportunities, I designed targeted in-product promotions for clients across different stages of adoption. I also designed the institutional USDC website to help prospective clients learn about the benefits of USDC on Coinbase Prime.",
          },
          {
            type: "figure",
            src: "/media/usdc/banners.png",
            alt: "In-product banners for USDC rebates, rewards, and enrollment",
            crop: usdcBanners,
          },
        ],
      },
      {
        heading: "Focus 2",
        lede: "Simplifying program enrollment across launches",
        blocks: [
          {
            type: "p",
            text: "I designed enrollment and policy-update flows across Coinbase Prime and Exchange as we expanded the ways institutions could earn with USDC. The work focused on translating legal terms, eligibility rules, and program-specific requirements into clear user journeys while establishing patterns that could scale across multiple adjacent products.",
          },
          {
            type: "figure",
            src: "/media/usdc/enrollment-modal.png",
            alt: "Set up Prime Rewards enrollment modal",
            crop: usdcEnrollmentModal,
          },
        ],
      },
      {
        heading: "Focus 3",
        lede: "Evolving the Earn Center",
        blocks: [
          {
            type: "p",
            text: "I evolved the Earn Center, the primary place for clients to view USDC opportunities and track their earnings, to support multiple product launches. As its capabilities expanded, I focused on improving usability and establishing cohesive patterns across the surface. Currently, after a year of launches, our team is applying learnings from client feedback to a broader redesign of the Earn Center, creating a more cohesive foundation for its continued growth.",
          },
          {
            type: "figure",
            src: "/media/usdc/earn-hero-alt-4.png",
            alt: "Earn Center with total earned, enrolled balance, and asset opportunities",
            crop: usdcEarnHero,
          },
        ],
      },
    ],
  },
};

export function getCaseStudy(slug: string) {
  return caseStudies[slug] ?? null;
}
