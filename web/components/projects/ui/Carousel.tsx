"use client";

import type { ProjectGalleryImage } from "@/constants/type";
import Image from "next/image";
import React, { useState } from "react";
import {
  Carousel as ShadcnCarousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";
import { urlFor } from "@/sanity/image";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

type CarouselProps = {
  images: ProjectGalleryImage[];
};

const Carousel = ({ images }: CarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const count = images.length;
  const [current, setCurrent] = useState(1);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);

    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <PhotoProvider>
      <div className="flex flex-col items-center gap-2 md:gap-4">
        <ShadcnCarousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image._key}>
                <figure>
                  <div className="flex aspect-4/3 md:aspect-16/10 max-h-[75svh] w-full items-center justify-center overflow-hidden rounded-lg bg-card/40 p-2 md:p-4">
                    <PhotoView
                      src={urlFor(image as SanityImageSource)
                        .width(2400)
                        .url()}
                    >
                      <Image
                        src={urlFor(image as SanityImageSource)
                          .width(1600)
                          .url()}
                        alt={
                          image.alt ?? `Carousel image ${index + 1} of ${count}`
                        }
                        width={1600}
                        height={Math.round(
                          1600 /
                            (image.asset?.metadata?.dimensions?.aspectRatio ??
                              16 / 10),
                        )}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="max-h-full max-w-full w-auto h-auto cursor-zoom-in rounded-lg"
                      />
                    </PhotoView>
                  </div>
                  {image.caption && (
                    <figcaption className="mt-3 px-2 text-center font-mono text-sm md:text-base text-heading">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className={`${controlClassName} left-3 md:left-5 2xl:-left-14`}
          />
          <CarouselNext
            className={`${controlClassName} right-3 md:right-5 2xl:-right-14`}
          />
        </ShadcnCarousel>
        <div className="text-center font-mono text-xs md:text-sm text-description">
          {current}/{count}
        </div>
      </div>
    </PhotoProvider>
  );
};

const controlClassName =
  "size-9 md:size-10 border-2 border-divider bg-page/80 text-heading backdrop-blur-sm transition-all duration-300 ease-out hover:border-indicator hover:bg-indigo-deep hover:text-heading hover:shadow-[0_10px_30px_-12px_var(--color-indicator)] focus-visible:border-indicator focus-visible:ring-indicator/40 disabled:opacity-30 [&_svg:not([class*='size-'])]:size-5";

export default Carousel;
