import React, { FC } from "react";
import Image from "next/image";

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
  return (
    <div>
      <p className="lg:hidden block text-base font-bold text-[var(--grea-color)] uppercase text-center">
        {category}
      </p>
      <div className="flex items-center gap-2 justify-between lg:justify-start lg:gap-5">
        {/* Player One Image */}
        <div className="aspect-[1/1] relative h-[160px] w-[100px] md:h-[200px] md:w-[140px]">
          <Image
            src={playerOneImage}
            alt={"player-one-image"}
            fill
            className="object-cover object-center rounded-[6px]"
          ></Image>
        </div>

        {/* Players Info */}
        <div className="flex flex-col items-center text-center lg:flex-row lg:justify-between lg:w-full">
          {/* Player One */}
          <div className="lg:max-w-[250px] lg:w-full text-start">
            <p className="font-bold text-[var(--text-color)] uppercase text-base lg:text-2xl">
              {playerOne}
            </p>
            <p className="text-[0.75rem] text-[var(--gray-color)] uppercase">
              {playerOneInfo}
            </p>
          </div>
          {/* Category */}
          <div>
            <p className="hidden lg:block text-base font-bold text-[var(--gray-color)] uppercase">
              {category}
            </p>
            <p className="text-[2rem] lg:text-[2.25rem] text-[var(--text-color)] font-bold">VS</p>
          </div>
          {/* Player Two */}
          <div className="lg:max-w-[250px] lg:w-full text-end">
            <p className="font-bold text-[var(--text-color)] uppercase text-base lg:text-2xl">
              {playerTwo}
            </p>
            <p className="text-[0.75rem] text-[var(--gray-color)] uppercase">
              {playerTwoInfo}
            </p>
          </div>
        </div>

        {/* Player Two Image */}
        <div className="aspect-[1/1] relative h-[160px] w-[100px] md:h-[200px] md:w-[140px]">
          <Image
            src={playerTwoImage}
            alt={"player-two-image"}
            fill
            className="object-cover object-center rounded-[6px]"
          ></Image>
        </div>
      </div>
      Enquete
    </div>
  );
};

export default Challenge;
