import { cn } from '@/lib/utils'
import { DynamicIcon } from 'lucide-react/dynamic'
import { Box } from 'lucide-react'
import { motion } from 'motion/react'

interface BadgeProps {
    icon: {
        name: string
        size: string
    }
    className?: string
    ref?: React.RefObject<HTMLElement | null>
}


const CircleBadge: React.FC<BadgeProps> = ({
    className,
    icon,
    ref,
    ...props
}) => {

    const style = "flex w-fit items-center justify-center border-white border-[11px] rounded-full cursor-grab active:cursor-grabbing"
    return (
        <motion.div
            className={cn(className, style)}
            {...props}
            drag
            dragConstraints={ref}
            dragElastic={0.9}
            dragMomentum={false}
            onDrag={() => { }}
        >
            <DynamicIcon name={icon.name as any} fallback={() => <Box />} className={icon.size} />
        </motion.div>
    )
}

export default CircleBadge
