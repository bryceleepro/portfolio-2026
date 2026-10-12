"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CopyEmailAction, TextAction } from "@/components/text-action";
import { site } from "@/lib/content";

const TAB_MARK = 24;

export function SiteHeader() {
  const pathname = usePathname();
  const onWork = pathname === "/";
  const onAbout = pathname === "/about";
  const navRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);
  const [ready, setReady] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, visible: false });

  useEffect(() => {
    setReady(true);
  }, []);

  useLayoutEffect(() => {
    const nav = navRef.current;
    const active = onWork
      ? workRef.current
      : onAbout
        ? aboutRef.current
        : null;

    if (!nav) {
      return;
    }

    if (!active) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }

    const navBox = nav.getBoundingClientRect();
    const tabBox = active.getBoundingClientRect();
    const x = tabBox.left - navBox.left + (tabBox.width - TAB_MARK) / 2;
    setIndicator({ x, visible: true });
  }, [onAbout, onWork]);

  return (
    <header className="site-header">
      <nav ref={navRef} className="site-header__tabs" aria-label="Primary">
        <NextLink
          ref={workRef}
          href="/"
          className={`tab${onWork ? " tab--active" : ""}`}
        >
          Work
        </NextLink>
        <NextLink
          ref={aboutRef}
          href="/about"
          className={`tab${onAbout ? " tab--active" : ""}`}
        >
          About
        </NextLink>
        <span
          className={`tab-indicator${indicator.visible ? " tab-indicator--on" : ""}${ready ? " tab-indicator--animate" : ""}`}
          aria-hidden
          style={{ transform: `translate3d(${indicator.x}px, 0, 0)` }}
        />
      </nav>
      <div className="site-header__actions">
        <TextAction href={site.resumeHref} iconSrc="/icons/resume.svg">
          Resume
        </TextAction>
        <TextAction href={site.linkedinHref} iconSrc="/icons/linkedin.svg">
          LinkedIn
        </TextAction>
        <CopyEmailAction email={site.email} />
      </div>
    </header>
  );
}
