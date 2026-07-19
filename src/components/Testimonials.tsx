import { Quote } from "lucide-react";
import { testimonials } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

export function Testimonials() {
  return (
    <section id="ervaringen" className="bg-surface-subtle py-20 lg:py-28">
      <div className="container-page">
        <Reveal index={0}>
          <p className="eyebrow">{testimonials.eyebrow}</p>
          <h2 className="mt-3 text-[clamp(2.25rem,7vw,3.5rem)]">
            {testimonials.heading}
          </h2>
        </Reveal>

        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {testimonials.items.map((item, index) => (
            <Reveal key={item.name} as="li" index={index + 1}>
              <figure className="bento-card h-full">
                <Quote
                  className="h-6 w-6 text-primary-500"
                  aria-hidden="true"
                />
                <blockquote className="mt-4 flex-1 text-lg text-ink-800">
                  {item.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 font-[family-name:var(--font-display)] text-lg font-bold text-primary-800"
                  >
                    {item.name.charAt(0)}
                  </span>
                  <span>
                    <span className="block font-semibold text-ink-900">
                      {item.name}
                    </span>
                    <span className="block text-sm text-ink-500">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
