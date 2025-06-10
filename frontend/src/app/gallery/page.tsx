"use client";

import React from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";

const page = () => {
  // Imagens
  const images = [
    "/beach-tennis.webp",
    "/beach-tennis.webp",
    "/beach-tennis.webp",
    "/beach-tennis.webp",
    "/beach-tennis.webp",
  ];

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Galeria</h2>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="
            grid 
            grid-cols-3 
            grid-rows-2 
            gap-2 
            lg:gap-5
          "
        >
          {/* Item 1 — ocupa 2 linhas */}
          <a
            href={images[0]}
            className="relative col-start-1 col-end-2 row-start-1 row-end-3 h-full"
          >
            <Image
              src={images[0]}
              alt="Imagem 1"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </a>

          {/* Item 2 */}
          <a
            href={images[1]}
            className="relative col-start-2 col-end-3 row-start-1 row-end-2 aspect-square"
          >
            <Image
              src={images[1]}
              alt="Imagem 2"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </a>

          {/* Item 3 */}
          <a
            href={images[2]}
            className="relative col-start-3 col-end-4 row-start-1 row-end-2 aspect-square"
          >
            <Image
              src={images[2]}
              alt="Imagem 3"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </a>

          {/* Item 4 */}
          <a
            href={images[3]}
            className="relative col-start-2 col-end-3 row-start-2 row-end-3 aspect-square"
          >
            <Image
              src={images[3]}
              alt="Imagem 4"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </a>

          {/* Item 5 */}
          <a
            href={images[4]}
            className="relative col-start-3 col-end-4 row-start-2 row-end-3 aspect-square"
          >
            <Image
              src={images[4]}
              alt="Imagem 5"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </a>
        </LightGallery>
        {/* Botão */}
        <div className="flex justify-center">
          <Button>
            <FaPlus /> Carregar mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default page;
