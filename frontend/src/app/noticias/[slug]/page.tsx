import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsPageClient from "./NewsPageClient";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const { default: axios } = await import("axios");
  const res = await axios.get(`${API_URL}/items/Noticias`, {
    params: {
      filter: { slug: { _eq: slug } },
      fields: "titulo,subtitulo,imagem",
      limit: 1,
    },
  });
  const noticia = res.data.data[0];
  if (!noticia) return notFound();

  const url = `https://top10rgta.com.br/noticias/${slug}`;
  const description = noticia.subtitulo;

  return {
    title: noticia.titulo,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: noticia.titulo,
      description,
      url,
      images: [
        {
          url: noticia.imagem
            ? `${API_URL}/assets/${noticia.imagem}`
            : "/og.png",
          width: 1200,
          height: 630,
          alt: noticia.titulo,
        },
      ],
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description,
      images: [
        noticia.imagem ? `${API_URL}/assets/${noticia.imagem}` : "/og.png",
      ],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <NewsPageClient slug={slug} />;
}
