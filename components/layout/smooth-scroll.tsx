'use client'
import Lenis from 'lenis';
import React, { useEffect } from 'react'

const SmoothScroll = () => {
    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis();

        function raf(time: any) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);
    })
    return (
        <></>
    )
}

export default SmoothScroll