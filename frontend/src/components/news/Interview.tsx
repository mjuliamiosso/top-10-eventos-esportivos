// src/components/news/Interview.tsx
import React, { FC, useRef } from "react";
import { FaExpand } from "react-icons/fa";
import clsx from "clsx";

interface InterviewProps {
  titulo: string;
  endereco: string;
  data: string;
  video: string | null;
}

const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";

const Interview: FC<InterviewProps> = ({ titulo, endereco, data, video }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = video ? `${API_URL}/assets/${video}` : null;

  const goFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="flex flex-col gap-5 w-[180px]">
      {src ? (
        <div className="relative w-[180px] h-[300px] rounded-lg overflow-hidden bg-gray-200">
          <video
            ref={videoRef}
            src={src}
            controls
            className="w-full h-full object-contain bg-black"
          />
          <button
            onClick={goFullscreen}
            className="absolute top-2 right-2 text-white"
          >
            <FaExpand />
          </button>
        </div>
      ) : (
        <div className="w-[180px] h-[300px] rounded-lg bg-gray-200" />
      )}
      <div className="flex flex-col gap-1 text-[var(--text-color)]">
        <p className="text-xl font-bold">{titulo}</p>
        <p className="text-base">{endereco}</p>
        <p className="text-sm text-[var(--gray-color)] italic">{data}</p>
      </div>
    </div>
  );
};

export default Interview;
