"use client";

import Button from "@/components/common/Button";
import EventDate from "@/components/news/EventDate";
import Interview from "@/components/news/Interview";
import News from "@/components/news/News";
import React, { useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
      place: "7º Jazz & Vinhos",
      address:
        "Praça de Eventos - Alameda José Francesconi, 1690 - Porto Novo, Caraguatatuba - SP, 11667-700",
      date: "5 de jun. - 8 de jun., 08:00h - 11:00h",
    },
    {
      day: "02",
      month: "JUN",
      place: "7º Jazz & Vinhos",
      address:
        "Praça de Eventos - Alameda José Francesconi, 1690 - Porto Novo, Caraguatatuba - SP, 11667-700",
      date: "5 de jun. - 8 de jun., 08:00h - 11:00h",
    },
    {
      day: "03",
      month: "JUN",
      place: "Nao sei meu deus do ceu",
      address: "Rua casa da mãe Joana",
      date: "Dia 01/06/2025",
    },
    {
      day: "04",
      month: "JUN",
      place: "Nao sei meu deus do ceu",
      address: "Rua casa da mãe Joana",
      date: "Dia 01/06/2025",
    },
    {
      day: "05",
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
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
    {
      title: "João Fonseca",
      info: "Torcedores ignoram partida na quadra principal para assistir...",
      date: "Ontem",
    },
  ];

  // Carrosel Evento
  const responsiveEvent = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  // Carrosel Entrevistas
  const responsiveInterview = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const carouselRefEvent = useRef<any>(null);
  const carouselRefInterview = useRef<any>(null);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        {/* Notícias RGTA */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Fique por dentro</h2>
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

          {/* Botão */}
          <div className="flex justify-center">
            <Button>
              <FaPlus /> Carregar mais
            </Button>
          </div>
        </div>
        {/* Eventos */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <div className="flex justify-between items-center">
            <h2 className="sectionHeading">O que ta rolando por aqui?</h2>
            <div className="lg:flex lg:justify-end gap-5 hidden">
              <button
                onClick={() => carouselRefEvent.current?.previous()}
                className="bg-white text-black rounded-full p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={() => carouselRefEvent.current?.next()}
                className="bg-white text-black rounded-full p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          {/* Lista de Eventos */}
          <Carousel
            ref={carouselRefEvent}
            swipeable={true}
            draggable={true}
            ssr={true}
            infinite={true}
            renderDotsOutside={true}
            autoPlay={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
            responsive={responsiveEvent}
          >
            {eventsList.map((news, index) => (
              <EventDate key={index} {...news} />
            ))}
          </Carousel>
        </div>
        {/* Saúde e bem estar */}
        <div className="flex flex-col gap-5 lg:gap-10">
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
        <div className="flex flex-col gap-5 lg:gap-10">
          <div className="flex justify-between items-center">
            <h2 className="sectionHeading">Entrevistas</h2>
            <div className="lg:flex lg:justify-end gap-5 hidden">
              <button
                onClick={() => carouselRefInterview.current?.previous()}
                className="bg-white text-black rounded-full p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={() => carouselRefInterview.current?.next()}
                className="bg-white text-black rounded-full p-2 transition hover:bg-gray-100 cursor-pointer"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <Carousel
            ref={carouselRefInterview}
            swipeable={true}
            draggable={true}
            ssr={true}
            infinite={true}
            renderDotsOutside={true}
            autoPlay={false}
            arrows={false}
            dotListClass="custom-dot-list-style"
            responsive={responsiveInterview}
          >
            {interviewList.map((news, index) => (
              <Interview key={index} {...news} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default page;
