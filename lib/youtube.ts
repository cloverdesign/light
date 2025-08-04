export type LiveStatus = {
  isLive: boolean;
  videoId: string | null;
  title?: string;
};

export async function checkLiveStatus(
  channelId: string,
  apiKey: string,
): Promise<LiveStatus> {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.items && data.items.length > 0) {
    const videoId = data.items[0].id.videoId;
    return {
      isLive: true,
      videoId,
      title: data.items[0].snippet.title,
    };
  }

  return { isLive: false, videoId: null };
}
