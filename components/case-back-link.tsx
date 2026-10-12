import NextLink from "next/link";

export function CaseBackLink() {
  return (
    <NextLink href="/" className="action action--back">
      <span className="action__icon" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 -960 960 960"
          fill="currentColor"
        >
          <path d="m294.92-450 227.85 227.85L480-180 180-480l300-300 42.77 42.15L294.92-510H780v60H294.92Z" />
        </svg>
      </span>
      Back
    </NextLink>
  );
}
