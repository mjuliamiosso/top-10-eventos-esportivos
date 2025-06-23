import type { Metadata } from "next";
import TennisCenterPage from "./TennisCenterPage";

export const metadata: Metadata = {
  title: "Tennis Center – Top 10 Eventos Esportivos",
  description:
    "Informações sobre quadras e parceiros do tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/tennisCenter" },
  openGraph: {
    title: "Tennis Center – Top 10 Eventos Esportivos",
    description: "Detalhes de locais e infraestrutura de jogo local.",
    url: "https://top10rgta.com.br/tennisCenter",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Tennis Center" },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis Center – Top 10 Eventos Esportivos",
    description: "Detalhes de locais e infraestrutura de jogo local.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <TennisCenterPage />;
}
