import { ArrowRight, Trophy, Users, Zap, type LucideIcon } from "lucide-react";
import { social } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const icons: Record<string, LucideIcon> = {
  users: Users,
  zap: Zap,
  trophy: Trophy,
};

export function SocialTraining() {
  return (
    <section id="samen" className="py-20 lg:py-28">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal index={0}>
            <p className="eyebrow">{social.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2.25rem,7vw,3.5rem)]">
              {social.heading}
            </h2>
            <p className="measure mt-4 text-lg text-ink-600">{social.body}</p>
          </Reveal>

          <ul className="mt-8 space-y-5">
            {social.points.map((point, index) => {
              const Icon = icons[point.icon];
              return (
                <Reveal key={point.title} as="li" index={index + 1}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl">{point.title}</h3>
                      <p className="mt-1 text-ink-600">{point.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </ul>

          <Reveal index={4}>
            <a href={social.cta.href} className="btn btn-primary mt-8">
              {social.cta.label}
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Reveal index={2}>
          <SessionCard />
        </Reveal>
      </div>
    </section>
  );
}

/** Gedeelde sessie: twee mensen, dezelfde workout, elk hun eigen gewichten. */
function SessionCard() {
  const people = [
    {
      name: "Sanne",
      initials: "S",
      status: "Set 3 van 4 · 45 kg",
      progress: 75,
      active: true,
    },
    {
      name: "Youssef",
      initials: "Y",
      status: "Set 2 van 4 · 70 kg",
      progress: 50,
      active: false,
    },
  ];

  return (
    <div className="on-dark relative isolate overflow-hidden rounded-[1.75rem] bg-ink-950 p-6 text-white shadow-[var(--shadow-xl)]">
      <div
        aria-hidden="true"
        className="glow-blob -left-16 top-1/3 h-56 w-56 bg-primary-500 opacity-35"
      />

      <div className="relative flex items-center justify-between">
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
          Gedeelde sessie
        </p>
        <span className="inline-flex items-center gap-2 rounded-full bg-success/20 px-3 py-1.5 text-sm font-semibold text-white">
          <span className="relative inline-flex h-2 w-2 text-success pulse-ring">
            <span className="h-2 w-2 rounded-full bg-success" />
          </span>
          Live
        </span>
      </div>

      <ul className="relative mt-6 space-y-3">
        {people.map((person) => (
          <li key={person.name} className="glass p-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-display)] text-lg font-bold ${
                  person.active
                    ? "bg-primary-600 text-white"
                    : "bg-white/15 text-white"
                }`}
              >
                {person.initials}
              </span>
              <div className="min-w-0">
                <p className="truncate font-semibold">{person.name}</p>
                <p className="tabular truncate text-sm text-muted-inverse">
                  {person.status}
                </p>
              </div>
            </div>
            <div
              className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/12"
              role="img"
              aria-label={`${person.name} is ${person.progress} procent door de workout`}
            >
              <div
                className="h-full rounded-full bg-primary-500"
                style={{ width: `${person.progress}%` }}
              />
            </div>
          </li>
        ))}
      </ul>

      <p className="relative mt-4 text-sm text-muted-inverse">
        Iedereen tilt zijn eigen gewichten. Spotter rekent per persoon.
      </p>
    </div>
  );
}
