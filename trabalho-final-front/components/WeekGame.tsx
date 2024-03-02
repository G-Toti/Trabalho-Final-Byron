import React from "react";
import { IJogo } from "../interface/campeonatos";

interface IProps {
  jogo: IJogo;
}

const WeekGame = ({ jogo }: IProps) => {
  return (
    <div className="embla__slide flex flex-col lg:flex-row gap-20 lg:gap-0 lg:justify-evenly px-8">
      <div className="flex flex-col gap-10 lg:gap-20 lg:w-1/2 text-center lg:text-start">
        <div className="flex flex-col self-center lg:self-start sm:flex-row gap-4">
          <h2 className="uppercase text-xl md:text-3xl xl:text-4xl">
            {jogo.times[0].nome}
          </h2>
          <h2 className="uppercase text-xl md:text-3xl xl:text-4xl">vs</h2>
          <h2 className="uppercase text-xl md:text-3xl xl:text-4xl">
            {jogo.times[1].nome}
          </h2>
        </div>
        <div className="flex flex-col lg:gap-9">
          <p className="font-bold text-sm md:text-lg lg:text-xl">
            {jogo.local}
          </p>
          <h3 className="md:text-xl lg:text-2xl font-fira">
            {jogo.data} - {jogo.horario}
          </h3>
        </div>
      </div>
      <div className="flex justify-center items-center gap-14 lg:w-1/2">
        <picture className="w-full lg:w-1/3">
          <img src={jogo.times[0].brasao} alt="" className="w-full" />
        </picture>
        <span className="text-base md:text-4xl lg:text-5xl">VS</span>
        <picture className="w-full lg:w-1/3">
          <img src={jogo.times[1].brasao} alt="" className="w-full" />
        </picture>
      </div>
    </div>
  );
};

export default WeekGame;
