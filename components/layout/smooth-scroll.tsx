'use client'
import Lenis from 'lenis';
import React, { useEffect } from 'react'

const SmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis();
        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        // Cleanup function to prevent memory leaks
        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, [])
    return (
        <></>
    )
}

export default SmoothScroll