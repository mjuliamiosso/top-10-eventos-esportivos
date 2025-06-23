import type { Metadata } from "next";
import NoticiaPage from "./NoticiaPage";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;

  const res = await fetch(
    `${API_URL}/items/Noticias?fields=titulo,subtitulo,imagem`,
    { cache: "no-store" }
  );
  const items = (await res.json()).data as {
    titulo: string;
    subtitulo: string;
    imagem: string | null;
  }[];

  const normalized = items.map((n) => {
    const computedSlug = n.titulo
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    return { ...n, slug: computedSlug };
  });

  const match = normalized.find((n) => n.slug === slug);
  if (!match) return {};

  const url = `https://top10rgta.com.br/noticias/${slug}`;
  return {
    title: match.titulo,
    description: match.subtitulo,
    alternates: { canonical: url },
    openGraph: {
      title: match.titulo,
      description: match.subtitulo,
      url,
      images: [
        {
          url: match.imagem ? `${API_URL}/assets/${match.imagem}` : "/og.png",
          width: 1200,
          height: 630,
          alt: match.titulo,
        },
      ],
      locale: "pt_BR",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: match.titulo,
      description: match.subtitulo,
      images: [match.imagem ? `${API_URL}/assets/${match.imagem}` : "/og.png"],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  return <NoticiaPage slug={params.slug} />;
}
