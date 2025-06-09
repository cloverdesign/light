import { DOMKeyframesDefinition, AnimationOptions, ElementOrSelector, useAnimate } from "motion/react"
import { useEffect, useRef, useCallback } from "react";

type AnimateParams = [
    ElementOrSelector,
    DOMKeyframesDefinition,
    (AnimationOptions | undefined)?
]

type Animation = AnimateParams | Animation[];

export const useMotionTimeline = (keyframes: Animation[], count: number = 1) => {
    const [scope, animate] = useAnimate();
    const mounted = useRef(true)

    const processAnimation = useCallback(async (animation: Animation): Promise<void> => {
        if (Array.isArray(animation[0])) {
            await Promise.all(
                animation.map(async a => {
                    await processAnimation(a as AnimateParams)
                })
            )
        } else {
            await animate(...animation as AnimateParams)
        }
    }, [animate])

    const handleAnimate = useCallback(async () => {
        for (let i = 0; i < count; i++) {
            for (const animation of keyframes) {
                if (!mounted.current) return;

                await processAnimation(animation)
            }
        }
    }, [keyframes, count, processAnimation])

    useEffect(() => {
        mounted.current = true

        handleAnimate()

        return () => {
            mounted.current = false;
        }
    }, [handleAnimate])

    return scope
}