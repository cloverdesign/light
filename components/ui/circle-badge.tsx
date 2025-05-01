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
    drag: boolean
}


const CircleBadge: React.FC<BadgeProps> = ({
    className,
    drag,
    icon,
    ref,
    ...props
}) => {
    const style = "flex w-fit items-center justify-center rounded-full h-fit"
    return (
        <>
            {drag == true ? (<motion.div
                className={cn(className, style)}
                {...props}
                drag
                dragConstraints={ref}
                dragElastic={0.9}
                dragMomentum={true}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
            >
                <DynamicIcon name={icon.name as any} fallback={() => <Box />} className={icon.size} />
            </motion.div>) :
                (<div
                    className={cn(className, style)}
                    {...props}
                >
                    <DynamicIcon name={icon.name as any} fallback={() => <Box />} className={icon.size} />
                </div>)
            }
        </>
    )
}

export default CircleBadge
