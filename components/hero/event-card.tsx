import React from "react";
import { DynamicIcon } from 'lucide-react/dynamic'
import { Calendar, CalendarDays, Clock } from "lucide-react";

interface CardProps {
    title: string;
    content: string;
    time: string;
    date: string;
    icon: {
        name: string,
        style: string
    };
}

export const EventCard: React.FC<CardProps> = ({ title, content, time, date, icon }) => {
    return (
        <div className="w-[450px] border border-aero-200 rounded-2xl pt-8 flex flex-col gap-6">
            <div className="flex items-center gap-5 px-8">
                <span className={`${icon.style} w-fit p-3 rounded-full flex items-center justify-center`}>
                    <DynamicIcon name={icon.name} fallback={() => <Calendar />} className="size-9" />
                </span>
                <h1 className="text-[30px] !capitalize">{title}</h1>
            </div>
            <p className="text-xl text-deep-blue-400 px-8">{content}</p>
            <div className="flex items-center text-deep-blue-400 gap-8 border-t border-aero-200 pb-6 px-8 pt-4">
                <span className="flex items-center gap-2">
                    <CalendarDays className="size-5" />
                    <p className="text-sm">{date}</p>
                </span>
                <span className="flex items-center gap-2">
                    <Clock className="size-5" />
                    <p className="text-sm">{time}</p>
                </span>
            </div>
        </div>
    )
}