import { cropStyle, isVideoSrc, type MediaCrop } from "@/lib/media";

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
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>
    );
  }

  return (
    <div className={frameClass} style={style}>
      <img src={src} alt={alt} />
    </div>
  );
}
