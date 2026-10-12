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

function variantLineCount(text: string, firstMax: number, nextMax: number, probe: HTMLElement) {
  return splitChipLines(text, firstMax, nextMax, probe).length;
}

export function IntroCycle() {
  const [index, setIndex] = useState(0);
  const [rerollSpinning, setRerollSpinning] = useState(false);
  const [maxWidths, setMaxWidths] = useState<[number, number][]>([
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY],
  ]);
  const [linesMinHeight, setLinesMinHeight] = useState<number | null>(null);
  const busyRef = useRef(false);
  const turningRef = useRef(false);
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

  function measureLinesMinHeight(widths: [number, number][]) {
    const root = linesRef.current;
    const probe = probeRef.current;
    const sample = root?.querySelector<HTMLElement>(".intro__chip-track");
    const firstLine = lineRefs.current[0];
    if (!root || !probe || !sample || !firstLine) {
      return null;
    }

    const chipH = sample.offsetHeight;
    if (chipH < 8) {
      return null;
    }

    const wrapGap = parseFloat(getComputedStyle(firstLine).rowGap) || 4;
    const lineGap = parseFloat(getComputedStyle(root).rowGap) || 12;
    const fields = ["role", "who", "currently"] as const;

    let max = 0;
    for (const item of introVariants) {
      const heights = fields.map((field, i) => {
        const rows = variantLineCount(item[field], widths[i][0], widths[i][1], probe);
        return rows * chipH + Math.max(0, rows - 1) * wrapGap;
      });
      const total = heights.reduce((sum, height) => sum + height, 0) + lineGap * (heights.length - 1);
      max = Math.max(max, total);
    }

    return max;
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
      const minHeight = measureLinesMinHeight(next);
      if (minHeight) {
        setLinesMinHeight((current) =>
          current !== null && Math.abs(current - minHeight) < 2 ? current : minHeight,
        );
      }
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
    if (!prefersReducedMotion()) {
      turningRef.current = true;
      flushSync(() => {
        setRerollSpinning(true);
      });
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

  function onRerollSpinAnimationEnd(event: React.AnimationEvent<HTMLButtonElement>) {
    if (event.target !== event.currentTarget || !turningRef.current) {
      return;
    }
    turningRef.current = false;
    setRerollSpinning(false);
  }

  return (
    <section className="intro" aria-label="Introduction" aria-live="polite">
      <span ref={probeRef} className="intro__chip-probe" aria-hidden="true" />
      <div
        ref={linesRef}
        className="intro__lines intro__chips"
        style={linesMinHeight ? { minHeight: linesMinHeight } : undefined}
      >
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
        key="reroll"
        type="button"
        className={rerollSpinning ? "reroll reroll--spinning" : "reroll"}
        aria-label="Show another introduction"
        onClick={() => {
          void cycle();
        }}
        onAnimationEnd={onRerollSpinAnimationEnd}
      >
        <img src="/icons/reroll.svg" alt="" width={40} height={40} />
      </button>
    </section>
  );
}
