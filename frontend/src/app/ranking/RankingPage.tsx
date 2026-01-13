"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "@/components/common/Button";
import FilterButtons from "@/components/common/FilterButtons";
import Select from "@/components/common/Select";
import Ranking from "@/components/ranking/Ranking";

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

// **New**: explicit params type instead of `any`
type RankingRequestParams = {
  filter: RankingFilter;
  fields: string[];
  sort: string[];
  limit?: number;
};

export default function RankingPage() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [meses, setMeses] = useState<MesOption[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("Geral");
  const [selectedMes, setSelectedMes] = useState<string>("");
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [limit, setLimit] = useState<number | null>(10);

  // fetch categories, excluding "Extra"
  useEffect(() => {
    axios
      .get<{ data: Categoria[] }>(`${API_URL}/items/Categorias`)
      .then((res) => {
        const filtered = res.data.data.filter(
          (c) => c.nome.trim().toLowerCase() !== "extra"
        );
        setCategorias(filtered);
        setSelectedFilter("Geral");
      })
      .catch(console.error);
  }, []);

  // fetch available months
  useEffect(() => {
    axios
      .get<{ data: { mes: string }[] }>(`${API_URL}/items/Rankings`, {
        params: {
          fields: ["mes"],
          filter: { status: { _eq: "published" } },
          sort: ["-mes"], // newest first
          limit: -1, // get all, not just first 100
        },
      })
      .then((res) => {
        const rawMeses = Array.from(new Set(res.data.data.map((r) => r.mes)));

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

  // fetch rankings whenever filter, month, or limit changes
  useEffect(() => {
    if (!selectedMes) return;

    const filter: RankingFilter = {
      status: { _eq: "published" },
      mes: { _eq: selectedMes },
    };
    if (selectedFilter !== "Geral") {
      filter.categoria = { nome: { _eq: selectedFilter } };
    }

    // **Use our typed params**
    const params: RankingRequestParams = {
      filter,
      fields: ["id", "pontos", "jogador.nome"],
      sort: ["-pontos", "sort"],
    };

    axios
      .get<{ data: RankingItem[] }>(`${API_URL}/items/Rankings`, { params })
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

        {/* rankings list */}
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

        {/* “Mostrar Tudo” button */}
        {limit !== null && (
          <div className="flex justify-center mt-4">
            <Button onClick={() => setLimit(null)}>Mostrar Tudo</Button>
          </div>
        )}
      </div>
    </section>
  );
}
