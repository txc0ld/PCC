import Image from "next/image";
import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export type PlateTone = "ash" | "cream" | "stone" | "slate" | "iron" | "mid" | "green";

const tones: Record<PlateTone, string> = {
  ash: "#d8d2c5",
  cream: "#e8dfcf",
  stone: "#bcb3a3",
  slate: "#8f8a80",
  iron: "#66645f",
  mid: "#aaa399",
  green: "#88917f",
};

type Props = {
  tone?: PlateTone;
  aspect?: string;
  caption?: string;
  index?: string;
  rounded?: boolean;
  className?: string;
  src?: string;
  alt?: string;
  imageFit?: "cover" | "contain";
  children?: React.ReactNode;
};

export function ImagePlate({
  tone = "stone",
  aspect = "4/5",
  caption,
  index,
  rounded = false,
  className,
  src,
  alt = "",
  imageFit = "cover",
  children,
}: Props) {
  const style: CSSProperties = {
    aspectRatio: aspect,
    background: tones[tone],
  };

  return (
    <figure
      className={cn(
        "material-grain relative w-full overflow-hidden bg-[var(--color-limestone)]",
        rounded && "rounded-md",
        className
      )}
      style={style}
    >
      {src && (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className={imageFit === "contain" ? "object-contain" : "object-cover"}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, rgba(255,255,255,0.22), rgba(255,255,255,0) 34%, rgba(0,0,0,0.10) 100%)",
        }}
      />

      <CropMark position="tl" />
      <CropMark position="tr" />
      <CropMark position="bl" />
      <CropMark position="br" />

      {index && (
        <span className="t-mono absolute right-4 top-4 text-[11px] text-[var(--color-ink)]/65">
          {index}
        </span>
      )}

      {caption && (
        <figcaption className="t-eyebrow absolute bottom-4 left-4 max-w-[75%] text-[var(--color-ink)]/75">
          {caption}
        </figcaption>
      )}

      {children}
    </figure>
  );
}

function CropMark({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map: Record<string, string> = {
    tl: "left-3 top-3",
    tr: "right-3 top-3",
    bl: "left-3 bottom-3",
    br: "right-3 bottom-3",
  };
  const hFlip = position === "tr" || position === "br";
  const vFlip = position === "bl" || position === "br";

  return (
    <span
      aria-hidden="true"
      className={cn("absolute block h-3 w-3", map[position])}
      style={{
        borderTop: vFlip ? undefined : "1px solid rgba(25,24,22,0.28)",
        borderBottom: vFlip ? "1px solid rgba(25,24,22,0.28)" : undefined,
        borderLeft: hFlip ? undefined : "1px solid rgba(25,24,22,0.28)",
        borderRight: hFlip ? "1px solid rgba(25,24,22,0.28)" : undefined,
      }}
    />
  );
}
