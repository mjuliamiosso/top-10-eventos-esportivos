import type { Metadata } from "next";
import Home from "./Home";

export const metadata: Metadata = {
  title: "Top 10 Eventos Esportivos",
  description:
    "Ranking de tênis amador em Caraguatatuba (SP): notícias, rankings e desafios em destaque.",
  alternates: { canonical: "https://top10rgta.com.br/" },
  openGraph: {
    title: "Top 10 Eventos Esportivos",
    description:
      "Ranking de tênis amador em Caraguatatuba (SP): notícias, rankings e desafios em destaque.",
    url: "https://top10rgta.com.br/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Home" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 Eventos Esportivos",
    description:
      "Ranking de tênis amador em Caraguatatuba (SP): notícias, rankings e desafios em destaque.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <Home />;
}
