"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { DevotionalEpisode } from "@/types/devotional";
import {
  Play,
  Pause,
  Volume2,
  UserRound,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useRouter } from "next/navigation";

interface CustomAudioPlayerProps {
  episode: DevotionalEpisode;
  className?: string;
  autoPlay?: boolean;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({
  episode,
  className = "",
  autoPlay = false,
}) => {
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const [dotLottie, setDotLottie] = useState<any>(null);

  // Check if we're on mobile for better UX
  const isMobile = useMemo(() => {
    return (
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    );
  }, []);

  // Create proxy URL for the audio
  const getProxyUrl = (audioUrl: string): string => {
    return `/api/audio-proxy?url=${encodeURIComponent(audioUrl)}`;
  };

  // Format time display
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !episode?.audioUrl) return;

    // Mobile-specific setup
    if (isMobile) {
      audio.load(); // Ensure audio is properly loaded on mobile
    }

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setAudioDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      if (dotLottie && typeof dotLottie.pause === "function") {
        dotLottie.pause();
      }
    };
    const handleCanPlay = () => {
      setCanPlay(true);
      setIsLoading(false);
      setAudioError(null);
    };
    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      const error = target.error;

      let errorMessage = "Failed to load audio.";
      if (error) {
        switch (error.code) {
          case error.MEDIA_ERR_ABORTED:
            errorMessage = "Audio loading was aborted.";
            break;
          case error.MEDIA_ERR_NETWORK:
            errorMessage = "Network error while loading audio.";
            break;
          case error.MEDIA_ERR_DECODE:
            errorMessage = "Audio format error.";
            break;
          case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = "Audio format not supported.";
            break;
          default:
            errorMessage = "Unknown audio error.";
        }
      }

      setAudioError(errorMessage + " Please try again.");
      setIsLoading(false);
      setIsPlaying(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setAudioError(null);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);

    // Auto play if requested
    if (autoPlay) {
      audio.play().catch((error) => {
        console.error("Auto-play failed:", error);
        setAudioError("Auto-play failed. Please click play to start.");
      });
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, [episode?.audioUrl, isMobile, autoPlay, dotLottie]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || !canPlay) return;

    try {
      if (isPlaying) {
        audio.pause();
        if (dotLottie && typeof dotLottie.pause === "function") {
          dotLottie.pause();
        }
        setIsPlaying(false);
      } else {
        // Modern browsers require user interaction for audio play
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          await playPromise;
          if (dotLottie && typeof dotLottie.play === "function") {
            dotLottie.play();
          }
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Audio play failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      if (
        errorMessage.includes("NotAllowedError") ||
        errorMessage.includes("play() failed")
      ) {
        setAudioError(
          "Audio blocked by browser. Please tap the play button to start.",
        );
      } else if (
        errorMessage.includes("NotSupportedError") ||
        errorMessage.includes("format")
      ) {
        setAudioError(
          "Audio format not supported. Please try a different browser.",
        );
      } else if (
        errorMessage.includes("network") ||
        errorMessage.includes("loading")
      ) {
        setAudioError(
          "Network error. Please check your connection and try again.",
        );
      } else {
        setAudioError("Audio playback failed. Please try again.");
      }
      setIsPlaying(false);
    }
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

  const dotLottieRefCallback = (dotLottieInstance: any) => {
    setDotLottie(dotLottieInstance);
  };

  if (audioError) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${className}`}
      >
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Audio Error</h1>
          <p className="text-gray-600 mb-4">{audioError}</p>
          <div className="flex gap-4 justify-center mb-4">
            <Button onClick={() => window.location.reload()}>Try Again</Button>
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
          <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
            <p className="text-sm text-gray-600">
              <strong>Troubleshooting:</strong>
              <br />
              • Enable autoplay in browser settings
              <br />
              • Try Chrome, Safari, or Firefox
              <br />
              • Check your internet connection
              <br />
              • Disable ad blockers temporarily
              <br />• On iOS: Make sure &quot;Low Power Mode&quot; is off
            </p>
          </div>
          {/* Fallback Link */}
          {episode.link && (
            <div className="text-center pt-4 border-t mt-4">
              <a
                href={episode.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-600 hover:text-orange-700 font-medium"
              >
                Listen on Buzzsprout →
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col items-center gap-16 lg:px-20 px-4 ${className}`}
    >
      <div className="w-full rounded-2xl overflow-hidden">
        <audio
          ref={audioRef}
          src={episode.audioUrl ? getProxyUrl(episode.audioUrl) : undefined}
          preload="metadata"
          playsInline
          controls={false}
          crossOrigin="anonymous"
          style={{ display: "none" }}
        />

        <div className="relative flex items-center justify-center lg:h-[500px] h-[50vh] bg-aero-500">
          <DotLottieReact
            src="/wave.lottie"
            loop
            dotLottieRefCallback={dotLottieRefCallback}
            className="w-1/2"
          />

          <Button
            onClick={togglePlayPause}
            className="absolute mx-auto z-[2]"
            disabled={isLoading || !canPlay}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deep-blue-500" />
            ) : isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-yellow-500 flex items-center w-full gap-4 p-4">
          <div className="w-full flex items-center gap-3">
            <Play className="w-5 h-5 text-white flex-shrink-0" />
            <input
              type="range"
              min="0"
              max="100"
              value={audioDuration ? (currentTime / audioDuration) * 100 : 0}
              onChange={handleSeek}
              disabled={!canPlay || isLoading}
              className="flex-1 h-[2px] bg-white/50 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
            />
            <div className="flex items-center text-sm text-white flex-shrink-0">
              <span>{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(audioDuration)}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Volume2 className="w-5 h-5 text-white" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              disabled={!canPlay}
              className="w-20 md:w-32 h-[2px] bg-white/50 rounded-lg appearance-none cursor-pointer slider disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          border: none;
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .slider::-webkit-slider-track {
          background: transparent;
        }

        .slider::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
};

export default CustomAudioPlayer;
