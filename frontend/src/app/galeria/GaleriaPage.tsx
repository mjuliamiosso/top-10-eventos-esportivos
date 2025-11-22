"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import Lightbox, { type Slide } from "yet-another-react-lightbox";
import Video from "yet-another-react-lightbox/plugins/video";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type ImagemItem = {
  id: string;
  datahora: string;
  imagem: {
    id: string;
    filename_download: string;
  } | null;
};

type GalleryFilter = {
  status: { _eq: "published" };
  datahora?: { _between: [string, string] };
};

type MesOption = {
  value: string; // e.g. "2025-06"
  label: string; // e.g. "jun 25"
};

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ITEMS_PER_PAGE = 6;

export default function Galeria() {
  // remove duplicates by id
  const dedupeById = (items: ImagemItem[]): ImagemItem[] => {
    const seen = new Set<string>();
    return items.filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [meses, setMeses] = useState<MesOption[]>([]);
  const [selectedMes, setSelectedMes] = useState<string>("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [, setCurrentIndex] = useState(0);

  // ===== MANTENDO EXATAMENTE COMO ESTAVA NO ORIGINAL =====
  useEffect(() => {
    axios
      .get<{ data: { datahora: string }[] }>(`${API_URL}/items/Galeria`, {
        params: {
          fields: ["datahora"],
          filter: { status: { _eq: "published" } },
          limit: -1,
        },
      })
      .then((res) => {
        const raw = Array.from(
          new Set(res.data.data.map((i) => i.datahora.slice(0, 7)))
        ).sort((a, b) => b.localeCompare(a));

        const opts: MesOption[] = raw.map((ym) => {
          const [yy, mm] = ym.split("-");
          const d = new Date(Number(yy), Number(mm) - 1, 1);
          const month = d
            .toLocaleString("pt-BR", { month: "short" })
            .toLowerCase()
            .replace(/\.$/, "");
          return { value: ym, label: `${month} ${yy.slice(-2)}` };
        });

        setMeses(opts);
        if (opts.length) setSelectedMes(opts[0].value);
      })
      .catch(console.error);
  }, []);

  // ===== APENAS CONSERTANDO O FILTRO AQUI =====
  useEffect(() => {
    if (!selectedMes) return;

    setShowAll(false);

    const filter: GalleryFilter = { status: { _eq: "published" } };
    
    // selectedMes está como "2025-10" (YYYY-MM)
    const [y, m] = selectedMes.split("-");
    const start = `${y}-${m}-01`;
    const lastDay = new Date(Number(y), Number(m), 0).getDate();
    const end = `${y}-${m}-${String(lastDay).padStart(2, "0")}`;
    
    // MUDANÇA: Adicionar hora/minuto/segundo ao end para incluir o dia inteiro
    filter.datahora = { _between: [start, `${end}T23:59:59`] };

    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Galeria`, {
        params: {
          filter,
          fields: ["id", "datahora", "imagem.id", "imagem.filename_download"],
          sort: ["-datahora"],
          limit: ITEMS_PER_PAGE + 1,
          offset: 0,
        },
      })
      .then((res) => {
        const fetched = res.data.data;
        const initial =
          fetched.length > ITEMS_PER_PAGE
            ? fetched.slice(0, ITEMS_PER_PAGE)
            : fetched;
        setImagens(dedupeById(initial));
        setHasMore(fetched.length > ITEMS_PER_PAGE);
      })
      .catch(console.error);
  }, [selectedMes]);

  // ===== MESMO CONSERTO NO handleShowAll =====
  const handleShowAll = useCallback(() => {
    const filter: GalleryFilter = { status: { _eq: "published" } };
    if (selectedMes) {
      const [y, m] = selectedMes.split("-");
      const start = `${y}-${m}-01`;
      const lastDay = new Date(Number(y), Number(m), 0).getDate();
      const end = `${y}-${m}-${String(lastDay).padStart(2, "0")}`;
      
      // MUDANÇA: Adicionar hora/minuto/segundo ao end
      filter.datahora = { _between: [start, `${end}T23:59:59`] };
    }

    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Galeria`, {
        params: {
          filter,
          fields: ["id", "datahora", "imagem.id", "imagem.filename_download"],
          sort: ["-datahora"],
          limit: -1,
          offset: imagens.length,
        },
      })
      .then((res) => {
        setImagens((prev) => dedupeById([...prev, ...res.data.data]));
        setHasMore(false);
        setShowAll(true);
      })
      .catch(console.error);
  }, [selectedMes, imagens.length]);

  // prepare slides
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
        <h2 className="sectionHeading">Galeria</h2>

        <div className="my-4 w-40">
          <Select
            name="mes"
            options={meses.map((m) => ({ value: m.value, label: m.label }))}
            value={selectedMes}
            onChange={(e) => setSelectedMes(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-[8px] lg:gap-5">
          {slides.map((slide, i) => {
            const url = "src" in slide ? slide.src : slide.sources![0].src;
            const isVideo = slide.type === "video";
            return (
              <div
                key={i}
                className="relative overflow-hidden rounded-[6px] aspect-square cursor-pointer"
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
                    className="object-cover hover:scale-105 transition-all duration-300 ease-in-out object-center"
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`Item ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-all duration-300 ease-in-out object-center"
                  />
                )}
              </div>
            );
          })}
        </div>

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          plugins={[Thumbnails, Video]}
          thumbnails={{
            position: "bottom",
            border: 2,
            borderColor: "#61646b",
          }}
          video={{ controls: true, playsInline: true }}
        />

        {hasMore && !showAll && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleShowAll}>Mostrar Tudo</Button>
          </div>
        )}
      </div>
    </section>
  );
}