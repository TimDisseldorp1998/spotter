"use client";

import { useEffect, useState } from "react";

/**
 * Wisselt het staartje van de H1. De hoogte ligt vast en het langste woord
 * staat onzichtbaar in de flow, zodat er niets springt tijdens het wisselen
 * (geen CLS). Met prefers-reduced-motion blijft het eerste woord staan.
 */
export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fadeOut = window.setTimeout(() => setVisible(false), 2600);
    const swap = window.setTimeout(() => {
      setIndex((value) => (value + 1) % words.length);
      setVisible(true);
    }, 2900);

    return () => {
      window.clearTimeout(fadeOut);
      window.clearTimeout(swap);
    };
  }, [index, words.length]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));

  return (
    <span className="relative inline-grid">
      {/* onzichtbare maatvoerder: reserveert de breedte van het langste woord */}
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {longest}
      </span>
      <span
        aria-live="polite"
        className="col-start-1 row-start-1 text-primary-500 transition-opacity duration-[var(--duration-base)]"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {words[index]}
      </span>
    </span>
  );
}
