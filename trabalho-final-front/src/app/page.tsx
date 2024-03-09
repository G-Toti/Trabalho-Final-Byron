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
import { IJogo, IRodada, ITime } from "../../interface/campeonatos";
import { getData } from "../../modules/campeonatos_requests";
import { INews } from "../../utils/types/noticia";
import { getStrapiData } from "../../modules/noticias_request";

useEmblaCarousel.globalOptions = { loop: true };

const baseWidth = 1024;

export default function Home() {
  // ================CARROSSEL================

  const [emblaRefSemana, emblaAPISemana] = useEmblaCarousel(
    { loop: true, watchDrag: true },
    [Autoplay()]
  );
  const [emblaRefNoticia, emblaAPINoticia] = useEmblaCarousel({
    loop: true,
    watchDrag: true,
  });
  const [canDrag, setDrag] = useState(true);
  const [windowSize, setWindowSize] = useState(0);
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [jogosDaSemana, setJogosDaSemana] = useState<IJogo[]>();

  // ================RODADAS================

  const [curCampeonato, setCurCampeonato] = useState(0);
  const [curRodada, setCurRodada] = useState(0);
  const [rodada, setRodada] = useState<IRodada>();

  // ================TABELA================

  const [times, setTimes] = useState<ITime[]>();

  // ================NOTICIAS================

  const [noticias, setNoticias] = useState<INews>();

  // ================GERAL================

  // INICIALIZAR PAGINA

  useEffect(() => {
    const getCampeonato = async () => {
      const res = await getData("campeonatos");
      const rodadaAtual = res.data[curCampeonato].rodadaAtual;
      setCurRodada(rodadaAtual);
      setJogosDaSemana(res.data[curCampeonato].rodadas[rodadaAtual - 1].jogos);
    };

    const getTimes = async () => {
      const res = await getData(
        "times",
        "_sort=-estatisticas.pontos,-estatisticas.saldoDeGols"
      );
      setTimes(res.data);
    };

    const getNews = async () => {
      const res = await getStrapiData("noticias", "*");
      setNoticias(res.data);
    };

    getNews();
    getTimes();
    getCampeonato();
  }, []);

  // VERIFICAR TAMANHO DA TELA

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

  // ================CARROSSEL================

  // ATUALIZAR JOGO ATUAL DO CARROSSEL

  const onSelect = useCallback((emblaAPI: EmblaCarouselType) => {
    setSelectedGame(emblaAPI.selectedScrollSnap());
  }, []);

  // INICIALIZAR O CARROSSEL

  useEffect(() => {
    if (!emblaAPISemana) return;

    emblaAPISemana.on("init", onSelect);
    emblaAPISemana.on("select", onSelect);
    emblaAPISemana.on("reInit", onSelect);
  }, [emblaAPISemana, onSelect]);

  // RESPONSIVIDADE DO CARROSSEL

  useEffect(() => {
    if (!emblaAPISemana) return;

    let newOptions = {};

    if (!canDrag && windowSize < baseWidth) {
      newOptions = { watchDrag: true };
      setDrag(true);
    } else if (canDrag && windowSize >= baseWidth) {
      newOptions = { watchDrag: false };
      setDrag(false);
    }

    emblaAPISemana.reInit(newOptions);
  }, [windowSize, emblaAPISemana]);

  useEffect(() => {
    if (!emblaAPINoticia) return;

    let newOptions = {};

    if (!canDrag && windowSize < baseWidth) {
      newOptions = { watchDrag: true };
      setDrag(true);
    } else if (canDrag && windowSize >= baseWidth) {
      newOptions = { watchDrag: false };
      setDrag(false);
    }

    emblaAPINoticia.reInit(newOptions);
  }, [windowSize, emblaAPINoticia]);

  // CLICAR NOS BOTÕES DO CARROSSEL

  const clickButtonDots = (index: number) => {
    if (!emblaAPISemana) return;

    emblaAPISemana.scrollTo(index);
  };

  // ================RODADADAS================

  // ATUALIZAR/INICIALIZAR A RODADA QUE ESTÁ SENDO VISUALIZADA ATUALMENTE

  useEffect(() => {
    if (!curRodada) return;

    const getRodada = async () => {
      const res = await getData("campeonatos");
      setRodada(res.data[curCampeonato].rodadas[curRodada - 1]);
    };
    getRodada();
  }, [curRodada]);

  // ================VISUAL================

  return (
    <>
      <section
        id="rodadas"
        className="flex flex-col lg:justify-evenly bg-gray-darkest text-gray-light w-screen lg:h-[576px] gap-10 lg:gap-0 py-10 lg:py-0 "
      >
        <div className="embla" ref={emblaRefSemana}>
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
              emblaAPISemana?.scrollPrev();
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
              emblaAPISemana?.scrollNext();
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </section>
      <section id="tabela" className="bg-gray-lightest w-screen py-8">
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
                      <td className="flex items-center gap-3 font-bold text-lg">
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

              {rodada
                ? rodada.jogos.map((item, key) => (
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

      <section
        id="noticias"
        className="bg-gray-darkest flex justify-start w-screen"
      >
        <div className="m-5 w-full">
          <div className="relative text-white text-center">
            <h1 className="absolute text-4xl md:text-5xl lg:text-8xl font-extrabold opacity-40">
              NOTÍCIAS
            </h1>
            <h2 className="absolute md:text-xl lg:text-3xl top-0 left-0 px-1 py-2 lg:px-4 lg:py-7">
              Notícias
            </h2>
            <div className="flex gap-8 justify-center items-center">
              <div
                className="embla pt-9 lg:pt-20 md:hidden"
                ref={emblaRefNoticia}
              >
                <div className="embla__container">
                  {noticias?.data.map((item, key) => (
                    <div key={key} className="embla__slide flex justify-center">
                      <div className="border-2 border-white">
                        <a href={`/noticias/${item.id}`}>
                          <picture className="relative w-full">
                            <div className="bg-gradient-to-b from-gray-darkest to-transparent -left-full right-0 bottom-0 top-0 absolute flex justify-between p-2">
                              <h4 className="text-yellow-base">Brasileirão</h4>
                              <p>
                                {new Intl.DateTimeFormat("pt-BR", {
                                  day: "numeric",
                                  month: "short",
                                }).format(
                                  new Date(item.attributes.publishedAt)
                                )}
                              </p>
                            </div>
                            <img
                              src={
                                "http://127.0.0.1:1337" +
                                item.attributes.Thumbnail.data.attributes.url
                              }
                              alt=""
                              className="object-cover w-60 h-60"
                            />
                            <div className="bg-yellow-dark absolute -left-full right-0 bottom-0 px-5 py-3">
                              <h3 className="font-bold uppercase">
                                {item.attributes.Titulo}
                              </h3>
                            </div>
                          </picture>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden md:grid grid-cols-3 pt-20 gap-x-36 gap-y-7">
                {noticias?.data.map((noticia) => (
                  <div
                    key={noticia.id}
                    className="border border-white w-fit transform transition ease-in-out hover:scale-105"
                  >
                    <a href={`/noticias/${noticia.id}`}>
                      <picture className="relative">
                        <div className="bg-gradient-to-b from-gray-darkest to-transparent -left-full right-0 bottom-0 top-0 absolute flex justify-between p-2">
                          <h4 className="text-yellow-base">Brasileirão</h4>
                          <p>
                            {new Intl.DateTimeFormat("pt-BR", {
                              day: "numeric",
                              month: "short",
                            }).format(new Date(noticia.attributes.publishedAt))}
                          </p>
                        </div>
                        <img
                          src={
                            "http://127.0.0.1:1337" +
                            noticia.attributes.Thumbnail.data.attributes.url
                          }
                          alt=""
                          className="lg:w-64 lg:h-64 object-cover"
                        />
                        <div className="bg-yellow-dark absolute -left-full right-0 bottom-0 px-5 py-3">
                          <h3 className="font-bold uppercase">
                            {noticia.attributes.Titulo}
                          </h3>
                        </div>
                      </picture>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
