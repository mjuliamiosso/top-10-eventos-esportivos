"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Challenge from "@/components/challenges/Challenge";
import FilterButtons from "@/components/common/FilterButtons";
import Button from "@/components/common/Button";
import { FaPlus } from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const ITEMS_PER_PAGE = 5;

type RawJogador = {
  id: string;
  nome: string;
  representacao: { id: string; nome: string };
  foto: { id: string };
};

type RawDesafio = {
  id: string;
  categoria: { id: string; nome: string };
  datahora: string;
  votos_1: number;
  votos_2: number;
  jogador_1: RawJogador;
  jogador_2: RawJogador;
};

type UIChallenge = {
  id: string;
  category: string;
  dateTime: string;
  votesOne: number;
  votesTwo: number;
  playerOneName: string;
  playerOneInfo: string;
  playerOneImage: string;
  playerTwoName: string;
  playerTwoInfo: string;
  playerTwoImage: string;
};

export default function DesafiosPage() {
  const [desafios, setDesafios] = useState<UIChallenge[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [filter, setFilter] = useState<"Próximos" | "Últimos">("Próximos");
  const [userVotes, setUserVotes] = useState<
    Record<string, "one" | "two" | null>
  >({});

  useEffect(() => {
    const savedVotes = localStorage.getItem("userVotes");
    if (savedVotes) {
      try {
        setUserVotes(JSON.parse(savedVotes));
      } catch (error) {
        console.error("Erro ao carregar votos salvos:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userVotes", JSON.stringify(userVotes));
  }, [userVotes]);

  const fetchPage = useCallback(
    async (pageNum: number) => {
      const nowLocal = new Date(
        Date.now() - new Date().getTimezoneOffset() * 60000
      )
        .toISOString()
        .slice(0, 19);
      const dateFilter =
        filter === "Próximos"
          ? { "filter[datahora][_gte]": nowLocal }
          : { "filter[datahora][_lt]": nowLocal };

      const res = await axios.get<{ data: RawDesafio[] }>(
        `${API_URL}/items/Desafios`,
        {
          params: {
            fields:
              "id,categoria.nome,datahora,votos_1,votos_2,jogador_1.nome,jogador_1.representacao.nome,jogador_1.foto.id,jogador_2.nome,jogador_2.representacao.nome,jogador_2.foto.id",
            "filter[status][_eq]": "published",
            sort: filter === "Próximos" ? "datahora" : "-datahora",
            limit: ITEMS_PER_PAGE,
            offset: (pageNum - 1) * ITEMS_PER_PAGE,
            ...dateFilter,
          },
        }
      );

      const mapped: UIChallenge[] = res.data.data.map((item) => {
        const f1 = item.jogador_1.foto?.id;
        const f2 = item.jogador_2.foto?.id;
        return {
          id: item.id,
          category: item.categoria.nome,
          dateTime: item.datahora,
          votesOne: Number(item.votos_1) || 0,
          votesTwo: Number(item.votos_2) || 0,
          playerOneName: item.jogador_1.nome,
          playerOneInfo: item.jogador_1.representacao.nome,
          playerOneImage: f1 ? `${API_URL}/assets/${f1}` : "/fallback.jpg",
          playerTwoName: item.jogador_2.nome,
          playerTwoInfo: item.jogador_2.representacao.nome,
          playerTwoImage: f2 ? `${API_URL}/assets/${f2}` : "/fallback.jpg",
        };
      });

      setDesafios((prev) => [...prev, ...mapped]);
      setHasMore(mapped.length === ITEMS_PER_PAGE);
    },
    [filter]
  );

  useEffect(() => {
    setDesafios([]);
    setPage(1);
    fetchPage(1);
  }, [filter, fetchPage]);

  const handleVoteSwitch = (desafioId: string, next: "one" | "two") => {
    const prev = userVotes[desafioId] ?? null;
    const nextVote = prev === next ? null : next;
    const desafio = desafios.find((d) => d.id === desafioId)!;
    const patch: Record<string, number> = {};

    if (prev === "one") patch.votos_1 = Number(desafio.votesOne) - 1;
    if (prev === "two") patch.votos_2 = Number(desafio.votesTwo) - 1;

    if (nextVote === "one") {
      patch.votos_1 = (patch.votos_1 ?? Number(desafio.votesOne)) + 1;
    }
    if (nextVote === "two") {
      patch.votos_2 = (patch.votos_2 ?? Number(desafio.votesTwo)) + 1;
    }

    axios
      .patch(`${API_URL}/items/Desafios/${desafioId}`, patch, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        setDesafios((prevList) =>
          prevList.map((d) =>
            d.id === desafioId
              ? {
                  ...d,
                  votesOne:
                    patch.votos_1 !== undefined ? patch.votos_1 : d.votesOne,
                  votesTwo:
                    patch.votos_2 !== undefined ? patch.votos_2 : d.votesTwo,
                }
              : d
          )
        );
        setUserVotes((u) => ({ ...u, [desafioId]: nextVote }));
      })
      .catch((error) => {
        console.error("Erro ao votar:", error);
        alert("Erro ao registrar voto. Tente novamente.");
      });
  };

  return (
    <section className="flex flex-col min-h-screen bg-[var(--background-color)]">
      <div className="container sectionSpacing flex-grow">
        <h2 className="sectionHeading">Desafios</h2>
        <FilterButtons
          options={["Próximos", "Últimos"]}
          selected={filter}
          onSelect={(v: string) => setFilter(v as "Próximos" | "Últimos")}
        />
        <div className="flex flex-col gap-5">
          {desafios.map((d) => (
            <Challenge
              key={d.id}
              category={d.category}
              dateTime={d.dateTime}
              playerOne={d.playerOneName}
              playerOneInfo={d.playerOneInfo}
              playerOneImage={d.playerOneImage}
              playerTwo={d.playerTwoName}
              playerTwoInfo={d.playerTwoInfo}
              playerTwoImage={d.playerTwoImage}
              votesOne={d.votesOne}
              votesTwo={d.votesTwo}
              voted={userVotes[d.id] ?? null}
              canVote={filter === "Próximos"}
              onVote={(p) => handleVoteSwitch(d.id, p)}
            />
          ))}
        </div>
        {hasMore && (
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => {
                const next = page + 1;
                setPage(next);
                fetchPage(next);
              }}
            >
              <FaPlus /> Carregar mais
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
