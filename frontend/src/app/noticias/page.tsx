import type { Metadata } from "next";
import Noticias from "./Noticias";

export const metadata: Metadata = {
  title: "Notícias – Top 10 Eventos Esportivos",
  description:
    "Últimas notícias e entrevistas do tênis amador em Caraguatatuba (SP).",
  alternates: { canonical: "https://top10rgta.com.br/noticias" },
  openGraph: {
    title: "Notícias – Top 10 Eventos Esportivos",
    description: "Últimas notícias e entrevistas do tênis amador local.",
    url: "https://top10rgta.com.br/noticias",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Notícias" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias – Top 10 Eventos Esportivos",
    description: "Últimas notícias e entrevistas do tênis amador local.",
    images: ["/og.png"],
  },
};

export default function Page() {
  return <Noticias />;
}
