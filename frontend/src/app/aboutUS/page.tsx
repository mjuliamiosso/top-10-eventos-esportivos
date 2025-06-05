import ContactInfo from "@/components/aboutUs/ContactInfo";
import Project from "@/components/aboutUs/Project";
import { IoLocationOutline } from "react-icons/io5";
import React from "react";
import Link from "next/link";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <main className="container sectionSpacing">
        <div className="text-[var(--text-color)] flex flex-col gap-5">
          <h2 className="sectionHeading">Quem Somos</h2>
          <p className="text-base">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius hic
            iure vitae facilis nostrum, neque quos ut ipsa minus soluta fuga
            incidunt est architecto illum deserunt iusto amet reiciendis enim
            animi a accusamus. Consequuntur eligendi laborum distinctio
            cupiditate repellat explicabo? Unde facere sunt libero pariatur ab,
            fugit consequatur vitae maxime sed officia ipsum esse, provident
            laboriosam molestiae itaque optio iste cumque accusamus
            necessitatibus, cupiditate corporis? Quia repellendus similique, est
            velit culpa fugiat vitae esse beatae sapiente repudiandae? Labore
            perspiciatis quidem, modi saepe voluptatem dolores excepturi nostrum
            est culpa repudiandae ea illo, maxime voluptates repellat quis atque
            tempore, incidunt dignissimos id officiis beatae quia facere? Error,
            ipsa iure. Iusto omnis assumenda repellat fugit quae culpa quos quia
            reprehenderit delectus cum, amet ullam sunt sed facere fuga
            repellendus consequatur est ea porro vel enim dolorem. Dicta nobis
            corrupti facere, obcaecati deleniti sit, quas fuga voluptatibus
            aliquam iste eius ipsam laborum facilis est?
          </p>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">
            Nossos Projetos
          </h2>
          <div className="grid gap-5 lg:grid-cols-2">
            <Project
              title={"Lorem Ipsum"}
              description={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius hiciure vitae facilis nostrum, neque quos ut ipsa minus soluta fugaincidunt est architecto illum deserunt iusto amet reiciendis enimanimi a accusamus."
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Lorem Ipsum"}
              description={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius hiciure vitae facilis nostrum, neque quos ut ipsa minus soluta fugaincidunt est architecto illum deserunt iusto amet reiciendis enimanimi a accusamus."
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Lorem Ipsum"}
              description={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius hiciure vitae facilis nostrum, neque quos ut ipsa minus soluta fugaincidunt est architecto illum deserunt iusto amet reiciendis enimanimi a accusamus."
              }
              image={"/beach-tennis.webp"}
            ></Project>
            <Project
              title={"Lorem Ipsum"}
              description={
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius hiciure vitae facilis nostrum, neque quos ut ipsa minus soluta fugaincidunt est architecto illum deserunt iusto amet reiciendis enimanimi a accusamus."
              }
              image={"/beach-tennis.webp"}
            ></Project>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="sectionHeading text-[var(--text-color)]">Contato</h2>
          <div className="grid gap-8 lg:grid-cols-3">
            <ContactInfo
              icon={<IoLocationOutline />}
              contact={"Endereço"}
              info={"Rua..."}
            ></ContactInfo>
            <Link href={""}>
              <ContactInfo
                icon={<BsWhatsapp />}
                contact={"WhatsApp"}
                info={"(00) 0 0000-0000"}
              ></ContactInfo>
            </Link>
            <Link href={""}>
              <ContactInfo
                icon={<BsInstagram />}
                contact={"Instagram"}
                info={"@rgta_topten"}
              ></ContactInfo>
            </Link>
          </div>
        </div>
      </main>
    </section>
  );
};

export default page;
