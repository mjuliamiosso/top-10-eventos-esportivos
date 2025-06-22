import type { Metadata } from "next";
import SobreNos from "./SobreNos";

export const metadata: Metadata = {
  title: "Quem Somos – Top 10 Eventos Esportivos",
  description:
    "Conheça a equipe e a missão do ranking de tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/sobreNos" },
  openGraph: {
    title: "Quem Somos – Top 10 Eventos Esportivos",
    description: "Nossa história e valores no tênis amador local.",
    url: "https://top10rgta.com.br/sobreNos",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Quem Somos" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quem Somos – Top 10 Eventos Esportivos",
    description: "Nossa história e valores no tênis amador local.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <SobreNos />;
}
