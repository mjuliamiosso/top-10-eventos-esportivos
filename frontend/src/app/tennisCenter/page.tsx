"use client";

import Button from "@/components/common/Button";
import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

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
        <h2 className="sectionHeading">Tennis Center</h2>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="
            grid 
            grid-cols-3
            gap-[8px]
            lg:gap-5
          "
        >
          {images.map((src, i) => (
            <a
              key={i}
              href={src}
              className="block relative overflow-hidden rounded-lg aspect-square"
            >
              <Image
                src={src}
                alt={`Imagem ${i + 1}`}
                fill
                className="rounded-lg hover:scale-105 transition-transform duration-300 object-cover"
              />
            </a>
          ))}
        </LightGallery>
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
