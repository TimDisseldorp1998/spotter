import { how } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function HowItWorks() {
  return (
    <section
      id="hoe-het-werkt"
      className="on-dark relative isolate overflow-hidden bg-ink-950 py-20 text-white lg:py-28"
    >
      <div
        aria-hidden="true"
        className="glow-blob left-[8%] top-[-10%] h-[380px] w-[380px] bg-primary-600 opacity-30"
      />
      <div
        aria-hidden="true"
        className="glow-blob bottom-[-15%] right-[5%] h-[320px] w-[320px] bg-primary-500 opacity-20"
      />

      <div className="container-page relative">
        <Reveal index={0}>
          <p className="eyebrow">{how.eyebrow}</p>
          <h2 className="mt-3 max-w-[20ch] text-[clamp(2.25rem,7vw,3.5rem)] text-white">
            {how.heading}
          </h2>
        </Reveal>

        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {how.steps.map((step, index) => (
            <Reveal key={step.number} as="li" index={index + 1}>
              <div className="glass h-full p-6">
                <span className="tabular font-[family-name:var(--font-display)] text-5xl font-bold text-primary-400">
                  {step.number}
                </span>
                <h3 className="mt-4 text-2xl text-white">{step.title}</h3>
                <p className="mt-2 text-muted-inverse">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
