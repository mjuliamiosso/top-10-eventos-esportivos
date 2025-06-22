import type { Metadata } from "next";
import Desafios from "./Desafios";

export const metadata: Metadata = {
  title: "Desafios – Top 10 Eventos Esportivos",
  description:
    "Participe e acompanhe resultados dos desafios de tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/desafios" },
  openGraph: {
    title: "Desafios – Top 10 Eventos Esportivos",
    description: "Próximos duelos e resultados dos nossos desafios locais.",
    url: "https://top10rgta.com.br/desafios",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Desafios" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desafios – Top 10 Eventos Esportivos",
    description: "Próximos duelos e resultados dos nossos desafios locais.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <Desafios />;
}
