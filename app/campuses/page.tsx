"use client";
import campus1 from "@/assets/images/campus1.webp";
import campus2 from "@/assets/images/campus2.webp";
import campusSM from "@/assets/images/campusSM.webp";
import campusTUT from "@/assets/images/campusTUT.webp";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Asterisk, Flame, HandHeart } from "lucide-react";
import { motion } from "motion/react";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import Image from "next/image";
import { useState, useCallback } from "react";

export default function Campuses() {
    const campus = [
        {
            title: "Lighthouse SMU",
            content: [
                "New Auditorium, Sefako Makghto University",
                "Sundays 10am / Wednesdays 6pm",
            ],
            image: campusSM,
        },
        {
            title: "Lighthouse TUT GA",
            content: [
                "GH101, Building 11, TUT Ga-Rankuwa Campus",
                "Sundays 10am, Wednesdays (Online)",
            ],
            image: campusTUT,
        },
        {
            title: "Lighthouse Madeira",
            content: ["Madeira Office, Madiera Isle", "Fridays 6pm"],
            image: campus1,
        },
    ];

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const scope = useMotionTimeline([
        [
            [
                "[data-animate='image1']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
            [
                "[data-animate='image2']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
        ],
        [
            [
                "[data-animate='badge1']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
            [
                "[data-animate='badge2']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
            [
                "[data-animate='badge3']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
            [
                "[data-animate='badge4']",
                { scale: 1 },
                {
                    duration: 1,
                    ease: "easeInOut",
                    type: "spring",
                    damping: 10,
                    stiffness: 100,
                },
            ],
        ],
    ]);

    const MotionImage = motion.create(Image);

    return (
        <section
            ref={scope}
            className="font-body pt-[150px] flex flex-col items-center gap-32"
        >
            <div className="flex items-center justify-center relative">
                <motion.span
                    data-animate="badge1"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute top-0 rounded-full block border-3 border-white z-[2] -rotate-13`}
                >
                    <HandHeart />
                </motion.span>
                <motion.span
                    data-animate="badge2"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit py-2 px-4 bg-yellow-600 text-yellow-1000 absolute top-[50%] -left-10 rounded-full lg:block border-3 border-white z-[2] rotate-15 hidden`}
                >
                    <p className="font-semibold">Love</p>
                </motion.span>
                <motion.span
                    data-animate="badge3"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit p-2 bg-yellow-600 text-yellow-1000 absolute top-[50%] -right-6 rounded-full lg:block border-3 border-white z-[2] rotate-15 hidden`}
                >
                    <Flame />
                </motion.span>
                <motion.span
                    data-animate="badge4"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit py-2 px-4 bg-orange-600 text-orange-900 absolute bottom-0 rounded-full block border-3 border-white z-[2] -rotate-13`}
                >
                    <p className="font-semibold">Faith</p>
                </motion.span>
                <MotionImage
                    initial={{ scale: 0 }}
                    data-animate="image1"
                    src={campus2}
                    alt="Hands in a circle"
                    className="-rotate-[8.28deg] rounded-2xl border border-white lg:max-w-md w-[60%]"
                />
                <MotionImage
                    initial={{ scale: 0 }}
                    data-animate="image2"
                    src={campus1}
                    alt="People on the grass talking"
                    className="rotate-[6.28deg] -ml-[150px] mt-[100px] rounded-2xl border-[6px] border-background lg:max-w-md w-[60%]"
                />
            </div>
            <div className="flex flex-col gap-4">
                <div className="overflow-y-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            delay: 0.2,
                            type: "spring",
                            bounce: 0.5,
                        }}
                        className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-center">
                        Our
                    </motion.h1>
                </div>
                <div className="overflow-y-hidden">
                    <motion.h1
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",
                            delay: 0.2,
                            type: "spring",
                            bounce: 0.5,
                        }}
                        className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-center">
                        Campuses
                    </motion.h1>
                </div>
            </div>
            <div className="flex flex-col w-full mb-50 border-b border-aero-200">
                {campus.map((item, index) => (
                    <Accordion type="single" key={index} collapsible className="w-full">
                        <AccordionItem value="item">
                            <AccordionTrigger
                                onMouseMove={handleMouseMove}
                                onMouseEnter={() => handleMouseEnter(index)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <div className="flex items-center gap-2 lg:gap-8">
                                    <Asterisk className="size-4 lg:size-8 shrink-0" />
                                    <p className="text-xl lg:text-3xl font-body font-normal">
                                        {item.title}
                                    </p>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4">
                                    {/* Mobile Image */}
                                    <div className="lg:hidden relative">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-48 sm:h-64 object-cover rounded-lg shadow-md"
                                            width={400}
                                            height={256}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-3">
                                        {item.content.map((stuff, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center gap-4 lg:gap-8"
                                            >
                                                <Asterisk className="size-4 lg:size-6 text-aero-600 shrink-0" />
                                                <p className="text-sm sm:text-base">{stuff}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>

            {/* Floating image that follows mouse on hover - Desktop only */}
            {hoveredIndex !== null && (
                <div
                    className="fixed pointer-events-none z-50 hidden lg:block"
                    style={{
                        left: mousePosition.x + 20,
                        top: mousePosition.y - 100,
                        transform: "translate(0, 0)",
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="relative"
                    >
                        <Image
                            src={campus[hoveredIndex].image}
                            alt={campus[hoveredIndex].title}
                            className="w-64 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
                            width={256}
                            height={160}
                        />
                    </motion.div>
                </div>
            )}
        </section>
    );
}
