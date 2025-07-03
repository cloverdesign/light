import ResourceDetailCard from "@/components/resources/resource-detail-card";
import ResourceDetailNewCard from "@/components/resources/resource-detail-new-card";
import { Badge } from "@/components/ui/badge";
import { BookHeart, BookOpen, FileWarning, FlameIcon } from "lucide-react";
import { DevotionalEpisode, DevotionalApiResponse } from "@/types/devotional";
import xml2js from "xml2js";

// Server-side function to fetch RSS feed directly
async function fetchDevotionalFeed(): Promise<DevotionalEpisode[]> {
  try {
    const response = await fetch('https://feeds.buzzsprout.com/2144763.rss', {
      // Add caching for better performance
      next: { revalidate: 300 }, // Revalidate every 5 minutes
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

// Server Component for SSR
export default async function DevotionalsSSR() {
  // Fetch data on the server
  const episodes = await fetchDevotionalFeed();

  // Take first 7 episodes for initial display
  const displayEpisodes = episodes.slice(0, 7);
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
            <ResourceDetailNewCard
              key={`featured-${featuredEpisode.pubDate}`}
              title={featuredEpisode.title}
              description={stripHtmlTags(featuredEpisode.description)}
              author={featuredEpisode.author}
              duration={featuredEpisode.duration || "Audio"}
              date={new Date(featuredEpisode.pubDate).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              image={featuredEpisode.image}
              type="audio"
              className="md:col-span-2 lg:col-span-3"
              onClick={() => {
                // Client-side navigation will be handled by the component
                const episodeData = encodeURIComponent(
                  JSON.stringify({
                    title: featuredEpisode.title,
                    author: featuredEpisode.author,
                    audioUrl: featuredEpisode.audioUrl,
                    image: featuredEpisode.image,
                    description: stripHtmlTags(featuredEpisode.description),
                    pubDate: featuredEpisode.pubDate,
                    duration: featuredEpisode.duration,
                  })
                );
                window.location.href = `/resources/devotionals/content/audio?episode=${episodeData}`;
              }}
            />
          </>
        )}

        {/* Regular cards */}
        {regularEpisodes.map((episode: DevotionalEpisode, index: number) => (
          <ResourceDetailCard
            key={`regular-${episode.pubDate}-${index}`}
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
            onClick={() => {
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
            }}
          />
        ))}
      </>
    );
  };

  return (
    <section className="pt-[100px] font-body flex flex-col gap-16 mb-[100px]">
      <div className="bg-yellow-400 relative h-[30vh] lg:h-[40vh] overflow-hidden flex flex-col justify-center gap-4 px-16">
        <h1 className="text-[56px] leading-[72px] lg:text-[112px] lg:leading-[111px] text-yellow-1100 relative z-[2]">
          Devotionals
        </h1>
        <p className="text-2xl text-yellow-1000 relative z-[2]">
          Weekly or monthly posts to encourage spiritual growth.
        </p>
        <BookOpen className="text-yellow-600 size-[460px] absolute -bottom-12 -right-8 -rotate-[24deg] z-[1] pointer-events-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-8 relative">
        {renderContent()}
      </div>

      {/* Static message for additional content */}
      {episodes.length > 7 && (
        <div className="text-center p-8">
          <p className="text-gray-600 mb-4">
            Showing latest 7 devotionals. More episodes available in the full interactive version.
          </p>
          <a
            href="/resources/devotionals"
            className="inline-block bg-yellow-500 text-yellow-1100 px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            View All Devotionals
          </a>
        </div>
      )}
    </section>
  );
}
