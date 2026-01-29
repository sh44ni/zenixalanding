"use client";

import { useState, useEffect, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-in" | "fade-in-left" | "fade-in-right" | "scale-in";
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    freezeOnceVisible: true,
  });

  const animationClasses = {
    "fade-in": "animate-fade-in",
    "fade-in-left": "animate-fade-in-left",
    "fade-in-right": "animate-fade-in-right",
    "scale-in": "animate-scale-in",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "opacity-0",
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : undefined,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  className,
}: AnimatedCounterProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.5,
    freezeOnceVisible: true,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isVisible ? <CountUp end={end} duration={duration} /> : 0}
      {suffix}
    </span>
  );
}

function CountUp({ end, duration }: { end: number; duration: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
}
