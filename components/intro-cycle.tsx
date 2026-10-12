"use client";

import { Chip } from "@heroui/react";
import { useLayoutEffect, useRef, useState } from "react";
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
const LINE_LABELS = [introLead, introWhoLabel, introCurrentlyLabel] as const;

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
  el.style.width = "max-content";
  const width = el.offsetWidth;
  el.style.width = current;
  return width;
}

function takeLine(text: string, max: number, probe: HTMLElement) {
  probe.textContent = text;
  if (probe.offsetWidth <= max) {
    return { head: text, rest: "" };
  }

  const words = text.split(/\s+/).filter(Boolean);
  let used = "";
  let count = 0;

  for (const word of words) {
    const trial = used ? `${used} ${word}` : word;
    probe.textContent = trial;
    if (probe.offsetWidth > max) {
      break;
    }
    used = trial;
    count += 1;
  }

  if (!used) {
    return { head: words[0] ?? text, rest: words.slice(1).join(" ") };
  }

  return { head: used, rest: words.slice(count).join(" ") };
}

function splitChipLines(text: string, firstMax: number, nextMax: number, probe: HTMLElement) {
  const lines: string[] = [];
  let rest = text;
  let max = firstMax;

  while (rest) {
    const piece = takeLine(rest, Math.max(0, max), probe);
    lines.push(piece.head);
    rest = piece.rest;
    max = nextMax;
  }

  return lines.length > 0 ? lines : [text];
}

function widthsClose(a: [number, number][], b: [number, number][]) {
  return (
    a.length === b.length &&
    a.every(
      ([first, next], i) => Math.abs(first - b[i][0]) < 2 && Math.abs(next - b[i][1]) < 2,
    )
  );
}

export function IntroCycle() {
  const [index, setIndex] = useState(0);
  const [rerollRot, setRerollRot] = useState(0);
  const [maxWidths, setMaxWidths] = useState<[number, number][]>([
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ]);
  const busyRef = useRef(false);
  const turningRef = useRef(false);
  const rerollBtnRef = useRef<HTMLButtonElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLParagraphElement | null>>([null, null, null]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([null, null, null]);
  const probeRef = useRef<HTMLSpanElement>(null);
  const columnWidthRef = useRef(0);
  const variant = introVariants[index];
  const texts = [variant.role, variant.who, variant.currently];
  const probe = probeRef.current;
  const lines = probe
    ? texts.map((text, i) => splitChipLines(text, maxWidths[i][0], maxWidths[i][1], probe))
    : texts.map((text) => [text]);

  function rowTracks() {
    return lineRefs.current.map((line) =>
      line ? [...line.querySelectorAll<HTMLSpanElement>(".intro__chip-track")] : [],
    );
  }

  function measureMaxWidths(): [number, number][] | null {
    const sample = linesRef.current?.querySelector<HTMLElement>(".intro__chip-track");
    if (!sample) {
      return null;
    }

    const pad = paddingWidth(sample);

    return [0, 1, 2].map((i) => {
      const line = lineRefs.current[i];
      const label = labelRefs.current[i];
      if (!line || !label) {
        return [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY] as [number, number];
      }

      const gap = parseFloat(getComputedStyle(line).columnGap) || 8;
      const next = Math.max(0, Math.floor(line.clientWidth - pad));
      const first = Math.max(0, Math.floor(next - label.offsetWidth - gap));
      return [first, next];
    });
  }

  useLayoutEffect(() => {
    const apply = (force = false) => {
      const root = linesRef.current;
      if (!root || busyRef.current) {
        return;
      }

      const columnWidth = root.clientWidth;
      if (!force && Math.abs(columnWidth - columnWidthRef.current) < 2) {
        return;
      }

      const next = measureMaxWidths();
      if (!next) {
        return;
      }

      columnWidthRef.current = columnWidth;
      setMaxWidths((current) => (widthsClose(current, next) ? current : next));
    };

    apply(true);
    const root = linesRef.current;
    if (!root || typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver(() => apply(false));
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  async function cycleChips() {
    let rows = rowTracks();

    for (const el of rows.flat()) {
      el.style.transitionDuration = `${CHIP_SHRINK_MS}ms`;
      el.style.transitionDelay = "0ms";
      el.style.width = `${el.offsetWidth}px`;
    }

    await nextFrame();

    for (const el of rows.flat()) {
      el.style.width = `${paddingWidth(el)}px`;
    }

    await wait(CHIP_SHRINK_MS);
    flushSync(() => {
      setIndex((current) => nextVariantIndex(current));
    });

    rows = rowTracks();

    rows.forEach((els, i) => {
      els.forEach((el) => {
        const collapsed = paddingWidth(el);
        el.style.transition = "none";
        const expanded = hugWidth(el);
        el.style.width = `${collapsed}px`;
        void el.offsetWidth;
        el.style.transition = `width ${CHIP_POP_MS}ms var(--motion-ease)`;
        el.style.transitionDelay = `${i * CHIP_STAGGER_MS}ms`;
        el.style.width = `${expanded}px`;
      });
    });

    await wait(CHIP_POP_MS + CHIP_STAGGER_MS * 2);

    for (const el of rows.flat()) {
      el.style.width = "auto";
      el.style.transitionDelay = "";
      el.style.transitionDuration = "";
      el.style.transition = "";
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
      <span ref={probeRef} className="intro__chip-probe" aria-hidden="true" />
      <div ref={linesRef} className="intro__lines intro__chips">
        {LINE_LABELS.map((label, row) => (
          <p
            key={label}
            className="intro__line"
            ref={(node) => {
              lineRefs.current[row] = node;
            }}
          >
            <span
              className="intro__label"
              ref={(node) => {
                labelRefs.current[row] = node;
              }}
            >
              {label}
            </span>
            {lines[row].map((piece, pieceIndex) => {
              const track = (
                <span className="intro__chip-track">
                  <Chip className="chip intro__chip">{piece}</Chip>
                </span>
              );

              if (pieceIndex === 0) {
                return (
                  <span key={`${row}-${pieceIndex}`} className="intro__chip-track">
                    <Chip className="chip intro__chip">{piece}</Chip>
                  </span>
                );
              }

              return (
                <span key={`${row}-${pieceIndex}`} className="intro__chip-continue">
                  {track}
                </span>
              );
            })}
          </p>
        ))}
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
