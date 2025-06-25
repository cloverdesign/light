export interface DevotionalEpisode {
  title: string;
  description: string;
  pubDate: string;
  guid: string;
  link: string;
  author: string;
  duration: string;
  summary: string;
  image: string;
  audioUrl: string;
}

export interface DevotionalApiResponse {
  episodes: DevotionalEpisode[];
  totalCount: number;
  lastUpdated?: string;
  error?: string;
  message?: string;
}

export interface RawRssItem {
  title?: string[];
  description?: string[];
  pubDate?: string[];
  guid?: string[];
  link?: string[];
  "itunes:author"?: string[];
  "itunes:duration"?: string[];
  "itunes:summary"?: string[];
  "itunes:image"?: Array<{
    $: {
      href: string;
    };
  }>;
  enclosure?: Array<{
    $: {
      url: string;
      type: string;
      length: string;
    };
  }>;
}

export interface RssChannel {
  title: string[];
  description: string[];
  link: string[];
  language: string[];
  pubDate: string[];
  item: RawRssItem[];
  "itunes:image"?: Array<{
    $: {
      href: string;
    };
  }>;
  "itunes:summary"?: string[];
  image?: Array<{
    url: string[];
  }>;
}

export interface RssResponse {
  rss: {
    channel: RssChannel[];
  };
}
