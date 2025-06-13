// src/components/news/News.tsx
import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
  id: string;
  slug: string;
  tag?: { id: string; nome: string } | null;
  titulo: string;
  subtitulo: string;
  imagem: string | null;
  date_created: string;
  variant?: "vertical" | "horizontal" | "responsive";
}

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

const News: FC<NewsProps> = ({
  slug,
  tag,
  titulo,
  subtitulo,
  imagem,
  date_created,
  variant = "vertical",
}) => {
  const isHorizontal = variant === "horizontal";
  const isResponsive = variant === "responsive";
  const dateStr = new Date(date_created).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const imgUrl = imagem ? `${API_URL}/assets/${imagem}` : "/fallback.jpg";

  return (
    <div
      className={`flex ${
        isHorizontal
          ? "flex-row gap-5"
          : isResponsive
          ? "flex-row lg:flex-col gap-5"
          : "flex-col gap-5"
      }`}
    >
      <div
        className={`relative overflow-hidden rounded-lg ${
          isHorizontal
            ? "w-[100px] h-[100px]"
            : isResponsive
            ? "w-[100px] h-[100px] min-w-[100px] lg:w-full lg:aspect-[1/1] lg:h-[225px] lg:max-h-[225px]"
            : "w-full max-h-[200px] aspect-[1/1] lg:max-h-[380px]"
        }`}
      >
        <Image
          src={imgUrl}
          alt={titulo}
          fill
          unoptimized
          className="object-cover object-center rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className={`${isHorizontal || isResponsive ? "flex-1" : ""}`}>
        <div className="flex justify-between">
          <p className="text-[var(--secondary-color)] text-sm font-bold">
            {tag?.nome || ""}
          </p>
          <p className="text-[var(--gray-color)] text-sm italic">{dateStr}</p>
        </div>
        <Link href={`/noticias/${slug}`}>
          <p className="textLimit text-xl font-bold text-[var(--text-color)] hover:text-[var(--secondary-color)] transition">
            {titulo}
          </p>
        </Link>
        <p className="textLimit text-base text-[var(--text-color)]">
          {subtitulo}
        </p>
      </div>
    </div>
  );
};

export default News;
