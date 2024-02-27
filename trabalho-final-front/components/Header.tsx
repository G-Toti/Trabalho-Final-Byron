"use client";
import React from "react";
import { useScrollContext } from "./ScrollContext";

const Header = () => {
  const context = useScrollContext(); // pega o contexto

  const curSection = context?.curSection; // passa o valor do contexto pra uma variavel

  const highlight = "font-bold text-white"; // define como vai funcionar o highlight

  return (
    <header className="fixed right-0 left-0 bg-gray-dark text-gray-base font-inter shadow-gray-800 shadow-md">
      <div className="flex items-center justify-around h-28 gap-20 xl:gap-40 my-0 mx-auto">
        <div className="flex items-center justify-center lg:justify-start gap-3 w-fit my-4 p-4 md:p-0">
          <picture className="flex justify-center w-1/6">
            <img src="images/logo_place_holder.png" />
          </picture>
          <h1 className="uppercase text-center text-xl md:text-2xl filter drop-shadow-2xl">
            Campeonato Brasileiro
          </h1>
        </div>
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6 text-base lg:text-lg">
            <li>
              <a
                href="#rodadas"
                className={curSection === "rodadas" ? highlight : ""}
              >
                Rodadas da semana
              </a>
            </li>
            <li>
              <a
                href="#tabela"
                className={curSection === "tabela" ? highlight : ""}
              >
                Tabela do Campeonato
              </a>
            </li>
            <li>
              <a
                href="#noticias"
                className={curSection === "noticias" ? highlight : ""}
              >
                Notícias
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
