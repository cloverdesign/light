import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

const DropdownMenuTriggerButton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "flex items-center justify-between gap-4 active:inset-shadow-none active:transform active:translate-y-[5px] h-fit w-full rounded-lg bg-[#F5FCFF] text-aero-800 hover:border-aero-300 border-[2px] border-[#F5FCFF] inset-shadow-juicy-blue-lg-input disabled:inset-shadow-juicy-blue-disabled-lg disabled:bg-deep-blue-100 disabled:text-deep-blue-300 px-3 py-4 text-base transition-colors",
                    className
                )}
                {...props}
            >
                {children}
                <ChevronDown className="size-4 shrink-0" />
            </div>
        );
    }
);

DropdownMenuTriggerButton.displayName = "DropdownMenuTrigger";

export { DropdownMenuTriggerButton };
