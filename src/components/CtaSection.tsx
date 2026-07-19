"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { joinWaitlist, type SignupState } from "@/app/actions";
import { cta } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const initialState: SignupState = { status: "idle", message: "" };

export function CtaSection() {
  const [state, formAction] = useActionState(joinWaitlist, initialState);
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldId = useId();
  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;

  /* Na een fout: focus terug naar het veld dat aandacht nodig heeft. */
  useEffect(() => {
    if (state.status === "error") inputRef.current?.focus();
  }, [state]);

  return (
    <section
      id="start"
      className="on-dark relative isolate overflow-hidden bg-ink-950 py-20 text-white lg:py-28"
    >
      <div
        aria-hidden="true"
        className="glow-blob left-1/2 top-[-20%] h-[460px] w-[460px] -translate-x-1/2 bg-primary-600 opacity-35"
      />

      <div className="container-page relative">
        <Reveal index={0}>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{cta.eyebrow}</p>
            <h2 className="mt-3 text-[clamp(2.5rem,8vw,4rem)] text-white">
              {cta.heading}
            </h2>
            <p className="mt-4 text-lg text-muted-inverse">{cta.body}</p>
          </div>
        </Reveal>

        <Reveal index={1}>
          <form
            action={formAction}
            noValidate
            className="glass mx-auto mt-10 max-w-xl p-5 sm:p-6"
          >
            <label
              htmlFor={fieldId}
              className="block font-semibold text-white"
            >
              E-mailadres
            </label>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <input
                ref={inputRef}
                id={fieldId}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="jij@voorbeeld.nl"
                aria-describedby={
                  state.status === "error" ? errorId : helperId
                }
                aria-invalid={state.status === "error" || undefined}
                className="min-h-12 w-full flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-base text-white placeholder:text-white/50 transition-colors duration-[var(--duration-base)] focus:border-primary-400"
              />
              <SubmitButton />
            </div>

            <p id={helperId} className="mt-3 text-sm text-muted-inverse">
              {cta.microcopy}
            </p>

            {/* Statusmelding: kleur én icoon én tekst, nooit kleur alleen. */}
            <div aria-live="polite" className="mt-3 empty:mt-0">
              {state.status === "error" ? (
                <p
                  id={errorId}
                  className="flex items-start gap-2 text-sm font-medium text-primary-300"
                >
                  <AlertCircle
                    className="mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  {state.message}
                </p>
              ) : null}

              {state.status === "success" ? (
                <p className="flex items-start gap-2 text-sm font-medium text-white">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  {state.message}
                </p>
              ) : null}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn btn-primary shrink-0 sm:!px-6"
    >
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          Bezig
        </>
      ) : (
        <>
          Vraag toegang
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </>
      )}
    </button>
  );
}
