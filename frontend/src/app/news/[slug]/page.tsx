import News from "@/components/news/News";
import React from "react";

const page = () => {
  return (
    <section className="bg-[var(--background-color)]">
      <div className="container sectionSpacing">
        <div className="grid newsGrid">
          {/* Notícia */}
          <div className="flex flex-col gap-5 lg:gap-10">
            <h3 className="text-2xl font-bold text-[var(--text-color)]">
              Título
            </h3>
            <div>
              <p className="text-base">Frase em destaque</p>
              <p className="text-sm font-bold text-[var(--gray-color)]">Data</p>
            </div>
            {/* Conteúdo */}
            <div className="text-base text-[var(--text-color)]">Conteúdo</div>
          </div>
          {/* Outras Notícias */}
          <div className="flex flex-col gap-5 lg:gap-10">
            {/* Notícias */}
            <h3 className="text-2xl font-bold uppercase">Outras notícias</h3>
            <div className="flex flex-col gap-5">
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
            </div>
            {/* Bem estar */}
            <h3 className="text-2xl font-bold uppercase">Saúde e bem estar</h3>
            <div className="flex flex-col gap-5">
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
            </div>
            {/* Entrevistas */}
            <h3 className="text-2xl font-bold uppercase">Entrevistas</h3>
            <div className="flex flex-col gap-5">
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
              <News
                variant="horizontal"
                title={"Lorem Ipsum"}
                description={
                  "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, natus aliquam illum quis a consequuntur dolorum maiores voluptatibus saepe labore."
                }
                date={"Ontem"}
                image={"/beach-tennis.webp"}
              ></News>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default page;
