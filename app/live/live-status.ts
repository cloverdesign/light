import { checkLiveStatus } from "@/lib/youtube";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const channelId = process.env.YOUTUBE_CHANNEL_ID!;
  const apiKey = process.env.YOUTUBE_API_KEY!;

  const data = await checkLiveStatus(channelId, apiKey);
  res.status(200).json(data);
}
