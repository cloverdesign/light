import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Select = React.forwardRef<HTMLSelectElement, React.ComponentProps<"select">>(
  ({ className, children, ...props }, ref) => (
    <div className="relative">
      <select ref={ref} {...props} className={cn(
        "w-full appearance-none rounded-lg border-2 border-[#F5FCFF] bg-[#F5FCFF] px-3 py-4 pr-10 text-base font-normal text-aero-900 inset-shadow-juicy-blue-lg-input transition-colors hover:border-aero-300 focus-visible:border-aero-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aero-100 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}>{children}</select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-aero-800" />
    </div>
  ),
);
Select.displayName = "Select";

export { Select };
