import { NextResponse } from "next/server";
import { parseStringPromise } from "xml2js";
import {
  DevotionalApiResponse,
  DevotionalEpisode,
  RawRssItem,
  RssResponse,
} from "@/types/devotional";

export async function GET() {
  try {
    const RSS_URL = "https://feeds.buzzsprout.com/2144763.rss";

    // Fetch the RSS feed directly from the server (no CORS issues)
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Devotionals-App/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlText = await response.text();

    // Parse XML to JSON
    const jsonData: RssResponse = await parseStringPromise(xmlText);

    // Extract channel information
    const channel = jsonData.rss.channel[0];
    const channelImage =
      channel["itunes:image"]?.[0]?.["$"]?.href ||
      channel.image?.[0]?.url?.[0] ||
      "https://storage.buzzsprout.com/y8qcr4i7zrrpicen7oz21olq91u3?.jpg";
    const channelDescription =
      channel.description?.[0] ||
      channel["itunes:summary"]?.[0] ||
      "Daily devotional content from Chris Oyakhilome";

    // Extract episodes from the parsed data
    const episodes: RawRssItem[] = channel.item || [];

    // Helper function to clean up titles by removing dates
    const cleanTitle = (title: string): string => {
      // Split on hyphen and take everything after the first hyphen
      const parts = title.split(" - ");
      if (parts.length > 1) {
        // Join back in case there are multiple hyphens, but skip the first part (the date)
        return parts.slice(1).join(" - ").trim();
      }
      return title.trim();
    };

    // Helper function to format duration
    const formatDuration = (duration: string): string => {
      if (!duration) return "Audio";
      const seconds = parseInt(duration);
      if (isNaN(seconds)) return "Audio";

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (minutes > 0) {
        return `${minutes}:${remainingSeconds.toString().padStart(2, "0")} min`;
      }
      return `${seconds} sec`;
    };

    // Transform the data to a cleaner format
    const cleanedEpisodes: DevotionalEpisode[] = episodes.map(
      (episode: RawRssItem): DevotionalEpisode => {
        const rawTitle = episode.title?.[0] || "Untitled";
        const cleanedTitle = cleanTitle(rawTitle);

        return {
          title: cleanedTitle,
          description: channelDescription,
          pubDate: episode.pubDate?.[0] || "",
          guid: episode.guid?.[0] || "",
          link: episode.link?.[0] || "",
          author: episode["itunes:author"]?.[0] || "Chris Oyakhilome",
          duration: formatDuration(episode["itunes:duration"]?.[0] || ""),
          summary: episode["itunes:summary"]?.[0] || channelDescription,
          image: channelImage,
          audioUrl: episode.enclosure?.[0]?.["$"]?.url || "",
        };
      },
    );

    const finalResponse = {
      episodes: cleanedEpisodes,
      totalCount: cleanedEpisodes.length,
      lastUpdated: new Date().toISOString(),
    };

    // Return the data with caching headers
    return NextResponse.json<DevotionalApiResponse>(finalResponse, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching RSS feed:", error);

    return NextResponse.json<DevotionalApiResponse>(
      {
        error: "Failed to fetch devotionals",
        message: error instanceof Error ? error.message : "Unknown error",
        episodes: [],
        totalCount: 0,
        lastUpdated: new Date().toISOString(),
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
