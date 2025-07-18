// components/LiveButton.tsx
"use client";
import { Circle } from "lucide-react";
import { useEffect, useState } from "react";

type LiveStatus = {
  isLive: boolean;
  videoId: string | null;
};

export default function LiveButton() {
  const [live, setLive] = useState<LiveStatus>({
    isLive: false,
    videoId: null,
  });

  useEffect(() => {
    async function fetchLiveStatus() {
      const res = await fetch("/api/live-status");
      const data: LiveStatus = await res.json();
      setLive(data);
    }

    fetchLiveStatus();
  }, []);

  if (live.isLive) return null;

  return (
    <a
      href="/live"
      className="bg-orange-600 text-orange-100 flex items-center gap-2 px-4 py-2 rounded-full hover:bg-orange-900 transition fixed bottom-10 right-10 z-50"
    >
      <Circle size={16} />
      <p>Live Now</p>
    </a>
  );
}
