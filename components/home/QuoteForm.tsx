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
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [contactError, setContactError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onChange =
    (key: FieldKey) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setValues((current) => {
        if (key === "email" || key === "phone") setContactError(false);
        if (status === "error") setStatus("idle");
        return { ...current, [key]: event.target.value };
      });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.email.trim() && !values.phone.trim()) {
      setContactError(true);
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const payload = (await response.json().catch(() => ({}))) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error || "The quote request could not be sent.");
      }

      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "The quote request could not be sent. Please call or email us directly."
      );
    }
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
                Start with the site, then the system.
              </h2>
            </Reveal>
            <Reveal stagger={160}>
              <p className="t-body mt-6 max-w-[44ch] text-[var(--color-text-inverse)]/70">
                Send the essentials and we will arrange a site inspection,
                confirm the right commercial flooring system, and return a
                fixed-scope quote.
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
                  Your request has been sent directly to {EMAIL}. We will
                  respond within one working day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} encType="multipart/form-data" className="grid grid-cols-1 gap-3 md:grid-cols-6">
                <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <Field label="Name" name="name" value={values.name} onChange={onChange("name")} required autoComplete="name" className="md:col-span-6" />
                <Field label="Suburb" name="suburb" value={values.suburb} onChange={onChange("suburb")} required autoComplete="address-level2" className="md:col-span-3" />
                <Field label="Approx. area (m2)" name="area" type="number" value={values.area} onChange={onChange("area")} required inputMode="decimal" className="md:col-span-3" />
                <SelectField label="Finish interest" name="finish" value={values.finish} onChange={onChange("finish")} className="md:col-span-6" />
                <Field label="Email" name="email" type="email" value={values.email} onChange={onChange("email")} autoComplete="email" inputMode="email" className="md:col-span-3" />
                <Field label="Phone" name="phone" type="tel" value={values.phone} onChange={onChange("phone")} autoComplete="tel" inputMode="tel" className="md:col-span-3" />
                {contactError && (
                  <p className="t-caption text-[var(--color-oxide)] md:col-span-6">
                    Add an email or phone number so we can return the quote.
                  </p>
                )}
                <Field label="Traffic, slab, timing, goals" name="description" textarea value={values.description} onChange={onChange("description")} className="md:col-span-6" />
                <label className="grid gap-2 border border-[var(--hairline-dark)] px-4 py-3 md:col-span-6">
                  <span className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-text-inverse)]/55">
                    Photos optional
                  </span>
                  <input
                    type="file"
                    name="photos"
                    accept="image/*,.heic,.heif"
                    multiple
                    className="text-[13px] text-[var(--color-text-inverse)]/70 file:mr-4 file:border-0 file:bg-[var(--color-pcc-green)] file:px-3 file:py-2 file:text-[12px] file:font-semibold file:text-[var(--color-ink)]"
                  />
                  <span className="t-caption text-[var(--color-text-inverse)]/45">
                    Up to 5 photos, 8 MB each.
                  </span>
                </label>
                {status === "error" && (
                  <p className="t-caption text-[var(--color-oxide)] md:col-span-6" role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-5 flex flex-col gap-4 md:col-span-6 md:flex-row md:items-center">
                  <Button type="submit" variant="accent" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Request Quote"}
                  </Button>
                  <p className="t-caption max-w-[38ch] text-[var(--color-text-inverse)]/55">
                    Include photos, access notes, traffic type, timing, and whether the slab is new or existing.
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
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
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
  autoComplete,
  inputMode,
  className,
}: FieldProps) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  const labelActive = textarea || active;

  return (
    <label className={cn("relative block", className)} htmlFor={name}>
      <span
        className={cn(
          "pointer-events-none absolute left-4 transition-all duration-200",
          labelActive
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
          autoComplete={autoComplete}
          inputMode={inputMode}
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
        <option value="traffic-coating">Epoxy traffic coating</option>
      </select>
    </label>
  );
}
