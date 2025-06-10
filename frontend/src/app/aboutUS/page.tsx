import ContactInfo from "@/components/aboutUs/ContactInfo";
import Project from "@/components/aboutUs/Project";
import { IoLocationOutline } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="text-[var(--text-color)] flex flex-col gap-5">
          <h2 className="sectionHeading">Quem Somos</h2>
          <p className="text-base">
            O Top 10 Eventos Esportivos é uma empresa familiar que visa promover
            eventos tenísticos na região. Incentivando a competição promovendo o
            mercado de desempenho técnico (professores), o fluxo e interação de
            pessoas (academias/lanchonetes/lojas), divulgação de marcas
            (patrocinadores) e a chama da competição (tenistas). Contamos com a
            sua participação.
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">
            Nossos Projetos
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <Project
              title={"O RGTA"}
              description={
                "Os tenistas irão desafiar e serem desafiados, trazendo o disputado torneio anual no final da temporada, o Masters Finals envolvendo os oito melhores tenistas para a classificação final"
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Eu no tênis"}
              description={
                "Bate papo com os tenistas, uma conversa informal e descontraída sobre sua experiência no tênis, bate bola com o professor, quiz e muito mais..."
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Teams"}
              description={
                "Competição por equipes, formada por um representante de cada categoria, na disputa entre os participantes buscando a superação, a perseverança, e o desenvolvimento do trabalho em equipe."
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Circuito RGTA"}
              description={
                "O Torneio RGTA é exclusivo para participantes do Ranking, ocorre anualmente para os jogadores testarem suas habilidades."
              }
              image={"/beach-tennis.webp"}
            ></Project>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">Contato</h2>
          <div className="grid gap-8 lg:grid-cols-4">
            <ContactInfo
              icon={<IoLocationOutline />}
              contact={"Caraguatatuba"}
              info={""}
            ></ContactInfo>
            <Link href={""}>
              <ContactInfo
                icon={<BsWhatsapp />}
                contact={"WhatsApp"}
                info={"(00) 0 0000-0000"}
              ></ContactInfo>
            </Link>
            <Link
              href={"https://www.instagram.com/rgta_topten/"}
              target="_blank"
            >
              <ContactInfo
                icon={<BsInstagram />}
                contact={"Instagram"}
                info={"@rgta_topten"}
              ></ContactInfo>
            </Link>
            <Link
              href={"https://www.facebook.com/rgtatopten?mibextid=2JQ9oc"}
              target="_blank"
            >
              <ContactInfo
                icon={<BsFacebook />}
                contact={"Facebook"}
                info={"Rgta Top Ten"}
              ></ContactInfo>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
