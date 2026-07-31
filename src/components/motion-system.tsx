"use client";

import Image, { type ImageProps } from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  type Variants,
} from "framer-motion";
import { type ReactNode, useEffect, useRef, useState } from "react";

export const motionEase = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: motionEase } },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: motionEase } },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: motionEase } },
};

export const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export const viewportOnce = { once: true, amount: 0.16 } as const;

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    mass: 0.35,
  });

  if (reduceMotion) return null;
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className="route-transition"
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.997 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.998 }}
        transition={{ duration: reduceMotion ? 0 : 0.4, ease: motionEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function MotionImage({ className, onLoad, alt, src, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);
  const reduceMotion = useReducedMotion();
  const imageClassName = ["motion-image", loaded || reduceMotion ? "is-loaded" : "", className]
    .filter(Boolean)
    .join(" ");

  const handleLoad: NonNullable<ImageProps["onLoad"]> = (event) => {
    event.currentTarget.parentElement?.classList.add("image-loaded");
    setLoaded(true);
    onLoad?.(event);
  };

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const resolvedSrc = typeof src === "string" && src.startsWith("/") ? `${basePath}${src}` : src;

  return <Image {...props} src={resolvedSrc} alt={alt} className={imageClassName} onLoad={handleLoad} />;
}

interface AnimatedMetricProps {
  value: number;
  pad?: number;
  suffix: string;
}

export function AnimatedMetric({ value, pad = 0, suffix }: AnimatedMetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const reduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const duration = 600;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value]);

  const number = String(displayValue).padStart(pad, "0");
  const fullLabel = `${String(value).padStart(pad, "0")} ${suffix}`;

  return (
    <span ref={ref} className="animated-metric" aria-label={fullLabel}>
      <span className="metric-number" aria-hidden="true">{number}</span>{" "}
      <span aria-hidden="true">{suffix}</span>
    </span>
  );
}