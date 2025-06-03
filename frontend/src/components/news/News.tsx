import React, { FC } from "react";
import Image from "next/image";

interface NewsProps {
  title: string;
  description: string;
  date: string;
  image: string;
  variant?: "vertical" | "horizontal";
}

const News: FC<NewsProps> = ({
  title,
  description,
  date,
  image,
  variant = "vertical",
}) => {
  const isHorizontal = variant === "horizontal";

  return (
    <div
      className={`flex ${
        isHorizontal ? "flex-row gap-5 items-center" : "flex-col"
      }`}
    >
      {/* Imagem */}
      <div
        className={`relative ${
          isHorizontal
            ? "w-[100px] h-[100px] min-w-[100px] lg:h-[150px] lg:w-[150px]"
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
      <div className={`${isHorizontal ? "flex-1" : ""}`}>
        <div className="flex justify-between">
          <p className="text-[var(--secondary-color)] text-sm font-bold">
            RGTA
          </p>
          <p className="text-[var(--grey-color)] text-sm italic">{date}</p>
        </div>
        <p className="text-xl font-bold text-[var(--text-color)]">{title}</p>
        <p className="text-base text-[var(--text-color)]">{description}</p>
      </div>
    </div>
  );
};

export default News;