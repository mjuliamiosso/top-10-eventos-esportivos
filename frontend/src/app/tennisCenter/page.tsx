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
import { FaPlus } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

type ImagemItem = {
  id: string;
  imagem: string | null;
};

export default function TennisCenterPage() {
  const [imagens, setImagens] = useState<ImagemItem[]>([]);
  const [limit, setLimit] = useState(6);

  useEffect(() => {
    axios
      .get<{ data: ImagemItem[] }>(`${API_URL}/items/Tennis_Center`, {
        params: {
          fields: "id,imagem",
          "filter[status][_eq]": "published",
          sort: "-date_created",
          limit,
        },
      })
      .then((res) => setImagens(res.data.data))
      .catch(console.error);
  }, [limit]);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Tennis Center</h2>
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
                  className="block relative overflow-hidden rounded-lg aspect-square"
                >
                  <Image
                    src={url}
                    alt={`Imagem ${i + 1}`}
                    fill
                    unoptimized
                    className="rounded-lg hover:scale-105 transition-all duration-300 ease-in-out object-cover"
                  />
                </a>
              );
            })}
        </LightGallery>
        {imagens.length === limit && (
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
