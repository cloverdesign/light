import { cn } from "@/lib/utils";
import {
  CalendarDays,
  Clock,
  FileAudio,
  FileVideo,
  UserRound,
} from "lucide-react";
import React from "react";

interface ResourceCardProps {
  className?: string;
  image?: string;
  title: string;
  description: string;
  date: string;
  author: string;
  duration: string;
  type?: string;
  onClick?: () => void;
}

const ResourceDetailNewCard: React.FC<ResourceCardProps> = ({
  className,
  type,
  image,
  title,
  description,
  date,
  author,
  duration,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        className,
        "md:min-w-[400px] h-fit rounded-2xl border-[3px] border-[#EBE5D4]/50 bg-[#FFFDF8] inset-shadow-juicy-card hover:cursor-pointer active:inset-shadow-none active:transform active:translate-y-[5px] flex flex-col lg:flex-row",
      )}
    >
      <div className="p-2 pb-4 lg:w-1/2 w-full h-full">
        <div
          className="h-[450px] rounded-lg w-full bg-aero-300 relative"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {type ? (
            <span className="flex items-center bg-aero-100 p-2 text-deep-blue-600 w-fit absolute top-4 right-4 rounded-full">
              {type == "audio" ? (
                <FileAudio className="size-5" />
              ) : (
                <FileVideo className="size-5" />
              )}
            </span>
          ) : null}
        </div>
      </div>

      <div className="lg:w-1/2 lg:h-[460px] flex flex-col justify-between">
        <div className="p-4 flex flex-col gap-2">
          <span className="flex items-center text-deep-blue-300 gap-2">
            <Clock className="size-4" />
            {duration}
          </span>
          <h1 className="text-[32px] lg:text-[56px] leading-tight !capitalize">
            {title}
          </h1>
          <p className="text-deep-blue-400 lg:text-xl text-base">
            {description}
          </p>
        </div>

        <div className="flex items-center gap-8 px-4 pb-6 pt-4 border-t-[#EBE5D4] border-t">
          <span className="flex items-center text-deep-blue-300 gap-2">
            <CalendarDays className="size-5" />
            {date}
          </span>
          <span className="flex items-center text-deep-blue-300 gap-2">
            <UserRound className="size-5" />
            {author}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResourceDetailNewCard;
