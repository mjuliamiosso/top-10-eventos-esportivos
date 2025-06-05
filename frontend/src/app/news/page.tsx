import Button from "@/components/common/Button";
import EventDate from "@/components/news/EventDate";
import Interview from "@/components/news/Interview";
import News from "@/components/news/News";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  // Notícias em Destaque
  const featuredNews = [
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
  ];
  // Notícias lateral
  const featuredNewsList = [
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
  ];
  // Outras notícias
  const otherNewsList = [
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
  ];

  // Eventos
  const eventsList = [
    {
      day: "01",
      month: "JUN",
      place: "Nao sei meu deus do ceu",
      address: "Rua casa da mãe Joana",
      date: "Dia 01/06/2025",
    },
    {
      day: "02",
      month: "JUN",
      place: "Nao sei meu deus do ceu",
      address: "Rua casa da mãe Joana",
      date: "Dia 01/06/2025",
    },
  ];

  // Saúde e bem estar
  const healthNewsList = [
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      description:
        "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
  ];

  // Entrevistas
  const interviewList = [
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca lembra Guga em Roland Garros...",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
  ];
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        {/* Notícias RGTA */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading lg:mb-5">Na nossa quadra</h2>
          {/* Notícias em destaque */}
          <div className="grid newsGrid gap-5">
            {featuredNews.map((news, index) => (
              <News key={index} {...news} />
            ))}
            {/* Lateral */}
            <div className="flex flex-col gap-5">
              {featuredNewsList.map((news, index) => (
                <News key={index} variant="horizontal" {...news} />
              ))}
            </div>
          </div>

          {/* Outras Notícias */}
          <div className="grid lg:grid-cols-3 gap-5">
            {otherNewsList.map((news, index) => (
              <News key={index} variant="responsive" {...news} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        </div>
        {/* Eventos */}
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading">O que ta rolando por aqui?</h2>
          {/* Lista de Eventos */}
          <div>
            {eventsList.map((news, index) => (
              <EventDate key={index} {...news} />
            ))}
          </div>
        </div>
        {/* Saúde e bem estar */}
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading">Saúde e bem estar</h2>
          <div className="flex flex-col lg:flex-row gap-5">
            {healthNewsList.map((news, index) => (
              <News key={index} variant="responsive" {...news} />
            ))}
          </div>
          <div className="flex justify-center">
            <Button>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        </div>
        {/* Entrevistas */}
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading">Entrevistas</h2>
          <div>
            {interviewList.map((news, index) => (
              <Interview key={index} {...news} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
