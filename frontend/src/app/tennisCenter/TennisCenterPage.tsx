"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/common/Button";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ITEMS_PER_PAGE = 6;

type ImagemItem = {
  id: string;
  imagem: {
    id: string;
    filename_download: string;
  } | null;
};

export default function TennisCenterPage() {
  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1️⃣ Load initial items
  useEffect(() => {
    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Tennis_Center`, {
        params: {
          filter: { status: { _eq: "published" } },
          fields: ["id", "imagem.id", "imagem.filename_download"],
          sort: ["-date_created"],
          limit: ITEMS_PER_PAGE + 1,
          offset: 0,
        },
      })
      .then((res) => {
        const data = res.data.data;
        if (data.length > ITEMS_PER_PAGE) {
          setImagens(data.slice(0, ITEMS_PER_PAGE));
          setHasMore(true);
        } else {
          setImagens(data);
          setHasMore(false);
        }
      })
      .catch(console.error);
  }, []);

  // 2️⃣ Handle "Mostrar Tudo"
  const handleShowAll = useCallback(() => {
    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Tennis_Center`, {
        params: {
          filter: { status: { _eq: "published" } },
          fields: ["id", "imagem.id", "imagem.filename_download"],
          sort: ["-date_created"],
          limit: -1,
          offset: imagens.length,
        },
      })
      .then((res) => {
        setImagens((prev) => {
          const seen = new Set(prev.map((i) => i.id));
          const unique = res.data.data.filter((i) => !seen.has(i.id));
          return [...prev, ...unique];
        });
        setHasMore(false);
        setShowAll(true);
      })
      .catch(console.error);
  }, [imagens.length]);

  // 3️⃣ Prepare slides
  const slides: Slide[] = imagens
    .filter((item) => item.imagem)
    .map((item) => {
      const file = item.imagem!;
      const filename = file.filename_download;
      const src = `${API_URL}/assets/${file.id}/${encodeURIComponent(
        filename
      )}`;
      if (/\.(mp4|webm|ogg)$/i.test(filename)) {
        return {
          type: "video",
          sources: [{ src, type: "video/mp4" }],
        } as Slide;
      }
      return { src } as Slide;
    });

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Tennis Center</h2>

        {/* Thumbnails grid */}
        <div className="grid grid-cols-3 gap-[8px] lg:gap-5">
          {slides.map((slide, i) => {
            const isVideo = slide.type === "video";
            const url = isVideo ? slide.sources![0].src : (slide as any).src;
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-lg aspect-square cursor-pointer"
                onClick={() => {
                  setCurrentIndex(i);
                  setLightboxOpen(true);
                }}
              >
                {isVideo ? (
                  <video
                    src={url}
                    muted
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-all duration-300 ease-in-out"
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`Item ${i + 1}`}
                    fill
                    unoptimized
                    className="rounded-lg hover:scale-105 transition-all duration-300 ease-in-out object-cover"
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={currentIndex}
          plugins={[Thumbnails, Video]}
          thumbnails={{
            position: "bottom",
            border: 2,
            borderColor: "#61646b",
          }}
          video={{ controls: true, playsInline: true }}
        />

        {/* Mostrar Tudo */}
        {hasMore && !showAll && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleShowAll}>Mostrar Tudo</Button>
          </div>
        )}
      </div>
    </section>
  );
}
