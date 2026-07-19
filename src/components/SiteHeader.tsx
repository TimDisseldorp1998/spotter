"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/content";
import { Logo } from "@/components/Logo";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape sluit het menu en zet focus terug op de knop. */
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* Klik buiten het paneel sluit het menu. */
  useEffect(() => {
    if (!open) return;

    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !toggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main"
        className="sr-only rounded-full bg-ink-900 px-5 py-3 text-white focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50"
      >
        Naar de inhoud
      </a>

      <div
        className={`transition-[background-color,border-color,box-shadow] duration-[var(--duration-base)] ${
          scrolled || open
            ? "glass-light border-b border-border shadow-[var(--shadow-sm)]"
            : "border-b border-transparent"
        }`}
        style={{ borderRadius: 0 }}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-4">
          <a
            href="#main"
            className="flex items-center gap-2.5 rounded-full py-2"
            aria-label={`${site.name} — naar het begin`}
          >
            <Logo className="h-7 w-7" />
            <span className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
              {site.name}
            </span>
          </a>

          <nav aria-label="Hoofdmenu" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-full px-4 text-[0.9375rem] font-medium text-ink-700 transition-colors duration-[var(--duration-fast)] hover:bg-ink-50 hover:text-ink-900"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#start"
              className="btn btn-primary hidden !min-h-11 !px-5 !text-base sm:inline-flex"
            >
              Start gratis
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobiel-menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-ink-900 transition-colors duration-[var(--duration-fast)] hover:bg-ink-50 lg:hidden"
            >
              {open ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
              <span className="sr-only">
                {open ? "Menu sluiten" : "Menu openen"}
              </span>
            </button>
          </div>
        </div>

        {open ? (
          <div
            ref={panelRef}
            id="mobiel-menu"
            className="container-page border-t border-border pb-5 pt-3 lg:hidden"
          >
            <nav aria-label="Mobiel menu">
              <ul className="flex flex-col gap-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center rounded-xl px-3 text-lg font-medium text-ink-800 transition-colors duration-[var(--duration-fast)] hover:bg-ink-50 hover:text-ink-900"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="#start"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-3 w-full sm:hidden"
            >
              Start gratis
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
