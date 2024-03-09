"use client";
import React, { useEffect, useState } from "react";
import { Daum } from "../../../../utils/types/noticia";
import { getStrapiData } from "../../../../modules/noticias_request";

export default function Home({ params }: { params: { idNoticia: string } }) {
  const [noticia, setNoticia] = useState<{ data: Daum }>();

  useEffect(() => {
    const getNoticia = async () => {
      const res = getStrapiData(`noticias/${params.idNoticia}`, "*");
      setNoticia((await res).data);
    };
    getNoticia();
  }, []);

  return (
    <div className="flex justify-center w-full my-10">
      <div className="w-[70%] flex flex-col gap-1 items-center lg:p-8">
        <div>
          <h1 className="font-bold text-3xl mb-4 ">
            {noticia?.data.attributes.Titulo}
          </h1>
          <div className="flex items-center mb-2">
            <p className="mr-2">
              {noticia
                ? new Intl.DateTimeFormat("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date(noticia.data.attributes.publishedAt))
                : ""}
            </p>
            <p className="text-sm">{noticia?.data.attributes.Autor}</p>
          </div>

          <p className="font-bold text-lg">{noticia?.data.attributes.Lead}</p>
        </div>

        <picture className="shadow-lg rounded-lg overflow-hidden w-full">
          <img
            src={`http://127.0.0.1:3000${noticia?.data.attributes.Thumbnail.data.attributes.url}`}
            className="w-full"
            alt="imagem padrão site"
          />
        </picture>
        {noticia?.data.attributes.Conteudo.map((item) =>
          item.children.map((child, key) => (
            <p key={key} className="mt-4 text-justify">
              {child.text}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
