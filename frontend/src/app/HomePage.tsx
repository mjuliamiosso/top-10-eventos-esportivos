"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Challenge from "@/components/challenges/Challenge";
import Button from "@/components/common/Button";
import Faq from "@/components/landingPage/FAQ";
import News from "@/components/news/News";
import Ranking from "@/components/ranking/Ranking";
import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const categorias = ["Feminino", "Principiante", "Intermediário", "Avançado"];

const WHATSAPP_NUMBER = "5512982983083";
const WHATSAPP_MESSAGE = "Olá, estou interessado nos seus serviços!";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

type SponsorItem = {
  imagem: { id: string };
  link?: string;
};

type NewsItem = {
  id: string;
  slug: string;
  tag: { id: string; nome: string };
  titulo: string;
  subtitulo: string;
  imagem: string | null;
  artigo: string;
  date_created: string;
};

type RankingItem = {
  id: string;
  pontos: number;
  jogador: { nome: string };
};

type RawDesafio = {
  id: string;
  categoria: { nome: string };
  datahora: string;
  votos_1: number;
  votos_2: number;
  jogador_1: {
    nome: string;
    representacao: { nome: string };
    foto: { id: string } | null;
  };
  jogador_2: {
    nome: string;
    representacao: { nome: string };
    foto: { id: string } | null;
  };
};

type UiDesafio = {
  id: string;
  category: string;
  dateTime: string;
  votesOne: number;
  votesTwo: number;
  playerOne: string;
  playerOneInfo: string;
  playerOneImage: string;
  playerTwo: string;
  playerTwoInfo: string;
  playerTwoImage: string;
};

type FaqItem = { pergunta: string; resposta: string };
type MesRecord = { mes: string };

export default function HomePage() {
  const responsiveHero = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 1 },
    desktop: { breakpoint: { max: 1440, min: 1024 }, items: 1 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };
  const responsiveSponsor = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1536 }, items: 12 },
    desktop: { breakpoint: { max: 1536, min: 1280 }, items: 10 },
    largeTablet: { breakpoint: { max: 1280, min: 1024 }, items: 8 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 6 },
    smallTablet: { breakpoint: { max: 768, min: 640 }, items: 4 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 3 },
  };

  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [latestMes, setLatestMes] = useState<string>("");
  const [rankingData, setRankingData] = useState<Record<string, RankingItem[]>>(
    {}
  );
  const [desafios, setDesafios] = useState<UiDesafio[]>([]);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const [banners, setBanners] = useState<string[]>([]);
  const [sponsors, setSponsors] = useState<{ src: string; link?: string }[]>(
    []
  );

  useEffect(() => {
    // Sponsors with optional link
    axios
      .get<{ data: SponsorItem[] }>(`${API_URL}/items/Patrocinadores`, {
        params: {
          fields: "imagem.id,link",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
        },
      })
      .then((res) =>
        setSponsors(
          res.data.data
            .filter((item) => item.imagem?.id)
            .map((item) => ({
              src: `${API_URL}/assets/${item.imagem.id}`,
              link: item.link || undefined,
            }))
        )
      )
      .catch(console.error);

    // News
    axios
      .get<{ data: NewsItem[] }>(`${API_URL}/items/Noticias`, {
        params: {
          fields:
            "id,slug,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
          limit: 4,
        },
      })
      .then((res) => setNewsList(res.data.data))
      .catch(console.error);

    // Latest month
    axios
      .get<{ data: MesRecord[] }>(`${API_URL}/items/Rankings`, {
        params: { fields: "mes", filter: { status: { _eq: "published" } } },
      })
      .then((res) => {
        const meses = Array.from(new Set(res.data.data.map((r) => r.mes))).sort(
          (a, b) => b.localeCompare(a)
        );
        if (meses.length) setLatestMes(meses[0]);
      })
      .catch(console.error);

    // Banners
    axios
      .get<{ data: { imagem: { id: string } }[] }>(`${API_URL}/items/Banner`, {
        params: {
          fields: "imagem.id",
          filter: { status: { _eq: "published" } },
        },
      })
      .then((res) =>
        setBanners(res.data.data.map((b) => `${API_URL}/assets/${b.imagem.id}`))
      )
      .catch(console.error);

    // FAQs
    axios
      .get<{ data: FaqItem[] }>(`${API_URL}/items/Faqs`, {
        params: {
          fields: "pergunta,resposta",
          filter: { status: { _eq: "published" } },
          sort: "sort",
        },
      })
      .then((res) => setFaqs(res.data.data))
      .catch(console.error);

    // Desafios: try Próximos, else Últimos
    const now = new Date().toISOString();
    const mapDesafio = (item: RawDesafio): UiDesafio => {
      const f1 = item.jogador_1.foto?.id;
      const f2 = item.jogador_2.foto?.id;
      return {
        id: item.id,
        category: item.categoria.nome,
        dateTime: item.datahora,
        votesOne: Number(item.votos_1) || 0,
        votesTwo: Number(item.votos_2) || 0,
        playerOne: item.jogador_1.nome,
        playerOneInfo: item.jogador_1.representacao.nome,
        playerOneImage: f1 ? `${API_URL}/assets/${f1}` : "/fallback.jpg",
        playerTwo: item.jogador_2.nome,
        playerTwoInfo: item.jogador_2.representacao.nome,
        playerTwoImage: f2 ? `${API_URL}/assets/${f2}` : "/fallback.jpg",
      };
    };

    axios
      .get<{ data: RawDesafio[] }>(`${API_URL}/items/Desafios`, {
        params: {
          fields:
            "id,categoria.nome,datahora,votos_1,votos_2," +
            "jogador_1.nome,jogador_1.representacao.nome,jogador_1.foto.id," +
            "jogador_2.nome,jogador_2.representacao.nome,jogador_2.foto.id",
          "filter[status][_eq]": "published",
          "filter[datahora][_gte]": now,
          sort: "datahora",
          limit: 3,
        },
      })
      .then((res) => {
        if (res.data.data.length) {
          setDesafios(res.data.data.map(mapDesafio));
        } else {
          axios
            .get<{ data: RawDesafio[] }>(`${API_URL}/items/Desafios`, {
              params: {
                fields:
                  "id,categoria.nome,datahora,votos_1,votos_2," +
                  "jogador_1.nome,jogador_1.representacao.nome,jogador_1.foto.id," +
                  "jogador_2.nome,jogador_2.representacao.nome,jogador_2.foto.id",
                "filter[status][_eq]": "published",
                "filter[datahora][_lt]": now,
                sort: "-datahora",
                limit: 3,
              },
            })
            .then((res2) => setDesafios(res2.data.data.map(mapDesafio)))
            .catch(console.error);
        }
      })
      .catch(console.error);
  }, []);

  // Ranking data per category
  useEffect(() => {
    if (!latestMes) return;
    categorias.forEach((cat) => {
      axios
        .get<{ data: RankingItem[] }>(`${API_URL}/items/Rankings`, {
          params: {
            fields: "id,pontos,jogador.nome",
            filter: {
              status: { _eq: "published" },
              mes: { _eq: latestMes },
              categoria: { nome: { _eq: cat } },
            },
            sort: "-pontos",
            limit: 5,
          },
        })
        .then((res) =>
          setRankingData((prev) => ({ ...prev, [cat]: res.data.data }))
        )
        .catch(console.error);
    });
  }, [latestMes]);

  const featured = newsList.slice(0, 1);
  const side = newsList.slice(1);

  return (
    <section className="bg-[var(--background-color)]">
      <section className="flex flex-col gap-5">
        <Carousel
          swipeable
          draggable
          ssr
          infinite
          arrows
          autoPlay
          autoPlaySpeed={3000}
          responsive={responsiveHero}
        >
          {banners.map((src, i) => (
            <div key={i} className="relative w-full h-[400px] lg:h-[820px]">
              <Image
                src={src}
                alt="banner"
                fill
                className="object-fill"
                priority
              />
            </div>
          ))}
        </Carousel>

        <Carousel
          infinite
          partialVisible={false}
          arrows={false}
          swipeable={false}
          autoPlay
          autoPlaySpeed={1}
          transitionDuration={1000}
          customTransition="transform 1000ms linear"
          draggable={false}
          keyBoardControl
          responsive={responsiveSponsor}
        >
          {sponsors.map(({ src, link }, i) => (
            <div key={i} className="w-[130px] h-[60px] aspect-auto relative">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={src}
                    alt="patrocinador"
                    fill
                    className="object-cover object-center rounded-[6px]"
                  />
                </a>
              ) : (
                <Image
                  src={src}
                  alt="patrocinador"
                  fill
                  className="object-cover object-center rounded-[6px]"
                />
              )}
            </div>
          ))}
        </Carousel>
      </section>

      <section className="container sectionSpacing">
        {/* News section */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Fique por dentro</h2>
          <div className="grid newsGrid gap-5">
            {featured.map((n) => (
              <News key={n.id} {...n} />
            ))}
            <div className="flex flex-col gap-5">
              {side.map((n) => (
                <News key={n.id} variant="horizontal" {...n} />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/noticias">
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>

        {/* Ranking section */}
        <div className="flex flex-col gap-5 lg:gap-10 mt-12">
          <h2 className="sectionHeading">Ranking Atual</h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {categorias.map((cat) => (
              <div key={cat} className="flex flex-col gap-5">
                <p className="text-base font-bold text-[var(--secondary-color)]">
                  {cat}
                </p>
                <div>
                  <div className="flex justify-between px-[14px] mb-2">
                    <p className="font-bold text-sm text-[var(--dark-gray)]">
                      RK
                    </p>
                    <p className="font-bold text-sm text-[var(--dark-gray)]">
                      Jogador
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {(rankingData[cat] || []).map((item, i) => (
                      <Ranking
                        key={item.id}
                        variant="compact"
                        rank={(i + 1).toString().padStart(2, "0")}
                        player={item.jogador.nome}
                        score={item.pontos.toString()}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/ranking">
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="bg-[var(--secondary-color)] py-[60px]">
        <div className="container flex justify-center items-center flex-col lg:flex-row gap-5">
          <p className="text-2xl text-center font-bold text-[var(--text-white)]">
            Pronto pra entrar em quadra? Entre para o Ranking ou agende sua
            aula!
          </p>
          <Link
            href={whatsappLink}
            target="_blank"
            className="rounded-lg cursor-pointer font-bold bg-[var(--text-white)] text-[var(--secondary-color)] px-3 py-2 text-sm lg:px-4 lg:py-3 lg:text-base"
          >
            Comece Agora
          </Link>
        </div>
      </section>

      {/* Desafios section */}
      <section className="container sectionSpacing">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Topa um desafio?</h2>
          <div className="flex flex-col gap-5">
            {desafios.map((c) => (
              <Challenge
                key={c.id}
                category={c.category}
                dateTime={c.dateTime}
                votesOne={c.votesOne}
                votesTwo={c.votesTwo}
                voted={null}
                canVote={false}
                onVote={() => {}}
                playerOne={c.playerOne}
                playerOneInfo={c.playerOneInfo}
                playerOneImage={c.playerOneImage}
                playerTwo={c.playerTwo}
                playerTwoInfo={c.playerTwoInfo}
                playerTwoImage={c.playerTwoImage}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/desafios">
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-5 lg:gap-10 mt-12">
          <h2 className="sectionHeading">Perguntas Frequentes</h2>
          <div className="grid w-full gap-5 lg:grid-cols-2 sm:gap-x-7 items-start">
            {faqs.map((f) => (
              <Faq key={f.pergunta} question={f.pergunta} answer={f.resposta} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
