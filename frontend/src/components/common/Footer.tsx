import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--primary-color)] px-5 py-10 text-[var(--text-white)]">
      <div className="container gap-5 px-5 flex flex-col items-center text-center lg:flex-row justify-between lg:items-start">
        <Image src="/logo.png" width={171} height={80} alt="top-10-logo" />
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-20">
          <div className="flex flex-col gap-5">
            <p className="font-bold text-base uppercase">Links Rápidos</p>
            <ul className="text-base flex flex-col gap-2 lg:text-start">
              <li>
                <Link href={"/"}>Início</Link>
              </li>
              <li>
                <Link href={"./desafios"}>Desafios</Link>
              </li>
              <li>
                <Link href={"./ranking"}>Ranking</Link>
              </li>
              <li>
                <Link href={"./galeria"}>Galeria</Link>
              </li>
              <li>
                <Link href={"./tennisCenter"}>Tennis Center</Link>
              </li>
              <li>
                <Link href={"./noticias"}>Notícias</Link>
              </li>
              <li>
                <Link href={"./sobreNos"}>Quem Somos</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-base uppercase">Redes Sociais</p>
            <div className="flex gap-4 text-2xl justify-center lg:justify-start">
              <Link
                href={"https://www.instagram.com/rgta_topten/"}
                target="_blank"
              >
                <FaInstagram />
              </Link>
              <Link href={"https://wa.me/5512982983083"} target="_blank">
                <FaWhatsapp />
              </Link>
              <Link
                href={"https://www.facebook.com/rgtatopten?mibextid=2JQ9oc"}
                target="_blank"
              >
                <FaFacebook />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
