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
  const [emblaRef, emblaAPI] = useEmblaCarousel(
    { loop: true, watchDrag: true },
    [Autoplay()]
  );
  const [canDrag, setDrag] = useState(false);
  const [windowSize, setWindowSize] = useState(0);
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

  useEffect(() => {
    const handleSize = () => {
      setWindowSize(window.innerWidth);
    };
    handleSize();
    window.addEventListener("resize", handleSize);

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  useEffect(() => {
    let newOptions = {};

    if (!canDrag && windowSize < 1024) {
      newOptions = { loop: true, watchDrag: true };
      setDrag(true);
    } else if (canDrag && windowSize >= 1024) {
      newOptions = { loop: true, watchDrag: false };
      setDrag(false);
    }

    emblaAPI?.reInit(newOptions);
  }, [windowSize]);

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
          <div className="flex flex-col lg:flex-row gap-10">
            <hr className="border-md border-black " />
            <div className="lg:w-2/3">
              <table className="w-full">
                <tbody>
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
                    <td className="w-0 lg:w-1/5" />
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
                </tbody>
              </table>
            </div>
            <div className="lg:border-l border-black lg:w-1/3 lg:pl-2">
              <h2 className="text-4xl font-bold"> JOGOS </h2>

              <div className="flex justify-between py-2">
                <button>
                  <FontAwesomeIcon
                    className="text-yellow-base"
                    icon={faChevronLeft}
                  />
                </button>
                <h3 className="text-2xl">N RODADA</h3>
                <button>
                  <FontAwesomeIcon
                    className="text-yellow-base"
                    icon={faChevronRight}
                  />
                </button>
              </div>

              <div className="flex flex-col gap-4 border-t border-black py-1">
                <div className="flex justify-around text-sm">
                  <p>Neo Quimica Arena</p>

                  <p>28/02 - 19:30</p>
                </div>
                <div className="flex justify-around items-center text-lg font-semibold">
                  <p>COR</p>
                  <picture className="w-1/5">
                    <img
                      src="https://s.sde.globo.com/media/organizations/2019/09/30/Corinthians.svg"
                      alt=""
                      className="w-full"
                    />
                  </picture>
                  <span className="text-gray-400">X</span>
                  <picture className="w-1/5">
                    <img
                      src="https://s.sde.globo.com/media/organizations/2019/07/06/Palmeiras.svg"
                      alt=""
                      className="w-full"
                    />
                  </picture>
                  <p>PAL</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
