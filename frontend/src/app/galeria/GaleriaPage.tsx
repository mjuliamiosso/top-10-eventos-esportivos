"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import { FaPlus } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

type ImagemItem = {
  id: string;
  imagem: string | null;
  datahora: string;
};

type GalleryFilter = {
  status: { _eq: "published" };
  datahora?: { _between: [string, string] };
};

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ITEMS_PER_PAGE = 6;

type MesOption = {
  value: string; // e.g. "2025-07"
  label: string; // e.g. "jul 25"
};

export default function Galeria() {
  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // month–year picker state
  const [meses, setMeses] = useState<MesOption[]>([]);
  const [selectedMes, setSelectedMes] = useState<string>("");

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // build the month/year options from all datahora values
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
          const d = new Date(ym + "-01");
          const month = d
            .toLocaleString("pt-BR", { month: "short" })
            .toLowerCase()
            .replace(/\.$/, "");
          const year = d.getFullYear().toString().slice(-2);
          return { value: ym, label: `${month} ${year}` };
        });
        setMeses(opts);
        if (opts.length) setSelectedMes(opts[0].value);
      })
      .catch(console.error);
  }, []);

  // fetch a page, filtered by selectedMes
  const fetchPage = useCallback(
    (pageNum: number) => {
      const filter: GalleryFilter = { status: { _eq: "published" } };
      if (selectedMes) {
        const [y, m] = selectedMes.split("-");
        const start = `${y}-${m}-01`;
        const lastDay = new Date(Number(y), Number(m), 0).getDate();
        const end = `${y}-${m}-${String(lastDay).padStart(2, "0")}`;
        filter.datahora = { _between: [start, end] };
      }

      axios
        .get<{ data: ImagemItem[] }>(`${API_URL}/items/Galeria`, {
          params: {
            filter,
            fields: ["id", "imagem", "datahora"],
            sort: ["-datahora"],
            limit: ITEMS_PER_PAGE + 1,
            offset: (pageNum - 1) * ITEMS_PER_PAGE,
          },
        })
        .then((res) => {
          const fetched = res.data.data;
          if (fetched.length > ITEMS_PER_PAGE) {
            const itemsToShow = fetched.slice(0, ITEMS_PER_PAGE);
            setImagens((prev) =>
              pageNum === 1 ? itemsToShow : [...prev, ...itemsToShow]
            );
            setHasMore(true);
          } else {
            setImagens((prev) =>
              pageNum === 1 ? fetched : [...prev, ...fetched]
            );
            setHasMore(false);
          }
        })
        .catch(console.error);
    },
    [selectedMes]
  );

  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [selectedMes, fetchPage]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  const slides = imagens
    .filter((item) => item.imagem)
    .map((item) => ({ src: `${API_URL}/assets/${item.imagem}` }));

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Galeria</h2>

        <div>
          <div className="my-4 w-40">
            <Select
              name="mes"
              options={meses.map((m) => ({
                value: m.value,
                label: m.label,
              }))}
              value={selectedMes}
              onChange={(e) => setSelectedMes(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-[8px] lg:gap-5">
            {slides.map((slide, i) => (
              <div
                key={i}
                className="block relative overflow-hidden rounded-[6px] aspect-square cursor-pointer"
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
                  className="object-cover hover:scale-105 transition-all duration-300 ease-in-out object-center"
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
        </div>

        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button onClick={handleLoadMore}>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
