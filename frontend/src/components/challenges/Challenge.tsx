"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface ChallengeProps {
  category: string;
  playerOne: string;
  playerOneInfo: string;
  playerOneImage: string;
  playerTwo: string;
  playerTwoInfo: string;
  playerTwoImage: string;
}

const Challenge: FC<ChallengeProps> = ({
  category,
  playerOne,
  playerOneInfo,
  playerOneImage,
  playerTwo,
  playerTwoInfo,
  playerTwoImage,
}) => {
  const [votes, setVotes] = useState({ one: 0, two: 0 });
  const [voted, setVoted] = useState<"one" | "two" | null>(null);

  const handleVote = (player: "one" | "two") => {
    if (voted) return; // impede votar mais de uma vez
    setVotes((prev) => ({
      ...prev,
      [player]: prev[player] + 1,
    }));
    setVoted(player);
  };

  const totalVotes = votes.one + votes.two;
  const percentOne = totalVotes === 0 ? 50 : (votes.one / totalVotes) * 100;
  const percentTwo = totalVotes === 0 ? 50 : (votes.two / totalVotes) * 100;

  return (
    <div className="p-4 space-y-4">
      <p className="lg:hidden block text-base font-bold text-[var(--grea-color)] uppercase text-center">
        {category}
      </p>

      {/* Cabeçalho dos jogadores */}
      <div className="flex items-center gap-2 justify-between lg:justify-start lg:gap-5">
        {/* Imagem 1 */}
        <div className="aspect-[1/1] relative h-[160px] w-[100px] md:h-[200px] md:w-[140px]">
          <Image
            src={playerOneImage}
            alt={"player-one-image"}
            fill
            className="object-cover object-center rounded-[6px]"
          />
        </div>

        {/* Infos */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:w-full">
          {/* Info jogador 1 */}
          <div className="lg:max-w-[250px] lg:w-full text-start">
            <p className="font-bold text-[var(--text-color)] uppercase text-base lg:text-2xl">
              {playerOne}
            </p>
            <p className="text-[0.75rem] text-[var(--gray-color)] uppercase">
              {playerOneInfo}
            </p>
          </div>
          {/* Categoria */}
          <div>
            <p className="hidden lg:block text-base font-bold text-[var(--gray-color)] uppercase">
              {category}
            </p>
            <p className="text-[2rem] lg:text-[2.25rem] text-[var(--text-color)] font-bold">
              VS
            </p>
          </div>
          {/* Info jogador 2 */}
          <div className="lg:max-w-[250px] lg:w-full text-end">
            <p className="font-bold text-[var(--text-color)] uppercase text-base lg:text-2xl">
              {playerTwo}
            </p>
            <p className="text-[0.75rem] text-[var(--gray-color)] uppercase">
              {playerTwoInfo}
            </p>
          </div>
        </div>

        {/* Imagem 2 */}
        <div className="aspect-[1/1] relative h-[160px] w-[100px] md:h-[200px] md:w-[140px]">
          <Image
            src={playerTwoImage}
            alt={"player-two-image"}
            fill
            className="object-cover object-center rounded-[6px]"
          />
        </div>
      </div>

      {/* Enquete de votação */}
      <div className="flex items-center justify-between gap-4 mt-4">
        {/* Botão coração jogador 1 */}
        <button onClick={() => handleVote("one")} disabled={!!voted}>
          {voted === "one" ? (
            <FaHeart className="text-[var(--red-color)] text-2xl" />
          ) : (
            <FaRegHeart className="text-[var(--gray-color)] text-2xl hover:text-[var(--red-color)] transition cursor-pointer" />
          )}
        </button>

        {/* Barra de progresso */}
        <div className="flex-1 h-[6px] bg-[#d9395444] rounded-full overflow-hidden relative">
          <div
            className="bg-[var(--red-color)] h-full absolute left-0 top-0 transition-all duration-500 ease-in-out"
            style={{ width: `${percentOne}%` }}
          ></div>
        </div>

        {/* Botão coração jogador 2 */}
        <button onClick={() => handleVote("two")} disabled={!!voted}>
          {voted === "two" ? (
            <FaHeart className="text-[var(--red-color)] text-2xl" />
          ) : (
            <FaRegHeart className="text-[var(--gray-color)] text-2xl hover:text-[var(--red-color)] transition cursor-pointer" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Challenge;
