import * as React from "react"

import { cn } from "@/lib/utils"
import { DynamicIcon } from "lucide-react/dynamic";
import { Box } from "lucide-react";

interface TextareaProps extends React.ComponentProps<"textarea"> {
    icon?: string;
}

const Textarea = React.forwardRef<
    HTMLTextAreaElement,
    TextareaProps
>(({ className, icon, label, ...props }, ref) => {
    return (
        <div
            className={cn(
                "flex flex-col gap-2 h-fit rounded-lg bg-[#F5FCFF] text-aero-900 hover:border-aero-300 border-[2px] border-[#F5FCFF] inset-shadow-juicy-blue-lg-input disabled:inset-shadow-juicy-blue-disabled-lg disabled:bg-deep-blue-100 disabled:text-deep-blue-300 px-3 py-4 text-base transition-colors",
                className
            )}
        >
            <div className="flex items-center gap-2">
                {icon && (
                    <DynamicIcon
                        name={icon as any}
                        fallback={() => <Box />}
                        className="size-4 text-aero-800"
                    />
                )}
                <p className="text-aero-700">{label ?? "Label"}</p>
            </div>
            <textarea
                ref={ref}
                {...props}
                rows={10}
                className="w-full h-fit file:border-0 file:bg-transparent focus-visible:outline-none file:text-sm file:font-medium file:text-foreground placeholder:text-aero-700 disabled:cursor-not-allowed"
            />
        </div>
    )
})
Textarea.displayName = "Textarea"

export { Textarea }