"use client";

import Button from "@/components/common/Button";
import FilterButtons from "@/components/common/FilterButtons";
import Select from "@/components/common/Select";
import Ranking from "@/components/ranking/Ranking";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  const [selectedFilter, setSelectedFilter] = useState("Masculino");

  //   Filtro Botões
  const filtros = [
    "Geral",
    "Feminino",
    "Principiante",
    "Intermediário",
    "Avançado",
  ];

  //   Filtro Select
  const options = [
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
  ];

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Ranking</h2>
        {/* Filtro Botões */}
        <div className="flex justify-center">
          <FilterButtons
            options={filtros}
            selected={selectedFilter}
            onSelect={(value) => setSelectedFilter(value)}
          />
        </div>
        <p className="font-bold text-base text-[var(--secondary-color)]">
          Ranking Geral
        </p>
        {/* Filtro Select */}
        <div>
          <Select name="meuSelect" options={options} />
        </div>
        {/* Ranking */}
        <div className="flex flex-col gap-2">
          <div className="flex px-[14px] justify-between items-center w-full text-[var(--dark-gray)] font-bold text-sm">
            <div className="flex items-center gap-5">
              <p className="w-[35px] text-left">RK</p>
              <p>Jogador</p>
            </div>
            <p>Total pts</p>
          </div>
          {/* Lista */}
          <div className="flex flex-col gap-2">
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
            <Ranking
              rank={"01"}
              player={"Lucas Almeida"}
              score={"89"}
            ></Ranking>
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
