// src/app/news/[slug]/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import News from "@/components/news/News";
import Interview from "@/components/news/Interview";
import { useParams } from "next/navigation";

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

type HealthItem = NewsItem;

type InterviewItem = {
  id: string;
  titulo: string;
  endereco: string;
  data: string;
  video: string | null;
};

export default function Page() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [otherNews, setOtherNews] = useState<NewsItem[]>([]);
  const [healthNews, setHealthNews] = useState<HealthItem[]>([]);
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);

  useEffect(() => {
    axios
      .get<{ data: NewsItem[] }>(`${API_URL}/items/Noticias`, {
        params: {
          fields:
            "id,slug,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        },
      })
      .then((res) => setArticle(res.data.data[0] || null));

    axios
      .get<{ data: NewsItem[] }>(`${API_URL}/items/Noticias`, {
        params: {
          fields:
            "id,slug,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { slug: { _neq: slug }, status: { _eq: "published" } },
          sort: "-date_created",
          limit: 3,
        },
      })
      .then((res) => setOtherNews(res.data.data));

    axios
      .get<{ data: HealthItem[] }>(`${API_URL}/items/Saude`, {
        params: {
          fields:
            "id,slug,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
          limit: 3,
        },
      })
      .then((res) => setHealthNews(res.data.data));

    axios
      .get<{ data: InterviewItem[] }>(`${API_URL}/items/Entrevistas`, {
        params: {
          fields: "id,titulo,endereco,data,video",
          filter: { status: { _eq: "published" } },
          sort: "-data",
          limit: 3,
        },
      })
      .then((res) => setInterviews(res.data.data));
  }, [slug]);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="grid newsGrid">
          <div className="flex flex-col gap-5 lg:gap-10">
            <h3 className="text-2xl font-bold text-[var(--text-color)]">
              {article?.titulo}
            </h3>
            <div>
              <p className="text-base">{article?.subtitulo}</p>
              <p className="text-sm font-bold text-[var(--gray-color)]">
                {new Date(article?.date_created || "").toLocaleDateString(
                  "pt-BR",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                )}
              </p>
            </div>
            <div
              className="text-base text-[var(--text-color)]"
              dangerouslySetInnerHTML={{ __html: article?.artigo || "" }}
            />
          </div>
          <div className="flex flex-col gap-5 lg:gap-10">
            <h3 className="text-2xl font-bold uppercase">Outras notícias</h3>
            <div className="flex flex-col gap-5">
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
            <h3 className="text-2xl font-bold uppercase">Saúde e bem estar</h3>
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
            <h3 className="text-2xl font-bold uppercase">Entrevistas</h3>
            <div className="flex flex-col gap-5">
              {interviews.map((iv) => (
                <Interview
                  key={iv.id}
                  titulo={iv.titulo}
                  endereco={iv.endereco}
                  data={iv.data}
                  video={iv.video}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
