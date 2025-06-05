import React, { FC } from "react";
import Image from "next/image";

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
          ? "flex-row gap-5 items-center"
          : isResponsive
          ? "flex-row lg:flex-col gap-5"
          : "flex-col"
      }`}
    >
      {/* Imagem */}
      <div
        className={`relative ${
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
          className="object-cover object-center rounded-lg"
        />
      </div>

      {/* Texto */}
      <div className={`${isHorizontal || isResponsive ? "flex-1" : ""}`}>
        <div className="flex justify-between mt-2">
          <p className="text-[var(--secondary-color)] text-sm font-bold">
            RGTA
          </p>
          <p className="text-[var(--gray-color)] text-sm italic">{date}</p>
        </div>
        <p className="text-xl font-bold text-[var(--text-color)]">{title}</p>
        <p className="text-base text-[var(--text-color)]">{description}</p>
      </div>
    </div>
  );
};

export default News;
