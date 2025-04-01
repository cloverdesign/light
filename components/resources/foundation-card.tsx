import React from "react";

interface CardProps {
    title: string;
    content: string;
    index: number;
}

export const FoundationCard: React.FC<CardProps> = ({ title, content, index }) => {
    return (
        <div className="w-[450px] border border-aero-200 rounded-2xl py-8 flex flex-col gap-6">
            <div className="flex items-center gap-5 px-8">
                <span className={`bg-aero-600 size-16 p-3 rounded-full flex items-center justify-center`}>
                    <h1 className="text-3xl">{index}</h1>
                </span>
                <h1 className="text-[30px] !capitalize">{title}</h1>
            </div>
            <p className="text-xl text-deep-blue-400 px-8">{content}</p>
        </div>
    )
}