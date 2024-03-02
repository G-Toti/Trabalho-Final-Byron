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
import {
  ICampeonato,
  IJogo,
  IRodada,
  ITime,
} from "../../interface/campeonatos";
import { getData } from "../../modules/campeonatos_requests";

useEmblaCarousel.globalOptions = { loop: true };

export default function Home() {
  const [emblaRef, emblaAPI] = useEmblaCarousel(
    { loop: true, watchDrag: true },
    [Autoplay()]
  );
  const [canDrag, setDrag] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const [selectedGame, setSelectedGame] = useState<number>(0);

  const [curCampeonato, setCurCampeonato] = useState(0);
  const [curRodada, setCurRodada] = useState(38);
  const [lastRodada, setLastRodada] = useState(0);
  const [rodadas, setRodadas] = useState<IRodada[]>();
  const [jogosDaSemana, setJogosDaSemana] = useState<IJogo[]>();

  const [times, setTimes] = useState<ITime[]>();

  useEffect(() => {
    const getCampeonato = async () => {
      const res = await getData("campeonatos");
      setLastRodada(res.data[curCampeonato].rodadaAtual);
      setRodadas(res.data[curCampeonato].rodadas);
    };

    const getTimes = async () => {
      const res = await getData(
        "times",
        "_sort=-estatisticas.pontos,-estatisticas.saldoDeGols"
      );
      setTimes(res.data);
    };
    getTimes();

    getCampeonato();
  }, [curCampeonato]);

  useEffect(() => {
    // pegar as partidas da ultima rodada
    if (!rodadas) return;
    setJogosDaSemana(rodadas[lastRodada - 1].jogos);
  }, [rodadas, lastRodada]);

  const onSelect = useCallback((emblaAPI: EmblaCarouselType) => {
    setSelectedGame(emblaAPI.selectedScrollSnap());
  }, []);

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
    if (!emblaAPI) return;

    let newOptions = {};

    if (!canDrag && windowSize < 1024) {
      newOptions = { watchDrag: true };
      setDrag(true);
    } else if (canDrag && windowSize >= 1024) {
      newOptions = { watchDrag: false };
      setDrag(false);
    }

    emblaAPI.reInit(newOptions);
  }, [windowSize, emblaAPI]);

  const clickButtonDots = (index: number) => {
    if (!emblaAPI) return;

    emblaAPI.scrollTo(index);
  };

  return (
    <>
      <section
        id="rodadas"
        className="flex flex-col lg:justify-evenly bg-gray-darkest text-gray-light lg:h-[576px] gap-10 lg:gap-0 py-10 lg:py-0 "
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {jogosDaSemana?.map((item, key) => (
              <WeekGame jogo={item} key={key} />
            ))}
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
          <div className="flex gap-2 lg:gap-7">
            {jogosDaSemana?.map((_, key) => (
              <button
                key={key}
                className={`w-3 h-3 lg:w-6 lg:h-6 border rounded-full ${
                  selectedGame === key
                    ? "bg-gray-lightest"
                    : "bg-gray-light opacity-50"
                }`}
                onClick={() => {
                  clickButtonDots(key);
                }}
              ></button>
            ))}
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
      <section id="tabela" className="bg-gray-lightest py-8">
        <div className="flex flex-col gap-5 px-5 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="space-y-5 lg:w-2/3">
              <h2 className="text-4xl font-bold">TABELA</h2>
              <hr className="border-sm border-black" />
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
                      <p className="hidden lg:block text-center">GP</p>
                    </td>
                    <td>
                      <p className="hidden lg:block text-center">GC</p>
                    </td>
                    <td>
                      <p className="hidden lg:block text-center">SG</p>
                    </td>
                    <td>
                      <p className="hidden lg:block text-center">%</p>
                    </td>
                    <td className="w-1/6 lg:w-1/5" />
                  </tr>
                  {times?.map((item, key) => (
                    <tr key={key} className="border-b border-black">
                      <td className="flex items-center gap-3  font-bold text-lg">
                        <span>{key + 1}</span>
                        <p className="hidden sm:block">{item.nome}</p>
                        <picture className="block md:hidden w-1/5">
                          <img
                            src={item.brasao}
                            alt={`Brasão do ${item.nome}`}
                          />
                        </picture>
                        <p className="block sm:hidden">{item.sigla}</p>
                      </td>
                      <td>
                        <p className="flex items-center justify-center bg-gray-base p-2">
                          {item.estatisticas.pontos}
                        </p>
                      </td>
                      <td>
                        <p className="flex items-center justify-center bg-white p-2">
                          {item.estatisticas.numeroDeJogos}
                        </p>
                      </td>
                      <td>
                        <p className="flex items-center justify-center bg-gray-base p-2">
                          {item.estatisticas.vitorias}
                        </p>
                      </td>
                      <td>
                        <p className="flex items-center justify-center bg-white p-2">
                          {item.estatisticas.empates}
                        </p>
                      </td>
                      <td>
                        <p className="flex items-center justify-center bg-gray-base p-2">
                          {item.estatisticas.derrotas}
                        </p>
                      </td>
                      <td>
                        <p className="hidden lg:flex items-center justify-center bg-white p-2">
                          {item.estatisticas.golsMarcados}
                        </p>
                      </td>
                      <td>
                        <p className="hidden lg:flex items-center justify-center bg-gray-base p-2">
                          {item.estatisticas.golsSofridos}
                        </p>
                      </td>
                      <td>
                        <p className="hidden lg:flex items-center justify-center bg-white p-2">
                          {item.estatisticas.saldoDeGols}
                        </p>
                      </td>
                      <td>
                        <p className="hidden lg:flex items-center justify-center bg-gray-base p-2">
                          {item.estatisticas.aproveitamento}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:border-l border-black lg:w-1/3 lg:pl-2">
              <h2 className="text-4xl font-bold"> JOGOS </h2>
              <div className="flex justify-between py-2">
                <button
                  onClick={() => {
                    setCurRodada((prev) => prev - 1);
                  }}
                  disabled={curRodada <= 1}
                  className="text-yellow-base disabled:text-gray-400 text-4xl"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <h3 className="text-2xl">{curRodada} RODADA</h3>
                <button
                  onClick={() => {
                    setCurRodada((prev) => prev + 1);
                  }}
                  disabled={curRodada >= 38}
                  className="text-yellow-base disabled:text-gray-400 text-4xl"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>

              {rodadas
                ? rodadas[curRodada - 1].jogos.map((item, key) => (
                    <div
                      key={key}
                      className="flex flex-col gap-4 border-t border-black py-1"
                    >
                      <div className="flex justify-around text-xl lg:text-sm text-center">
                        <p>{item.local}</p>

                        <p>
                          {item.data} - {item.horario}
                        </p>
                      </div>
                      <div className="flex justify-around items-center text-lg font-semibold">
                        <p>{item.times[0].sigla}</p>
                        <picture className="w-1/5">
                          <img
                            src={item.times[0].brasao}
                            alt=""
                            className="w-full"
                          />
                        </picture>
                        <span className="text-2xl">{item.resultado[0]}</span>
                        <span className="text-gray-400">X</span>
                        <span className="text-2xl">{item.resultado[2]}</span>
                        <picture className="w-1/5">
                          <img
                            src={item.times[1].brasao}
                            alt=""
                            className="w-full"
                          />
                        </picture>
                        <p>{item.times[1].sigla}</p>
                      </div>
                    </div>
                  ))
                : "Carregando..."}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
