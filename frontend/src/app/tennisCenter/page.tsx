import Button from "@/components/common/Button";
import Image from "next/image";
import React from "react";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Tennis Center</h2>
        <div className="grid grid-cols-3 gap-2 lg:gap-5">
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
          <div className="aspect-[1/1] relative w-full">
            <Image
              src="/beach-tennis.webp"
              alt="error"
              fill
              className="object-cover object-center rounded-[6px]"
            ></Image>
          </div>
        </div>
        <div className="flex justify-center">
          <Button>
            <FaPlus /> Carregar mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default page;
