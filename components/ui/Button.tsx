import Link from "next/link";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "accent";

type Common = {
  variant?: Variant;
  children: ReactNode;
  icon?: boolean;
  className?: string;
};

const base =
  "group relative inline-flex min-h-12 items-center justify-center gap-2 rounded-none " +
  "px-6 py-3 text-[14px] font-extrabold uppercase tracking-[0.08em] " +
  "transition-[background,color,border-color,transform] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "active:scale-[0.98] active:duration-[120ms] " +
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-oxide)]";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[var(--color-text-inverse)] hover:bg-[var(--color-charcoal)]",
  ghost:
    "border border-[var(--hairline-strong)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-text-inverse)]",
  accent:
    "bg-[var(--color-oxide)] text-[var(--color-ink)] hover:bg-[var(--color-oxide-pressed)]",
};

function Arrow() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-0.5"
    >
      <path
        d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type ButtonProps = Common & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", icon = true, children, className, ...rest },
  ref
) {
  return (
    <button ref={ref} className={cn(base, variants[variant], className)} {...rest}>
      <span>{children}</span>
      {icon && <Arrow />}
    </button>
  );
});

type LinkBtnProps = Common & { href: string; external?: boolean };

export function LinkButton({
  variant = "primary",
  icon = true,
  href,
  external,
  children,
  className,
}: LinkBtnProps) {
  const cls = cn(base, variants[variant], className);
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noreferrer">
        <span>{children}</span>
        {icon && <Arrow />}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      <span>{children}</span>
      {icon && <Arrow />}
    </Link>
  );
}
