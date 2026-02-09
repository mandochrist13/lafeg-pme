"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export type RevealPreset =
  | "fade"
  | "blur"
  | "slide"
  | "slideFade"
  | "scale"
  | "scaleFade"
  | "rotate"
  | "none";

export type RevealDirection = "up" | "down" | "left" | "right";

type RevealProps = {
  children: React.ReactNode;
  className?: string;

  preset?: RevealPreset;
  direction?: RevealDirection;

  /** distance en px pour les slides */
  distance?: number;

  /** intensité du blur en px (si preset blur / blur+fade) */
  blur?: number;

  /** durée / délai */
  duration?: number;
  delay?: number;

  /** animation une seule fois */
  once?: boolean;

  /** portion visible pour déclencher (0..1) */
  amount?: number;

  /** si tu veux désactiver totalement l'animation */
  disabled?: boolean;
};

function getInitialFromPreset(opts: {
  preset: RevealPreset;
  direction: RevealDirection;
  distance: number;
  blur: number;
}) {
  const { preset, direction, distance, blur } = opts;

  const axis =
    direction === "up"
      ? { y: distance }
      : direction === "down"
      ? { y: -distance }
      : direction === "left"
      ? { x: distance }
      : { x: -distance };

  switch (preset) {
    case "none":
      return {};
    case "fade":
      return { opacity: 0 };
    case "blur":
      return { opacity: 0, filter: `blur(${blur}px)` };
    case "slide":
      return { ...axis };
    case "slideFade":
      return { opacity: 0, ...axis };
    case "scale":
      return { scale: 0.96 };
    case "scaleFade":
      return { opacity: 0, scale: 0.96 };
    case "rotate":
      return { opacity: 0, rotate: -2, ...axis };
    default:
      return { opacity: 0, y: distance };
  }
}

export default function Reveal({
  children,
  className,

  preset = "slideFade",
  direction = "up",
  distance = 24,
  blur = 10,

  duration = 0.7,
  delay = 0,

  once = true,
  amount = 0.2,

  disabled = false,
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount });
  const reduce = useReducedMotion();

  // Si reduced-motion, on enlève les mouvements pour éviter gêne.
  const safePreset: RevealPreset = reduce ? "fade" : preset;

  const initial = disabled
    ? {}
    : getInitialFromPreset({
        preset: safePreset,
        direction,
        distance,
        blur,
      });

  const animate = disabled ? {} : inView ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" } : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
