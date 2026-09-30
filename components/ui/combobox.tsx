"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type ComboboxProps = {
  id: string;
  /** Submitted with the form through a hidden input, holding the chosen option. */
  name: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  /** Always listed last, whatever is typed (e.g. "Other"). */
  pinnedOption?: string;
  /** Extra words an option can be found by. */
  keywords?: (option: string) => string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const words = (text: string) => text.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);

/** Searchable single-choice field following the WAI-ARIA combobox pattern. */
export function Combobox({ id, name, options, value, onChange, pinnedOption, keywords, placeholder, required, className }: ComboboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const [query, setQuery] = React.useState(value);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState(0);
  const listId = `${id}-options`;
  const emitted = React.useRef(value);

  const emit = (next: string) => { emitted.current = next; onChange(next); };

  // Follow changes made from outside, such as the form being reset, but not our own.
  React.useEffect(() => {
    if (value !== emitted.current) { emitted.current = value; setQuery(value); }
  }, [value]);

  const matches = React.useMemo(() => {
    const terms = words(query);
    // Once something is chosen, reopening shows the whole list again.
    const filtered = !terms.length || query === value ? [...options] : options.filter((option) => {
      const haystack = words(`${option} ${keywords?.(option) ?? ""}`);
      return terms.every((term) => haystack.some((word) => word.startsWith(term)));
    });
    return pinnedOption ? [...filtered, pinnedOption] : filtered;
  }, [query, value, options, pinnedOption, keywords]);
  const noMatches = pinnedOption ? matches.length === 1 : matches.length === 0;

  React.useEffect(() => {
    inputRef.current?.setCustomValidity(query.trim() && !value ? `Choose an option from the list${pinnedOption ? `, or pick “${pinnedOption}”` : ""}.` : "");
  }, [query, value, pinnedOption]);

  React.useEffect(() => {
    if (open) listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  function choose(option: string) {
    emit(option);
    setQuery(option);
    setOpen(false);
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) { setOpen(true); return; }
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((index) => (index + step + matches.length) % matches.length);
    } else if (event.key === "Enter" && open && matches[active]) {
      event.preventDefault();
      choose(matches[active]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  function onBlur() {
    setOpen(false);
    // Typing an option out in full counts as choosing it.
    const exact = [...options, ...(pinnedOption ? [pinnedOption] : [])].find((option) => option.toLowerCase() === query.trim().toLowerCase());
    if (exact && exact !== value) choose(exact);
  }

  return (
    <div className={cn("relative", className)}>
      <div onClick={() => inputRef.current?.focus()} className="flex w-full cursor-text items-center gap-2 rounded-lg border-2 border-[#F5FCFF] bg-[#F5FCFF] px-3 py-4 text-base font-normal text-aero-900 inset-shadow-juicy-blue-lg-input transition-colors focus-within:border-aero-500 focus-within:ring-2 focus-within:ring-aero-100 hover:border-aero-300">
        <Search aria-hidden="true" className="size-4 shrink-0 text-aero-800" />
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={open && matches[active] ? `${id}-option-${active}` : undefined}
          autoComplete="off"
          required={required}
          placeholder={placeholder}
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
            if (value) emit("");
          }}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          className="w-full min-w-0 bg-transparent placeholder:text-aero-700 focus-visible:outline-none disabled:cursor-not-allowed"
        />
        <ChevronDown aria-hidden="true" className={cn("size-4 shrink-0 text-aero-800 transition-transform", open && "rotate-180")} />
      </div>
      <input type="hidden" name={name} value={value} />
      {open && (
        <ul
          ref={listRef}
          id={listId}
          role="listbox"
          aria-label={placeholder}
          // Keep focus in the input so a click doesn't blur and close the list first.
          onMouseDown={(event) => event.preventDefault()}
          // The site's Lenis smooth scroll captures wheel and touch scrolling page-wide;
          // this hands scrolling inside the list back to the browser.
          data-lenis-prevent
          className="absolute z-20 mt-2 max-h-72 w-full overflow-y-auto overscroll-contain rounded-lg border border-aero-200 bg-white p-1 font-body text-sm font-normal text-deep-blue-600 shadow-lg"
        >
          {noMatches && <li className="px-3 py-2.5 text-deep-blue-400">No matches{pinnedOption ? ` — choose “${pinnedOption}” to type it in.` : "."}</li>}
          {matches.map((option, index) => (
            <li
              key={option}
              id={`${id}-option-${index}`}
              data-index={index}
              role="option"
              aria-selected={option === value}
              onClick={() => choose(option)}
              onMouseMove={() => setActive(index)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 leading-5",
                index === active && "bg-aero-100",
                option === pinnedOption && matches.length > 1 && "mt-1 border-t border-aero-100 pt-3",
              )}
            >
              {option}
              {option === value && <Check aria-hidden="true" className="size-4 shrink-0 text-aero-800" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
