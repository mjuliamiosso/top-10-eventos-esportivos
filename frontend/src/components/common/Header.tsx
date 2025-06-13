"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-[var(--primary-color)] px-5 py-2.5 text-[var(--text-white)] relative z-5">
      <div className="container px-5">
        <div className="flex items-center justify-between">
          <Image src="/logo.svg" width={141} height={66} alt="top-10-logo" />

          {/* Ícone do menu no mobile */}
          {!menuOpen && (
            <button
              className="lg:hidden text-4xl cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir Menu"
            >
              <IoMenu />
            </button>
          )}

          {/* Menu no desktop */}
          <nav className="hidden lg:flex gap-5 font-bold">
            <Link href="/">Início</Link>
            <Link href="/challenges">Desafios</Link>
            <Link href="/ranking">Ranking</Link>
            <Link href="/gallery">Galeria</Link>
            <Link href="/tennisCenter">Tennis Center</Link>
            <Link href="/noticias">Notícias</Link>
            <Link href="/aboutUS">Quem Somos</Link>
          </nav>
        </div>

        {/* Menu Mobile Fullscreen */}
        {menuOpen && (
          <div className="fixed inset-0 bg-[var(--primary-color)] flex flex-col items-center justify-center text-white z-50">
            {/* Botão de fechar (X) */}
            <button
              className="absolute top-5 right-5 text-4xl cursor-pointer"
              onClick={() => setMenuOpen(false)}
              aria-label="Fechar Menu"
            >
              <IoClose />
            </button>

            {/* Links do menu */}
            <nav className="flex flex-col gap-5 text-xl font-bold w-full px-5">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                Início
              </Link>
              <Link href="/challenges" onClick={() => setMenuOpen(false)}>
                Desafios
              </Link>
              <Link href="/ranking" onClick={() => setMenuOpen(false)}>
                Ranking
              </Link>
              <Link href="/gallery" onClick={() => setMenuOpen(false)}>
                Galeria
              </Link>
              <Link href="/tennisCenter" onClick={() => setMenuOpen(false)}>
                Tennis Center
              </Link>
              <Link href="/news" onClick={() => setMenuOpen(false)}>
                Notícias
              </Link>
              <Link href="/aboutUS" onClick={() => setMenuOpen(false)}>
                Quem Somos
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
