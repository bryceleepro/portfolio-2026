"use client";

export function BackToTop() {
  return (
    <button
      type="button"
      className="action action--back action--top"
      onClick={() => {
        const reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      }}
    >
      <span className="action__icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="M450-180v-485.08L222.15-437.23 180-480l300-300 300 300-42.15 42.77L510-665.08V-180h-60Z" />
        </svg>
      </span>
      Back to top
    </button>
  );
}
