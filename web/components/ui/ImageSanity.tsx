import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/image";

const SIZES = {
  md: 800,
  lg: 1600,
} as const;

type ImageSize = keyof typeof SIZES;

type SanityImage = Exclude<SanityImageSource, string> & {
  alt?: string;
  asset?: {
    metadata?: {
      lqip?: string;
      dimensions?: { aspectRatio?: number };
    };
  };
};

type ImageSanityProps = {
  image: SanityImage | null | undefined;
  size?: ImageSize;
  alt?: string;
  aspectRatio?: number;
  className?: string;
  sizes?: string;
  preload?: boolean;
};

const ImageSanity = ({
  image,
  size = "md",
  alt,
  aspectRatio,
  className,
  sizes,
  preload,
}: ImageSanityProps) => {
  if (!image?.asset) return null;

  const ratio = aspectRatio ?? image.asset.metadata?.dimensions?.aspectRatio ?? 16 / 9;
  const width = SIZES[size];
  const height = Math.round(width / ratio);
  const lqip = image.asset.metadata?.lqip;

  return (
    <Image
      src={urlFor(image).width(width).height(height).fit("crop").url()}
      alt={alt ?? image.alt ?? ""}
      width={width}
      height={height}
      sizes={sizes ?? `(width >= 48rem) ${width}px, 100vw`}
      className={className}
      preload={preload}
      placeholder={lqip ? "blur" : "empty"}
      blurDataURL={lqip}
    />
  );
};

export default ImageSanity;
