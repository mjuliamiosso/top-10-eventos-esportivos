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
    <div className="p-4 space-y-4">
      <p className="lg:hidden text-center font-bold uppercase text-[var(--gray-color)]">
        {category}
      </p>
      <p className="text-center text-xs text-[var(--gray-color)]">
        {new Date(dateTime).toLocaleString()}
      </p>

      <div className="flex items-center gap-2 justify-between lg:justify-start lg:gap-5">
        <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px]">
          <Image
            src={playerOneImage}
            alt={playerOne}
            fill
            className="rounded-[6px] object-cover"
          />
        </div>

        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:w-full">
          <div className="text-start lg:max-w-[250px]">
            <p className="font-bold uppercase text-base lg:text-2xl">
              {playerOne}
            </p>
            <p className="uppercase text-[0.75rem] text-[var(--gray-color)]">
              {playerOneInfo}
            </p>
          </div>
          <div>
            <p className="hidden lg:block uppercase text-[var(--gray-color)] font-bold">
              {category}
            </p>
            <p className="text-2xl lg:text-[2.25rem] font-bold">VS</p>
          </div>
          <div className="text-end lg:max-w-[250px]">
            <p className="font-bold uppercase text-base lg:text-2xl">
              {playerTwo}
            </p>
            <p className="uppercase text-[0.75rem] text-[var(--gray-color)]">
              {playerTwoInfo}
            </p>
          </div>
        </div>

        <div className="relative w-[100px] h-[160px] md:w-[140px] md:h-[200px]">
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
              <FaHeart className="text-red-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-red-500 text-2xl hover:text-red-600 transition" />
            )}
          </button>
          <span className="text-red-500 font-bold text-lg">{votesOne}</span>
        </div>

        {/* direita */}
        <div className="flex items-center gap-2">
          <span className="text-blue-500 font-bold text-lg">{votesTwo}</span>
          <button onClick={() => onVote("two")} disabled={!canVote}>
            {voted === "two" ? (
              <FaHeart className="text-blue-500 text-2xl" />
            ) : (
              <FaRegHeart className="text-blue-500 text-2xl hover:text-blue-600 transition" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
