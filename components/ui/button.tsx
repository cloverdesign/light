import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center transition-all whitespace-nowrap duration-300 ease-in-out justify-center rounded-md text-sm font-semibold hover:cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:hover:cursor-not-allowed ring-offset-background",
    {
        variants: {
            variant: {
                main: "bg-yellow-600 rounded-lg text-yellow-1000 hover:bg-yellow-300 inset-shadow-juicy-lg active:inset-shadow-none active:transform active:translate-y-[5px] focus-visible:ring-yellow-300 disabled:bg-yellow-200 disabled:text-yellow-1000/50",
                normal:
                    "bg-yellow-600 rounded-lg text-yellow-1000 hover:bg-yellow-300 focus-visible:ring-yellow-300 !pb-3 disabled:bg-yellow-200 disabled:text-yellow-1000/50",
                outline:
                    "border border-aero-300 hover:bg-aero-100 text-deep-blue-600 focus-visible:ring-aero-300 !pb-3 disabled:bg-deep-blue-100 disabled:text-deep-blue-300 disabled:border-deep-blue-300",
                secondary:
                    "bg-aero-200 text-deep-blue-600 hover:bg-aero-100 focus-visible:ring-aero-300 !pb-3 disabled:bg-deep-blue-100 disabled:text-deep-blue-300",
                "secondary-juicy":
                    "bg-aero-200 text-deep-blue-600 hover:bg-aero-100 inset-shadow-juicy-blue-lg active:inset-shadow-none active:transform active:translate-y-[5px] disabled:inset-shadow-juicy-blue-disabled-lg disabled:bg-deep-blue-100 disabled:text-deep-blue-300",
                ghost: "hover:bg-accent hover:text-accent-foreground",
                link: "underline-offset-4 hover:underline text-primary",
            },
            size: {
                default: "pt-3 pb-4 px-8",
                xs: "pt-[6px] pb-2 px-2",
            },
        },
        defaultVariants: {
            variant: "main",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {

        const Comp = asChild ? Slot : "button"

        return (
            <Comp
                data-slot="button"
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }