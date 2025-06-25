"use client";
import ResourceDetailCard from "@/components/resources/resource-detail-card";
import ResourceDetailNewCard from "@/components/resources/resource-detail-new-card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BookHeart,
  BookOpen,
  FileWarning,
  FlameIcon,
  Search,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";

import { useQuery } from "@tanstack/react-query";
import { DevotionalEpisode, DevotionalApiResponse } from "@/types/devotional";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { useWindowSize } from "@uidotdev/usehooks";

// Utility function to strip HTML tags from text
const stripHtmlTags = (html: string): string => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, " ")
    .trim();
};

const Devotionals = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const { width } = useWindowSize();

  // Show featured card only on first page with no search
  const showFeaturedCard = currentPage === 1 && !searchQuery.trim();
  const itemsPerPage = showFeaturedCard ? 7 : 6; // 1 featured + 6 regular, or 6 regular cards
  const isMobile = (width || 0) < 768;

  const fetchFeed = async (): Promise<DevotionalEpisode[]> => {
    const response = await fetch("/api/devotionals");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DevotionalApiResponse = await response.json();

    if (data.error) {
      throw new Error(data.message || "Failed to fetch devotionals");
    }

    return data.episodes;
  };

  const usePodcastFeed = () => {
    return useQuery({
      queryKey: ["podcastFeed"],
      queryFn: fetchFeed,
      staleTime: 1000 * 60 * 5,
    });
  };

  const { data: episodes, isLoading, error } = usePodcastFeed();

  // Filter episodes based on search query
  const filteredEpisodes = React.useMemo(() => {
    if (!episodes) return [];
    if (!searchQuery.trim()) return episodes;

    const query = searchQuery.toLowerCase();
    return episodes.filter(
      (episode) =>
        episode.title.toLowerCase().includes(query) ||
        stripHtmlTags(episode.description).toLowerCase().includes(query) ||
        episode.author.toLowerCase().includes(query),
    );
  }, [episodes, searchQuery]);

  // Calculate pagination
  const totalPages = React.useMemo(() => {
    if (filteredEpisodes.length === 0) return 0;

    if (searchQuery.trim()) {
      // When searching, no featured card, so 6 items per page
      return Math.ceil(filteredEpisodes.length / 6);
    } else {
      // No search: first page has 1 featured + 6 regular, rest have 6 regular
      if (filteredEpisodes.length <= 7) return 1;
      return Math.ceil((filteredEpisodes.length - 7) / 6) + 1;
    }
  }, [filteredEpisodes.length, searchQuery]);

  const paginatedEpisodes = React.useMemo(() => {
    if (searchQuery.trim()) {
      // When searching, simple pagination with 6 items per page
      const startIndex = (currentPage - 1) * 6;
      return filteredEpisodes.slice(startIndex, startIndex + 6);
    } else {
      // No search: different logic for first page vs others
      if (currentPage === 1) {
        // First page: show up to 7 items (1 featured + 6 regular)
        return filteredEpisodes.slice(0, 7);
      } else {
        // Other pages: show 6 regular items, accounting for the 7 items on first page
        const startIndex = 7 + (currentPage - 2) * 6;
        return filteredEpisodes.slice(startIndex, startIndex + 6);
      }
    }
  }, [filteredEpisodes, currentPage, searchQuery]);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Scroll to top when page changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle card click to navigate to audio page
  const handleCardClick = (episode: DevotionalEpisode) => {
    // Encode episode data to pass via URL params
    const episodeData = encodeURIComponent(
      JSON.stringify({
        title: episode.title,
        author: episode.author,
        audioUrl: episode.audioUrl,
        image: episode.image,
        description: stripHtmlTags(episode.description),
        pubDate: episode.pubDate,
        duration: episode.duration,
      }),
    );

    router.push(`/resources/devotionals/content/audio?episode=${episodeData}`);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center p-12 gap-4 col-span-3">
          <BookHeart className="w-16 h-16 text-yellow-500 animate-bounce -rotate-[6deg]" />
          <p className="text-lg text-gray-600">Loading devotionals...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center p-12 gap-4 col-span-3">
          <FileWarning className="w-16 h-16 text-orange-500" />
          <h3 className="text-[32px] text-gray-800">
            Unable to load devotionals
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            We&apos;re having trouble connecting to our devotional feed. Please
            check your internet connection and try again later.
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      );
    }

    if (!filteredEpisodes || filteredEpisodes.length === 0) {
      if (searchQuery.trim()) {
        return (
          <div className="flex flex-col items-center justify-center p-12 gap-4 col-span-3">
            <Search className="w-16 h-16 text-orange-500" />
            <h3 className="text-xl font-semibold text-gray-800">
              No results found
            </h3>
            <p className="text-gray-600 text-center max-w-md">
              No devotionals match your search for "{searchQuery}". Try
              different keywords.
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
          </div>
        );
      }
      return (
        <div className="flex flex-col items-center justify-center p-12 gap-4 col-span-3">
          <BookHeart className="w-16 h-16 text-orange-500" />
          <h3 className="text-xl font-semibold text-gray-800">
            No devotionals found
          </h3>
          <p className="text-gray-600">
            Check back later for new devotional content.
          </p>
        </div>
      );
    }

    // Show actual data when available
    return (
      <>
        {/* Featured card - only show on first page with no search */}
        {showFeaturedCard && paginatedEpisodes.length > 0 && (
          <>
            <Badge className="bg-orange-600 text-orange-100 w-fit border-white absolute top-2 left-4 z-[5] -rotate-[9deg]">
              <FlameIcon />
              <p>Just In</p>
            </Badge>
            <ResourceDetailNewCard
              key={`featured-${paginatedEpisodes[0].pubDate || "latest"}`}
              title={paginatedEpisodes[0].title || "Untitled"}
              description={
                stripHtmlTags(paginatedEpisodes[0].description) ||
                "No description available"
              }
              author={paginatedEpisodes[0].author || "Chris Oyakhilome"}
              duration={paginatedEpisodes[0].duration || "Audio"}
              date={new Date(
                paginatedEpisodes[0].pubDate || Date.now(),
              ).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              image={paginatedEpisodes[0].image}
              type="audio"
              className="md:col-span-2 lg:col-span-3"
              onClick={() => handleCardClick(paginatedEpisodes[0])}
            />
          </>
        )}

        {/* Regular cards */}
        {paginatedEpisodes
          .slice(showFeaturedCard ? 1 : 0)
          .map((episode: DevotionalEpisode, index: number) => (
            <ResourceDetailCard
              key={`regular-${episode.pubDate || `${currentPage}-${index}`}`}
              title={episode.title || "Untitled"}
              description={
                stripHtmlTags(episode.description)?.substring(0, 120) + "..." ||
                "No description available"
              }
              author={episode.author || "Chris Oyakhilome"}
              duration={episode.duration || "Audio"}
              date={new Date(episode.pubDate || Date.now()).toLocaleDateString(
                "en-US",
                {
                  day: "numeric",
                  month: "long",
                },
              )}
              image={episode.image}
              type="audio"
              onClick={() => handleCardClick(episode)}
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
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <Input
          icon="search"
          placeholder="Search for devotional material"
          className="md:w-3/5 px-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery.trim() && (
          <p className="text-gray-600 text-sm">
            {filteredEpisodes.length === 0
              ? "No results found"
              : `Found ${filteredEpisodes.length} devotional${
                  filteredEpisodes.length === 1 ? "" : "s"
                } matching "${searchQuery}"`}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-8 relative">
        {renderContent()}
      </div>

      {filteredEpisodes && totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                back
              </PaginationPrevious>
            </PaginationItem>

            {/* First page */}
            {totalPages > 0 && (
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === 1}
                  size="xs"
                  onClick={() => setCurrentPage(1)}
                  className="cursor-pointer"
                >
                  1
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage > (isMobile ? 2 : 3) &&
              totalPages > (isMobile ? 4 : 5) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

            {/* Current page and neighbors */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (isMobile) {
                  // Mobile: Show only current page ± 1
                  if (totalPages <= 3) return page > 1 && page < totalPages;
                  return (
                    page >= currentPage - 1 &&
                    page <= currentPage + 1 &&
                    page > 1 &&
                    page < totalPages
                  );
                } else {
                  // Desktop: Show more pages
                  if (totalPages <= 4) return page > 1 && page < totalPages;
                  if (currentPage <= 3)
                    return page > 1 && page <= 4 && page < totalPages;
                  if (currentPage >= totalPages - 2)
                    return (
                      page >= totalPages - 3 && page > 1 && page < totalPages
                    );
                  return (
                    page >= currentPage - 1 &&
                    page <= currentPage + 1 &&
                    page > 1 &&
                    page < totalPages
                  );
                }
              })
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    size="xs"
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 &&
              totalPages > (isMobile ? 4 : 5) && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}

            {/* Last page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  isActive={currentPage === totalPages}
                  size="xs"
                  onClick={() => setCurrentPage(totalPages)}
                  className="cursor-pointer"
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              >
                next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </section>
  );
};

export default Devotionals;
