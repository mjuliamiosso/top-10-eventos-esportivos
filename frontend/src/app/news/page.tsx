import Button from "@/components/common/Button";
import EventDate from "@/components/news/EventDate";
import Interview from "@/components/news/Interview";
import News from "@/components/news/News";
import React from "react";
import { FaPlus } from "react-icons/fa6";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        {/* Notícias RGTA */}
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading lg:mb-5">Na nossa quadra</h2>
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
          {/* Outras Notícias */}
          <div className="hidden lg:flex gap-5">
            <News
              variant="responsive"
              title={
                "Bia Haddad e Luisa Stefani estreiam com vitórias nas duplas em Roland Garros"
              }
              description={
                "A vitória das duas parceiras que contam com tenistas brasileiras foram com “pneus”; Rafael Matos e Marcelo Melo também jogaram, mas foram eliminados"
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
            <News
              variant="responsive"
              title={
                "Bia Haddad e Luisa Stefani estreiam com vitórias nas duplas em Roland Garros"
              }
              description={
                "A vitória das duas parceiras que contam com tenistas brasileiras foram com “pneus”; Rafael Matos e Marcelo Melo também jogaram, mas foram eliminados"
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
            <News
              variant="responsive"
              title={
                "Bia Haddad e Luisa Stefani estreiam com vitórias nas duplas em Roland Garros"
              }
              description={
                "A vitória das duas parceiras que contam com tenistas brasileiras foram com “pneus”; Rafael Matos e Marcelo Melo também jogaram, mas foram eliminados"
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
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
            <EventDate
              day={"01"}
              month={"JUN"}
              place={"Nao sei meu deus do ceu"}
              address={"Rua casa da mãe Joana"}
              date={"Dia 01/06/2025"}
            ></EventDate>
          </div>
        </div>
        {/* Saúde e bem estar */}
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading">Saúde e bem estar</h2>
          <div className="flex flex-col lg:flex-row gap-5">
            <News
              variant="responsive"
              title={"João Fonseca lembra Guga em Roland Garros..."}
              description={
                "Torcedores ignoram partida na quadra principal para assistir..."
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
            <News
              variant="responsive"
              title={"João Fonseca lembra Guga em Roland Garros..."}
              description={
                "Torcedores ignoram partida na quadra principal para assistir..."
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
            <News
              variant="responsive"
              title={"João Fonseca lembra Guga em Roland Garros..."}
              description={
                "Torcedores ignoram partida na quadra principal para assistir..."
              }
              date={"Ontem"}
              image={"/beach-tennis.webp"}
            ></News>
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
            <Interview
              title={"Título"}
              info={"Descrição do vídeo"}
              date={"Ontem"}
            ></Interview>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
