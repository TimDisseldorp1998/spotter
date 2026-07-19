import {
  Calculator,
  HeartPulse,
  Sparkles,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { tools } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  calculator: Calculator,
  heart: HeartPulse,
  sparkles: Sparkles,
  timer: Timer,
  trending: TrendingUp,
};

/* Asymmetrische bento-indeling (skill: variance 8/10). Mobiel stapelt alles. */
const spans: Record<string, string> = {
  "1rm": "sm:col-span-2 lg:col-span-4",
  herstel: "sm:col-span-1 lg:col-span-2",
  rustklok: "sm:col-span-1 lg:col-span-2",
  schema: "sm:col-span-2 lg:col-span-4",
  progressie: "sm:col-span-2 lg:col-span-6",
};

export function BentoTools() {
  return (
    <section id="tools" className="py-20 lg:py-28">
      <div className="container-page">
        <Reveal index={0}>
          <p className="eyebrow">{tools.eyebrow}</p>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(2.25rem,7vw,3.5rem)]">
            {tools.heading}
          </h2>
          <p className="measure mt-4 text-lg text-ink-600">{tools.body}</p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {tools.cards.map((card, index) => {
            const Icon = icons[card.icon];
            const dark = card.id === "schema";

            return (
              <Reveal
                key={card.id}
                as="li"
                index={index}
                className={spans[card.id]}
              >
                <article
                  className={`bento-card h-full ${dark ? "on-dark bg-ink-950" : ""}`}
                >
                  {dark ? (
                    <div
                      aria-hidden="true"
                      className="glow-blob -right-10 -top-10 h-40 w-40 bg-primary-500 opacity-40"
                    />
                  ) : null}

                  <div className="relative">
                    <span
                      className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                        dark
                          ? "bg-primary-500/15 text-primary-400"
                          : "bg-primary-50 text-primary-700"
                      }`}
                    >
                      <Icon
                        className="h-5 w-5"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                    </span>

                    <h3
                      className={`mt-4 text-2xl ${dark ? "text-white" : "text-ink-900"}`}
                    >
                      {card.title}
                    </h3>
                    <p
                      className={`measure mt-2 ${dark ? "text-muted-inverse" : "text-ink-600"}`}
                    >
                      {card.body}
                    </p>
                  </div>

                  <div className="relative mt-6 flex-1">
                    <Demo variant={card.demo} />
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Demo({ variant }: { variant: string }) {
  if (variant === "onerm") return <OneRmDemo />;
  if (variant === "recovery") return <RecoveryDemo />;
  if (variant === "prompt") return <PromptDemo />;
  if (variant === "timer") return <TimerDemo />;
  if (variant === "chart") return <ChartDemo />;
  return null;
}

function OneRmDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-surface-subtle p-4">
      <div className="rounded-xl border border-border bg-surface px-4 py-2.5">
        <span className="block text-xs font-medium text-ink-500">Gewicht</span>
        <span className="tabular font-[family-name:var(--font-display)] text-xl font-bold">
          80 kg
        </span>
      </div>
      <div className="rounded-xl border border-border bg-surface px-4 py-2.5">
        <span className="block text-xs font-medium text-ink-500">Reps</span>
        <span className="tabular font-[family-name:var(--font-display)] text-xl font-bold">
          5
        </span>
      </div>
      <div className="ml-auto rounded-xl bg-primary-600 px-4 py-2.5 text-white">
        <span className="block text-xs font-medium text-white/80">1RM</span>
        <span className="tabular font-[family-name:var(--font-display)] text-xl font-bold">
          90 kg
        </span>
      </div>
    </div>
  );
}

function RecoveryDemo() {
  const groups = [
    { name: "Borst", pct: 82, status: "Klaar" },
    { name: "Rug", pct: 46, status: "Bijna" },
    { name: "Benen", pct: 18, status: "Rust" },
  ];

  return (
    <ul className="space-y-3">
      {groups.map((group) => (
        <li key={group.name}>
          <div className="flex items-baseline justify-between text-sm">
            <span className="font-medium text-ink-800">{group.name}</span>
            {/* status staat in tekst, niet alleen in kleur */}
            <span className="tabular text-ink-500">
              {group.pct}% · {group.status}
            </span>
          </div>
          <div
            className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-sunken"
            role="img"
            aria-label={`${group.name}: ${group.pct} procent hersteld, ${group.status.toLowerCase()}`}
          >
            <div
              className="h-full rounded-full bg-primary-500"
              style={{ width: `${group.pct}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Generatieve interface: je typt wat je wilt, Spotter zet het om in een schema. */
function PromptDemo() {
  const chips = ["Ma · Push", "Di · Rug", "Do · Benen", "Za · Full body"];

  return (
    <div className="space-y-3">
      <p className="glass px-4 py-3 text-sm text-white/90">
        <span className="text-muted-inverse">Jij: </span>
        &ldquo;4× per week, focus op rug, 45 minuten&rdquo;
        <span className="caret ml-0.5 inline-block text-primary-400">|</span>
      </p>
      <ul className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <li
            key={chip}
            className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-sm text-white/90"
          >
            {chip}
          </li>
        ))}
      </ul>
    </div>
  );
}

function TimerDemo() {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-surface-subtle p-4">
      <span className="tabular font-[family-name:var(--font-display)] text-4xl font-bold text-ink-900">
        1:30
      </span>
      <span className="text-sm text-ink-500">
        Zware compound
        <br />
        langere pauze
      </span>
    </div>
  );
}

function ChartDemo() {
  /* Vast pad, dus geen hydration-verschil en geen layout shift. */
  const points = [12, 20, 18, 28, 34, 31, 44, 52, 49, 62];
  const width = 600;
  const height = 120;
  const max = Math.max(...points);
  const step = width / (points.length - 1);
  const path = points
    .map((value, index) => {
      const x = index * step;
      const y = height - (value / max) * (height - 12) - 6;
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <figure className="rounded-2xl bg-surface-subtle p-4">
      <figcaption className="flex items-baseline justify-between">
        <span className="text-sm font-medium text-ink-800">
          Squat · volume per week
        </span>
        <span className="tabular text-sm font-semibold text-success">
          +18% in 10 weken
        </span>
      </figcaption>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-3 h-24 w-full"
        role="img"
        aria-label="Lijngrafiek van het wekelijkse squatvolume over tien weken. Het volume loopt op van 12 naar 62, met twee kleine dips onderweg."
        preserveAspectRatio="none"
      >
        <path
          d={`${path} L ${width} ${height} L 0 ${height} Z`}
          fill="var(--color-primary-500)"
          opacity="0.1"
        />
        <path
          d={path}
          fill="none"
          stroke="var(--color-primary-500)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </figure>
  );
}
