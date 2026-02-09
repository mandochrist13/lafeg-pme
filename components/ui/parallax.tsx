"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  className?: string;
  /** amplitude du mouvement vertical */
  offset?: number;
  /** démarrage: "start end" etc */
  start?: "start end" | "end start" | `${number} ${number}`;
  end?: "start end" | "end start" | `${number} ${number}`;
};

export default function Parallax({
  children,
  className,
  offset = 28,
  start = "start end",
  end = "end start",
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [start, end],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);

  return (
    <motion.div ref={ref} className={className} style={reduce ? undefined : { y }}>
      {children}
    </motion.div>
  );
}
