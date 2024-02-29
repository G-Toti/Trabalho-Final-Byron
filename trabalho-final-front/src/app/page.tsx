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
  const [emblaRef, emblaAPI] = useEmblaCarousel({ loop: true, duration: 60 }, [
    Autoplay(),
  ]);
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
      <section className="bg-gray-lightest py-8">
        <div className="px-5 lg:px-16">
          <h2>TABELA</h2>
          <hr className="border-md border-black " />
          <div className="flex flex-col lg:flex-row lg:w-2/3">
            <table className="w-full">
              <tr className="border-b border-black">
                <td>
                  <p>Classificação</p>
                </td>
                <td>
                  <p className="text-center">P</p>
                </td>
                <td>
                  <p className="text-center">J</p>
                </td>
                <td>
                  <p className="text-center">V</p>
                </td>
                <td>
                  <p className="text-center">E</p>
                </td>
                <td>
                  <p className="text-center">D</p>
                </td>
                <td>
                  <p className="text-center">GP</p>
                </td>
                <td>
                  <p className="text-center">SG</p>
                </td>
                <td>
                  <p className="text-center">%</p>
                </td>
                <td className="w-0 lg:w-1/4" />
              </tr>
              <tr className="border-b border-black">
                <td>
                  <p>1 Corinthians</p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-gray-base p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-white p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-gray-base p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-white p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-gray-base p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-white p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-gray-base p-2">
                    0
                  </p>
                </td>
                <td>
                  <p className="flex items-center justify-center bg-white p-2">
                    0
                  </p>
                </td>
              </tr>
            </table>

            <div></div>
          </div>
        </div>
      </section>
    </>
  );
}
