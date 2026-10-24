"use client";

import { useState, useId } from "react";
import { ChevronDown, Eye, EyeOff, AlertCircle } from "lucide-react";

/* ---------------- Accordion ---------------- */
export function Accordion({
  items,
  defaultOpen = 0,
  className = "",
}: {
  items: { title: React.ReactNode; content: React.ReactNode; meta?: React.ReactNode }[];
  defaultOpen?: number | null;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const baseId = useId();
  return (
    <div className={`overflow-hidden rounded-(--radius-card) border border-slate-200 bg-white ${className}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className={i > 0 ? "border-t border-slate-200" : ""}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${baseId}-${i}`}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-right transition-colors hover:bg-slate-50"
            >
              <span className="text-sm font-bold text-slate-800">{item.title}</span>
              <span className="flex shrink-0 items-center gap-3">
                {item.meta && <span className="hidden text-xs text-slate-400 sm:block">{item.meta}</span>}
                <ChevronDown
                  className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </span>
            </button>
            <div
              id={`${baseId}-${i}`}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-sm leading-7 text-slate-600">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- Tabs ---------------- */
export function Tabs({
  tabs,
  className = "",
}: {
  tabs: { label: React.ReactNode; content: React.ReactNode }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);
  return (
    <div className={className}>
      <div role="tablist" className="scrollbar-none flex gap-1 overflow-x-auto border-b border-slate-200">
        {tabs.map((tab, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`-mb-px shrink-0 cursor-pointer border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              active === i
                ? "border-primary-600 font-bold text-primary-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-6">
        {tabs[active].content}
      </div>
    </div>
  );
}

/* ---------------- Filter chips row ---------------- */
export function ChipTabs({ options, className = "" }: { options: string[]; className?: string }) {
  const [active, setActive] = useState(0);
  return (
    <div className={`scrollbar-none flex gap-2 overflow-x-auto ${className}`}>
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          onClick={() => setActive(i)}
          className={`chip shrink-0 ${active === i ? "chip-active" : ""}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ---------------- Password input ---------------- */
export function PasswordInput({
  label,
  id,
  error,
  strength,
  placeholder = "••••••••",
}: {
  label: string;
  id: string;
  error?: string;
  strength?: boolean;
  placeholder?: string;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState("");

  const score = Math.min(3, Math.floor(value.length / 4));
  const labels = ["", "ضعیف", "متوسط", "قوی"];
  const colors = ["bg-slate-200", "bg-error", "bg-warning", "bg-success"];

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          dir="ltr"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`input text-left ${error ? "input-error" : ""}`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "پنهان کردن رمز" : "نمایش رمز"}
          className="absolute top-1/2 left-3 -translate-y-1/2 cursor-pointer rounded p-1 text-slate-400 transition-colors hover:text-slate-600"
        >
          {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {strength && value.length > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex flex-1 gap-1">
            {[1, 2, 3].map((n) => (
              <span
                key={n}
                className={`h-1 flex-1 rounded-full transition-colors ${score >= n ? colors[score] : "bg-slate-200"}`}
              />
            ))}
          </div>
          <span className="w-10 text-left text-xs text-slate-500">{labels[score]}</span>
        </div>
      )}
      {error && (
        <p className="error-text">
          <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/* ---------------- Toggle switch ---------------- */
export function Toggle({
  label,
  defaultChecked = false,
  description,
}: {
  label: string;
  defaultChecked?: boolean;
  description?: string;
}) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => setOn(!on)}
      className="flex w-full cursor-pointer items-center justify-between gap-4 py-1 text-right"
    >
      <span>
        <span className="block text-sm font-medium text-slate-800">{label}</span>
        {description && <span className="mt-0.5 block text-xs text-slate-500">{description}</span>}
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          on ? "bg-primary-600" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
            on ? "right-[22px]" : "right-0.5"
          }`}
        />
      </span>
    </button>
  );
}
