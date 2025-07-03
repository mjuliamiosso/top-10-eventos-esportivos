"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactInfo from "../../components/aboutUs/ContactInfo";
import Project from "../../components/aboutUs/Project";
import { IoLocationOutline } from "react-icons/io5";
import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

type Projeto = {
  id: string;
  titulo: string;
  descricao: string;
  imagem: string | null;
};

export default function SobreNosPage() {
  const [sobre, setSobre] = useState<string>("");
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    // fetch about us
    axios
      .get<{ data: { texto: string } }>(`${API_URL}/items/Sobre`, {
        params: { fields: ["texto"] },
      })
      .then((res) => {
        const txt = res.data.data.texto || "";
        setSobre(txt);
      })
      .catch(console.error);

    // fetch projects
    axios
      .get<{ data: Projeto[] }>(`${API_URL}/items/Projetos`, {
        params: {
          fields: ["id", "titulo", "descricao", "imagem"],
          filter: { status: { _eq: "published" } },
          sort: ["sort"],
        },
      })
      .then((res) => setProjetos(res.data.data))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="flex flex-col gap-5 text-[var(--text-color)]">
          <h2 className="sectionHeading">Quem Somos</h2>
          <div
            className="text-base"
            dangerouslySetInnerHTML={{ __html: sobre }}
          ></div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">
            Nossos Projetos
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            {projetos.map((p) => (
              <Project
                key={p.id}
                title={p.titulo}
                description={p.descricao}
                image={
                  p.imagem ? `${API_URL}/assets/${p.imagem}` : "/fallback.jpg"
                }
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">Contato</h2>
          <div className="grid gap-8 lg:grid-cols-4">
            <ContactInfo
              icon={<IoLocationOutline />}
              contact="Caraguatatuba"
              info=""
            />
            <a
              href="https://wa.me/5512982983083"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactInfo
                icon={<BsWhatsapp />}
                contact="WhatsApp"
                info="(12) 98298-3083"
              />
            </a>
            <a
              href="https://www.instagram.com/rgta_topten/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactInfo
                icon={<BsInstagram />}
                contact="Instagram"
                info="@rgta_topten"
              />
            </a>
            <a
              href="https://www.facebook.com/rgtatopten?mibextid=2JQ9oc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactInfo
                icon={<BsFacebook />}
                contact="Facebook"
                info="Rgta Top Ten"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
