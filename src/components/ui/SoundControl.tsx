"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function SoundControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleSound = () => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/piano-ambiental.mp3");
      audio.loop = true;
      audio.volume = 0.68;
      audioRef.current = audio;
    }

    if (!isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <motion.button
        type="button"
        onClick={toggleSound}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        layout
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className={`group relative h-12 rounded-full flex items-center justify-center overflow-hidden shadow-xl backdrop-blur-md border transition-colors duration-300 ${
          isHovered ? "px-5 gap-2.5" : "w-12 px-0"
        } ${
          isPlaying
            ? "bg-[#632D3E] text-[#FFF9EE] border-[#D3A3A5] ring-4 ring-[#D3A3A5]/35"
            : "bg-[#4A202B] text-[#FFF9EE] border-[#D7C5BA]/40 hover:bg-[#632D3E]"
        }`}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Silenciar piano" : "Escuchar piano"}
      >
        {/* Icono de audio (activado o desactivado) */}
        <span className="relative flex items-center justify-center shrink-0">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#F0D9D8] animate-pulse" />
          ) : (
            <VolumeX className="w-5 h-5 text-[#F0D9D8]" />
          )}
        </span>

        {/* Texto expandible al hacer hover */}
        <motion.span
          initial={false}
          animate={{
            width: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden whitespace-nowrap text-xs font-semibold uppercase tracking-[0.14em] text-[#FFF9EE]"
        >
          {isPlaying ? "Silenciar" : "Escuchar piano"}
        </motion.span>
      </motion.button>
    </div>
  );
}
