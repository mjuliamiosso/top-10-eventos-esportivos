import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
  title: string;
  description: string;
  date: string;
  image: string;
  variant?: "vertical" | "horizontal" | "responsive";
}

const News: FC<NewsProps> = ({
  title,
  description,
  date,
  image,
  variant = "vertical",
}) => {
  const isHorizontal = variant === "horizontal";
  const isResponsive = variant === "responsive";

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
      {/* Imagem */}
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
          src={image}
          alt="news-image"
          fill
          className="object-cover object-center rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Texto */}
      <div className={`${isHorizontal || isResponsive ? "flex-1" : ""}`}>
        <div className="flex justify-between">
          <p className="text-[var(--secondary-color)] text-sm font-bold">
            RGTA
          </p>
          <p className="text-[var(--gray-color)] text-sm italic">{date}</p>
        </div>
        <Link href="">
          <p className="textLimit text-xl font-bold text-[var(--text-color)] hover:text-[var(--secondary-color)] transition">
            {title}
          </p>
        </Link>
        <p className="textLimit text-base text-[var(--text-color)]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default News;
