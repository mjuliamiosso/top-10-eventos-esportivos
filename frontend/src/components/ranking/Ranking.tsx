import React, { FC } from "react";

interface RankingProps {
  rank: string;
  player: string;
  score: string;
  variant?: "default" | "compact";
}

const Ranking: FC<RankingProps> = ({
  rank,
  player,
  score,
  variant = "default",
}) => {
  const isCompact = variant === "compact";

  return (
    <div className="bg-white rounded-lg text-[var(--text-color)] font-bold text-base p-[14px]">
      {isCompact ? (
        // COMPACT: rank e player separados
        <div className="flex justify-between items-center w-full">
          <p className="w-[35px] text-left">{rank}</p>
          <p className="text-right">{player}</p>
        </div>
      ) : (
        // DEFAULT: rank + player juntos, score separado
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-5">
            <p className="w-[35px] text-left">{rank}</p>
            <p>{player}</p>
          </div>
          <p>{score}</p>
        </div>
      )}
    </div>
  );
};

export default Ranking;
