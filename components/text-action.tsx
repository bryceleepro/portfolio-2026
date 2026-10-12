"use client";

import { useEffect, useRef, useState } from "react";

type ActionProps = {
  iconSrc: string;
  iconSize?: number;
  children: string;
} & (
  | {
      href: string;
      onPress?: never;
    }
  | {
      href?: never;
      onPress: () => void;
    }
);

export function TextAction({
  href,
  onPress,
  iconSrc,
  iconSize = 16,
  children,
}: ActionProps) {
  const icon = (
    <span className="action__icon" aria-hidden="true">
      <img src={iconSrc} alt="" width={iconSize} height={iconSize} />
    </span>
  );

  if (href) {
    const external = href.startsWith("http://") || href.startsWith("https://");

    return (
      <a
        href={href}
        className="action"
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {children}
        {icon}
      </a>
    );
  }

  return (
    <button type="button" className="action" onClick={onPress}>
      {children}
      {icon}
    </button>
  );
}

const CHECK_MS = 800;

export function CopyEmailAction({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const [iconOff, setIconOff] = useState(false);
  const hovering = useRef(false);
  const hideTimer = useRef<number>(0);

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current);
  }, []);

  return (
    <button
      type="button"
      className={`action${copied ? " action--copied" : ""}${iconOff ? " action--icon-off" : ""}`}
      aria-label={`Copy ${email}`}
      onMouseEnter={() => {
        hovering.current = true;
      }}
      onMouseLeave={() => {
        hovering.current = false;
        if (!copied) {
          setIconOff(false);
        }
      }}
      onClick={(event) => {
        setCopied(true);
        setIconOff(false);
        void navigator.clipboard.writeText(email).catch(() => {
          window.prompt("Copy email", email);
        });
        event.currentTarget.blur();
        window.clearTimeout(hideTimer.current);
        hideTimer.current = window.setTimeout(() => {
          setCopied(false);
          setIconOff(hovering.current);
        }, CHECK_MS);
      }}
    >
      Email
      <span className="action__icon" aria-hidden="true">
        <img
          src={copied ? "/icons/check.svg" : "/icons/email.svg"}
          alt=""
          width={copied ? 18 : 16}
          height={copied ? 18 : 16}
        />
      </span>
    </button>
  );
}
