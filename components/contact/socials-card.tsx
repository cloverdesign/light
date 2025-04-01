import React from "react";
import { DynamicIcon } from 'lucide-react/dynamic'
import { Calendar, CalendarDays, Clock, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from 'motion/react'

interface CardProps {
    title: string;
    content: {
        name: string,
        link: string,
        handle: string
    }[];
    icon: string;
    className?: string;
}

export const SocialsCard: React.FC<CardProps> = ({ title, content, icon, className }) => {
    return (
        <motion.div className={cn("w-[450px] border-[6px] border-[#3DBAEE] bg-aero-100 rounded-2xl p-8 flex flex-col gap-6", className)}>
            <div className="flex items-center gap-5">
                <DynamicIcon name={icon as any} fallback={() => <Globe />} className="size-9" />
                <h1 className="text-[40px]">{title}</h1>
            </div>
            {content.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    <p className="text-deep-blue-600 capitalize">{item.name}</p>
                    <p>-></p>
                    <a className="text-deep-blue-600 underline" href={item.link}>@{item.handle}</a>
                </div>
            ))}
        </motion.div>
    )
}