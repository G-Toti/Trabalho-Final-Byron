"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IContext {
  curSection: string;
}

interface IProps {
  children: React.ReactNode;
}

const context = createContext<IContext | undefined>(undefined); // cria o contexto

export const useScrollContext = () => {
  // exporta o contexto
  try {
    const ctx = useContext(context);
    return ctx;
  } catch (error) {
    throw error;
  }
};

const ScrollContext = ({ children }: IProps) => {
  const [curSection, setCurSection] = useState("rodadas");

  useEffect(() => {
    const sections = {
      rodadas: document.getElementById("rodadas"),
      tabela: document.getElementById("tabela"),
      noticias: document.getElementById("noticias"),
    };

    const onScroll = () => {
      for (const [sectionId, sectionElement] of Object.entries(sections)) {
        // Itera sobre um dicionario (chave valor)
        // for...of vai iterar e retornar cada obj dentro do dicionario
        // Diferente do for...in que iteraria sobre o indice for i in dic -> dict[i]...

        if (!sectionElement) return;

        const { top, bottom } = sectionElement.getBoundingClientRect(); // Pegando o posição da section

        if (top < window.innerHeight / 2 && bottom > window.innerHeight / 2) {
          // Está visivel
          if (curSection === sectionId) break; // ja está destacado

          setCurSection(sectionId);

          break; // Encontrei o que eu queria
        }
      }
    };

    if (typeof window === "undefined") return;

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [curSection]);

  return <context.Provider value={{ curSection }}>{children}</context.Provider>;
};

export default ScrollContext;
