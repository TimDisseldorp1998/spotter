import { stats } from "@/lib/content";

/**
 * Doorlopende statbalk. De tweede reeks is een aria-hidden kopie die de loop
 * naadloos maakt; screenreaders lezen de cijfers dus één keer.
 * Bij prefers-reduced-motion staat de animatie stil (zie globals.css).
 */
export function StatsStrip() {
  return (
    <section
      aria-label="Spotter in cijfers"
      className="marquee overflow-hidden border-y border-border bg-surface-subtle py-5"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 ? "true" : undefined}
            className="flex shrink-0 items-center"
          >
            {stats.map((stat) => (
              <li
                key={`${copy}-${stat.label}`}
                className="flex items-center gap-3 whitespace-nowrap px-6 sm:px-9"
              >
                <span className="tabular font-[family-name:var(--font-display)] text-2xl font-bold text-ink-900 sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-sm text-ink-500 sm:text-base">
                  {stat.label}
                </span>
                <span
                  aria-hidden="true"
                  className="ml-3 h-1.5 w-1.5 rounded-full bg-primary-500"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
