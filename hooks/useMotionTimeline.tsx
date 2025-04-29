import { DOMKeyframesDefinition, AnimationOptions, ElementOrSelector, useAnimate } from "motion/react"
import { useEffect, useRef } from "react";

type AnimateParams = [
    ElementOrSelector,
    DOMKeyframesDefinition,
    (AnimationOptions | undefined)?
]

type Animation = AnimateParams | Animation[];

export const useMotionTimeline = (keyframes: Animation[], count: number = 1) => {
    const [scope, animate] = useAnimate();
    const mounted = useRef(true)

    useEffect(() => {
        mounted.current = true

        handleAnimate()

        return () => {
            mounted.current = false;
        }
    }, [])

    const processAnimation = async (animation: Animation) => {
        if (Array.isArray(animation[0])) {
            await Promise.all(
                animation.map(async a => {
                    await processAnimation(a as AnimateParams)
                })
            )
        } else {
            await animate(...animation as AnimateParams)
        }
    }

    const handleAnimate = async () => {
        for (let i = 0; i < count; i++) {
            for (const animation of keyframes) {
                if (!mounted.current) return;

                await processAnimation(animation)
            }
        }
    }

    return scope
}