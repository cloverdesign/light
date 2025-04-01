'use client'

import { cn } from "@/lib/utils";
import { Asterisk } from "lucide-react";
import { DynamicIcon } from "lucide-react/dynamic";
import Link from "next/link";

interface ResourceCardProps {
    className?: string;
    title: string;
    icon: {
        name: string;
        style: string;
    };
    content: string;
    link: string;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ className, link, title, icon, content, ...props }) => {
    return (
        <Link
            className={cn(className, "flex hover:cursor-pointer active:inset-shadow-none active:transform active:translate-y-[5px] flex-col gap-4 p-8 relative rounded-2xl overflow-hidden min-h-[208px]")}
            {...props}
            href={link}
        >
            <h1 className="lg:text-5xl text-3xl pointer-events-none z-[2]">{title}</h1>
            <p className="lg:text-2xl pointer-events-none z-[2]">{content}</p>
            <DynamicIcon name={icon.name as any} fallback={() => <Asterisk />} className={`${icon.style} size-[190px] absolute bottom-0 -right-8 -rotate-[24deg] z-[1] pointer-events-none`} />
        </Link>
    )
}