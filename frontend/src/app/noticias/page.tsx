"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Button from "@/components/common/Button";
import News from "@/components/news/News";
import EventDate from "@/components/news/EventDate";
import Interview from "@/components/news/Interview";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

type NewsItem = {
  id: string;
  slug: string;
  tag: { id: string; nome: string };
  titulo: string;
  subtitulo: string;
  imagem: string | null;
  artigo: string;
  date_created: string;
};

type EventItem = {
  id: string;
  nome: string;
  endereco: string;
  datahora: string;
};

type HealthItem = NewsItem;

type InterviewItem = {
  id: string;
  titulo: string;
  endereco: string;
  data: string;
  video: string | null;
};

const responsiveEvent = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 3 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const responsiveInterview = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 1440 }, items: 6 },
  desktop: { breakpoint: { max: 1440, min: 1024 }, items: 6 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

function generateSlug(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export default function Page() {
  const [featured, setFeatured] = useState<NewsItem[]>([]);
  const [lateral, setLateral] = useState<NewsItem[]>([]);
  const [otherAll, setOtherAll] = useState<NewsItem[]>([]);
  const [otherLimit, setOtherLimit] = useState(3);
  const [healthAll, setHealthAll] = useState<HealthItem[]>([]);
  const [healthLimit, setHealthLimit] = useState(3);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [interviews, setInterviews] = useState<InterviewItem[]>([]);
  const carouselRefEvent = useRef<any>(null);
  const carouselRefInterview = useRef<any>(null);

  useEffect(() => {
    axios
      .get<{ data: Omit<NewsItem, "slug">[] }>(`${API_URL}/items/Noticias`, {
        params: {
          fields:
            "id,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
        },
      })
      .then((res) => {
        const list = res.data.data.map((n) => ({
          ...n,
          slug: generateSlug(n.titulo),
        }));
        setFeatured(list.slice(0, 1));
        setLateral(list.slice(1, 4));
        setOtherAll(list.slice(4));
      });

    axios
      .get<{ data: HealthItem[] }>(`${API_URL}/items/Saude`, {
        params: {
          fields:
            "id,tag.id,tag.nome,titulo,subtitulo,imagem,artigo,date_created",
          filter: { status: { _eq: "published" } },
          sort: "-date_created",
        },
      })
      .then((res) => setHealthAll(res.data.data));

    axios
      .get<{ data: EventItem[] }>(`${API_URL}/items/Eventos`, {
        params: {
          fields: "id,nome,endereco,datahora",
          filter: { status: { _eq: "published" } },
          sort: "datahora",
        },
      })
      .then((res) => setEvents(res.data.data));

    axios
      .get<{ data: InterviewItem[] }>(`${API_URL}/items/Entrevistas`, {
        params: {
          fields: "id,titulo,endereco,data,video",
          filter: { status: { _eq: "published" } },
          sort: "-data",
        },
      })
      .then((res) => setInterviews(res.data.data));
  }, []);

  const otherToShow = otherAll.slice(0, otherLimit);
  const healthToShow = healthAll.slice(0, healthLimit);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Fique por dentro</h2>
          <div className="grid newsGrid gap-5">
            {featured.map((n) => (
              <News key={n.id} {...n} />
            ))}
            <div className="flex flex-col gap-5">
              {lateral.map((n) => (
                <News key={n.id} variant="horizontal" {...n} />
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-5">
            {otherToShow.map((n) => (
              <News key={n.id} variant="responsive" {...n} />
            ))}
          </div>
          {otherAll.length > otherToShow.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setOtherLimit((p) => p + 3)}>
                <FaPlus /> Carregar mais
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 mt-12">
          <div className="flex justify-between items-center">
            <h2 className="sectionHeading">O que tá rolando por aqui?</h2>
            <div className="lg:flex gap-5 hidden">
              <button
                onClick={() => carouselRefEvent.current?.previous()}
                className="cursor-pointer bg-white text-black rounded-full p-2 hover:text-[var(--secondary-color)] transition-all duration-300 ease-in-out"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={() => carouselRefEvent.current?.next()}
                className="cursor-pointer bg-white text-black rounded-full p-2 hover:text-[var(--secondary-color)] transition-all duration-300 ease-in-out"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <Carousel
            ref={carouselRefEvent}
            swipeable
            draggable
            ssr
            infinite
            arrows={false}
            responsive={responsiveEvent}
          >
            {events.map((e) => (
              <EventDate key={e.id} {...e} />
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 mt-12">
          <h2 className="sectionHeading">Saúde e bem estar</h2>
          <div className="flex flex-col lg:flex-row gap-5">
            {healthToShow.map((h) => (
              <News key={h.id} variant="responsive" {...h} />
            ))}
          </div>
          {healthAll.length > healthToShow.length && (
            <div className="flex justify-center mt-4">
              <Button onClick={() => setHealthLimit((p) => p + 3)}>
                <FaPlus /> Carregar mais
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 mt-12">
          <div className="flex justify-between items-center">
            <h2 className="sectionHeading">Entrevistas</h2>
            <div className="lg:flex gap-5 hidden">
              <button
                onClick={() => carouselRefInterview.current?.previous()}
                className="cursor-pointer bg-white text-black rounded-full p-2 hover:text-[var(--secondary-color)] transition-all duration-300 ease-in-out"
              >
                <IoIosArrowBack />
              </button>
              <button
                onClick={() => carouselRefInterview.current?.next()}
                className="cursor-pointer bg-white text-black rounded-full p-2  hover:text-[var(--secondary-color)] transition-all duration-300 ease-in-out"
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <Carousel
            ref={carouselRefInterview}
            swipeable
            draggable
            ssr
            infinite
            arrows={false}
            responsive={responsiveInterview}
          >
            {interviews.map((iv) => (
              <Interview key={iv.id} {...iv} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
