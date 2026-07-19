"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal met stagger (skill: motion 7/10, "Stagger List").
 *
 * Werkt progressive-enhancement: de CSS verbergt alleen iets als deze
 * component `js-reveal` op <html> heeft gezet. Zonder JS, of met
 * prefers-reduced-motion, blijft alle content gewoon staan.
 */
export function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced || !("IntersectionObserver" in window)) {
      return;
    }

    root.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    const items = document.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item) => observer.observe(item));

    return () => {
      observer.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}

type RevealProps = {
  /** Volgorde binnen een groep; 60ms per stap, gecapt zodat niets lang wacht. */
  index?: number;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "li" | "section" | "article";
};

/** Wrapper die één element in de stagger meeneemt. */
export function Reveal({
  index = 0,
  className,
  children,
  as: Tag = "div",
}: RevealProps) {
  const delay = Math.min(index, 8) * 60;

  return (
    <Tag
      data-reveal=""
      className={className}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
