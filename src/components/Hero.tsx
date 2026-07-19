import { ArrowRight, Check, Timer, Users } from "lucide-react";
import { hero } from "@/lib/content";
import { Reveal } from "@/components/Reveal";
import { RotatingWord } from "@/components/RotatingWord";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24 lg:pt-36">
      {/* zachte merkgloed achter de hero */}
      <div
        aria-hidden="true"
        className="glow-blob -top-24 left-[-10%] h-[420px] w-[420px] bg-primary-200 opacity-40"
      />
      <div
        aria-hidden="true"
        className="glow-blob right-[-15%] top-24 h-[380px] w-[380px] bg-primary-100 opacity-60"
      />

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
        <div>
          <Reveal index={0}>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 py-1.5 pl-3 pr-4 text-sm font-semibold text-primary-800">
              <span className="relative inline-flex h-2 w-2 text-primary-500 pulse-ring">
                <span className="h-2 w-2 rounded-full bg-primary-500" />
              </span>
              {hero.pill}
            </p>
          </Reveal>

          <Reveal index={1}>
            <h1 className="mt-6 text-[clamp(2.75rem,10vw,4.75rem)] leading-[0.95] lg:text-[clamp(3.5rem,5.2vw,5.25rem)]">
              <span className="block">{hero.headingStart}</span>
              <RotatingWord words={hero.rotating} />
            </h1>
          </Reveal>

          <Reveal index={2}>
            <p className="measure mt-6 text-lg text-ink-600 sm:text-xl">
              {hero.body}
            </p>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
              <a href={hero.secondaryCta.href} className="btn btn-secondary">
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal index={4}>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-500">
              <Check
                className="h-4 w-4 shrink-0 text-success"
                aria-hidden="true"
              />
              {hero.microcopy}
            </p>
          </Reveal>
        </div>

        <Reveal index={2}>
          <HeroVisual />
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Productbeeld: een donkere sessiekaart met glass-panelen erop.
 * Bewust in code getekend, dus geen zware afbeelding en geen layout shift.
 */
function HeroVisual() {
  return (
    <div className="on-dark relative isolate overflow-hidden rounded-[1.75rem] bg-ink-950 p-5 shadow-[var(--shadow-xl)] sm:p-6">
      <div
        aria-hidden="true"
        className="glow-blob -right-16 -top-16 h-56 w-56 bg-primary-500 opacity-45"
      />
      <div
        aria-hidden="true"
        className="glow-blob -bottom-20 -left-10 h-48 w-48 bg-primary-700 opacity-40"
      />

      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-inverse">
            Sessie · push
          </p>
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-white">
            Bankdrukken
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500/15 px-3 py-1.5 text-sm font-semibold text-primary-400">
          <Timer className="h-4 w-4" aria-hidden="true" />
          <span className="tabular">1:30</span>
        </span>
      </div>

      {/* setlijst */}
      <ul className="relative mt-5 space-y-2">
        {[
          { set: "Set 1", weight: "60 kg", reps: "8", done: true },
          { set: "Set 2", weight: "70 kg", reps: "6", done: true },
          { set: "Set 3", weight: "75 kg", reps: "5", done: false },
        ].map((row) => (
          <li
            key={row.set}
            className="glass flex items-center justify-between gap-3 px-4 py-3"
          >
            <span className="flex items-center gap-2.5 text-sm font-medium text-white/90">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full ${
                  row.done ? "bg-success" : "border border-white/30"
                }`}
                aria-hidden="true"
              >
                {row.done ? (
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                ) : null}
              </span>
              {row.set}
            </span>
            <span className="tabular text-sm text-white">
              {row.weight}
              <span className="text-muted-inverse"> × {row.reps}</span>
            </span>
            <span className="sr-only">
              {row.done ? "afgerond" : "nog te doen"}
            </span>
          </li>
        ))}
      </ul>

      {/* 1RM-uitkomst */}
      <div className="relative mt-4 rounded-2xl bg-primary-600 px-4 py-3.5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/80">
          Geschat 1RM
        </p>
        <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-white">
          <span className="tabular">87</span> kg
        </p>
      </div>

      {/* sociale laag */}
      <div className="glass relative mt-4 flex items-center gap-3 px-4 py-3">
        <Users className="h-5 w-5 shrink-0 text-primary-400" aria-hidden="true" />
        <p className="text-sm text-white/90">
          <span className="font-semibold text-white">Youssef</span> doet dezelfde
          workout — set 2 van 4
        </p>
      </div>
    </div>
  );
}
