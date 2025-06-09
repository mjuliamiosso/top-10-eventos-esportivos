"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/common/Button";
import FilterButtons from "@/components/common/FilterButtons";
import Select from "@/components/common/Select";
import Ranking from "@/components/ranking/Ranking";
import { FaPlus } from "react-icons/fa6";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

type RankingItem = {
  id: string;
  pontos: number;
  jogador: { nome: string };
};

type Categoria = {
  id: string;
  nome: string;
};

const Page = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [meses, setMeses] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedMes, setSelectedMes] = useState("");
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await axios.get(`${API_URL}/items/Categorias`);
      const nomes = res.data.data;
      setCategorias(nomes);
      if (nomes.length > 0) setSelectedFilter(nomes[0].nome);
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchMeses = async () => {
      const res = await axios.get(`${API_URL}/items/Rankings`);
      const todos = res.data.data as { mes: string }[];
      const mesesUnicos = Array.from(new Set(todos.map((r) => r.mes))).sort(
        (a, b) => b.localeCompare(a)
      );
      setMeses(mesesUnicos);
      if (mesesUnicos.length > 0) setSelectedMes(mesesUnicos[0]);
    };
    fetchMeses();
  }, []);

  useEffect(() => {
    if (!selectedFilter || !selectedMes) return;
    const fetchRankings = async () => {
      const res = await axios.get(`${API_URL}/items/Rankings`, {
        params: {
          filter: {
            categoria: { nome: { _eq: selectedFilter } },
            mes: { _eq: selectedMes },
          },
          fields: ["id", "pontos", "jogador.nome"],
          sort: ["-pontos"],
          limit,
        },
      });
      setRankings(res.data.data);
    };
    fetchRankings();
  }, [selectedFilter, selectedMes, limit]);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        {/* Filtro Botões */}
        <div className="flex justify-center">
          <FilterButtons
            options={categorias.map((c) => c.nome)}
            selected={selectedFilter}
            onSelect={(value) => setSelectedFilter(value)}
          />
        </div>

        <p className="font-bold text-base text-[var(--secondary-color)]">
          Ranking {selectedFilter}
        </p>

        {/* Filtro Select */}
        <div>
          <Select
            name="mes"
            options={meses.map((m) => ({ value: m, label: m }))}
            value={selectedMes}
            onChange={(e) => setSelectedMes(e.target.value)}
          />
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
            {rankings.map((item, index) => (
              <Ranking
                key={item.id}
                rank={(index + 1).toString().padStart(2, "0")}
                player={item.jogador?.nome || "Desconhecido"}
                score={item.pontos.toString()}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button onClick={() => setLimit((prev) => prev + 10)}>
            <FaPlus /> Carregar mais
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Page;
