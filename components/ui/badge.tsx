import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

// Define badge variants
const badgeVariants = cva(
    "inline-flex text-gray-700 items-center justify-center gap-2 font-body whitespace-nowrap rounded-full text-base transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive transition duration-300 ease-in-out",
    {
        variants: {
            variant: {
                default: "bg-aero-600 text-deep-blue-700",
                outline: "text-deep-blue-700 border-aero-200 border",
                white: "bg-white",
                header: "bg-yellow-300 text-yellow-1000"
            },
            size: {
                default: "px-4 py-2",
                sm: "gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "py-3 pr-5 px-6",
                icon: "size-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

// Define the props interface using VariantProps
interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {
    asChild?: boolean
}

// Badge Compobnent
const Badge: React.FC<BadgeProps> = ({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}) => {
    const Comp = asChild ? Slot : "span"

    return (
        <Comp
            data-slot="badge"
            className={cn(badgeVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Badge, badgeVariants }
