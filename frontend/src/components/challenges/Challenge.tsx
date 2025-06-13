// src/components/challenges/Challenge.tsx
"use client";

import React, { FC } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ChallengeProps {
  category: string;
  dateTime: string;
  playerOne: string;
  playerOneInfo: string;
  playerOneImage: string;
  playerTwo: string;
  playerTwoInfo: string;
  playerTwoImage: string;
  votesOne: number;
  votesTwo: number;
  voted: "one" | "two" | null;
  canVote: boolean;
  onVote: (player: "one" | "two") => void;
}

const Challenge: FC<ChallengeProps> = ({
  category,
  dateTime,
  playerOne,
  playerOneInfo,
  playerOneImage,
  playerTwo,
  playerTwoInfo,
  playerTwoImage,
  votesOne,
  votesTwo,
  voted,
  canVote,
  onVote,
}) => {
  // Total e porcentagens ainda estão aqui caso queira usar futuramente
  const total = votesOne + votesTwo;
  const pctOne = total === 0 ? 50 : (votesOne / total) * 100;
  const pctTwo = total === 0 ? 50 : (votesTwo / total) * 100;

  return (
    <div className="space-y-4">
      {/* Categoria + data */}
      <div className="flex flex-col">
        <p className="lg:hidden text-center font-bold uppercase text-[var(--gray-color)]">
          {category}
        </p>
        <p className="text-center text-xs text-[var(--gray-color)] lg:hidden">
          {new Date(dateTime).toLocaleString()}
        </p>
      </div>

      <div className="flex items-center gap-2 justify-between lg:justify-start lg:gap-5">
        <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px] lg:h-[240px] lg:w-[180px]">
          {/* Jogador 1 Imagem */}
          <Image
            src={playerOneImage}
            alt={playerOne}
            fill
            className="rounded-[6px] object-cover"
          />
        </div>

        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:w-full">
          {/* Jogador 1 Dados */}
          <div className="text-center lg:text-left lg:max-w-[250px] lg:w-full">
            <p className="font-bold uppercase text-base lg:text-2xl">
              {playerOne}
            </p>
            <p className="uppercase text-[0.75rem] text-[var(--gray-color)]">
              {playerOneInfo}
            </p>
          </div>
          {/* Categoria */}
          <div>
            <p className="hidden lg:block uppercase text-[var(--gray-color)] font-bold">
              {category}
            </p>
            <p className="text-2xl lg:text-[2.25rem] font-bold">VS</p>
            <p className="text-center text-xs text-[var(--gray-color)] hidden lg:block">
              {new Date(dateTime).toLocaleString()}
            </p>
          </div>
          {/* Jogador 2 Dados */}
          <div className="text-center lg:text-end lg:max-w-[250px] lg:w-full">
            <p className="font-bold uppercase text-base lg:text-2xl">
              {playerTwo}
            </p>
            <p className="uppercase text-[0.75rem] text-[var(--gray-color)]">
              {playerTwoInfo}
            </p>
          </div>
        </div>
        {/* Jogador 2 Imagem */}
        <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px] lg:h-[240px] lg:w-[180px]">
          <Image
            src={playerTwoImage}
            alt={playerTwo}
            fill
            className="rounded-[6px] object-cover"
          />
        </div>
      </div>

      {/* votos */}
      <div className="flex items-center justify-between mt-4">
        {/* esquerda */}
        <div className="flex items-center gap-2">
          <button onClick={() => onVote("one")} disabled={!canVote}>
            {voted === "one" ? (
              <FaHeart className="text-[var(--red-color)] text-2xl" />
            ) : (
              <FaRegHeart className="text-[var(--red-color)] text-2xl cursor-pointer hover:text-[#c91a37] transition-all duration-300 ease-in-out" />
            )}
          </button>
          <span className="text-[var(--red-color)] font-bold text-lg">
            {votesOne}
          </span>
        </div>

        {/* direita */}
        <div className="flex items-center gap-2">
          <span className="text-[var(--blue-color)] font-bold text-lg">
            {votesTwo}
          </span>
          <button onClick={() => onVote("two")} disabled={!canVote}>
            {voted === "two" ? (
              <FaHeart className="text-[var(--blue-color)] text-2xl" />
            ) : (
              <FaRegHeart className="text-[var(--blue-color)] text-2xl cursor-pointer hover:text-[#0c5eac] transition-all duration-300 ease-in-out" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
