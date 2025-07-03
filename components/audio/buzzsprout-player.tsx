"use client";

import React from 'react';
import { DevotionalEpisode } from '@/types/devotional';

interface BuzzsproutPlayerProps {
  episode: DevotionalEpisode;
  height?: number;
  width?: string;
  className?: string;
}

const BuzzsproutPlayer: React.FC<BuzzsproutPlayerProps> = ({
  episode,
  height = 200,
  width = "100%",
  className = ""
}) => {
  // Extract episode ID from GUID or link
  const getEpisodeId = (episode: DevotionalEpisode): string | null => {
    // Try to extract from GUID first (e.g., "Buzzsprout-17368216")
    if (episode.guid && episode.guid.includes('Buzzsprout-')) {
      return episode.guid.split('Buzzsprout-')[1];
    }

    // Try to extract from link if it contains buzzsprout
    if (episode.link && episode.link.includes('buzzsprout.com')) {
      const match = episode.link.match(/\/(\d+)-/);
      if (match) return match[1];
    }

    // Try to extract from audioUrl
    if (episode.audioUrl && episode.audioUrl.includes('buzzsprout.com')) {
      const match = episode.audioUrl.match(/\/(\d+)-/);
      if (match) return match[1];
    }

    return null;
  };

  const episodeId = getEpisodeId(episode);

  // Buzzsprout podcast ID (from the RSS feed URL)
  const podcastId = "2144763";

  // If we can't extract episode ID, show fallback
  if (!episodeId) {
    return (
      <div className={`bg-gray-100 rounded-lg p-6 text-center ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {episode.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {episode.author} • {episode.duration ? `${episode.duration}s` : 'Audio'}
            </p>
            <a
              href={episode.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6 4h1m4 0h1M8 16h.01M12 16h.01M16 16h.01M8 20h.01M12 20h.01M16 20h.01" />
              </svg>
              Listen on Buzzsprout
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Buzzsprout embed URL
  const embedUrl = `https://www.buzzsprout.com/${podcastId}/${episodeId}?client_source=small_player&iframe=true`;

  return (
    <div className={`bg-white rounded-lg shadow-sm border ${className}`}>
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {episode.title}
        </h3>
        <p className="text-sm text-gray-600">
          {episode.author} • {new Date(episode.pubDate).toLocaleDateString()}
        </p>
      </div>

      <div className="p-4">
        <iframe
          src={embedUrl}
          width={width}
          height={height}
          frameBorder="0"
          scrolling="no"
          title={`${episode.title} - Audio Player`}
          className="w-full rounded"
          allow="autoplay"
          style={{ minHeight: `${height}px` }}
        />
      </div>

      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm text-gray-600 line-clamp-3">
          {episode.summary || episode.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            Duration: {episode.duration ? `${Math.floor(parseInt(episode.duration) / 60)}:${(parseInt(episode.duration) % 60).toString().padStart(2, '0')}` : 'Unknown'}
          </span>
          <a
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-orange-600 hover:text-orange-700 font-medium"
          >
            View on Buzzsprout →
          </a>
        </div>
      </div>
    </div>
  );
};

export default BuzzsproutPlayer;
