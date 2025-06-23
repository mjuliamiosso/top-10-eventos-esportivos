"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

type ImagemItem = {
  id: string;
  imagem: string | null;
};

export default function TennisCenterPage() {
  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [limit, setLimit] = useState(6);
  const [hasMore, setHasMore] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Tennis_Center`, {
        params: {
          fields: "id,imagem",
          "filter[status][_eq]": "published",
          sort: "-date_created",
          limit: limit + 1,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (data.length > limit) {
          setImagens(data.slice(0, limit));
          setHasMore(true);
        } else {
          setImagens(data);
          setHasMore(false);
        }
      })
      .catch(console.error);
  }, [limit]);

  const slides = imagens
    .filter((item) => item.imagem)
    .map((item) => ({
      src: `${API_URL}/assets/${item.imagem}`,
    }));

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Tennis Center</h2>

        <div className="grid grid-cols-3 gap-[8px] lg:gap-5">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="block relative overflow-hidden rounded-lg aspect-square cursor-pointer"
              onClick={() => {
                setCurrentIndex(i);
                setLightboxOpen(true);
              }}
            >
              <Image
                src={slide.src}
                alt={`Imagem ${i + 1}`}
                fill
                unoptimized
                className="rounded-lg hover:scale-105 transition-all duration-300 ease-in-out object-cover"
              />
            </div>
          ))}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          plugins={[Thumbnails]}
          thumbnails={{
            position: "bottom",
            border: 2,
            borderColor: "#61646b",
          }}
        />

        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setLimit((prev) => prev + 6)}>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
