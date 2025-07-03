"use client";
import React, { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  UserRound,
  Clock,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import BuzzsproutPlayer from "@/components/audio/buzzsprout-player";
import CustomAudioPlayer from "@/components/audio/custom-audio-player";
import { DevotionalEpisode } from "@/types/devotional";
import Image from "next/image";

interface EpisodeData {
  title: string;
  author: string;
  audioUrl: string;
  image: string;
  description: string;
  pubDate: string;
  duration: string;
}

type PlayerMode = "embed" | "custom" | "fallback";

// Audio format detection
const checkAudioSupport = (url: string): boolean => {
  if (typeof window === "undefined") return true;

  const audio = document.createElement("audio");
  if (!url) return false;

  // Check for common podcast formats
  if (url.includes(".mp3")) return !!audio.canPlayType("audio/mpeg");
  if (url.includes(".m4a")) return !!audio.canPlayType("audio/mp4");
  if (url.includes(".wav")) return !!audio.canPlayType("audio/wav");
  if (url.includes(".ogg")) return !!audio.canPlayType("audio/ogg");

  // Default to trying mp3 support
  return !!audio.canPlayType("audio/mpeg");
};

const AudioPlayer = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [playerMode, setPlayerMode] = React.useState<PlayerMode>("custom");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentTime, setCurrentTime] = React.useState(0);
  const [audioDuration, setAudioDuration] = React.useState(0);
  const [volume, setVolume] = React.useState(1);
  const [audioError, setAudioError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [canPlay, setCanPlay] = React.useState(false);
  const [dotLottie, setDotLottie] = React.useState<any>(null);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Check if we're on mobile for better UX
  const isMobile = React.useMemo(() => {
    return (
      typeof window !== "undefined" &&
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    );
  }, []);

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

  // Convert EpisodeData to DevotionalEpisode format
  const devotionalEpisode: DevotionalEpisode | null = React.useMemo(() => {
    if (!episodeData) return null;
    return {
      ...episodeData,
      link: episodeData.audioUrl || "",
      guid: `episode-${Date.now()}`,
      summary: episodeData.description,
    };
  }, [episodeData]);

  // Audio event handlers
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !episodeData?.audioUrl) return;

    // Mobile-specific setup
    if (isMobile) {
      audio.load(); // Ensure audio is properly loaded on mobile
    }

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setAudioDuration(audio.duration);
      setIsLoading(false);
    };
    const handleEnded = () => setIsPlaying(false);
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

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, [episodeData?.audioUrl, isMobile]);

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

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const dotLottieRefCallback = (dotLottieInstance: any) => {
    setDotLottie(dotLottieInstance);
  };

  if (!episodeData || !devotionalEpisode) {
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
    <div className="min-h-screen pt-[150px] pb-16 flex flex-col items-center gap-16 lg:px-20 px-4">
      <div className="flex flex-col gap-5 items-center text-center">
        <h1 className="text-[32px] md:text-[56px] leading-tight">
          {episodeData.title}
        </h1>

        <div className="flex items-center gap-4 text-deep-blue-400 flex-wrap justify-center">
          <span className="flex items-center gap-1">
            <UserRound className="w-4 h-4" /> {episodeData.author}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {episodeData.duration}
          </span>
        </div>
      </div>

      {/* Player Mode Selection */}
      {/* <div className="flex gap-2 flex-wrap justify-center">
        <Button
          variant={playerMode === "embed" ? "main" : "outline"}
          size="xs"
          onClick={() => setPlayerMode("embed")}
        >
          Embed Player
        </Button>
        <Button
          variant={playerMode === "custom" ? "main" : "outline"}
          size="xs"
          onClick={() => setPlayerMode("custom")}
        >
          Custom Player
        </Button>
        <Button
          variant={playerMode === "fallback" ? "main" : "outline"}
          size="xs"
          onClick={() => setPlayerMode("fallback")}
        >
          Fallback Player
        </Button>
      </div> */}

      {/* Audio Players */}
      <div className="w-full">
        {playerMode === "embed" && (
          <BuzzsproutPlayer
            episode={devotionalEpisode}
            height={300}
            className="mb-4"
          />
        )}

        {playerMode === "custom" && (
          <CustomAudioPlayer episode={devotionalEpisode} className="mb-4" />
        )}

        {playerMode === "fallback" && (
          <div className="bg-white rounded-lg shadow-lg border overflow-hidden">
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
              <div className="flex items-start gap-4">
                {episodeData.image && (
                  <Image
                    src={episodeData.image}
                    alt={episodeData.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg line-clamp-2">
                    {episodeData.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {episodeData.author} •{" "}
                    {new Date(episodeData.pubDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4">
              <audio controls className="w-full" preload="metadata" playsInline>
                <source src={episodeData.audioUrl} type="audio/mpeg" />
                <p className="text-gray-600">
                  Your browser does not support the audio element.
                  <a
                    href={episodeData.audioUrl}
                    className="text-orange-600 hover:text-orange-700 ml-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download the audio file
                  </a>
                </p>
              </audio>
            </div>

            <div className="p-4 border-t bg-gray-50">
              <p className="text-sm text-gray-600 line-clamp-3">
                {episodeData.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">About this episode</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {episodeData.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AudioContent = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Loading audio player...</p>
          </div>
        </div>
      }
    >
      <AudioPlayer />
    </Suspense>
  );
};

export default AudioContent;
