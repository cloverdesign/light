import * as React from "react"
import { cn } from "@/lib/utils"
import { DynamicIcon } from 'lucide-react/dynamic'
import { Box } from "lucide-react"

interface InputProps extends React.ComponentProps<"input"> {
    icon?: string; // Ensuring icon is a string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, icon, ...props }, ref) => {
        return (
            <div
                className={cn(
                    "flex items-center gap-2 h-fit w-full rounded-lg active:inset-shadow-none active:transform active:translate-y-[5px] bg-[#F5FCFF] text-aero-900 hover:border-aero-300 border-[2px] border-[#F5FCFF] inset-shadow-juicy-blue-lg-input disabled:inset-shadow-juicy-blue-disabled-lg disabled:bg-deep-blue-100 disabled:text-deep-blue-300 px-3 py-4 text-base transition-colors",
                    className
                )}
            >
                {icon && (
                    <DynamicIcon
                        name={icon as any}
                        fallback={() => <Box />}
                        className="size-4 text-aero-800"
                    />
                )}
                <input
                    type={type}
                    ref={ref}
                    {...props}
                    className="w-full h-fit file:border-0 file:bg-transparent focus-visible:outline-none file:text-sm file:font-medium file:text-foreground placeholder:text-aero-700 disabled:cursor-not-allowed"
                />
            </div>
        )
    }
)
Input.displayName = "Input"

export { Input }
