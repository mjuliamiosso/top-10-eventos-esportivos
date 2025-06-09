"use client";

import Challenge from "@/components/challenges/Challenge";
import Button from "@/components/common/Button";
import Faq from "@/components/landingPage/FAQ";
import News from "@/components/news/News";
import Ranking from "@/components/ranking/Ranking";
import Link from "next/link";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Home() {
  // Hero carrosel
  const responsiveHero = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  //Patrocínios carrossel
  const responsiveSponsor = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1536 },
      items: 12,
    },
    desktop: {
      breakpoint: { max: 1536, min: 1280 },
      items: 10,
    },
    largeTablet: {
      breakpoint: { max: 1280, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 6,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 640 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 3,
    },
  };
  // ======= Notícias =======
  const featuredNews = [
    {
      title:
        "Bia Haddad e Luisa Stefani estreiam com vitórias nas duplas em Roland Garros",
      description:
        "A vitória das duas parceiras que contam com tenistas brasileiras foram com “pneus”; Rafael Matos e Marcelo Melo também jogaram, mas foram eliminados",
      date: "Ontem",
      image: "/beach-tennis.webp",
    },
  ];

  const sideNews = [
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

  // ======= Rankings =======
  // Feminino
  const rankingsFemale = [
    { rank: "01", player: "Mariana Ribeiro", score: "" },
    { rank: "02", player: "Fernanda Souza", score: "" },
    { rank: "03", player: "Juliana Costa", score: "" },
    { rank: "04", player: "Patrícia Lima", score: "" },
    { rank: "05", player: "Carla Martins", score: "" },
  ];
  // Principiante
  const rankingsBeginner = [
    { rank: "01", player: "Mariana Ribeiro", score: "" },
    { rank: "02", player: "Fernanda Souza", score: "" },
    { rank: "03", player: "Juliana Costa", score: "" },
    { rank: "04", player: "Patrícia Lima", score: "" },
    { rank: "05", player: "Carla Martins", score: "" },
  ];
  // Intermediário
  const rankingsIntermediary = [
    { rank: "01", player: "Mariana Ribeiro", score: "" },
    { rank: "02", player: "Fernanda Souza", score: "" },
    { rank: "03", player: "Juliana Costa", score: "" },
    { rank: "04", player: "Patrícia Lima", score: "" },
    { rank: "05", player: "Carla Martins", score: "" },
  ];
  // Avançado
  const rankingsAdvanced = [
    { rank: "01", player: "Mariana Ribeiro", score: "" },
    { rank: "02", player: "Fernanda Souza", score: "" },
    { rank: "03", player: "Juliana Costa", score: "" },
    { rank: "04", player: "Patrícia Lima", score: "" },
    { rank: "05", player: "Carla Martins", score: "" },
  ];

  // ======= Desafios ========
  const challenges = [
    {
      category: "Avançado",
      playerOne: "Lucas Almeida",
      playerOneInfo: "Tennis Point",
      playerOneImage: "/beach-tennis.webp",
      playerTwo: "Bruno Costa",
      playerTwoInfo: "Arena Top Spin",
      playerTwoImage: "/beach-tennis.webp",
    },
    {
      category: "Avançado",
      playerOne: "Lucas Almeida",
      playerOneInfo: "Tennis Point",
      playerOneImage: "/beach-tennis.webp",
      playerTwo: "Bruno Costa",
      playerTwoInfo: "Arena Top Spin",
      playerTwoImage: "/beach-tennis.webp",
    },
    {
      category: "Avançado",
      playerOne: "Lucas Almeida",
      playerOneInfo: "Tennis Point",
      playerOneImage: "/beach-tennis.webp",
      playerTwo: "Bruno Costa",
      playerTwoInfo: "Arena Top Spin",
      playerTwoImage: "/beach-tennis.webp",
    },
  ];

  // ======= Perguntas =======
  const faqs = [
    {
      question: "Lorem Ipsum 1",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
    {
      question: "Lorem Ipsum 2",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
    {
      question: "Lorem Ipsum 3",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
    {
      question: "Lorem Ipsum 4",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
    {
      question: "Lorem Ipsum 5",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
    {
      question: "Lorem Ipsum 6",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nisl odio, lobortis sed porttitor nec, laoreet.",
    },
  ];
  return (
    <section className="bg-[var(--background-color)]">
      <section className="flex flex-col gap-5">
        <Carousel
          swipeable={true}
          draggable={true}
          ssr={true}
          infinite={true}
          renderDotsOutside={true}
          autoPlay={false}
          arrows
          dotListClass="custom-dot-list-style"
          responsive={responsiveHero}
        >
          <div
            className="bg-cover bg-center w-full flex justify-center items-center h-[400px] lg:h-[820px]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/beach-tennis.webp')",
            }}
          >
            <h1 className="text-[2rem] lg:text-[4rem] font-bold text-white text-center container">
              Slide 01
            </h1>
          </div>
          <div
            className="bg-cover bg-center w-full flex justify-center items-center h-[400px] lg:h-[820px]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/beach-tennis.webp')",
            }}
          >
            <h1 className="text-[2rem] lg:text-[4rem] font-bold text-white text-center container">
              Slide 02
            </h1>
          </div>
          <div
            className="bg-cover bg-center w-full flex justify-center items-center h-[400px] lg:h-[820px]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('/beach-tennis.webp')",
            }}
          >
            <h1 className="text-[2rem] lg:text-[4rem] font-bold text-white text-center container">
              Slide 03
            </h1>
          </div>
        </Carousel>
        <Carousel
          infinite={true}
          partialVisible={false}
          arrows={false}
          swipeable={false}
          autoPlay={true}
          autoPlaySpeed={1}
          transitionDuration={1000}
          customTransition="transform 1000ms linear"
          draggable={false}
          keyBoardControl={true}
          responsive={responsiveSponsor}
        >
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/1000-tintas.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/canto-bravo.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/digo-tenis.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/j-bike.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/joti.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/leomar.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/lig-chopp.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/mega.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/mobicell.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/mrd-projetos-construcoes.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/tata-climatizacao.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/universo-motos.png"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
          <div className="w-[130px] h-[60px] aspect-[1/1] relative">
            <Image
              src="/sponsors/uroproct.webp"
              alt="project-image"
              fill
              className="object-cover object-center rounded-[6px]"
            />
          </div>
        </Carousel>
      </section>

      {/* Primeira Parte */}
      <div className="container sectionSpacing">
        {/* Notícias */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">
            Fique por dentro das últimas do tênis
          </h2>
          {/* Notícias em destaque */}
          <div className="grid newsGrid gap-5">
            {featuredNews.map((news, index) => (
              <News
                key={`featured-${index}`}
                title={news.title}
                description={news.description}
                date={news.date}
                image={news.image}
              />
            ))}

            <div className="flex flex-col gap-5">
              {sideNews.map((news, index) => (
                <News
                  key={`side-${index}`}
                  variant="horizontal"
                  title={news.title}
                  description={news.description}
                  date={news.date}
                  image={news.image}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link href={"/news"}>
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>
        {/* Rankings */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">
            Nosso ranking: veja quem se destacou
          </h2>
          {/* Tabela de Rankings */}
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* Ranking Feminino */}
            <div className="flex flex-col gap-5">
              <p className="text-base font-bold text-[var(--secondary-color)]">
                Feminino
              </p>
              <div>
                <div className="flex justify-between px-[14px]">
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    RK
                  </p>
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    Jogador
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {rankingsFemale.map((item, index) => (
                    <Ranking
                      key={index}
                      variant="compact"
                      rank={item.rank}
                      player={item.player}
                      score={item.score}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Ranking Principiante */}
            <div className="flex flex-col gap-5">
              <p className="text-base font-bold text-[var(--secondary-color)]">
                Principiante
              </p>
              <div>
                <div className="flex justify-between px-[14px]">
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    RK
                  </p>
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    Jogador
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2">
                    {rankingsBeginner.map((item, index) => (
                      <Ranking
                        key={index}
                        variant="compact"
                        rank={item.rank}
                        player={item.player}
                        score={item.score}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Ranking Intermediário */}
            <div className="flex flex-col gap-5">
              <p className="text-base font-bold text-[var(--secondary-color)]">
                Intermediário
              </p>
              <div>
                <div className="flex justify-between px-[14px]">
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    RK
                  </p>
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    Jogador
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {rankingsIntermediary.map((item, index) => (
                    <Ranking
                      key={index}
                      variant="compact"
                      rank={item.rank}
                      player={item.player}
                      score={item.score}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* Ranking Avançado */}
            <div className="flex flex-col gap-5">
              <p className="text-base font-bold text-[var(--secondary-color)]">
                Avançado
              </p>
              <div>
                <div className="flex justify-between px-[14px]">
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    RK
                  </p>
                  <p className="font-bold text-sm text-[var(--dark-gray)]">
                    Jogador
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  {rankingsAdvanced.map((item, index) => (
                    <Ranking
                      key={index}
                      variant="compact"
                      rank={item.rank}
                      player={item.player}
                      score={item.score}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href={"/ranking"}>
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>
      </div>
      {/* CTA */}
      <div className="bg-[var(--secondary-color)] py-[60px]">
        <div className="container flex justify-center items-center flex-col lg:flex-row gap-5">
          <p className="text-2xl text-center font-bold text-[var(--text-white)]">
            Pronto pra entrar em quadra? Agende sua aula ou reserve seu espaço!
          </p>
          <button className="rounded-lg cursor-pointer font-bold bg-[var(--text-white))] text-[var(--secondary-color)] px-3 py-2 text-sm lg:px-4 lg:py-3 lg:text-base">
            Comece Agora
          </button>
        </div>
      </div>
      {/* Segunda Parte */}
      <div className="container sectionSpacing">
        {/* Desafios */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Topa um desafio?</h2>
          <div className="flex flex-col gap-5">
            {challenges.map((challenge, index) => (
              <Challenge
                key={index}
                category={challenge.category}
                playerOne={challenge.playerOne}
                playerOneInfo={challenge.playerOneInfo}
                playerOneImage={challenge.playerOneImage}
                playerTwo={challenge.playerTwo}
                playerTwoInfo={challenge.playerTwoInfo}
                playerTwoImage={challenge.playerTwoImage}
              />
            ))}
          </div>
          <div className="flex justify-center">
            <Link href={"/challenges"}>
              <Button>Ver mais</Button>
            </Link>
          </div>
        </div>
        {/* FAQ */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">Perguntas Frequentes</h2>
          <div className="grid w-full gap-5 lg:grid-cols-2 sm:gap-x-7 items-start">
            {faqs.map((faq) => (
              <Faq key={faq.question} {...faq} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
