/** Paths under `/public`, e.g. `/media/work/usdc-earn.mp4`. */

const VIDEO = /\.(mp4|webm|ogg|mov)(\?|#|$)/i;

export function isVideoSrc(src: string) {
  return VIDEO.test(src);
}

/** Pixel insets from each edge of the source. Frame width stays the column. */
export type MediaCrop = {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  width: number;
  height: number;
};

export function cropStyle(crop?: MediaCrop): Record<string, string> | undefined {
  if (!crop) {
    return undefined;
  }

  const left = crop.left ?? 0;
  const top = crop.top ?? 0;
  const visW = crop.width - left - (crop.right ?? 0);
  const visH = crop.height - top - (crop.bottom ?? 0);

  return {
    "--media-ratio": `${visW} / ${visH}`,
    "--media-src-w": `${crop.width}`,
    "--media-src-h": `${crop.height}`,
    "--media-vis-w": `${visW}`,
    "--media-vis-h": `${visH}`,
    "--media-left": `${left}`,
    "--media-top": `${top}`,
  };
}
