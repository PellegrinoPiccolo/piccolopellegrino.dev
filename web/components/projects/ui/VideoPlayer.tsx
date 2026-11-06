"use client";

import type { SyntheticEvent } from "react";
import type { SanityImageSource } from "@sanity/image-url";
import type { ProjectVideo } from "@/constants/type";
import { urlFor } from "@/sanity/image";

type VideoPlayerProps = {
  video: ProjectVideo;
  label: string;
};

const pauseOthers = (event: SyntheticEvent<HTMLVideoElement>) => {
  document
    .querySelectorAll<HTMLVideoElement>("video[data-project-video]")
    .forEach((other) => {
      if (other !== event.currentTarget) other.pause();
    });
};

const VideoPlayer = ({ video, label }: VideoPlayerProps) => {
  const poster = video.poster?.asset
    ? urlFor(video.poster as SanityImageSource).width(720).url()
    : undefined;

  return (
    <video
      data-project-video
      aria-label={label}
      poster={poster}
      controls
      playsInline
      preload={poster ? "none" : "metadata"}
      onPlay={pauseOthers}
      className="aspect-9/16 w-full rounded-lg object-contain [&:fullscreen]:rounded-none"
    >
      <source src={video.url ?? undefined} type={video.mimeType ?? undefined} />
    </video>
  );
};

export default VideoPlayer;
