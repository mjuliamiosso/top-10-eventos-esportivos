import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const metadata = {
  title: {
    default: "Top 10 Eventos Esportivos",
    template: "%s | Top 10 Eventos Esportivos",
  },
  description:
    "Ranking de tênis amador em Caraguatatuba (SP): acompanhe rankings, desafios e fotos oficiais.",
  alternates: {
    canonical: "https://top10rgta.com.br/",
  },
  openGraph: {
    title: "Top 10 Eventos Esportivos",
    description:
      "Ranking de tênis amador em Caraguatatuba (SP): acompanhe rankings, desafios e fotos oficiais.",
    url: "https://top10rgta.com.br/",
    siteName: "Top 10 Eventos Esportivos",
    images: [
      { url: "/og.png", width: 1200, height: 630, alt: "Top 10 Eventos" },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 Eventos Esportivos",
    description:
      "Ranking de tênis amador em Caraguatatuba (SP): acompanhe rankings, desafios e fotos oficiais.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <Header />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
