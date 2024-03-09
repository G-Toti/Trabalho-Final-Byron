"use client";
import React, { useState, useEffect } from "react";

interface IProps {
  isCollapsed: boolean;
  isTransitioning: boolean;
  toggleCollapse: () => void;
}

const Sidebar = ({ isCollapsed, isTransitioning, toggleCollapse }: IProps) => {
  const [windowComponent, setWindowComponent] = useState<Window>();

  useEffect(() => {
    setWindowComponent(window);
  }, []);

  return (
    <>
      <div className={"flex flex-col justify-start items-start z-20"}>
        <div
          className={`${
            !isCollapsed ? "-translate-x-full" : "translate-x-0"
          } bg-gray-base text-gray-darkest transition-all ease-in-out duration-200`}
        >
          <nav
            className={`h-screen ${
              !isCollapsed && !isTransitioning && "hidden"
            }`}
          >
            <ul className="flex flex-col p-10 gap-3 text-xl">
              {windowComponent?.location.pathname === "/" ? (
                <>
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
                </>
              ) : (
                <li className="text-base">
                  <a href="/">Home</a>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
