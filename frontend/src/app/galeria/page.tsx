import type { Metadata } from "next";
import Galeria from "./GaleriaPage";

export const metadata: Metadata = {
  title: "Galeria – Top 10 Eventos Esportivos",
  description:
    "Veja fotos dos principais eventos de tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/galeria" },
  openGraph: {
    title: "Galeria – Top 10 Eventos Esportivos",
    description: "Fotos dos principais eventos de tênis amador.",
    url: "https://top10rgta.com.br/galeria",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Galeria" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Galeria – Top 10 Eventos Esportivos",
    description: "Veja fotos dos principais eventos de tênis amador.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <Galeria />;
}
