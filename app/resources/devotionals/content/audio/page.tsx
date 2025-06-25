"use client";
import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  SkipBack,
  SkipForward,
  UserIcon,
  UserRound,
  Clock,
} from "lucide-react";

interface EpisodeData {
  title: string;
  author: string;
  audioUrl: string;
  image: string;
  description: string;
  pubDate: string;
  duration: string;
}

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const AudioContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Get episode data from URL params
  const episodeParam = searchParams.get("episode");
  const episodeData: EpisodeData | null = React.useMemo(() => {
    if (!episodeParam) return null;
    try {
      return JSON.parse(decodeURIComponent(episodeParam));
    } catch (error) {
      console.error("Failed to parse episode data:", error);
      return null;
    }
  }, [episodeParam]);

  // Audio event handlers
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setAudioDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [episodeData?.audioUrl]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      if (dotLottie && typeof dotLottie.pause === "function") {
        dotLottie.pause();
      }
    } else {
      audio.play();
      if (dotLottie && typeof dotLottie.play === "function") {
        dotLottie.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newTime = (parseFloat(e.target.value) / 100) * audioDuration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value) / 100;

    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(
      0,
      Math.min(audioDuration, audio.currentTime + seconds),
    );
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const [dotLottie, setDotLottie] = React.useState<any>(null);

  const dotLottieRefCallback = (dotLottieInstance: any) => {
    setDotLottie(dotLottieInstance);
  };

  if (!episodeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Episode not found
          </h1>
          <Button onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[150px] pb-16 flex flex-col items-center gap-16 lg:px-20">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-[56px] leading-[72px]">{episodeData.title}</h1>
        <div className="flex items-center gap-2 text-deep-blue-400">
          <span className="flex items-center gap-1">
            <UserRound className="w-4 h-4" /> {episodeData.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />{" "}
            {audioDuration ? formatTime(audioDuration) : episodeData.duration}
          </span>
        </div>
      </div>

      <div className="bg-white w-full rounded-2xl overflow-hidden">
        <audio ref={audioRef} src={episodeData.audioUrl} preload="metadata" />

        <div className="flex items-center justify-center lg:h-[500px] h-[50vh] bg-aero-500">
          <DotLottieReact
            src="/wave.lottie"
            loop
            dotLottieRefCallback={dotLottieRefCallback}
          />
          <Button onClick={togglePlayPause} className="absolute mx-auto">
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-yellow-500 flex items-start w-full gap-4 p-2">
          <div className="w-full flex items-center gap-2">
            <Play className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="100"
              value={audioDuration ? (currentTime / audioDuration) * 100 : 0}
              onChange={handleSeek}
              className="w-full h-[2px] bg-white rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex items-center text-sm text-white">
              <span>{formatTime(currentTime)}/</span>
              <span>{formatTime(audioDuration)}</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Volume2 className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-32 h-[2px] bg-white rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        {/*
        <div className="flex items-center justify-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipTime(-15)}
            className="hover:bg-gray-100"
          >
            <SkipBack className="w-5 h-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => skipTime(15)}
            className="hover:bg-gray-100"
          >
            <SkipForward className="w-5 h-5" />
          </Button>
        </div> */}
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #eab308;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default AudioContent;
