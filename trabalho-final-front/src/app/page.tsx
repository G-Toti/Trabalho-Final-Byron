"use client";
import { useCallback, useEffect, useState } from "react";
import WeekGame from "../../components/WeekGame";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { EmblaCarouselType } from "embla-carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [selectedGame, setSelectedGame] = useState<number>(0);

  const onSelect = useCallback((emblaAPI: EmblaCarouselType) => {
    setSelectedGame(emblaAPI.selectedScrollSnap());
  }, []);

  const clickButtonDots = (index: number) => {
    if (!emblaAPI) return;

    emblaAPI.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaAPI) return;

    emblaAPI.on("init", onSelect);
    emblaAPI.on("select", onSelect);
    emblaAPI.on("reInit", onSelect);
  }, [emblaAPI, onSelect]);

  return (
    <>
      <section
        id="rodadas"
        className="flex flex-col lg:justify-evenly bg-gray-darkest text-gray-light lg:h-[576px] gap-20 lg:gap-0 py-10 lg:py-0 "
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            <WeekGame />
            <WeekGame />
            <WeekGame />
            <WeekGame />
          </div>
        </div>
        <div className="flex justify-evenly items-center h-fit">
          <button
            className="hidden lg:block"
            onClick={() => {
              emblaAPI?.scrollPrev();
            }}
          >
            {<FontAwesomeIcon icon={faChevronLeft} />}
          </button>
          <div className="flex gap-7">
            <button
              className={`w-3 h-3 lg:w-6 lg:h-6 border rounded-full ${
                selectedGame === 0
                  ? "bg-gray-lightest"
                  : "bg-gray-light opacity-50"
              }`}
              onClick={() => {
                clickButtonDots(0);
              }}
            ></button>
            <button
              className={`w-3 h-3 lg:w-6 lg:h-6 border rounded-full ${
                selectedGame === 1
                  ? "bg-gray-lightest"
                  : "bg-gray-light opacity-50"
              }`}
              onClick={() => {
                clickButtonDots(1);
              }}
            ></button>
            <button
              className={`w-3 h-3 lg:w-6 lg:h-6 border rounded-full ${
                selectedGame === 2
                  ? "bg-gray-lightest"
                  : "bg-gray-light opacity-50"
              }`}
              onClick={() => {
                clickButtonDots(2);
              }}
            ></button>
            <button
              className={`w-3 h-3 lg:w-6 lg:h-6 border rounded-full ${
                selectedGame === 3
                  ? "bg-gray-lightest"
                  : "bg-gray-light opacity-50"
              }`}
              onClick={() => {
                clickButtonDots(3);
              }}
            ></button>
          </div>
          <button
            className="hidden lg:block"
            onClick={() => {
              emblaAPI?.scrollNext();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
    </>
  );
}
