'use client'
import campus1 from "@/assets/images/campus1.webp"
import campus2 from "@/assets/images/campus2.webp"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Asterisk, Flame, HandHeart } from "lucide-react";
import { motion } from "motion/react";
import { useMotionTimeline } from "@/hooks/useMotionTimeline";
import Image from "next/image";

export default function Campuses() {
    const campus = [
        {
            title: "Lighthouse SMU",
            content: [
                "New Auditorium, Sefako Makghto University",
                "Sundays 10am / Wednesdays 6pm"
            ]
        },
        {
            title: "Lighthouse TUT GA",
            content: [
                "GH101, Building 11, TUT Ga-Rankuwa Campus",
                "Sundays 10am, Wednesdays (Online)"
            ]
        },
        {
            title: "Lighthouse Madeira",
            content: [
                "Madeira Office, Madiera Isle",
                "Fridays 6pm"
            ]
        }
    ]

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

        ]
    ])

    const MotionImage = motion.create(Image);

    return (
        <section
            ref={scope}
            className="font-body pt-[150px] flex flex-col items-center gap-16">
            <div className="flex items-center justify-center relative">
                <motion.span
                    data-animate="badge1"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute top-0 rounded-full block border-3 border-white z-[2] -rotate-13`}>
                    <HandHeart />
                </motion.span>
                <motion.span
                    data-animate="badge2"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit py-2 px-4 bg-yellow-600 text-yellow-1000 absolute top-[50%] -left-10 rounded-full lg:block border-3 border-white z-[2] rotate-15 hidden`}>
                    <p className="font-semibold">Love</p>
                </motion.span>
                <motion.span
                    data-animate="badge3"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit p-2 bg-yellow-600 text-yellow-1000 absolute top-[50%] -right-6 rounded-full lg:block border-3 border-white z-[2] rotate-15 hidden`}>
                    <Flame />
                </motion.span>
                <motion.span
                    data-animate="badge4"
                    initial={{ scale: 0 }}
                    className={`badge-1 w-fit py-2 px-4 bg-orange-600 text-orange-900 absolute bottom-0 rounded-full block border-3 border-white z-[2] -rotate-13`}>
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
            <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-center">Our <br /> Campuses</h1>
            <div className="flex flex-col w-full mb-50 border-b border-aero-200">
                {campus.map((item, index) =>
                (<Accordion type="single" key={index} collapsible className="w-full">
                    <AccordionItem value="item">
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 lg:gap-8">
                                <Asterisk className="size-4 lg:size-8 shrink-0" />
                                <p className="text-xl lg:text-3xl font-body font-normal">{item.title}</p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {
                                item.content.map((stuff, idx) => (
                                    <div key={idx} className="flex items-center gap-8">
                                        <Asterisk className="size-4 lg:size-6 text-aero-600 shrink-0" />
                                        <p>{stuff}</p>
                                    </div>
                                ))
                            }
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>))}
            </div>
        </section>
    )
}