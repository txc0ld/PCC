"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { cn, EMAIL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/utils";

type FieldKey = "name" | "suburb" | "area" | "finish" | "description" | "email" | "phone";
type State = Record<FieldKey, string>;

const initial: State = {
  name: "",
  suburb: "",
  area: "",
  finish: "",
  description: "",
  email: "",
  phone: "",
};

export function QuoteForm() {
  const [values, setValues] = useState<State>(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onChange =
    (key: FieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((current) => ({ ...current, [key]: event.target.value }));

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    const subject = `Quote request - ${values.suburb || "Perth Concrete Care"}`;
    const body = [
      "New website quote request",
      "",
      `Name: ${values.name}`,
      `Suburb: ${values.suburb}`,
      `Approx. area: ${values.area} m2`,
      `Finish interest: ${values.finish || "Not sure yet"}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone}`,
      "",
      "Slab, timing and goals:",
      values.description || "-",
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    await new Promise((resolve) => setTimeout(resolve, 300));
    setStatus("sent");
  };

  return (
    <section
      id="quote"
      className="section-pad-tight bg-[var(--color-ink)] text-[var(--color-text-inverse)]"
      aria-labelledby="quote-heading"
    >
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Reveal>
              <p className="t-eyebrow text-[var(--color-text-inverse)]/55">10 / Quote</p>
            </Reveal>
            <Reveal stagger={80}>
              <h2 id="quote-heading" className="t-display-sm mt-4 text-[var(--color-text-inverse)]">
                Start with the slab, then the finish.
              </h2>
            </Reveal>
            <Reveal stagger={160}>
              <p className="t-body mt-6 max-w-[44ch] text-[var(--color-text-inverse)]/70">
                Send the essentials and we will arrange a site inspection,
                confirm the right flooring system, and return a fixed-scope
                quote.
              </p>
            </Reveal>

            <Reveal stagger={220}>
              <div className="mt-10 grid gap-4 border-t border-[var(--hairline-dark)] pt-6">
                <a href={PHONE_HREF} className="t-subhead link-underline w-fit text-[var(--color-text-inverse)]">
                  {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className="t-body link-underline w-fit text-[var(--color-text-inverse)]/75">
                  {EMAIL}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            {status === "sent" ? (
              <div className="flex min-h-[380px] flex-col justify-center border-y border-[var(--hairline-dark)]">
                <p className="t-eyebrow text-[var(--color-oxide)]">Request received</p>
                <p className="t-display-sm mt-4 text-[var(--color-text-inverse)]">
                  Thanks, {values.name.split(" ")[0] || "there"}.
                </p>
                <p className="t-body mt-4 max-w-[46ch] text-[var(--color-text-inverse)]/70">
                  Your email app should open with the request addressed to
                  {` ${EMAIL}`}. Send it through and we will respond within one
                  working day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-1 gap-3 md:grid-cols-6">
                <Field label="Name" name="name" value={values.name} onChange={onChange("name")} required className="md:col-span-6" />
                <Field label="Suburb" name="suburb" value={values.suburb} onChange={onChange("suburb")} required className="md:col-span-3" />
                <Field label="Approx. area (m2)" name="area" type="number" value={values.area} onChange={onChange("area")} required className="md:col-span-3" />
                <SelectField label="Finish interest" name="finish" value={values.finish} onChange={onChange("finish")} className="md:col-span-6" />
                <Field label="Email" name="email" type="email" value={values.email} onChange={onChange("email")} required className="md:col-span-3" />
                <Field label="Phone" name="phone" type="tel" value={values.phone} onChange={onChange("phone")} className="md:col-span-3" />
                <Field label="Slab, timing, goals" name="description" textarea value={values.description} onChange={onChange("description")} className="md:col-span-6" />

                <div className="mt-5 flex flex-col gap-4 md:col-span-6 md:flex-row md:items-center">
                  <Button type="submit" variant="accent" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Request Quote"}
                  </Button>
                  <p className="t-caption max-w-[38ch] text-[var(--color-text-inverse)]/55">
                    Include photos, access notes, timing, and whether the slab is new or existing.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  className?: string;
};

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required,
  textarea,
  className,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <label className={cn("relative block", className)} htmlFor={name}>
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          active
            ? "top-2 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-inverse)]/55"
            : "top-1/2 -translate-y-1/2 text-[15px] text-[var(--color-text-inverse)]/55"
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </span>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          rows={5}
          className="block w-full rounded-none border border-[var(--hairline-dark)] bg-transparent px-4 pb-3 pt-7 text-[15px] text-[var(--color-text-inverse)] outline-none transition-colors focus:border-[var(--color-text-inverse)]"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="block h-14 w-full rounded-none border border-[var(--hairline-dark)] bg-transparent px-4 pb-2 pt-6 text-[15px] text-[var(--color-text-inverse)] outline-none transition-colors focus:border-[var(--color-text-inverse)]"
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  className,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) {
  return (
    <label className={cn("relative block", className)} htmlFor={name}>
      <span className="pointer-events-none absolute left-4 top-2 text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-inverse)]/55">
        {label}
      </span>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="block h-14 w-full rounded-none border border-[var(--hairline-dark)] bg-[var(--color-ink)] px-4 pb-2 pt-6 text-[15px] text-[var(--color-text-inverse)] outline-none transition-colors focus:border-[var(--color-text-inverse)]"
      >
        <option value="">Not sure yet</option>
        <option value="polished">Polished concrete</option>
        <option value="honed">Honed concrete</option>
        <option value="grind-seal">Grind and seal</option>
        <option value="epoxy">Epoxy coating</option>
      </select>
    </label>
  );
}
