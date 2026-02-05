"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  amount?: number;
  stagger?: number;
  delayChildren?: number;
};

export function Stagger({
  children,
  className,
  once = true,
  amount = 0.2,
  stagger = 0.08,
  delayChildren = 0.06,
}: StaggerProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: {
          transition: reduce
            ? { staggerChildren: 0 }
            : { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 18,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y, filter: "blur(8px)" },
        show: reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
            },
      }}
    >
      {children}
    </motion.div>
  );
}
