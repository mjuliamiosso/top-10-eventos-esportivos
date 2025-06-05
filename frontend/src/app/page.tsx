import Challenge from "@/components/challenges/Challenge";
import Button from "@/components/common/Button";
import Faq from "@/components/landingPage/FAQ";
import News from "@/components/news/News";
import Ranking from "@/components/ranking/Ranking";
import Link from "next/link";

export default function Home() {
  // Perguntas
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
      <p>hero</p>
      <p>patrocinios</p>
      {/* Primeira Parte */}
      <div className="container sectionSpacing">
        {/* Notícias */}
        <div className="flex flex-col gap-5 lg:gap-10">
          <h2 className="sectionHeading">
            Fique por dentro das últimas do tênis
          </h2>
          {/* Notícias em destaque */}
          <div className="grid newsGrid gap-5">
            <News
              title={
                "Bia Haddad e Luisa Stefani estreiam com vitórias nas duplas em Roland Garros"
              }
              description={
                "A vitória das duas parceiras que contam com tenistas brasileiras foram com “pneus”; Rafael Matos e Marcelo Melo também jogaram, mas foram eliminados"
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
            <div className="flex flex-col gap-5">
              <News
                variant="horizontal"
                title={"João Fonseca lembra Guga em Roland Garros..."}
                description={
                  "Torcedores ignoram partida na quadra principal para assistir..."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"João Fonseca lembra Guga em Roland Garros..."}
                description={
                  "Torcedores ignoram partida na quadra principal para assistir..."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"João Fonseca lembra Guga em Roland Garros..."}
                description={
                  "Torcedores ignoram partida na quadra principal para assistir..."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
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
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
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
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
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
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
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
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
                  <Ranking
                    variant="compact"
                    rank={"01"}
                    player={"Mariana Ribeiro"}
                    score={""}
                  ></Ranking>
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
            <Challenge
              category={"Avançado"}
              playerOne={"Lucas Almeida"}
              playerOneInfo={"Tennis Point"}
              playerOneImage={"/beach-tennis.webp"}
              playerTwo={"Bruno Costa"}
              playerTwoInfo={"Arena Top Spin"}
              playerTwoImage={"/beach-tennis.webp"}
            ></Challenge>
            <Challenge
              category={"Avançado"}
              playerOne={"Lucas Almeida"}
              playerOneInfo={"Tennis Point"}
              playerOneImage={"/beach-tennis.webp"}
              playerTwo={"Bruno Costa"}
              playerTwoInfo={"Arena Top Spin"}
              playerTwoImage={"/beach-tennis.webp"}
            ></Challenge>
            <Challenge
              category={"Avançado"}
              playerOne={"Lucas Almeida"}
              playerOneInfo={"Tennis Point"}
              playerOneImage={"/beach-tennis.webp"}
              playerTwo={"Bruno Costa"}
              playerTwoInfo={"Arena Top Spin"}
              playerTwoImage={"/beach-tennis.webp"}
            ></Challenge>
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
