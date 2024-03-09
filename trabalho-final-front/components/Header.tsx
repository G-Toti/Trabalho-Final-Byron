"use client";
import React, { useEffect } from "react";
import { useScrollContext } from "./ScrollContext";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Header = () => {
  const context = useScrollContext(); // pega o contexto

  const curSection = context?.curSection; // passa o valor do contexto pra uma variavel

  const highlight = "font-bold text-white"; // define como vai funcionar o highlight

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [windowComponent, setWindowComponent] = useState<Window>();

  const toggleCollapse = () => {
    setIsTransitioning(true);
    setIsCollapsed((prev) => !prev);
  };

  useEffect(() => {
    const transitionTimeout = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
    return () => clearTimeout(transitionTimeout);
  }, [isCollapsed]);

  useEffect(() => {
    setWindowComponent(window);
  }, []);

  return (
    <header className="bg-gray-dark fixed right-0 left-0 lg:flex lg:items-center text-gray-base font-inter shadow-gray-800 shadow-md w-screen h-fit z-10">
      <div className="flex lg:items-center lg:justify-around h-28 xl:gap-40 lg:my-0 lg:mx-auto">
        <div
          className={`flex lg:hidden flex-col items-center ${
            isCollapsed && "bg-gray-darkest"
          }`}
        >
          <button onClick={toggleCollapse} className="text-lg px-4 py-10">
            {!isCollapsed ? "Menu" : "Fechar"}
          </button>
          <Sidebar
            isCollapsed={isCollapsed}
            isTransitioning={isTransitioning}
            toggleCollapse={toggleCollapse}
          />
        </div>
        <div className="flex items-center justify-center lg:justify-start gap-3 w-fit my-4 p-4 md:p-0 mx-auto">
          <picture className="hidden md:flex justify-center w-1/6">
            <img src={"/images/logo_place_holder.png"} />
          </picture>

          <h1 className="uppercase text-center text-xl md:text-2xl filter drop-shadow-2xl">
            Campeonato Brasileiro
          </h1>
        </div>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-6 text-base lg:text-lg">
            {windowComponent?.location.pathname === "/" ? (
              <>
                {""}
                <li className="transition ease-in-out transform hover:scale-105 hover:text-yellow-base">
                  <a
                    href="#rodadas"
                    className={curSection === "rodadas" ? highlight : ""}
                  >
                    Rodadas da semana
                  </a>
                </li>
                <li className="transition ease-in-out transform hover:scale-105 hover:text-yellow-base">
                  <a
                    href="#tabela"
                    className={curSection === "tabela" ? highlight : ""}
                  >
                    Tabela do Campeonato
                  </a>
                </li>
                <li className="transition ease-in-out transform hover:scale-105 hover:text-yellow-base">
                  <a
                    href="#noticias"
                    className={curSection === "noticias" ? highlight : ""}
                  >
                    Notícias
                  </a>
                </li>
              </>
            ) : (
              <li className="text-base lg:text-lg">
                <a href="/">Voltar à Home</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
