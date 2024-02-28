"use client";
import React, { useState } from "react";

interface IProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar = ({ isCollapsed, toggleCollapse }: IProps) => {
  return (
    <>
      <div className="flex flex-col justify-start items-start z-20">
        <div className="bg-gray-base text-gray-darkest">
          {isCollapsed && (
            <nav className="h-screen">
              <ul className="flex flex-col p-10 gap-3 text-xl">
                <li>
                  <a href="#rodadas" onClick={toggleCollapse}>
                    Rodadas
                  </a>
                </li>
                <li>
                  <a href="#tabela" onClick={toggleCollapse}>
                    Tabela
                  </a>
                </li>
                <li>
                  <a href="#noticias" onClick={toggleCollapse}>
                    Notícias
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
