import ResourceDetailCard from "@/components/resources/resource-detail-card";
import ResourceDetailNewCard from "@/components/resources/resource-detail-new-card";
import { Badge } from "@/components/ui/badge";
import { BookHeart, BookOpen, FileWarning, FlameIcon } from "lucide-react";
import { DevotionalEpisode } from "@/types/devotional";
import xml2js from "xml2js";
import { Metadata } from "next";

// ISR: This page will be statically generated at build time and revalidated every 5 minutes
export const revalidate = 300; // 5 minutes

// Generate metadata for better SEO
export async function generateMetadata(): Promise<Metadata> {
  const episodes = await fetchDevotionalFeed();
  const latestEpisode = episodes[0];

  return {
    title: "Devotionals - Daily Spiritual Growth | Light",
    description: latestEpisode
      ? `Latest devotional: ${latestEpisode.title}. Weekly or monthly posts to encourage spiritual growth.`
      : "Weekly or monthly posts to encourage spiritual growth.",
    keywords: ["devotionals", "spiritual growth", "daily devotions", "Chris Oyakhilome"],
    openGraph: {
      title: "Devotionals - Daily Spiritual Growth",
      description: "Weekly or monthly posts to encourage spiritual growth.",
      images: latestEpisode?.image ? [latestEpisode.image] : [],
    },
  };
}

// Server-side function to fetch RSS feed directly
async function fetchDevotionalFeed(): Promise<DevotionalEpisode[]> {
  try {
    const response = await fetch('https://feeds.buzzsprout.com/2144763.rss', {
      // Cache for 5 minutes, but allow stale data for up to 1 hour while revalidating
      next: {
        revalidate: 300,
        tags: ['devotionals']
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const xmlData = await response.text();
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(xmlData);

    const items = result.rss?.channel?.[0]?.item || [];
    const episodes: DevotionalEpisode[] = items.map((item: any) => ({
      title: item.title?.[0] || 'Untitled',
      description: item.description?.[0] || '',
      pubDate: item.pubDate?.[0] || new Date().toISOString(),
      guid: item.guid?.[0]?._ || item.guid?.[0] || '',
      link: item.link?.[0] || '',
      author: item['itunes:author']?.[0] || item.author?.[0] || 'Chris Oyakhilome',
      duration: item['itunes:duration']?.[0] || '',
      summary: item['itunes:summary']?.[0] || item.description?.[0] || '',
      image: item['itunes:image']?.[0]?.$?.href ||
        result.rss?.channel?.[0]?.image?.[0]?.url?.[0] ||
        '/images/default-devotional.jpg',
      audioUrl: item.enclosure?.[0]?.$?.url || item.link?.[0] || '',
    }));

    return episodes;
  } catch (error) {
    console.error('Error fetching devotional feed:', error);
    // Return empty array instead of throwing to ensure page still renders
    return [];
  }
}

// Utility function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim();
};

// Client Component for interactive features
function DevotionalCard({ episode, isFeatured = false }: { episode: DevotionalEpisode, isFeatured?: boolean }) {
  const handleClick = () => {
    const episodeData = encodeURIComponent(
      JSON.stringify({
        title: episode.title,
        author: episode.author,
        audioUrl: episode.audioUrl,
        image: episode.image,
        description: stripHtmlTags(episode.description),
        pubDate: episode.pubDate,
        duration: episode.duration,
      })
    );
    window.location.href = `/resources/devotionals/content/audio?episode=${episodeData}`;
  };

  if (isFeatured) {
    return (
      <ResourceDetailNewCard
        key={`featured-${episode.pubDate}`}
        title={episode.title}
        description={stripHtmlTags(episode.description)}
        author={episode.author}
        duration={episode.duration || "Audio"}
        date={new Date(episode.pubDate).toLocaleDateString("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        image={episode.image}
        type="audio"
        className="md:col-span-2 lg:col-span-3"
        onClick={handleClick}
      />
    );
  }

  return (
    <ResourceDetailCard
      key={`regular-${episode.pubDate}`}
      title={episode.title}
      description={
        stripHtmlTags(episode.description)?.substring(0, 120) + "..." ||
        "No description available"
      }
      author={episode.author}
      duration={episode.duration || "Audio"}
      date={new Date(episode.pubDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      })}
      image={episode.image}
      type="audio"
      onClick={handleClick}
    />
  );
}

// Main Server Component with ISR
export default async function DevotionalsHybrid() {
  // Fetch data on the server at build time and revalidate every 5 minutes
  const episodes = await fetchDevotionalFeed();

  // Take first 20 episodes for initial display
  const displayEpisodes = episodes.slice(0, 20);
  const featuredEpisode = displayEpisodes[0];
  const regularEpisodes = displayEpisodes.slice(1);

  const renderContent = () => {
    if (!episodes || episodes.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center p-12 gap-4 col-span-3">
          <FileWarning className="w-16 h-16 text-orange-500" />
          <h3 className="text-[32px] text-gray-800">
            Unable to load devotionals
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            We&apos;re having trouble loading the devotional feed at the moment.
            Please try again later.
          </p>
        </div>
      );
    }

    return (
      <>
        {/* Featured card */}
        {featuredEpisode && (
          <>
            <Badge className="bg-orange-600 text-orange-100 w-fit border-white absolute top-2 left-4 z-[5] -rotate-[9deg]">
              <FlameIcon />
              <p>Just In</p>
            </Badge>
            <DevotionalCard episode={featuredEpisode} isFeatured={true} />
          </>
        )}

        {/* Regular cards */}
        {regularEpisodes.map((episode: DevotionalEpisode, index: number) => (
          <DevotionalCard key={`regular-${episode.pubDate}-${index}`} episode={episode} />
        ))}
      </>
    );
  };

  return (
    <section className="pt-[100px] font-body flex flex-col gap-16 mb-[100px]">
      {/* Hero Section */}
      <div className="bg-yellow-400 relative h-[30vh] lg:h-[40vh] overflow-hidden flex flex-col justify-center gap-4 px-16">
        <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-yellow-1100 relative z-[2]">
          Devotionals
        </h1>
        <p className="text-2xl text-yellow-1000 relative z-[2]">
          Weekly or monthly posts to encourage spiritual growth.
        </p>
        <BookOpen className="text-yellow-600 size-[460px] absolute -bottom-12 -right-8 -rotate-[24deg] z-[1] pointer-events-none" />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-8 relative">
        {renderContent()}
      </div>

      {/* Interactive features notice */}
      {episodes.length > 20 && (
        <div className="text-center p-8 bg-gray-50 rounded-lg mx-8">
          <p className="text-gray-600 mb-4">
            Showing latest 20 devotionals. For advanced features like search, filtering, and pagination, visit our interactive version.
          </p>
          <a
            href="/resources/devotionals"
            className="inline-block bg-yellow-500 text-yellow-1100 px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
          >
            View Interactive Version
          </a>
        </div>
      )}

      {/* SEO Benefits */}
      <div className="hidden">
        {/* Hidden structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Devotionals",
              "description": "Weekly or monthly posts to encourage spiritual growth",
              "itemListElement": displayEpisodes.map((episode, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": {
                  "@type": "AudioObject",
                  "name": episode.title,
                  "description": stripHtmlTags(episode.description),
                  "author": episode.author,
                  "datePublished": episode.pubDate,
                  "contentUrl": episode.audioUrl,
                  "thumbnailUrl": episode.image,
                  "duration": episode.duration,
                }
              }))
            })
          }}
        />
      </div>
    </section>
  );
}
