"use client";

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  PRICING,
  CATEGORY_LABELS,
  calculate,
  defaultQty,
  findItem,
  fmt,
  getRate,
  type Mode,
  type PricingItem,
  type QuoteState,
} from "@/lib/pricing";
import { EMAIL, PHONE_DISPLAY } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "pcc_quote_v4";

const AUTO_CATEGORIES = ["grouting", "densifier"];

function makeInitial(): QuoteState {
  return {
    client: {
      name: "",
      date: new Date().toISOString().slice(0, 10),
      site: "",
      phone: "",
      email: "",
    },
    area: 0,
    mode: "default",
    exposure: null,
    grit: null,
    selections: {},
    cashDiscount: false,
    customAdjust: 0,
    notes: "",
  };
}

// ─── Shared style helpers ────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: "var(--color-paper)",
  border: "1px solid var(--hairline)",
  borderRadius: 0,
  overflow: "hidden",
  boxShadow: "none",
};

const fieldLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "var(--color-text-muted)",
  marginBottom: 6,
  display: "block",
};

const inputStyle: React.CSSProperties = {
  height: 48,
  padding: "0 14px",
  background: "var(--color-paper)",
  border: "1px solid var(--hairline)",
  borderRadius: 0,
  fontSize: 15,
  fontWeight: 500,
  color: "var(--color-text-primary)",
  letterSpacing: 0,
  width: "100%",
  outline: "none",
  transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
  WebkitAppearance: "none",
  appearance: "none" as React.CSSProperties["appearance"],
  boxSizing: "border-box",
};

function useInputFocus() {
  const [focused, setFocused] = useState(false);
  return {
    focused,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  children: React.ReactNode;
  fullWidth?: boolean;
}

function Field({ label, children, fullWidth }: FieldProps) {
  return (
    <div style={fullWidth ? { gridColumn: "1 / -1" } : {}}>
      <label style={fieldLabelStyle}>{label}</label>
      {children}
    </div>
  );
}

interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  extraStyle?: React.CSSProperties;
}

function StyledInput({ extraStyle, ...props }: StyledInputProps) {
  const { focused, onFocus, onBlur } = useInputFocus();
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        ...(focused
          ? {
              borderColor: "var(--color-ink)",
              boxShadow: "0 0 0 3px rgba(191,255,189,0.35)",
              background: "var(--color-paper)",
            }
          : {}),
        ...extraStyle,
      }}
      onFocus={(e) => {
        onFocus();
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        onBlur();
        props.onBlur?.(e);
      }}
    />
  );
}

// ─── Segmented Control ───────────────────────────────────────────────────────

interface SegmentedControlProps {
  value: Mode;
  onChange: (m: Mode) => void;
}

const MODES: { value: Mode; label: string; desc: string }[] = [
  { value: "min", label: "Min", desc: "Easy access" },
  { value: "default", label: "Default", desc: "Typical job" },
  { value: "max", label: "Max", desc: "Complex" },
];

function SegmentedControl({ value, onChange }: SegmentedControlProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: 0,
        background: "var(--color-paper)",
        border: "1px solid var(--hairline)",
        borderRadius: 0,
        padding: 0,
      }}
    >
      {MODES.map((m) => {
        const active = value === m.value;
        return (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            style={{
              border: "none",
              borderRadius: 0,
              padding: "12px 8px",
              textAlign: "center",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              transition: "all 280ms cubic-bezier(0.22,1,0.36,1)",
              background: active ? "var(--color-ink)" : "transparent",
              boxShadow: "none",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: active ? "var(--color-text-inverse)" : "var(--color-text-muted)",
                transition: "color 220ms",
              }}
            >
              {m.label}
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: active ? "rgba(255,248,236,0.7)" : "var(--color-text-muted)",
                letterSpacing: "0.01em",
                transition: "color 220ms",
              }}
            >
              {m.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// ─── Select Card (exposure / grit) ───────────────────────────────────────────

interface SelectCardProps {
  item: PricingItem;
  selected: boolean;
  mode: Mode;
  onToggle: () => void;
}

function SelectCard({ item, selected, mode, onToggle }: SelectCardProps) {
  const rate = getRate(item, mode);
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        background: selected ? "var(--color-bone)" : "var(--color-paper)",
        border: selected ? "1px solid var(--color-ink)" : "1px solid var(--hairline)",
        borderRadius: 0,
        padding: "14px 16px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        textAlign: "left",
        width: "100%",
        boxShadow: selected ? "inset 3px 0 0 var(--color-oxide)" : "none",
        transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Radio dot */}
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: selected
            ? "1.5px solid var(--color-ink)"
            : "1.5px solid var(--hairline-strong)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 200ms",
        }}
      >
        {selected && (
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "var(--color-oxide)",
              display: "block",
            }}
          />
        )}
      </span>

      {/* Body */}
      <span style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--color-text-primary)",
            letterSpacing: 0,
            marginBottom: 2,
          }}
        >
          {item.name}
        </span>
        <span
          style={{
            display: "block",
            fontSize: 12,
            color: "var(--color-text-muted)",
            lineHeight: 1.4,
          }}
        >
          {item.desc}
        </span>
      </span>

      {/* Price */}
      <span
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "var(--color-text-primary)",
          letterSpacing: 0,
          fontVariantNumeric: "tabular-nums",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {rate === 0 ? (
          <span style={{ color: "var(--color-text-muted)", fontSize: 13 }}>Incl.</span>
        ) : (
          <>
            {fmt(rate)}
            <small
              style={{
                fontSize: 11,
                fontWeight: 500,
                color: "var(--color-text-muted)",
                letterSpacing: 0,
              }}
            >
              /{item.unit}
            </small>
          </>
        )}
      </span>
    </button>
  );
}

// ─── Line Item Row ────────────────────────────────────────────────────────────

interface LineItemProps {
  item: PricingItem;
  category: string;
  active: boolean;
  included: boolean;
  qty: number;
  area: number;
  mode: Mode;
  onToggle: () => void;
  onQtyChange: (val: number) => void;
  onFillArea: () => void;
  onToggleIncluded: () => void;
  isFirst: boolean;
}

function LineItem({
  item,
  active,
  included,
  qty,
  area,
  mode,
  onToggle,
  onQtyChange,
  onFillArea,
  onToggleIncluded,
  isFirst,
}: LineItemProps) {
  const baseRate = getRate(item, mode);
  const rate = included ? 0 : baseRate;
  const total = qty * rate;
  const [localQty, setLocalQty] = useState(String(qty));

  // Keep localQty in sync with external qty when not focused
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (document.activeElement !== inputRef.current) {
      setLocalQty(String(qty));
    }
  }, [qty]);

  return (
    <div
      style={{
        borderTop: isFirst ? "none" : "1px solid var(--hairline)",
        background: active ? "var(--color-bone)" : "transparent",
        boxShadow: active ? "inset 3px 0 0 var(--color-oxide)" : "none",
        transition: "background 200ms cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* Main row */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 16px",
          cursor: "pointer",
          userSelect: "none",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        {/* Checkbox */}
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 0,
            border: active ? "1.5px solid var(--color-ink)" : "1.5px solid var(--hairline-strong)",
            background: active ? "var(--color-ink)" : "var(--color-paper)",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 180ms cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {active && (
            <svg
              width="11"
              height="8"
              viewBox="0 0 11 8"
              fill="none"
              style={{ display: "block" }}
            >
              <path
                d="M1 4L4 7L10 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* Body */}
        <span style={{ flex: 1, minWidth: 0 }}>
          <span
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: 14,
              fontWeight: 600,
              color: "var(--color-text-primary)",
              letterSpacing: 0,
            }}
          >
            {item.name}
            {active && included && (
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: "var(--color-ink)",
                  background: "var(--color-oxide)",
                  border: "1px solid var(--color-oxide)",
                  borderRadius: 0,
                  padding: "1px 6px",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  flexShrink: 0,
                }}
              >
                Included
              </span>
            )}
          </span>
          <span
            style={{
              display: "block",
              fontSize: 12,
              color: "var(--color-text-muted)",
              marginTop: 2,
              lineHeight: 1.4,
            }}
          >
            {item.desc}
          </span>
        </span>

        {/* Price */}
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: active ? "var(--color-text-primary)" : "var(--color-text-primary)",
            fontVariantNumeric: "tabular-nums",
            letterSpacing: 0,
            whiteSpace: "nowrap",
            flexShrink: 0,
            textAlign: "right",
            minWidth: 90,
          }}
        >
          {active && included ? (
            <span style={{ color: "#8E8E93", textDecoration: "line-through", fontSize: 12, fontWeight: 500 }}>
              {fmt(qty * baseRate)}
            </span>
          ) : active && qty > 0 && rate > 0 ? (
            fmt(total)
          ) : (
            <small
              style={{ display: "block", fontSize: 11, fontWeight: 500, color: "#8E8E93" }}
            >
              {baseRate === 0 ? "Included" : `${fmt(baseRate)}/${item.unit}`}
            </small>
          )}
        </span>
      </div>

      {/* Detail row (qty) */}
      {active && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            padding: "0 16px 14px",
            borderTop: "1px dashed rgba(28,28,30,0.16)",
            margin: "0 16px",
            paddingTop: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                flex: 1,
                minWidth: 0,
              }}
            >
              <label
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "#8E8E93",
                  whiteSpace: "nowrap",
                }}
              >
                Qty
              </label>
              <input
                ref={inputRef}
                type="number"
                value={localQty}
                onChange={(e) => {
                  setLocalQty(e.target.value);
                  const v = parseFloat(e.target.value);
                  if (!isNaN(v) && v >= 0) onQtyChange(v);
                }}
                onBlur={() => {
                  const v = parseFloat(localQty);
                  if (isNaN(v) || v < 0) {
                    setLocalQty(String(qty));
                  }
                }}
                style={{
                  height: 36,
                  width: 84,
                  padding: "0 10px",
                  background: "white",
                  border: "1px solid rgba(28,28,30,0.16)",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  fontVariantNumeric: "tabular-nums",
                  textAlign: "center",
                  outline: "none",
                  MozAppearance: "textfield",
                }}
              />
              <span
                style={{ fontSize: 13, fontWeight: 500, color: "#8E8E93" }}
              >
                {item.unit}
              </span>
            </div>

            {/* Line total or Included label */}
            {included ? (
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#239631",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginLeft: "auto",
                }}
              >
                Included
              </span>
            ) : rate > 0 && (
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#239631",
                  fontVariantNumeric: "tabular-nums",
                  marginLeft: "auto",
                }}
              >
                {fmt(qty * rate)}
              </span>
            )}

            {/* Fill area button — m2 only */}
            {item.unit === "m2" && area > 0 && (
              <button
                type="button"
                onClick={onFillArea}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#239631",
                  background: "transparent",
                  border: "1px solid #2DB43D",
                  padding: "6px 10px",
                  borderRadius: 999,
                  cursor: "pointer",
                  transition: "all 180ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                Fill area ({area} m2)
              </button>
            )}
          </div>

          {/* Included toggle */}
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={onToggleIncluded}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 11,
                fontWeight: 600,
                color: included ? "#239631" : "#8E8E93",
                background: included ? "rgba(45,180,61,0.08)" : "transparent",
                border: included ? "1px solid rgba(45,180,61,0.3)" : "1px solid rgba(28,28,30,0.14)",
                padding: "5px 10px",
                borderRadius: 999,
                cursor: "pointer",
                transition: "all 180ms cubic-bezier(0.4,0,0.2,1)",
                letterSpacing: "0.02em",
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: included ? "#2DB43D" : "#C7C7CC",
                  flexShrink: 0,
                  transition: "background 180ms",
                }}
              />
              {included ? "Included (no charge)" : "Mark as included (no charge)"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  step: string;
  eyebrow: string;
  title: string;
  desc?: string;
}

function SectionHeader({ step, eyebrow, title, desc }: SectionHeaderProps) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: 8,
          marginBottom: 4,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
          }}
        >
          {step} · {eyebrow}
        </span>
      </div>
      <h2
        style={{
          fontSize: 22,
          lineHeight: 1.2,
          fontWeight: 760,
          letterSpacing: 0,
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {title}
      </h2>
      {desc && (
        <p
          style={{
            fontSize: 14,
            color: "var(--color-text-muted)",
            marginTop: 6,
            marginBottom: 0,
            maxWidth: "60ch",
          }}
        >
          {desc}
        </p>
      )}
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

function ToggleSwitch({ checked, onChange }: ToggleSwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      style={{
        position: "relative",
        width: 44,
        height: 26,
        background: checked ? "#2DB43D" : "#C7C7CC",
        borderRadius: 999,
        cursor: "pointer",
        flexShrink: 0,
        border: "none",
        padding: 0,
        transition: "background 200ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: 2,
          top: 2,
          width: 22,
          height: 22,
          background: "white",
          borderRadius: "50%",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          transition: "transform 220ms cubic-bezier(0.22,1,0.36,1)",
          transform: checked ? "translateX(18px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

interface SummaryCardProps {
  state: QuoteState;
}

function SummaryCard({ state }: SummaryCardProps) {
  const calc = useMemo(() => calculate(state), [state]);

  if (calc.lines.length === 0) {
    return (
      <div
        style={{
          background: "white",
          border: "1px solid rgba(28,28,30,0.06)",
          borderRadius: 16,
          overflow: "hidden",
          textAlign: "center",
          padding: "36px 24px",
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#FAFAFA",
            color: "#8E8E93",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="3" width="14" height="14" rx="2" />
            <path d="M7 10h6M7 7h6M7 13h4" />
          </svg>
        </div>
        <h4
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: "#1C1C1E",
            margin: "0 0 4px",
          }}
        >
          No items yet
        </h4>
        <p style={{ fontSize: 13, color: "#8E8E93", margin: 0 }}>
          Select an exposure level and smoothness to get started.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "white",
        border: "1px solid rgba(28,28,30,0.06)",
        borderRadius: 16,
        overflow: "hidden",
      }}
    >
      {/* Line items */}
      <div
        style={{
          padding: "4px 0",
          borderBottom: "1px solid rgba(28,28,30,0.08)",
        }}
      >
        {calc.lines.map((line, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 12,
              padding: "10px 18px",
              borderTop: i === 0 ? "none" : "1px solid rgba(28,28,30,0.06)",
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1C1C1E",
                  letterSpacing: "-0.005em",
                }}
              >
                {line.name}
              </div>
              <div
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: "#8E8E93",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  marginTop: 2,
                }}
              >
                {line.category}
              </div>
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#8E8E93",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {line.qty} {line.unit}{line.included ? "" : ` @ ${fmt(line.baseRate ?? line.rate)}`}
            </div>
            <div
              style={{
                fontSize: line.included ? 11 : 14,
                fontWeight: 700,
                color: line.included ? "#239631" : "#1C1C1E",
                fontVariantNumeric: "tabular-nums",
                textAlign: "right",
                letterSpacing: line.included ? "0.04em" : "-0.01em",
                textTransform: line.included ? "uppercase" : undefined,
                whiteSpace: "nowrap",
                minWidth: 78,
                flexShrink: 0,
              }}
            >
              {line.included ? "Included" : fmt(line.total)}
            </div>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ padding: "14px 18px 4px" }}>
        {calc.includedValue > 0 && (
          <TotalsRow
            label="Inclusions (no charge)"
            value={fmt(calc.includedValue)}
            green
          />
        )}
        <TotalsRow label="Subtotal" value={fmt(calc.subtotal)} />
        {calc.cashDiscountAmount > 0 && (
          <TotalsRow
            label="5% Cash Discount"
            value={`−${fmt(calc.cashDiscountAmount)}`}
            green
          />
        )}
        {calc.customAdjust !== 0 && (
          <TotalsRow
            label="Custom Adjustment"
            value={
              (calc.customAdjust > 0 ? "+" : "") + fmt(calc.customAdjust)
            }
          />
        )}
        {calc.gst > 0 && (
          <TotalsRow label="GST (10%)" value={fmt(calc.gst)} divider />
        )}
      </div>

      {/* Grand total */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          padding: "22px 18px 20px",
          background: "linear-gradient(135deg,#1F1F22 0%,#151516 50%,#0E0E10 100%)",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Green hairline top */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(45,180,61,0.6),transparent)",
          }}
        />
        {/* Green glow */}
        <span
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "60%",
            height: "200%",
            background:
              "radial-gradient(ellipse,rgba(45,180,61,0.10),transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#2DB43D",
              marginBottom: 4,
            }}
          >
            {state.cashDiscount ? "Total (cash, GST-free)" : "Total + GST"}
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(calc.grandTotal)}
          </div>
        </div>
      </div>

      {/* Rate bar */}
      {state.area > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px",
            background: "linear-gradient(180deg,#EDF7EE,#E3F2E5)",
            borderTop: "1px solid rgba(45,180,61,0.2)",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#239631",
            }}
          >
            Effective Rate (ex GST)
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: "#1C1C1E",
              letterSpacing: "-0.015em",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {fmt(calc.perM2)}/m2
          </span>
        </div>
      )}
    </div>
  );
}

interface TotalsRowProps {
  label: string;
  value: string;
  green?: boolean;
  divider?: boolean;
}

function TotalsRow({ label, value, green, divider }: TotalsRowProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        padding: "6px 0",
        ...(divider
          ? {
              borderTop: "1px solid rgba(28,28,30,0.08)",
              marginTop: 4,
              paddingTop: 10,
            }
          : {}),
      }}
    >
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#8E8E93",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: green ? "#239631" : "#1C1C1E",
          letterSpacing: "-0.005em",
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Quote Modal ──────────────────────────────────────────────────────────────

interface QuoteModalProps {
  open: boolean;
  onClose: () => void;
  state: QuoteState;
  onPrint: () => void;
}

function QuoteModal({ open, onClose, state, onPrint }: QuoteModalProps) {
  const calc = useMemo(() => calculate(state), [state]);
  const ref = useRef<HTMLDivElement>(null);
  const quoteBodyRef = useRef<HTMLDivElement>(null);
  const [emailStatus, setEmailStatus] = useState<"idle" | "busy" | "done">("idle");

  const handleEmail = useCallback(async () => {
    if (emailStatus === "busy") return;
    setEmailStatus("busy");

    if (!(window as any).html2pdf) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load pdf library"));
        document.head.appendChild(script);
      });
    }

    const safeName = (state.client.name || "client")
      .replace(/[^a-z0-9]+/gi, "_")
      .replace(/^_|_$/g, "") || "client";
    const refNumber = `${state.client.date.replace(/-/g, "").slice(2)}-${
      Math.floor(
        Math.abs(
          (state.client.name + state.client.site).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
        ) % 9000
      ) + 1000
    }`;
    const filename = `PCC-Quote-${refNumber}-${safeName}.pdf`;
    const firstName = state.client.name.split(" ")[0] || "";
    const subject = `Quote — Perth Commercial Flooring${state.client.name ? " — " + state.client.name : ""}`;
    const emailBody = `Hi${firstName ? " " + firstName : ""},\n\nPlease find attached your polished concrete quote.\n\nLet me know if you have any questions or would like to proceed.\n\nKind regards,\nPerth Commercial Flooring`;

    if (!quoteBodyRef.current) { setEmailStatus("idle"); return; }

    // Clone to off-screen container so html2pdf captures full content regardless of scroll state
    const clone = quoteBodyRef.current.cloneNode(true) as HTMLElement;
    clone.style.cssText = "position:fixed;left:-9999px;top:0;width:760px;background:white;";
    document.body.appendChild(clone);

    try {
      const pdfBlob: Blob = await (window as any)
        .html2pdf()
        .set({
          margin: [10, 10, 12, 10],
          filename,
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, backgroundColor: "#ffffff", logging: false },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait", compress: true },
        })
        .from(clone)
        .outputPdf("blob");

      document.body.removeChild(clone);

      const pdfFile = new File([pdfBlob], filename, { type: "application/pdf" });
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile && (navigator as any).canShare?.({ files: [pdfFile] })) {
        await navigator.share({ title: subject, text: emailBody, files: [pdfFile] });
      } else {
        const url = URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 4000);
        const fallback = emailBody + `\n\n[Attach the saved PDF: "${filename}"]`;
        setTimeout(() => {
          window.location.href = `mailto:${encodeURIComponent(state.client.email || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fallback)}`;
        }, 400);
      }

      setEmailStatus("done");
      setTimeout(() => setEmailStatus("idle"), 2500);
    } catch (err: unknown) {
      if (document.body.contains(clone)) document.body.removeChild(clone);
      if ((err as { name?: string })?.name !== "AbortError") {
        console.error(err);
        const fallback = emailBody + "\n\n[Could not attach PDF automatically]";
        window.location.href = `mailto:${encodeURIComponent(state.client.email || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fallback)}`;
      }
      setEmailStatus("idle");
    }
  }, [state, emailStatus]);

  // Close on overlay click
  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onClose();
  }

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        background: "rgba(28,28,30,0.4)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "all" : "none",
        transition: "opacity 280ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Panel */}
      <div
        ref={ref}
        style={{
          width: "100%",
          maxWidth: 760,
          maxHeight: "96vh",
          background: "white",
          borderRadius: "24px 24px 0 0",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          display: "flex",
          flexDirection: "column",
          transform: open ? "translateY(0)" : "translateY(100%)",
          transition: "transform 360ms cubic-bezier(0.22,1,0.36,1)",
        }}
      >
        {/* Handle (mobile) */}
        <div
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 40,
            height: 4,
            background: "rgba(28,28,30,0.16)",
            borderRadius: 999,
          }}
        />

        {/* Header */}
        <div
          style={{
            position: "sticky",
            top: 0,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "16px 20px",
            borderBottom: "1px solid rgba(28,28,30,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            zIndex: 5,
          }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "none",
              background: "#FAFAFA",
              color: "#1C1C1E",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              marginLeft: "auto",
            }}
          >
            �-
          </button>
        </div>

        {/* Body — quote document */}
        <div ref={quoteBodyRef} style={{ padding: "24px 20px", flex: 1, overflowY: "auto" }}>
          <QuoteDocument state={state} calc={calc} />
        </div>

        {/* Footer actions */}
        <div
          style={{
            position: "sticky",
            bottom: 0,
            background: "white",
            borderTop: "1px solid rgba(28,28,30,0.08)",
            padding: "12px 20px",
            display: "flex",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={handleEmail}
            disabled={emailStatus === "busy"}
            style={{
              flex: 1,
              height: 48,
              padding: "0 16px",
              borderRadius: 999,
              background: "white",
              border: "1px solid rgba(28,28,30,0.16)",
              color: "#1C1C1E",
              fontSize: 14,
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: emailStatus === "busy" ? "default" : "pointer",
              opacity: emailStatus === "busy" ? 0.6 : 1,
              transition: "all 180ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            {emailStatus === "busy"
              ? "Preparing…"
              : emailStatus === "done"
              ? "Sent ✓"
              : "Email"}
          </button>
          <button
            type="button"
            onClick={onPrint}
            style={{
              flex: 1,
              height: 48,
              padding: "0 22px",
              borderRadius: 999,
              background:
                "linear-gradient(180deg,#34C947,#2DB43D 50%,#28A437)",
              color: "white",
              border: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.005em",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              cursor: "pointer",
              whiteSpace: "nowrap",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.2) inset, 0 0 0 1px rgba(45,180,61,0.4), 0 4px 12px rgba(45,180,61,0.3)",
              transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            Print / PDF
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Quote Document (modal body) ─────────────────────────────────────────────

interface QuoteDocumentProps {
  state: QuoteState;
  calc: ReturnType<typeof calculate>;
}

function QuoteDocument({ state, calc }: QuoteDocumentProps) {
  const refNum = `PCC-${state.client.date.replace(/-/g, "").slice(2)}-${Math.floor(
    Math.abs(
      (state.client.name + state.client.site).split("").reduce((a, c) => a + c.charCodeAt(0), 0)
    ) % 9000
  ) + 1000}`;

  return (
    <div style={{ background: "white", fontSize: 13, color: "#1C1C1E" }}>
      {/* Banner */}
      <div
        style={{
          background: "#151516",
          color: "white",
          padding: 20,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 3,
            background: "#2DB43D",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 8,
              background: "#2DB43D",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: "monospace",
                fontSize: 20,
                fontWeight: 700,
                color: "#151516",
                lineHeight: 1,
              }}
            >
              P
            </span>
          </div>
          <div>
            <div
              style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em" }}
            >
              Perth Commercial Flooring
            </div>
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: "#2DB43D",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              Quote #{refNum}
            </div>
          </div>
        </div>
        <div
          style={{
            textAlign: "right",
            fontSize: 10,
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.5,
          }}
        >
          <div>{PHONE_DISPLAY}</div>
          <div>{EMAIL}</div>
          <div>perthcommercialfloors.com.au</div>
        </div>
      </div>

      {/* Meta grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px 20px",
          marginBottom: 24,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(28,28,30,0.08)",
        }}
      >
        {[
          { label: "Client", value: state.client.name || "—" },
          { label: "Date", value: state.client.date || "—" },
          { label: "Site", value: state.client.site || "—" },
          {
            label: "Contact",
            value:
              [state.client.phone, state.client.email]
                .filter(Boolean)
                .join(" · ") || "—",
          },
          {
            label: "Floor Area",
            value: state.area > 0 ? `${state.area} m2` : "—",
          },
          {
            label: "Pricing Tier",
            value: state.mode.charAt(0).toUpperCase() + state.mode.slice(1),
          },
        ].map(({ label, value }) => (
          <div key={label}>
            <small
              style={{
                display: "block",
                fontSize: 9,
                fontWeight: 700,
                color: "#8E8E93",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              {label}
            </small>
            <div
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#1C1C1E",
                letterSpacing: "-0.005em",
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </div>

      {/* Items heading */}
      <div
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#2DB43D",
          marginBottom: 12,
        }}
      >
        Itemised Breakdown
      </div>

      {/* Items table */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: 24,
        }}
      >
        <thead>
          <tr>
            {["Item", "Qty", "Rate", "Total"].map((h) => (
              <th
                key={h}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#8E8E93",
                  textAlign: h === "Item" ? "left" : "right",
                  padding: "8px 4px",
                  borderBottom: "1px solid rgba(28,28,30,0.16)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {calc.lines.map((line, i) => (
            <tr key={i}>
              <td
                style={{
                  padding: "10px 4px",
                  borderBottom: "1px solid rgba(28,28,30,0.06)",
                  verticalAlign: "top",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    fontSize: 13,
                  }}
                >
                  {line.name}
                  {line.included && (
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#239631",
                        background: "#EDF7EE",
                        border: "1px solid rgba(45,180,61,0.3)",
                        borderRadius: 3,
                        padding: "1px 5px",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        flexShrink: 0,
                      }}
                    >
                      Included
                    </span>
                  )}
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "#8E8E93",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginTop: 2,
                  }}
                >
                  {line.category}
                </div>
              </td>
              <td
                style={{
                  padding: "10px 4px",
                  borderBottom: "1px solid rgba(28,28,30,0.06)",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 13,
                }}
              >
                {line.qty} {line.unit}
              </td>
              <td
                style={{
                  padding: "10px 4px",
                  borderBottom: "1px solid rgba(28,28,30,0.06)",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontSize: 13,
                }}
              >
                {fmt(line.baseRate ?? line.rate)}
              </td>
              <td
                style={{
                  padding: "10px 4px",
                  borderBottom: "1px solid rgba(28,28,30,0.06)",
                  textAlign: "right",
                  fontVariantNumeric: "tabular-nums",
                  fontWeight: 700,
                  fontSize: 13,
                  color: line.included ? "#239631" : undefined,
                }}
              >
                {line.included ? "Included" : fmt(line.total)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div
        style={{
          borderTop: "1.5px solid #151516",
          padding: "16px 0",
          marginBottom: 16,
        }}
      >
        {[
          ...(calc.includedValue > 0
            ? [{ label: "Inclusions (no charge)", value: fmt(calc.includedValue), green: true }]
            : []),
          { label: "Subtotal", value: fmt(calc.subtotal), green: false },
          ...(calc.cashDiscountAmount > 0
            ? [
                {
                  label: "5% Cash Discount",
                  value: `−${fmt(calc.cashDiscountAmount)}`,
                  green: true,
                },
              ]
            : []),
          ...(calc.customAdjust !== 0
            ? [
                {
                  label: "Custom Adjustment",
                  value:
                    (calc.customAdjust > 0 ? "+" : "") +
                    fmt(calc.customAdjust),
                  green: false,
                },
              ]
            : []),
          ...(calc.gst > 0 ? [{ label: "GST (10%)", value: fmt(calc.gst), green: false }] : []),
        ].map(({ label, value, green }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              padding: "6px 0",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "#8E8E93",
              }}
            >
              {label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: green ? "#239631" : undefined }}>{value}</span>
          </div>
        ))}

        {/* Grand total row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "12px 0",
            marginTop: 8,
            borderTop: "1px solid rgba(28,28,30,0.16)",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#1C1C1E",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {state.cashDiscount ? "Total (cash, GST-free)" : "Total + GST"}
          </span>
          <span
            style={{
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.025em",
            }}
          >
            {fmt(calc.grandTotal)}
          </span>
        </div>
      </div>

      {/* Rate bar */}
      {state.area > 0 && (
        <div
          style={{
            background: "#EDF7EE",
            border: "1px solid rgba(45,180,61,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#239631",
            }}
          >
            Effective Rate (ex GST)
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#1C1C1E",
              fontVariantNumeric: "tabular-nums",
              letterSpacing: "-0.02em",
            }}
          >
            {fmt(calc.perM2)}/m2
          </span>
        </div>
      )}

      {/* Standard quote notes */}
      <div
        style={{
          fontSize: 12,
          color: "#8E8E93",
          lineHeight: 1.5,
          padding: 14,
          background: "#FAFAFA",
          borderRadius: 12,
          marginBottom: 8,
        }}
      >
        <strong style={{ color: "#1C1C1E" }}>Quote validity:</strong> 30 days from issue.
        <br />
        <strong style={{ color: "#1C1C1E" }}>Site conditions:</strong> Pricing assumes adequate power, water access, and a cleared work area. Variations may apply if conditions differ on commencement.
        <br />
        <strong style={{ color: "#1C1C1E" }}>Payment terms:</strong> 30% deposit on acceptance, balance on completion. {state.cashDiscount ? "5% cash discount applied." : "Cash payment qualifies for 5% discount."}
      </div>

      {/* Signature block */}
      <div style={{ marginTop: 24, marginBottom: 8 }}>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#1C1C1E",
            marginBottom: 8,
            paddingBottom: 4,
            borderBottom: "1px solid rgba(28,28,30,0.16)",
          }}
        >
          Acceptance
        </div>
        <p style={{ fontSize: 11, color: "#8E8E93", marginBottom: 16, lineHeight: 1.5 }}>
          By signing below, I accept this quote and authorize Perth Commercial Flooring to proceed with the works described per the terms above. A 30% deposit is required to schedule the job.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {["Client Signature", "Print Name", "Date"].map((label) => (
            <div key={label}>
              <div
                style={{
                  height: 48,
                  borderBottom: "1.5px solid #1C1C1E",
                  marginBottom: 6,
                }}
              />
              <div style={{ fontSize: 10, fontWeight: 600, color: "#8E8E93", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div
        style={{
          fontSize: 10,
          color: "#8E8E93",
          textAlign: "center",
          marginTop: 16,
          lineHeight: 1.5,
        }}
      >
        Perth Commercial Flooring · ABN 63 775 263 307 · perthcommercialfloors.com.au · 0448 483 226
        <br />
        This quote is generated on-site and remains an estimate until formally issued and accepted.
      </div>
    </div>
  );
}

// ─── Print helpers ────────────────────────────────────────────────────────────

function buildPrintHtml(state: QuoteState): string {
  const calc = calculate(state);
  const refNum = `PCC-${state.client.date.replace(/-/g, "").slice(2)}-${
    Math.floor(
      Math.abs(
        (state.client.name + state.client.site)
          .split("")
          .reduce((a, c) => a + c.charCodeAt(0), 0)
      ) % 9000
    ) + 1000
  }`;

  const linesHtml = calc.lines
    .map(
      (l) => `
    <tr>
      <td class="item">
        <div class="name">${l.name}${l.included ? ' <span class="inc-badge">Included</span>' : ""}</div>
        <div class="cat">${l.category}</div>
      </td>
      <td class="right">${l.qty} ${l.unit}</td>
      <td class="right">${fmt(l.baseRate ?? l.rate)}</td>
      <td class="right total${l.included ? " inc-total" : ""}">${l.included ? "Included" : fmt(l.total)}</td>
    </tr>`
    )
    .join("");

  const discountRow =
    calc.cashDiscountAmount > 0
      ? `<tr><td>5% Cash Discount</td><td></td><td></td><td class="right">−${fmt(calc.cashDiscountAmount)}</td></tr>`
      : "";
  const adjustRow =
    calc.customAdjust !== 0
      ? `<tr><td>Custom Adjustment</td><td></td><td></td><td class="right">${(calc.customAdjust > 0 ? "+" : "") + fmt(calc.customAdjust)}</td></tr>`
      : "";
  const inclusionsRow =
    calc.includedValue > 0
      ? `<div class="totals-row inc-row"><span class="label">Inclusions (no charge)</span><span>${fmt(calc.includedValue)}</span></div>`
      : "";
  const rateRow =
    state.area > 0
      ? `<div class="rate-bar"><span class="label">Effective Rate (ex GST)</span><span class="val">${fmt(calc.perM2)}/m2</span></div>`
      : "";
  const notesHtml = `<div class="notes">
    <strong>Quote validity:</strong> 30 days from issue.<br>
    <strong>Site conditions:</strong> Pricing assumes adequate power, water access, and a cleared work area. Variations may apply if conditions differ on commencement.<br>
    <strong>Payment terms:</strong> 30% deposit on acceptance, balance on completion. ${state.cashDiscount ? "5% cash discount applied." : "Cash payment qualifies for 5% discount."}${state.notes ? `<br><strong>Notes:</strong> ${state.notes}` : ""}
  </div>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Quote ${refNum} — Perth Commercial Flooring</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
@page { size: A4 portrait; margin: 14mm 14mm 16mm; }
*, *::before, *::after { box-sizing: border-box; }
body {
  font-family: 'Inter', -apple-system, system-ui, sans-serif;
  font-size: 10pt; line-height: 1.45; color: #1A1A1A;
  background: white; margin: 0; padding: 0;
  -webkit-print-color-adjust: exact; print-color-adjust: exact; color-adjust: exact;
}
.banner {
  background: #151516; color: white; padding: 14pt 16pt;
  border-radius: 6pt; display: flex; align-items: center;
  justify-content: space-between; gap: 12pt; margin-bottom: 18pt;
  position: relative; overflow: hidden;
}
.banner::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3pt; background:#2DB43D; }
.brand { display: flex; align-items: center; gap: 10pt; flex:1; min-width:0; }
.brand-mark {
  width: 36pt; height: 36pt; border-radius: 6pt; background: #2DB43D;
  display: flex; align-items: center; justify-content: center; flex-shrink:0;
}
.brand-mark span { font-family: monospace; font-size: 16pt; font-weight: 700; color: #151516; line-height: 1; }
.brand-name { font-size: 13pt; font-weight: 700; letter-spacing: -0.01em; }
.brand-ref { font-size: 7pt; font-weight: 600; color: #2DB43D; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2pt; }
.contact-info { text-align: right; font-size: 8pt; color: rgba(255,255,255,0.7); line-height: 1.5; }
.meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12pt 18pt; margin-bottom: 18pt; padding-bottom: 14pt; border-bottom: 0.6pt solid #DDD; }
.meta-grid div small { display: block; font-size: 7pt; font-weight: 700; color: #777; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 2pt; }
.meta-grid div .val { font-size: 11pt; font-weight: 600; color: #1A1A1A; }
h4 { font-size: 8pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #1A1A1A; margin: 0 0 8pt; padding-bottom: 3pt; border-bottom: 0.6pt solid #1A1A1A; }
table { width: 100%; border-collapse: collapse; margin-bottom: 0; }
th { font-size: 8pt; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #555; padding: 4pt; border-bottom: 0.6pt solid #999; }
th:not(:first-child) { text-align: right; }
td { font-size: 9pt; padding: 6pt 4pt; border-bottom: 0.4pt solid #DDD; vertical-align: top; }
td.right { text-align: right; font-variant-numeric: tabular-nums; }
td.item .name { font-weight: 600; color: #1A1A1A; font-size: 9.5pt; }
td.item .cat { font-size: 7pt; color: #777; letter-spacing: 0.04em; text-transform: uppercase; font-weight: 600; margin-top: 1.5pt; }
td.total { font-weight: 700; }
.totals { border-top: 1.2pt solid #1A1A1A; padding: 8pt 0 0; margin-top: 6pt; page-break-inside: avoid; }
.totals-row { display: flex; justify-content: space-between; align-items: baseline; padding: 3pt 4pt; font-size: 9pt; font-variant-numeric: tabular-nums; }
.totals-row .label { color: #777; font-weight: 600; font-size: 8pt; letter-spacing: 0.04em; text-transform: uppercase; }
.totals-row.grand { font-size: 18pt; font-weight: 800; letter-spacing: -0.02em; border-top: 0.6pt solid #DDD; margin-top: 6pt; padding-top: 8pt; }
.totals-row.grand .label { font-size: 9pt; color: #1A1A1A; }
.rate-bar { display: flex; justify-content: space-between; align-items: center; background: #EDF7EE; border: 0.5pt solid rgba(45,180,61,0.4); border-radius: 6pt; padding: 8pt 10pt; margin-top: 12pt; margin-bottom: 10pt; }
.rate-bar .label { font-size: 8pt; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #239631; }
.rate-bar .val { font-size: 14pt; font-weight: 700; color: #1A1A1A; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
.notes { font-size: 8.5pt; color: #555; line-height: 1.5; padding: 10pt; background: #FAFAFA; border-radius: 5pt; margin-bottom: 6pt; }
.notes strong { color: #1A1A1A; display: block; margin-bottom: 3pt; }
.disclaimer { font-size: 7.5pt; color: #999; text-align: center; margin-top: 12pt; line-height: 1.5; }
.inc-badge { display: inline-block; font-size: 6.5pt; font-weight: 700; color: #239631; background: #EDF7EE; border: 0.5pt solid rgba(45,180,61,0.4); border-radius: 3pt; padding: 1pt 4pt; letter-spacing: 0.06em; text-transform: uppercase; vertical-align: middle; margin-left: 4pt; }
.inc-total { color: #239631; }
.inc-row span:last-child { color: #239631; font-weight: 700; }
.subtotal-net { display: none; }
.signature-block { margin-top: 20pt; padding-top: 14pt; border-top: 0.6pt solid #DDD; page-break-inside: avoid; }
.sig-heading { font-size: 8pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #1A1A1A; margin: 0 0 6pt; padding-bottom: 3pt; border-bottom: 0.6pt solid #1A1A1A; }
.sig-intro { font-size: 8pt; color: #555; line-height: 1.5; margin: 0 0 14pt; }
.sig-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16pt; }
.sig-line { height: 36pt; border-bottom: 1.2pt solid #1A1A1A; margin-bottom: 4pt; }
.sig-label { font-size: 7pt; font-weight: 700; color: #777; letter-spacing: 0.08em; text-transform: uppercase; }
</style>
</head>
<body>
<div class="banner">
  <div class="brand">
    <div class="brand-mark"><span>P</span></div>
    <div>
      <div class="brand-name">Perth Commercial Flooring</div>
      <div class="brand-ref">Quote #${refNum}</div>
    </div>
  </div>
  <div class="contact-info">
    <div>${PHONE_DISPLAY}</div>
    <div>${EMAIL}</div>
    <div>perthcommercialfloors.com.au</div>
  </div>
</div>

<div class="meta-grid">
  <div><small>Client</small><div class="val">${state.client.name || "—"}</div></div>
  <div><small>Date</small><div class="val">${state.client.date || "—"}</div></div>
  <div><small>Site / Address</small><div class="val">${state.client.site || "—"}</div></div>
  <div><small>Contact</small><div class="val">${[state.client.phone, state.client.email].filter(Boolean).join(" · ") || "—"}</div></div>
  <div><small>Floor Area</small><div class="val">${state.area > 0 ? state.area + " m2" : "—"}</div></div>
  <div><small>Pricing Tier</small><div class="val">${state.mode.charAt(0).toUpperCase() + state.mode.slice(1)}</div></div>
</div>

<h4>Itemised Breakdown</h4>
<table>
  <thead>
    <tr>
      <th style="text-align:left">Item</th>
      <th>Qty</th>
      <th>Rate</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    ${linesHtml}
  </tbody>
</table>

<div class="totals">
  ${inclusionsRow}
  <div class="totals-row"><span class="label">Subtotal</span><span>${fmt(calc.subtotal)}</span></div>
  ${discountRow ? `<div class="totals-row"><span class="label">5% Cash Discount</span><span>−${fmt(calc.cashDiscountAmount)}</span></div>` : ""}
  ${adjustRow ? `<div class="totals-row"><span class="label">Custom Adjustment</span><span>${(calc.customAdjust > 0 ? "+" : "") + fmt(calc.customAdjust)}</span></div>` : ""}
  ${calc.gst > 0 ? `<div class="totals-row"><span class="label">GST (10%)</span><span>${fmt(calc.gst)}</span></div>` : ""}
  <div class="totals-row grand"><span class="label">${state.cashDiscount ? "Total (cash, GST-free)" : "Total + GST"}</span><span>${fmt(calc.grandTotal)}</span></div>
</div>

${rateRow}
${notesHtml}

<div class="signature-block">
  <h4 class="sig-heading">Acceptance</h4>
  <p class="sig-intro">By signing below, I accept this quote and authorize Perth Commercial Flooring to proceed with the works described per the terms above. A 30% deposit is required to schedule the job.</p>
  <div class="sig-grid">
    <div><div class="sig-line"></div><div class="sig-label">Client Signature</div></div>
    <div><div class="sig-line"></div><div class="sig-label">Print Name</div></div>
    <div><div class="sig-line"></div><div class="sig-label">Date</div></div>
  </div>
</div>

<div class="disclaimer">
  This estimate is indicative only and subject to site inspection.<br>
  Prices exclude GST unless stated. Final quote may vary based on slab condition, access and scope confirmation.<br>
  Valid for 30 days from date of issue. Perth Commercial Flooring — ABN on invoice.
</div>
</body>
</html>`;
}

function buildCopyText(state: QuoteState): string {
  const calc = calculate(state);
  const lines = [
    "Perth Commercial Flooring — QUOTE",
    "",
    `Client: ${state.client.name || "—"}`,
    `Site: ${state.client.site || "—"}`,
    `Date: ${state.client.date}`,
    `Area: ${state.area} m2`,
    `Pricing tier: ${state.mode.toUpperCase()}`,
    "",
    "--- ITEMS ---",
    ...calc.lines.map(
      (l) =>
        l.included
          ? `${l.name} — ${l.qty} ${l.unit} @ ${fmt(l.baseRate ?? l.rate)} = Included (no charge)`
          : `${l.name} — ${l.qty} ${l.unit} @ ${fmt(l.baseRate ?? l.rate)} = ${fmt(l.total)}`
    ),
    "",
    `Subtotal: ${fmt(calc.subtotal)}`,
  ];

  if (calc.cashDiscountAmount > 0)
    lines.push(`5% cash discount: −${fmt(calc.cashDiscountAmount)}`);
  if (calc.customAdjust !== 0)
    lines.push(
      `Adjustment: ${(calc.customAdjust > 0 ? "+" : "") + fmt(calc.customAdjust)}`
    );

  if (calc.gst > 0) lines.push(`GST (10%): ${fmt(calc.gst)}`);
  lines.push(`${state.cashDiscount ? "TOTAL (CASH, GST-FREE)" : "TOTAL + GST"}: ${fmt(calc.grandTotal)}`);

  if (state.area > 0)
    lines.push(`Effective rate (ex GST): ${fmt(calc.perM2)}/m2`);

  return lines.join("\n");
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function QuoteCalculator() {
  const [state, setState] = useState<QuoteState>(makeInitial);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved) as Partial<QuoteState>;
        setState({
          ...makeInitial(),
          ...p,
          client: { ...makeInitial().client, ...(p.client ?? {}) },
          selections: p.selections ?? {},
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state, mounted]);

  // Lock scroll during modal
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = previous || "";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [showModal]);

  const calc = useMemo(() => calculate(state), [state]);

  // ── Callbacks ───────────────────────────────────────────────────────────────

  const setClient = useCallback(
    (key: keyof QuoteState["client"], val: string) => {
      setState((s) => ({ ...s, client: { ...s.client, [key]: val } }));
    },
    []
  );

  const setArea = useCallback((val: number) => {
    setState((s) => {
      // Update auto-tracked selections
      const newSelections = { ...s.selections };
      for (const [id, sel] of Object.entries(newSelections)) {
        if (sel.auto) {
          newSelections[id] = { qty: val, auto: true };
        }
      }
      return { ...s, area: val, selections: newSelections };
    });
  }, []);

  const setMode = useCallback((mode: Mode) => {
    setState((s) => ({ ...s, mode }));
  }, []);

  const toggleExposure = useCallback((id: string) => {
    setState((s) => ({ ...s, exposure: s.exposure === id ? null : id }));
  }, []);

  const toggleGrit = useCallback((id: string) => {
    setState((s) => ({ ...s, grit: s.grit === id ? null : id }));
  }, []);

  const toggleLineItem = useCallback((itemId: string, category: string) => {
    setState((s) => {
      const newSels = { ...s.selections };
      if (newSels[itemId]) {
        delete newSels[itemId];
      } else {
        const found = findItem(itemId);
        if (!found) return s;
        const isAuto = AUTO_CATEGORIES.includes(category);
        newSels[itemId] = {
          qty: defaultQty(found.item, s.area),
          auto: isAuto,
        };
      }
      return { ...s, selections: newSels };
    });
  }, []);

  const setQty = useCallback((itemId: string, val: number) => {
    setState((s) => {
      if (!s.selections[itemId]) return s;
      return {
        ...s,
        selections: {
          ...s.selections,
          [itemId]: { ...s.selections[itemId], qty: val, auto: false },
        },
      };
    });
  }, []);

  const fillArea = useCallback((itemId: string, category: string) => {
    setState((s) => {
      if (!s.selections[itemId]) return s;
      const isAuto = AUTO_CATEGORIES.includes(category);
      return {
        ...s,
        selections: {
          ...s.selections,
          [itemId]: { ...s.selections[itemId], qty: s.area, auto: isAuto },
        },
      };
    });
  }, []);

  const toggleIncluded = useCallback((itemId: string) => {
    setState((s) => {
      if (!s.selections[itemId]) return s;
      return {
        ...s,
        selections: {
          ...s.selections,
          [itemId]: { ...s.selections[itemId], included: !s.selections[itemId].included },
        },
      };
    });
  }, []);

  const toggleCashDiscount = useCallback(() => {
    setState((s) => ({ ...s, cashDiscount: !s.cashDiscount }));
  }, []);

  const setCustomAdjust = useCallback((val: number) => {
    setState((s) => ({ ...s, customAdjust: val }));
  }, []);

  const setNotes = useCallback((val: string) => {
    setState((s) => ({ ...s, notes: val }));
  }, []);

  const handleNewQuote = useCallback(() => {
    if (confirm("Start a new quote? This will clear all current data.")) {
      setState(makeInitial());
    }
  }, []);

  const handlePrint = useCallback(() => {
    const html = buildPrintHtml(state);
    const win = window.open("", "_blank");
    if (!win) return;
    win.document.write(html);
    win.document.close();
    win.focus();
    setTimeout(() => win.print(), 600);
  }, [state]);

  // ── Render ──────────────────────────────────────────────────────────────────

  const sectionStyle: React.CSSProperties = { marginBottom: 28 };

  return (
    <div
      style={{
        background: "var(--color-bone)",
        minHeight: "100vh",
        paddingBottom: 120,
      }}
    >
      <div
        style={{
          maxWidth: 920,
          margin: "0 auto",
          padding: "calc(var(--nav-h) + 32px) 24px 32px",
        }}
      >
        {/* ── Tool Header ─────────────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--color-text-muted)",
                marginBottom: 2,
              }}
            >
              Perth Commercial Flooring
            </div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 0,
                color: "var(--color-text-primary)",
                margin: 0,
                lineHeight: 1.1,
              }}
            >
              Quote Calculator
            </h1>
          </div>
          <button
            type="button"
            onClick={handleNewQuote}
            style={{
              height: 36,
              padding: "0 14px",
              borderRadius: 0,
              background: "transparent",
              border: "1px solid var(--hairline-strong)",
              color: "var(--color-text-primary)",
              fontSize: 13,
              fontWeight: 500,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              boxShadow: "none",
              flexShrink: 0,
            }}
          >
            + New
          </button>
        </div>

        {/* ── Step 1: Job Details ──────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 1"
            eyebrow="Job Details"
            title="Client & Site"
            desc="Fill in the job details for the quote document."
          />
          <div style={cardStyle}>
            <div style={{ padding: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: 12,
                }}
              >
                <Field label="Client Name">
                  <StyledInput
                    type="text"
                    placeholder="e.g. Sarah Johnson"
                    value={state.client.name}
                    onChange={(e) => setClient("name", e.target.value)}
                  />
                </Field>
                <Field label="Quote Date">
                  <StyledInput
                    type="date"
                    value={state.client.date}
                    onChange={(e) => setClient("date", e.target.value)}
                  />
                </Field>
                <Field label="Site / Address" fullWidth>
                  <StyledInput
                    type="text"
                    placeholder="e.g. 42 Smith St, Subiaco WA 6008"
                    value={state.client.site}
                    onChange={(e) => setClient("site", e.target.value)}
                  />
                </Field>
                <Field label="Phone">
                  <StyledInput
                    type="tel"
                    placeholder="04xx xxx xxx"
                    value={state.client.phone}
                    onChange={(e) => setClient("phone", e.target.value)}
                  />
                </Field>
                <Field label="Email">
                  <StyledInput
                    type="email"
                    placeholder="client@email.com"
                    value={state.client.email}
                    onChange={(e) => setClient("email", e.target.value)}
                  />
                </Field>
                {/* Floor Area — full width, large */}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={fieldLabelStyle}>Floor Area</label>
                  <div style={{ position: "relative" }}>
                    <StyledInput
                      type="number"
                      min={0}
                      placeholder="0"
                      value={state.area === 0 ? "" : String(state.area)}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setArea(isNaN(v) ? 0 : v);
                      }}
                      extraStyle={{
                        height: 64,
                        fontSize: 28,
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        fontVariantNumeric: "tabular-nums",
                        paddingRight: 48,
                      }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#8E8E93",
                        pointerEvents: "none",
                      }}
                    >
                      m2
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Step 2: Pricing Mode ─────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 2"
            eyebrow="Pricing Mode"
            title="Quote Tier"
            desc="Select your pricing confidence. Low = best case. High = conservative contingency."
          />
          <div style={cardStyle}>
            <div style={{ padding: 16 }}>
              <SegmentedControl value={state.mode} onChange={setMode} />
            </div>
          </div>
        </section>

        {/* ── Step 3: Exposure ─────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 3"
            eyebrow="Look"
            title="Exposure Level"
            desc="How much aggregate is revealed through the grind. Affects base cost and aesthetics."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PRICING.exposure.map((item) => (
              <SelectCard
                key={item.id}
                item={item}
                selected={state.exposure === item.id}
                mode={state.mode}
                onToggle={() => toggleExposure(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 4: Grit / Smoothness ────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 4"
            eyebrow="Feel"
            title="Smoothness"
            desc="The polishing sequence determines sheen level. Higher grit = more reflection."
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PRICING.grit.map((item) => (
              <SelectCard
                key={item.id}
                item={item}
                selected={state.grit === item.id}
                mode={state.mode}
                onToggle={() => toggleGrit(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 5: Grouting ──────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 5"
            eyebrow="Surface"
            title="Grout"
            desc="Grouting fills pinholes and surface voids. Recommended for high-polish finishes."
          />
          <div style={cardStyle}>
            {PRICING.grouting.map((item, i) => (
              <LineItem
                key={item.id}
                item={item}
                category="grouting"
                active={!!state.selections[item.id]}
                included={!!state.selections[item.id]?.included}
                qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                area={state.area}
                mode={state.mode}
                isFirst={i === 0}
                onToggle={() => toggleLineItem(item.id, "grouting")}
                onQtyChange={(v) => setQty(item.id, v)}
                onFillArea={() => fillArea(item.id, "grouting")}
                onToggleIncluded={() => toggleIncluded(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 6: Densifier ────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 6"
            eyebrow="Hardener"
            title="Densifier"
            desc="Chemically hardens the concrete for durability and improved polish retention."
          />
          <div style={cardStyle}>
            {PRICING.densifier.map((item, i) => (
              <LineItem
                key={item.id}
                item={item}
                category="densifier"
                active={!!state.selections[item.id]}
                included={!!state.selections[item.id]?.included}
                qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                area={state.area}
                mode={state.mode}
                isFirst={i === 0}
                onToggle={() => toggleLineItem(item.id, "densifier")}
                onQtyChange={(v) => setQty(item.id, v)}
                onFillArea={() => fillArea(item.id, "densifier")}
                onToggleIncluded={() => toggleIncluded(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 7: Sealer ───────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 7"
            eyebrow="Protection"
            title="Sealer"
            desc="Topical or penetrating sealers protect the finished floor and affect sheen."
          />
          <div style={cardStyle}>
            {PRICING.sealers.map((item, i) => (
              <LineItem
                key={item.id}
                item={item}
                category="sealers"
                active={!!state.selections[item.id]}
                included={!!state.selections[item.id]?.included}
                qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                area={state.area}
                mode={state.mode}
                isFirst={i === 0}
                onToggle={() => toggleLineItem(item.id, "sealers")}
                onQtyChange={(v) => setQty(item.id, v)}
                onFillArea={() => fillArea(item.id, "sealers")}
                onToggleIncluded={() => toggleIncluded(item.id)}
              />
            ))}
          </div>
        </section>

        {/* ── Step 8: Slab Condition / Repairs ─────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 8"
            eyebrow="Slab Condition"
            title="Repairs"
          />

          {/* Prep */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Prep &amp; Levelling
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.prep.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="prep"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "prep")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "prep")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Cracks */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Crack Repair
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.cracks.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="cracks"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "cracks")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "cracks")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Patching */}
          <div>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Patching
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.patching.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="patching"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "patching")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "patching")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Step 9: Site Extras ───────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Step 9"
            eyebrow="Site Extras"
            title="Other Charges"
          />

          {/* Site Logistics */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Site Logistics
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.other.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="other"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "other")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "other")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Travel */}
          <div style={{ marginBottom: 18 }}>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Travel
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.travel.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="travel"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "travel")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "travel")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Dust Removal */}
          <div>
            <div style={{ marginBottom: 8 }}>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#8E8E93",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Dust Removal
              </span>
            </div>
            <div style={cardStyle}>
              {PRICING.dustRemoval.map((item, i) => (
                <LineItem
                  key={item.id}
                  item={item}
                  category="dustRemoval"
                  active={!!state.selections[item.id]}
                  included={!!state.selections[item.id]?.included}
                  qty={state.selections[item.id]?.qty ?? defaultQty(item, state.area)}
                  area={state.area}
                  mode={state.mode}
                  isFirst={i === 0}
                  onToggle={() => toggleLineItem(item.id, "dustRemoval")}
                  onQtyChange={(v) => setQty(item.id, v)}
                  onFillArea={() => fillArea(item.id, "dustRemoval")}
                  onToggleIncluded={() => toggleIncluded(item.id)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Final: Adjustments ────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Final"
            eyebrow="Adjustments"
            title="Discounts &amp; Notes"
          />
          <div style={cardStyle}>
            {/* Cash discount toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    letterSpacing: "-0.01em",
                  }}
                >
                  5% Cash Discount
                </div>
                <div style={{ fontSize: 12, color: "#8E8E93", marginTop: 2 }}>
                  Applied to subtotal before GST
                </div>
              </div>
              <ToggleSwitch
                checked={state.cashDiscount}
                onChange={toggleCashDiscount}
              />
            </div>

            {/* Custom adjustment */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "14px 16px",
                borderTop: "1px solid rgba(28,28,30,0.08)",
              }}
            >
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    letterSpacing: "-0.01em",
                    marginBottom: 2,
                  }}
                >
                  Custom Adjustment
                </div>
                <div style={{ fontSize: 12, color: "#8E8E93" }}>
                  Positive adds, negative subtracts
                </div>
              </div>
              <div style={{ position: "relative", flexShrink: 0 }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#8E8E93",
                    pointerEvents: "none",
                  }}
                >
                  $
                </span>
                <StyledInput
                  type="number"
                  placeholder="0"
                  value={state.customAdjust === 0 ? "" : String(state.customAdjust)}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setCustomAdjust(isNaN(v) ? 0 : v);
                  }}
                  extraStyle={{
                    width: 120,
                    paddingLeft: 24,
                    fontVariantNumeric: "tabular-nums",
                  }}
                />
              </div>
            </div>

            {/* Notes */}
            <div
              style={{
                padding: "14px 16px",
                borderTop: "1px solid rgba(28,28,30,0.08)",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1C1C1E",
                    letterSpacing: "-0.01em",
                    marginBottom: 2,
                  }}
                >
                  Internal notes
                </div>
                <div style={{ fontSize: 12, color: "#8E8E93" }}>
                  Won&apos;t appear on the customer quote
                </div>
              </div>
              <textarea
                rows={3}
                placeholder="Site observations, slab condition, things to remember..."
                value={state.notes}
                onChange={(e) => setNotes(e.target.value)}
                style={{
                  ...inputStyle,
                  height: "auto",
                  minHeight: 80,
                  padding: "12px 14px",
                  resize: "vertical",
                  lineHeight: 1.5,
                }}
              />
            </div>
          </div>
        </section>

        {/* ── Summary ───────────────────────────────────────────── */}
        <section style={sectionStyle}>
          <SectionHeader
            step="Summary"
            eyebrow="Quote Total"
            title="Breakdown"
          />
          <SummaryCard state={state} />
        </section>
      </div>

      {/* ── Sticky Total Bar ────────────────────────────────────── */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          background: "linear-gradient(180deg,#1F1F22,#131315)",
          color: "white",
          padding: "14px 16px",
        }}
      >
        {/* Green hairline */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background:
              "linear-gradient(90deg,transparent,rgba(45,180,61,0.5),transparent)",
          }}
        />

        <div
          style={{
            maxWidth: 760,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#2DB43D",
                marginBottom: 2,
              }}
            >
              {state.cashDiscount ? "Total (cash)" : "Total + GST"}
            </div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: "-0.025em",
                fontVariantNumeric: "tabular-nums",
                lineHeight: 1,
              }}
            >
              {fmt(calc.grandTotal)}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.6)",
                marginTop: 4,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {calc.lines.length > 0
                ? `${calc.lines.length} line${calc.lines.length !== 1 ? "s" : ""}${
                    state.area > 0
                      ? ` · ${fmt(calc.perM2)}/m2 ex GST`
                      : ""
                  }`
                : "No items selected"}
            </div>
          </div>

          {/* View Quote button */}
          <button
            type="button"
            onClick={() => setShowModal(true)}
            disabled={calc.lines.length === 0 || state.area === 0}
            style={{
              height: 48,
              padding: "0 22px",
              borderRadius: 999,
              background:
                "linear-gradient(180deg,#34C947,#2DB43D 50%,#28A437)",
              color: "white",
              border: "none",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "-0.005em",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              cursor:
                calc.lines.length === 0 || state.area === 0
                  ? "not-allowed"
                  : "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              opacity: calc.lines.length === 0 || state.area === 0 ? 0.4 : 1,
              boxShadow:
                calc.lines.length === 0 || state.area === 0
                  ? "none"
                  : "0 1px 0 rgba(255,255,255,0.2) inset, 0 0 0 1px rgba(45,180,61,0.4), 0 4px 12px rgba(45,180,61,0.3)",
              transition: "all 200ms cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            View Quote
          </button>
        </div>
      </div>

      {/* ── Quote Modal ──────────────────────────────────────────── */}
      <QuoteModal
        open={showModal}
        onClose={() => setShowModal(false)}
        state={state}
        onPrint={handlePrint}
      />
    </div>
  );
}
