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

type RankingFilter = {
  status: { _eq: "published" };
  mes: { _eq: string };
  categoria?: { nome: { _eq: string } };
};

type Categoria = {
  id: string;
  nome: string;
};

type MesOption = {
  value: string; // original date
  label: string; // jun 25
};

export default function RankingClient() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [meses, setMeses] = useState<MesOption[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("Geral");
  const [selectedMes, setSelectedMes] = useState<string>("");
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [limit, setLimit] = useState(10);

  // search categories
  useEffect(() => {
    axios
      .get<{ data: Categoria[] }>(`${API_URL}/items/Categorias`)
      .then((res) => {
        setCategorias(res.data.data);
        setSelectedFilter("Geral");
      })
      .catch(console.error);
  }, []);

  // search months
  useEffect(() => {
    axios
      .get<{ data: { mes: string }[] }>(`${API_URL}/items/Rankings`, {
        params: {
          fields: ["mes"],
          filter: { status: { _eq: "published" } },
        },
      })
      .then((res) => {
        const rawMeses = Array.from(
          new Set(res.data.data.map((r) => r.mes))
        ).sort((a, b) => b.localeCompare(a));

        const opts: MesOption[] = rawMeses.map((raw) => {
          const d = new Date(raw);
          const month = d
            .toLocaleString("pt-BR", { month: "short" })
            .toLowerCase()
            .replace(/\.$/, "");
          const year = d.getFullYear().toString().slice(-2);
          return { value: raw, label: `${month} ${year}` };
        });

        setMeses(opts);
        if (opts.length) setSelectedMes(opts[0].value);
      })
      .catch(console.error);
  }, []);

  // search rankings
  useEffect(() => {
    if (!selectedMes) return;

    const filter: RankingFilter = {
      status: { _eq: "published" },
      mes: { _eq: selectedMes },
    };
    if (selectedFilter !== "Geral") {
      filter.categoria = { nome: { _eq: selectedFilter } };
    }

    axios
      .get<{ data: RankingItem[] }>(`${API_URL}/items/Rankings`, {
        params: {
          filter,
          fields: ["id", "pontos", "jogador.nome"],
          sort: ["-pontos"],
          limit,
        },
      })
      .then((res) => setRankings(res.data.data))
      .catch(console.error);
  }, [selectedFilter, selectedMes, limit]);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <h2 className="sectionHeading">Ranking</h2>
        {/* category filter */}
        <div className="flex justify-center mb-4">
          <FilterButtons
            options={["Geral", ...categorias.map((c) => c.nome)]}
            selected={selectedFilter}
            onSelect={setSelectedFilter}
          />
        </div>

        {/* month filter */}
        <div className="my-2">
          <Select
            name="mes"
            options={meses.map((m) => ({ value: m.value, label: m.label }))}
            value={selectedMes}
            onChange={(e) => setSelectedMes(e.target.value)}
          />
        </div>

        {/* rankings */}
        <div className="flex flex-col gap-2">
          <div className="flex px-[14px] justify-between items-center w-full text-[var(--dark-gray)] font-bold text-sm">
            <div className="flex items-center gap-5">
              <p className="w-[35px] text-left">RK</p>
              <p>Jogador</p>
            </div>
            <p>Total pts</p>
          </div>
          <div className="flex flex-col gap-2">
            {rankings.map((item, i) => (
              <Ranking
                key={item.id}
                rank={(i + 1).toString().padStart(2, "0")}
                player={item.jogador?.nome || "Desconhecido"}
                score={item.pontos.toString()}
              />
            ))}
          </div>
        </div>

        {/* load more */}
        {rankings.length === limit && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setLimit((prev) => prev + 10)}>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
