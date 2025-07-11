"use client";

import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuTriggerButton } from "@/components/ui/dropdown-trigger";
import {
    Asterisk,
    Hand,
    HandHeart,
    Megaphone,
    MessageCircleHeart,
} from "lucide-react";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { SocialsCard } from "@/components/contact/socials-card";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export default function Contact() {
    const [reason, setReason] = useState("Reason");
    const socialsRef = useRef(null);
    const isInView = useInView(socialsRef, { once: true, amount: 0.3 });

    const socials = [
        {
            icon: "instagram",
            title: "Instagram",
            content: [
                {
                    name: "Lighthouse SMU",
                    link: "https://www.instagram.com/blw.lighthouse/",
                    handle: "blw.lighthouse",
                },
                {
                    name: "Lighthouse TUT GA",
                    link: "https://www.instagram.com/blw.lighthouse.ga/",
                    handle: "blw.lighthouse.ga",
                },
                {
                    name: "Lighthouse Madeira",
                    link: "https://www.instagram.com/blw.lighthouse/",
                    handle: "blw.lighthouse",
                },
            ],
            style: "absolute lg:-top-[300px] top-0 rotate-[10deg]",
        },
        {
            icon: "youtube",
            title: "Youtube",
            content: [
                {
                    name: "Lighthouse",
                    link: "https://www.youtube.com/@blwlighthouse",
                    handle: "blw.lighthouse",
                },
            ],
            style: "absolute lg:-top-[100px] top-[200px] rotate-[20deg]",
        },
        {
            icon: "tiktok",
            title: "Tiktok",
            content: [
                {
                    name: "Lighthouse",
                    link: "https://www.youtube.com/@blwlighthouse",
                    handle: "blw.lighthouse",
                },
            ],
            style: "absolute lg:top-0 top-[300px] -rotate-[3deg]",
        },
    ];
    return (
        <section className="pt-[105px] font-body">
            <div className="pt-20 h-screen flex flex-col lg:flex-row items-center gap-16 lg:gap-32 lg:px-32 px-8 mb-50">
                <div className="flex flex-col gap-4 lg:w-1/3">
                    <div className="relative">
                        <span
                            className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute top-[45%] lg:-left-5 rounded-full block border-3 border-white z-[2] rotate-15`}
                        >
                            <HandHeart />
                        </span>
                        <span
                            className={`badge-1 w-fit p-2 bg-orange-600 text-orange-200 absolute lg:top-0 2xl:right-48 right-6  rounded-full block border-3 border-white z-[2] rotate-15`}
                        >
                            <Hand />
                        </span>
                        <h1 className="text-[40px] leading-[48px] lg:text-[56px] lg:leading-[72px] text-center lg:text-left">
                            WE’D LOVE TO <br /> HEAR FROM YOU!
                        </h1>
                    </div>
                    <p className="text-deep-blue-400 text-center lg:text-left">
                        For questions, suggestions, or prayer requests: No matter the
                        situation, you can always feel free to reach out, even if it’s just
                        to say hi.
                    </p>
                </div>
                <form className="flex flex-col gap-6 lg:w-2/3">
                    <Input icon="user-round" placeholder="Full Name" />
                    <div className="flex flex-col lg:flex-row items-center gap-6">
                        <Input icon="mailbox" placeholder="Email" />
                        <Input icon="smartphone" placeholder="Phone Number" />
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="lg:w-2/6 h-fit">
                                <DropdownMenuTriggerButton>
                                    <div className="flex gap-2 items-center">
                                        <Asterisk className="size-4 shrink-0" />
                                        <p className="whitespace-nowrap">{reason}</p>
                                    </div>
                                </DropdownMenuTriggerButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="dropdown-content-width-full">
                                <DropdownMenuRadioGroup
                                    value={reason}
                                    onValueChange={setReason}
                                >
                                    <DropdownMenuRadioItem value="Prayer Request">
                                        Prayer Request
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem value="Questions">
                                        Questions
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem value="Suggestions">
                                        Suggestions
                                    </DropdownMenuRadioItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioItem value="Plan a visit">
                                        Plan a visit
                                    </DropdownMenuRadioItem>
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Textarea
                            icon="message-square-heart"
                            placeholder="Enter your message here"
                            className="lg:w-4/6"
                            label="Message"
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="lg:self-end self-center lg:w-fit w-full"
                    >
                        Send Message
                    </Button>
                </form>
            </div>
            <motion.div
                ref={socialsRef}
                initial={{ y: 100 }}
                animate={isInView ? { y: 0 } : { y: 100 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:px-32 px-8 mb-50 h-screen"
            >
                <div className="bg-orange-600 flex flex-col lg:flex-row lg:items-center lg:justify-center h-full rounded-4xl overflow-hidden">
                    <div className="lg:w-1/2 lg:h-full h-1/2 flex items-center justify-center">
                        <div className="relative">
                            <motion.span
                                // initial={{ scale: 0 }}
                                className={`badge-1 w-fit p-2 bg-yellow-600 text-yellow-1000 absolute lg:bottom-0 -bottom-7 -left-7 rounded-full block border-3 border-white z-[2] rotate-15`}
                            >
                                <MessageCircleHeart />
                            </motion.span>
                            <motion.span
                                // initial={{ scale: 0 }}
                                className={`badge-1 w-fit p-2 bg-aero-600 text-deep-blue-600 absolute lg:top-0 -top-5 lg:right-30 right-0 rounded-full block border-3 border-white z-[2] rotate-15`}
                            >
                                <Megaphone />
                            </motion.span>
                            <h1 className="text-orange-100 text-[32px] leading-[40px] lg:text-[56px] lg:leading-[72px] text-center lg:text-left">
                                OUR SOCIALS <br /> TO STAY CONNECTED
                            </h1>
                        </div>
                    </div>
                    <div className="relative lg:w-1/2 lg:h-fit h-1/2">
                        {socials.map((item, index) => (
                            <motion.div
                                key={index}
                                drag
                                dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
                                dragElastic={0.2}
                                whileDrag={{ scale: 1.1, rotate: 5 }}
                                whileHover={{ scale: 1.05 }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, scale: 1 }
                                        : { opacity: 0, scale: 0.8 }
                                }
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.2,
                                    ease: "easeOut",
                                }}
                                className="cursor-grab active:cursor-grabbing"
                            >
                                <SocialsCard
                                    icon={item.icon}
                                    title={item.title}
                                    content={item.content}
                                    className={item.style}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
