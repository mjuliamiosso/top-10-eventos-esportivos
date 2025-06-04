"use client";

import Challenge from "@/components/challenges/Challenge";
import Button from "@/components/common/Button";
import FilterButtons from "@/components/common/FilterButtons";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

const page = () => {
  const [selectedFilter, setSelectedFilter] = useState("Próximos");

  const filtros = ["Próximos", "Últimos"];

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Desafios</h2>
        <FilterButtons
          options={filtros}
          selected={selectedFilter}
          onSelect={(value) => setSelectedFilter(value)}
        />
        <div className="flex flex-col gap-5">
          <Challenge
            category={"Avançado"}
            playerOne={"Lucas Almeida"}
            playerOneInfo={"Tennis Point"}
            playerOneImage={"/beach-tennis.webp"}
            playerTwo={"Bruno Costa"}
            playerTwoInfo={"Arena Top Spin"}
            playerTwoImage={"/beach-tennis.webp"}
          ></Challenge>
          <Challenge
            category={"Avançado"}
            playerOne={"Lucas Almeida"}
            playerOneInfo={"Tennis Point"}
            playerOneImage={"/beach-tennis.webp"}
            playerTwo={"Bruno Costa"}
            playerTwoInfo={"Arena Top Spin"}
            playerTwoImage={"/beach-tennis.webp"}
          ></Challenge>
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
