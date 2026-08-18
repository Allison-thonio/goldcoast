"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity,
  GraduationCap,
  Users,
  Award,
  Sparkles,
  ShieldCheck,
  Globe,
  Smartphone,
  BarChart3,
  Flame,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export interface FeatureItem {
  id: string;
  label: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string; size?: number }>;
  image: string;
  description: string;
  link?: string;
  tag?: string;
}

export const DEFAULT_PROGRAMME_FEATURES: FeatureItem[] = [
  {
    id: "health",
    label: "Healthcare Outreach",
    icon: Activity,
    image: "/community-health.jpg",
    description: "Free medical outreaches, obstetric care, disease screening, and essential medicines across Bayelsa and the Niger Delta.",
    link: "/programmes/health",
    tag: "Programme 01",
  },
  {
    id: "education",
    label: "Girl-Child Education",
    icon: GraduationCap,
    image: "/community-education.jpg",
    description: "Educational scholarships, school uniforms, learning materials, and literacy programs empowering underserved communities.",
    link: "/programmes/education",
    tag: "Programme 02",
  },
  {
    id: "youth",
    label: "Youth Development",
    icon: Users,
    image: "/community-youth.jpg",
    description: "Vocational skills acquisition, creative fashion academies, and leadership mentorship for sustainable youth livelihoods.",
    link: "/programmes/youth-development",
    tag: "Programme 03",
  },
];

const AUTO_PLAY_INTERVAL = 3800;
const ITEM_HEIGHT = 68;

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface FeatureCarouselProps {
  features?: FeatureItem[];
  className?: string;
}

export function FeatureCarousel({
  features = DEFAULT_PROGRAMME_FEATURES,
  className,
}: FeatureCarouselProps) {
  const [step, setStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentIndex =
    ((step % features.length) + features.length) % features.length;

  const nextStep = useCallback(() => {
    setStep((prev) => prev + 1);
  }, []);

  const handleChipClick = (index: number) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff > 0) setStep((s) => s + diff);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextStep, AUTO_PLAY_INTERVAL);
    return () => clearInterval(interval);
  }, [nextStep, isPaused, features.length]);

  const getCardStatus = (index: number) => {
    const diff = index - currentIndex;
    const len = features.length;

    let normalizedDiff = diff;
    if (diff > len / 2) normalizedDiff -= len;
    if (diff < -len / 2) normalizedDiff += len;

    if (normalizedDiff === 0) return "active";
    if (normalizedDiff === -1) return "prev";
    if (normalizedDiff === 1) return "next";
    return "hidden";
  };

  return (
    <div className={cn("w-full max-w-6xl mx-auto md:p-6", className)}>
      <div className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3.5rem] flex flex-col lg:flex-row min-h-[560px] lg:aspect-[16/9] border border-sand-deep/40 shadow-2xl bg-teal-ink">
        {/* Left Side: Program Tabs & Navigation */}
        <div className="w-full lg:w-[42%] min-h-[340px] md:min-h-[400px] lg:h-full relative z-30 flex flex-col items-start justify-center overflow-hidden px-8 md:px-12 lg:pl-12 bg-teal-ink border-b lg:border-b-0 lg:border-r border-sand/15">
          {/* Top and Bottom Fade Gradients */}
          <div className="absolute inset-x-0 top-0 h-16 md:h-20 bg-gradient-to-b from-teal-ink via-teal-ink/90 to-transparent z-40 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-16 md:h-20 bg-gradient-to-t from-teal-ink via-teal-ink/90 to-transparent z-40 pointer-events-none" />

          {/* Vertical Sliding Chips */}
          <div className="relative w-full h-full flex items-center justify-center lg:justify-start z-20 min-h-[260px]">
            {features.map((feature, index) => {
              const isActive = index === currentIndex;
              const distance = index - currentIndex;
              const wrappedDistance = wrap(
                -(features.length / 2),
                features.length / 2,
                distance
              );
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  style={{
                    height: ITEM_HEIGHT,
                    width: "fit-content",
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                  animate={{
                    y: wrappedDistance * ITEM_HEIGHT,
                    opacity: 1 - Math.abs(wrappedDistance) * 0.35,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 90,
                    damping: 22,
                    mass: 1,
                  }}
                  className="absolute flex items-center justify-start"
                >
                  <button
                    onClick={() => handleChipClick(index)}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    className={cn(
                      "relative flex items-center gap-3.5 px-6 md:px-8 py-3.5 rounded-full transition-all duration-500 text-left group border backdrop-blur-md cursor-pointer",
                      isActive
                        ? "bg-sand text-ink border-sand shadow-xl z-10 font-semibold"
                        : "bg-teal-ink/60 text-paper/70 border-sand/20 hover:border-sand/50 hover:text-paper hover:bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-center transition-colors duration-300",
                        isActive ? "text-ink" : "text-sand/80"
                      )}
                    >
                      {Icon ? (
                        <Icon className="w-[18px] h-[18px]" />
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-clay" />
                      )}
                    </div>

                    <span className="text-sm md:text-[15px] tracking-tight whitespace-nowrap font-serif uppercase">
                      {feature.label}
                    </span>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Interactive Image Cards */}
        <div className="flex-1 min-h-[460px] md:min-h-[520px] lg:h-full relative bg-ink/70 flex items-center justify-center py-12 md:py-20 lg:py-12 px-6 md:px-12 lg:px-10 overflow-hidden">
          <div className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center">
            {features.map((feature, index) => {
              const status = getCardStatus(index);
              const isActive = status === "active";
              const isPrev = status === "prev";
              const isNext = status === "next";

              return (
                <motion.div
                  key={feature.id}
                  initial={false}
                  animate={{
                    x: isActive ? 0 : isPrev ? -90 : isNext ? 90 : 0,
                    scale: isActive ? 1 : isPrev || isNext ? 0.88 : 0.72,
                    opacity: isActive ? 1 : isPrev || isNext ? 0.45 : 0,
                    rotate: isPrev ? -3 : isNext ? 3 : 0,
                    zIndex: isActive ? 20 : isPrev || isNext ? 10 : 0,
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    mass: 0.8,
                  }}
                  style={{
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "translateZ(0)",
                  }}
                  className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border-4 md:border-6 border-sand/30 bg-teal-ink shadow-2xl origin-center"
                >
                  <img
                    src={feature.image}
                    alt={feature.label}
                    className={cn(
                      "w-full h-full object-cover transition-all duration-700",
                      isActive
                        ? "grayscale-0 blur-0 scale-100"
                        : "grayscale blur-[2px] brightness-75 scale-105"
                    )}
                  />

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute inset-x-0 bottom-0 p-7 md:p-9 pt-28 bg-gradient-to-t from-teal-ink via-teal-ink/80 to-transparent flex flex-col justify-end pointer-events-auto"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="bg-sand text-teal-ink px-3.5 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider w-fit shadow-md">
                            {feature.tag || `0${index + 1}`} • {feature.label}
                          </div>
                        </div>

                        <p className="text-paper font-sans text-base md:text-lg leading-snug drop-shadow-md tracking-tight mb-4">
                          {feature.description}
                        </p>

                        {feature.link && (
                          <Link
                            href={feature.link}
                            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-sand hover:text-paper transition-colors group"
                          >
                            <span>Explore Programme</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                          </Link>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div
                    className={cn(
                      "absolute top-6 left-6 flex items-center gap-2.5 px-3 py-1 rounded-full bg-teal-ink/75 backdrop-blur-md border border-sand/20 transition-opacity duration-300 pointer-events-none",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  >
                    <div className="w-2 h-2 rounded-full bg-clay animate-pulse" />
                    <span className="text-paper text-[10px] font-mono uppercase tracking-widest">
                      Active Impact
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureCarousel;
