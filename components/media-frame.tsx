"use client";

import { useEffect, useRef } from "react";
import { cropStyle, isVideoSrc, type MediaCrop } from "@/lib/media";

function AutoPlayVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "true");
    el.setAttribute("webkit-playsinline", "true");

    const play = () => {
      void el.play().catch(() => undefined);
    };

    play();
    el.addEventListener("canplay", play);
    el.addEventListener("loadeddata", play);
    const onVis = () => {
      if (document.visibilityState === "visible") {
        play();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pageshow", play);

    return () => {
      el.removeEventListener("canplay", play);
      el.removeEventListener("loadeddata", play);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pageshow", play);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-hidden
    />
  );
}

export function MediaFrame({
  src,
  alt = "",
  className,
  crop,
}: {
  src?: string;
  alt?: string;
  className?: string;
  crop?: MediaCrop;
}) {
  const kind = !src
    ? ""
    : isVideoSrc(src)
      ? ` media-frame--video${crop ? " media-frame--cropped" : ""}`
      : crop
        ? " media-frame--image media-frame--cropped"
        : " media-frame--image";
  const frameClass = `media-frame${kind}${className ? ` ${className}` : ""}`;
  const style = cropStyle(crop);

  if (!src) {
    return <div className={frameClass} aria-hidden="true" />;
  }

  if (isVideoSrc(src)) {
    return (
      <div className={frameClass} style={style}>
        <AutoPlayVideo src={src} />
      </div>
    );
  }

  return (
    <div className={frameClass} style={style}>
      <img src={src} alt={alt} />
    </div>
  );
}
