"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CarouselItem {
  id: string;
  title: string;
  description: string;
  tag?: string;
}

export interface CircularCarouselProps {
  items: CarouselItem[];
  activeIndex?: number;
  onActiveChange?: (index: number) => void;
  onSelect?: (item: CarouselItem, index: number) => void;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

const VISIBLE_COUNT = 5;
const RADIUS_X = 220;
const RADIUS_Y = 100;

function getItemPosition(index: number, activeIndex: number, total: number) {
  const offset = index - activeIndex;
  const half = Math.floor(VISIBLE_COUNT / 2);
  let adjustedOffset = offset;

  if (offset > half) adjustedOffset = offset - total;
  if (offset < -half) adjustedOffset = offset + total;

  if (Math.abs(adjustedOffset) > half * 2) return null;

  const angle = (adjustedOffset / VISIBLE_COUNT) * Math.PI;
  const x = Math.sin(angle) * RADIUS_X;
  const y = -Math.cos(angle) * RADIUS_Y;

  const distance = Math.abs(adjustedOffset);
  const maxDistance = half + 1;
  const scale = Math.max(0, 1 - (distance / maxDistance) * 0.3);
  const opacity = Math.max(0.35, 1 - (distance / maxDistance) * 0.7);
  const zIndex = VISIBLE_COUNT - distance;

  return { x, y, scale, opacity, zIndex, adjustedOffset };
}

export function CircularCarousel({
  items,
  activeIndex: controlledIndex,
  onActiveChange,
  onSelect,
  autoPlay = true,
  autoPlayInterval = 4000,
  className,
}: CircularCarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const activeIndex = controlledIndex ?? internalIndex;
  const total = items.length;

  const goTo = useCallback(
    (index: number) => {
      const newIndex = ((index % total) + total) % total;
      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }
      onActiveChange?.(newIndex);
    },
    [total, controlledIndex, onActiveChange],
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!autoPlay || isHovered || isFocused) return;
    intervalRef.current = setInterval(next, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, isHovered, isFocused, next]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    const el = containerRef.current;
    el?.addEventListener("keydown", handler);
    return () => el?.removeEventListener("keydown", handler);
  }, [next, prev]);

  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Circular carousel"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={cn(
        "relative flex flex-col items-center justify-center gap-8 outline-none py-6",
        className,
      )}
    >
      {/* Circular track */}
      <div className="relative h-[290px] w-full max-w-lg">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => {
            const pos = getItemPosition(i, activeIndex, total);
            if (!pos) return null;

            const isActive = i === activeIndex;

            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  x: pos.x,
                  y: pos.y,
                  scale: pos.scale,
                  opacity: pos.opacity,
                  zIndex: pos.zIndex,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={() => {
                  goTo(i);
                  onSelect?.(item, i);
                }}
                aria-label={item.title}
                aria-selected={isActive}
                role="option"
                className={cn(
                  "absolute left-1/2 top-1/2 flex h-36 w-56 -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-start justify-between rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 text-left",
                  isActive
                    ? "bg-teal-ink text-paper border-sand/60 shadow-[0_20px_50px_-10px_rgba(20,60,50,0.35)] scale-105"
                    : "bg-paper text-ink border-sand-deep/40 hover:border-sand hover:bg-sand/30 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.08)]",
                )}
                style={{
                  transformOrigin: "center center",
                  willChange: "transform, opacity",
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
              >
                {item.tag && (
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider",
                      isActive
                        ? "bg-sand text-teal-ink"
                        : "bg-sand-deep/30 text-mangrove",
                    )}
                  >
                    {item.tag}
                  </span>
                )}
                <div className="w-full">
                  <h3
                    className={cn(
                      "font-serif font-semibold leading-tight transition-colors duration-300",
                      isActive ? "text-paper text-base" : "text-ink text-sm",
                    )}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-1.5 line-clamp-2 text-xs leading-relaxed transition-colors duration-300 font-sans",
                      isActive ? "text-paper/80" : "text-mangrove",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Center counter */}
      {activeItem && (
        <motion.div
          key={activeItem.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-4"
        >
          <span className="text-5xl font-mono font-bold tracking-tight text-teal-ink/20">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="mt-1 text-xs font-mono uppercase tracking-widest text-mangrove/60">
            of {String(total).padStart(2, "0")}
          </span>
        </motion.div>
      )}

      {/* Controls */}
      <div className="flex items-center gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={prev}
          aria-label="Previous item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-deep/60 bg-paper text-ink shadow-sm transition-colors hover:bg-sand hover:text-teal-ink focus-visible:ring-2 focus-visible:ring-sand"
        >
          <ChevronLeft className="size-5" />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5" role="tablist">
          {items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === activeIndex}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === activeIndex
                  ? "w-7 bg-teal-ink"
                  : "w-2 bg-sand-deep/60 hover:bg-sand-deep",
              )}
              aria-label={`Go to item ${i + 1}`}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={next}
          aria-label="Next item"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-sand-deep/60 bg-paper text-ink shadow-sm transition-colors hover:bg-sand hover:text-teal-ink focus-visible:ring-2 focus-visible:ring-sand"
        >
          <ChevronRight className="size-5" />
        </motion.button>
      </div>
    </div>
  );
}

export default CircularCarousel;
