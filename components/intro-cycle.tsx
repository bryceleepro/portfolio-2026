"use client";

import { Chip } from "@heroui/react";
import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  introCurrentlyLabel,
  introLead,
  introVariants,
  introWhoLabel,
} from "@/lib/content";

const CHIP_SHRINK_MS = 200;
const CHIP_POP_MS = 360;
const CHIP_STAGGER_MS = 70;
const REROLL_TURN_MS = 480;
const REROLL_SHAPE_MS = 180;
const CLICK_ROTATION = 360;

function nextVariantIndex(current: number) {
  if (introVariants.length < 2) {
    return 0;
  }

  let next = current;
  while (next === current) {
    next = Math.floor(Math.random() * introVariants.length);
  }
  return next;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function nextFrame() {
  return new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });
}

function paddingWidth(el: HTMLElement) {
  const styles = window.getComputedStyle(el);
  return parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
}

function hugWidth(el: HTMLElement) {
  const current = el.style.width;
  el.style.width = "auto";
  const width = el.offsetWidth;
  el.style.width = current;
  return width;
}

export function IntroCycle() {
  const [index, setIndex] = useState(0);
  const [rerollRot, setRerollRot] = useState(0);
  const busyRef = useRef(false);
  const turningRef = useRef(false);
  const rerollBtnRef = useRef<HTMLButtonElement>(null);
  const trackRefs = useRef<Array<HTMLSpanElement | null>>([null, null, null]);
  const variant = introVariants[index];

  function tracks() {
    return trackRefs.current.filter((node): node is HTMLSpanElement => node !== null);
  }

  async function cycleChips() {
    const nodes = tracks();

    for (const el of nodes) {
      el.style.transitionDuration = `${CHIP_SHRINK_MS}ms`;
      el.style.transitionDelay = "0ms";
      el.style.width = `${el.offsetWidth}px`;
    }

    await nextFrame();

    for (const el of nodes) {
      el.style.width = `${paddingWidth(el)}px`;
    }

    await wait(CHIP_SHRINK_MS);
    flushSync(() => {
      setIndex((current) => nextVariantIndex(current));
    });

    nodes.forEach((el, i) => {
      const collapsed = paddingWidth(el);
      el.style.transition = "none";
      const expanded = hugWidth(el);
      el.style.width = `${collapsed}px`;
      void el.offsetWidth;
      el.style.transition = `width ${CHIP_POP_MS}ms var(--motion-ease)`;
      el.style.transitionDelay = `${i * CHIP_STAGGER_MS}ms`;
      el.style.width = `${expanded}px`;
    });

    await wait(CHIP_POP_MS + CHIP_STAGGER_MS * 2);

    for (const el of nodes) {
      el.style.width = "auto";
      el.style.transitionDelay = "";
      el.style.transitionDuration = "";
    }
  }

  async function cycle() {
    if (busyRef.current) {
      return;
    }

    busyRef.current = true;
    const btn = rerollBtnRef.current;
    if (btn && !prefersReducedMotion()) {
      turningRef.current = true;
      btn.classList.add("reroll--spinning");
      await nextFrame();
      btn.style.transition = [
        "background-color var(--motion-duration) var(--motion-ease)",
        "border-radius var(--motion-duration) var(--motion-ease)",
        `transform ${REROLL_TURN_MS}ms var(--motion-ease)`,
      ].join(", ");
      setRerollRot(CLICK_ROTATION);
    }

    try {
      if (prefersReducedMotion()) {
        setIndex((current) => nextVariantIndex(current));
      } else {
        await cycleChips();
      }
    } finally {
      busyRef.current = false;
    }
  }

  function snapRerollHome() {
    turningRef.current = false;
    const btn = rerollBtnRef.current;
    if (btn) {
      btn.style.transition = [
        "background-color var(--motion-duration) var(--motion-ease)",
        "border-radius var(--motion-duration) var(--motion-ease)",
        "transform 0s",
      ].join(", ");
      btn.classList.remove("reroll--spinning");
    }
    setRerollRot(0);
    window.setTimeout(() => {
      if (btn) {
        btn.style.transition = "";
      }
    }, REROLL_SHAPE_MS);
  }

  function onRerollTransitionEnd(event: React.TransitionEvent<HTMLButtonElement>) {
    if (event.propertyName !== "transform" || !turningRef.current) {
      return;
    }
    snapRerollHome();
  }

  return (
    <section className="intro" aria-label="Introduction" aria-live="polite">
      <div className="intro__lines intro__chips">
        <p className="intro__line">
          <span className="intro__label">{introLead}</span>
          <span
            className="intro__chip-track"
            ref={(node) => {
              trackRefs.current[0] = node;
            }}
          >
            <Chip className="chip intro__chip">{variant.role}</Chip>
          </span>
        </p>
        <p className="intro__line">
          <span className="intro__label">{introWhoLabel}</span>
          <span
            className="intro__chip-track"
            ref={(node) => {
              trackRefs.current[1] = node;
            }}
          >
            <Chip className="chip intro__chip">{variant.who}</Chip>
          </span>
        </p>
        <p className="intro__line">
          <span className="intro__label">{introCurrentlyLabel}</span>
          <span
            className="intro__chip-track"
            ref={(node) => {
              trackRefs.current[2] = node;
            }}
          >
            <Chip className="chip intro__chip">{variant.currently}</Chip>
          </span>
        </p>
      </div>
      <button
        ref={rerollBtnRef}
        type="button"
        className="reroll"
        aria-label="Show another introduction"
        style={{ transform: `rotate(${rerollRot}deg)` }}
        onClick={() => {
          void cycle();
        }}
        onTransitionEnd={onRerollTransitionEnd}
      >
        <img src="/icons/reroll.svg" alt="" width={40} height={40} />
      </button>
    </section>
  );
}
