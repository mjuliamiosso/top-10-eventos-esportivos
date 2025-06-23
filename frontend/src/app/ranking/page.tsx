import type { Metadata } from "next";
import RankingPage from "./RankingPage";

export const metadata: Metadata = {
  title: "Ranking – Top 10 Eventos Esportivos",
  description:
    "Confira o ranking geral e por categoria do tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/ranking" },
  openGraph: {
    title: "Ranking – Top 10 Eventos Esportivos",
    description: "Posições e pontuações dos melhores jogadores locais.",
    url: "https://top10rgta.com.br/ranking",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ranking" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ranking – Top 10 Eventos Esportivos",
    description: "Posições e pontuações dos melhores jogadores locais.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <RankingPage />;
}
