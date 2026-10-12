"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CopyEmailAction, TextAction } from "@/components/text-action";
import { site } from "@/lib/content";

const TAB_MARK = 24;
const NAV_HIDE_DELTA = 8;

export function SiteHeader() {
  const pathname = usePathname();
  const onWork = pathname === "/";
  const onAbout = pathname === "/about";
  const navRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLAnchorElement>(null);
  const aboutRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);
  const slotHeight = useRef(0);
  const [ready, setReady] = useState(false);
  const [indicator, setIndicator] = useState({ x: 0, visible: false });
  const [menuOpen, setMenuOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setOverlay(false);
  }, [pathname]);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        lastY.current = window.scrollY;
        setOverlay(false);
        return;
      }

      if (barRef.current && !overlay) {
        slotHeight.current = barRef.current.offsetHeight;
      }

      const y = window.scrollY;
      const delta = y - lastY.current;
      const slotBottom = slotRef.current?.getBoundingClientRect().bottom ?? 0;
      const slotOffscreen = slotBottom <= 0;

      if (!slotOffscreen) {
        setOverlay(false);
      } else if (menuOpen) {
        setOverlay(true);
      } else if (delta < -NAV_HIDE_DELTA) {
        setOverlay(true);
      } else if (delta > NAV_HIDE_DELTA) {
        setOverlay(false);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen, overlay]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }
      setMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

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
  }, [onAbout, onWork, overlay]);

  return (
    <div
      ref={slotRef}
      className="site-header-slot"
      style={overlay ? { minHeight: slotHeight.current } : undefined}
    >
      <div
        ref={barRef}
        className={`site-header-bar${overlay ? " site-header-bar--return" : ""}`}
      >
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
          <div className="site-header__end">
            <button
              ref={toggleRef}
              type="button"
              className={`menu-toggle${menuOpen ? " menu-toggle--open" : ""}`}
              aria-label={menuOpen ? "Close contact menu" : "Open contact menu"}
              aria-expanded={menuOpen}
              aria-controls="site-header-menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span className="menu-toggle__marks" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
            <div
              ref={menuRef}
              id="site-header-menu"
              className={`site-header__actions${menuOpen ? " site-header__actions--open" : ""}`}
            >
              <TextAction href={site.resumeHref} iconSrc="/icons/resume.svg">
                Resume
              </TextAction>
              <TextAction href={site.linkedinHref} iconSrc="/icons/linkedin.svg">
                LinkedIn
              </TextAction>
              <CopyEmailAction email={site.email} />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}
