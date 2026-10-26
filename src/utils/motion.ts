import type { TMotion } from "../types";
import { Variants } from "framer-motion";

export const textVariant = (delay = 0) => {
  return {
    hidden: {
      y: -40,
      opacity: 0,
      filter: "blur(8px)",
    },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        duration: 1.15,
        delay,
      },
    },
  };
};

export const fadeIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
): Variants => {
  return {
    hidden: {
      x: direction === "left" ? 80 : direction === "right" ? -80 : 0,
      y: direction === "up" ? 80 : direction === "down" ? -80 : 0,
      opacity: 0,
      filter: "blur(6px)",
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const zoomIn = (
  delay: TMotion["delay"],
  duration: TMotion["duration"]
) => {
  return {
    hidden: {
      scale: 0.7,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        delay,
        duration,
      },
    },
  };
};

export const slideIn = (
  direction: TMotion["direction"],
  type: TMotion["type"],
  delay: TMotion["delay"],
  duration: TMotion["duration"]
) => {
  return {
    hidden: {
      x: direction === "left" ? "-100%" : direction === "right" ? "100%" : 0,
      y: direction === "up" ? "100%" : direction === "down" ? "100%" : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: "easeOut",
      },
    },
  };
};

export const staggerContainer = (
  staggerChildren = 0.12,
  delayChildren = 0.08
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const floatY = (amount = 10, duration = 3): Variants => ({
  hidden: { y: 0 },
  show: {
    y: [0, -amount, 0],
    transition: {
      duration,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
});
