import React, { FC } from "react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  image: string;
}

const Project: FC<ProjectProps> = ({ title, description, image }) => {
  return (
    <div className="flex p-2.5 flex-col-reverse lg:flex-row items-center bg-white rounded-lg text-[var(--text-color)]">
      <div className="flex flex-col px-5 w-full">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-base">{description}</p>
      </div>

      <div className="w-full max-h-[200px] aspect-[1/1] relative lg:w-[190px] lg:h-[190px]">
        <Image
          src={image}
          alt="project-image"
          fill
          unoptimized
          className="object-cover object-center rounded-[6px]"
        />
      </div>
    </div>
  );
};

export default Project;
