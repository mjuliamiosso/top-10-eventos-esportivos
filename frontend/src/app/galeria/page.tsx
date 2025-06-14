"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import Button from "@/components/common/Button";
import Select from "@/components/common/Select";
import { FaPlus } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ITEMS_PER_PAGE = 6;

type ImagemItem = {
  id: string;
  imagem: string | null;
  datahora: string;
};

export default function Page() {
  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [years, setYears] = useState<string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>("");

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
        const raw = res.data.data.map((i) =>
          new Date(i.datahora).getFullYear().toString()
        );
        const unique = Array.from(new Set(raw)).sort((a, b) =>
          b.localeCompare(a)
        );
        if (unique.length) {
          setYears(unique);
          setSelectedYear(unique[0]);
        }
      })
      .catch(console.error);
  }, []);

  const fetchPage = (pageNum: number) => {
    const filter: any = { status: { _eq: "published" } };
    if (selectedYear) {
      filter.datahora = {
        _between: [`${selectedYear}-01-01`, `${selectedYear}-12-31`],
      };
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
  };

  useEffect(() => {
    setPage(1);
    fetchPage(1);
  }, [selectedYear]);

  const handleLoadMore = () => {
    const next = page + 1;
    setPage(next);
    fetchPage(next);
  };

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Galeria</h2>
        <div className="my-4 w-40">
          <Select
            name="year"
            options={years.map((y) => ({ value: y, label: y }))}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
        <LightGallery
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          elementClassNames="grid grid-cols-3 gap-[8px] lg:gap-5"
        >
          {imagens
            .filter((item) => item.imagem)
            .map((item, i) => {
              const url = `${API_URL}/assets/${item.imagem}`;
              return (
                <a
                  key={item.id}
                  href={url}
                  className="block relative overflow-hidden rounded-[6px] aspect-square"
                >
                  <Image
                    src={url}
                    alt={`Imagem ${i + 1}`}
                    fill
                    unoptimized
                    className="object-cover hover:scale-105 transition-all duration-300 ease-in-out object-center"
                  />
                </a>
              );
            })}
        </LightGallery>
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
