"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "@/components/news/News";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

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

export default function NoticiaPage({ slug }: { slug: string }) {
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [otherNews, setOtherNews] = useState<NewsItem[]>([]);
  const [healthNews, setHealthNews] = useState<NewsItem[]>([]);

  function generateSlug(s: string) {
    return s
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  useEffect(() => {
    async function fetchArticle() {
      try {
        const newsRes = await axios.get<{ data: Omit<NewsItem, "slug">[] }>(
          `${API_URL}/items/Noticias`,
          {
            params: {
              fields:
                "id,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
              filter: { status: { _eq: "published" } },
            },
          }
        );
        const newsWithSlugs = newsRes.data.data.map((n) => ({
          ...n,
          slug: generateSlug(n.titulo),
        }));
        let found = newsWithSlugs.find((n) => n.slug === slug);

        if (!found) {
          const healthRes = await axios.get<{
            data: Omit<NewsItem, "slug">[];
          }>(`${API_URL}/items/Saude`, {
            params: {
              fields:
                "id,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
              filter: { status: { _eq: "published" } },
            },
          });
          const healthWithSlugs = healthRes.data.data.map((h) => ({
            ...h,
            slug: generateSlug(h.titulo),
          }));
          found = healthWithSlugs.find((h) => h.slug === slug);
        }

        setArticle(found || null);
        setOtherNews(
          newsWithSlugs
            .filter((n) => n.slug !== slug)
            .sort(
              (a, b) =>
                new Date(b.date_created).getTime() -
                new Date(a.date_created).getTime()
            )
            .slice(0, 3)
        );
      } catch (err) {
        console.error("Erro ao buscar artigo:", err);
      }
    }

    axios
      .get<{ data: Omit<NewsItem, "slug">[] }>(`${API_URL}/items/Saude`, {
        params: {
          fields:
            "id,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
          limit: 3,
        },
      })
      .then((res) =>
        setHealthNews(
          res.data.data.map((h) => ({
            ...h,
            slug: generateSlug(h.titulo),
          }))
        )
      )
      .catch((err) => console.error("Erro ao buscar saúde:", err));

    if (slug) fetchArticle();
  }, [slug]);

  if (!article) {
    return (
      <section className="bg-[var(--background-color)]">
        <div className="container sectionSpacing">
          <div className="flex justify-center items-center min-h-[400px]">
            <p className="text-[var(--text-color)]">
              {article === null ? "Carregando..." : "Artigo não encontrado"}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="grid gap-10 newsGrid">
          <div className="flex flex-col gap-5 lg:gap-10">
            <h3 className="text-2xl font-bold text-[var(--text-color)]">
              {article.titulo}
            </h3>
            <div>
              <p className="text-base">{article.subtitulo}</p>
              <p className="text-sm font-bold text-[var(--gray-color)]">
                {new Date(article.date_created).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div
              className="text-base text-[var(--text-color)]"
              dangerouslySetInnerHTML={{ __html: article.artigo || "" }}
            />
          </div>
          <div className="flex flex-col gap-5 lg:gap-10">
            <h3 className="text-xl font-bold uppercase">Outras notícias</h3>
            <div className="flex flex-col gap-5 mb-5">
              {otherNews.map((n) => (
                <News
                  key={n.id}
                  id={n.id}
                  slug={n.slug}
                  tag={n.tag}
                  titulo={n.titulo}
                  subtitulo={n.subtitulo}
                  imagem={n.imagem}
                  date_created={n.date_created}
                  variant="horizontal"
                />
              ))}
            </div>
            <h3 className="text-xl font-bold uppercase">Saúde e bem estar</h3>
            <div className="flex flex-col gap-5">
              {healthNews.map((h) => (
                <News
                  key={h.id}
                  id={h.id}
                  slug={h.slug}
                  tag={h.tag}
                  titulo={h.titulo}
                  subtitulo={h.subtitulo}
                  imagem={h.imagem}
                  date_created={h.date_created}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
