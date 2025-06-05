import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Galeria</h2>

        {/* Imagens */}
        <div
          className="
            grid 
            grid-cols-3 
            grid-rows-2 
            gap-2 
            lg:gap-5
          "
        >
          {/* Item 1 — ocupa 2 linhas */}
          <div className="relative col-start-1 col-end-2 row-start-1 row-end-3 h-full">
            <Image
              src={"/beach-tennis.webp"}
              alt={"error"}
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>

          {/* Item 2 */}
          <div className="relative col-start-2 col-end-3 row-start-1 row-end-2 aspect-square">
            <Image
              src={"/beach-tennis.webp"}
              alt={"error"}
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>

          {/* Item 3 */}
          <div className="relative col-start-3 col-end-4 row-start-1 row-end-2 aspect-square">
            <Image
              src={"/beach-tennis.webp"}
              alt={"error"}
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>

          {/* Item 4 */}
          <div className="relative col-start-2 col-end-3 row-start-2 row-end-3 aspect-square">
            <Image
              src={"/beach-tennis.webp"}
              alt={"error"}
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>

          {/* Item 5 */}
          <div className="relative col-start-3 col-end-4 row-start-2 row-end-3 aspect-square">
            <Image
              src={"/beach-tennis.webp"}
              alt={"error"}
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
        </div>
        {/* Botão */}
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
