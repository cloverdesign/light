'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
    const [loading, setLoading] = useState(true);
    const [animationDone, setAnimationDone] = useState(false);

    useEffect(() => {
        const handleLoad = () => setLoading(false);

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    // Fade out when both site and animation are ready
    const shouldHide = !loading && animationDone;

    return (
        <AnimatePresence>
            {!shouldHide && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: shouldHide ? 0 : 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                >
                    <DotLottieReact
                        autoplay
                        src="/data.json"
                        style={{ width: 200, height: 200 }}
                        onComplete={() => setAnimationDone(true)}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
