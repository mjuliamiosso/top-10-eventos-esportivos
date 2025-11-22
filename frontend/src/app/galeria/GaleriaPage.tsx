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
  datahora?: {
    _gte: string;
    _lt: string;
  };
};

type MesOption = {
  value: string; // e.g. "2025-10-01"
  label: string; // e.g. "out 25"
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

  // load month options
  useEffect(() => {
    axios
      .get<{ data: { datahora: string }[] }>(`${API_URL}/items/Galeria`, {
        params: {
          fields: ["datahora"],
          filter: { status: { _eq: "published" } },
          sort: ["-datahora"],
          limit: -1,
        },
      })
      .then((res) => {
        // Extract unique months from the datahora field
        const rawMeses = Array.from(
          new Set(
            res.data.data.map((item) => {
              const date = new Date(item.datahora);
              const year = date.getFullYear();
              const month = String(date.getMonth() + 1).padStart(2, "0");
              return `${year}-${month}-01`;
            })
          )
        ).sort((a, b) => b.localeCompare(a));

        const opts: MesOption[] = rawMeses.map((raw) => {
          const d = new Date(raw);
          const month = d
            .toLocaleString("pt-BR", { month: "short" })
            .toLowerCase()
            .replace(/\.$/, "");
          const year = d.getFullYear().toString().slice(-2);
          return { value: raw, label: `${month} ${year}` };
        });

        setMeses(opts);
        if (opts.length) setSelectedMes(opts[0].value);
      })
      .catch(console.error);
  }, []);

  // load first page when month changes
  useEffect(() => {
    if (!selectedMes) return;

    setShowAll(false);

    const filter: GalleryFilter = { status: { _eq: "published" } };
    
    // Extract year and month from selectedMes (format: YYYY-MM-01)
    const [year, month] = selectedMes.split("-");
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    // Use _gte and _lt for cleaner date range filtering
    // This avoids timezone issues and is more reliable
    const start = `${year}-${month}-01`;
    
    // Calculate next month for _lt (exclusive upper bound)
    let nextMonth = monthNum + 1;
    let nextYear = yearNum;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const nextMonthStr = String(nextMonth).padStart(2, "0");
    const end = `${nextYear}-${nextMonthStr}-01`;
    
    filter.datahora = {
      _gte: start,
      _lt: end
    };

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

  // load remaining items on "Mostrar Tudo"
  const handleShowAll = useCallback(() => {
    if (!selectedMes) return;

    const filter: GalleryFilter = { status: { _eq: "published" } };
    
    const [year, month] = selectedMes.split("-");
    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    
    const start = `${year}-${month}-01`;
    
    let nextMonth = monthNum + 1;
    let nextYear = yearNum;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const nextMonthStr = String(nextMonth).padStart(2, "0");
    const end = `${nextYear}-${nextMonthStr}-01`;
    
    filter.datahora = {
      _gte: start,
      _lt: end
    };

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