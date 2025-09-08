'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { SongSelection } from '@/components/domains/youtube/SongSelection';
import { YouTubePlayer } from '@/components/domains/youtube/YouTubePlayer';
import { LyricsSidebar } from '@/components/domains/youtube/LyricsSidebar';
import { CurrentLyricDisplay } from '@/components/domains/youtube/CurrentLyricDisplay';
import { youtubeSongs } from '@/lib/japanese-data';
import { Badge } from '@/components/ui/badge';
import { Youtube } from 'lucide-react';
import YouTube, { YouTubePlayer as YTPlayer } from 'react-youtube';

export function YouTubeContainer() {
  const [selectedSong, setSelectedSong] = useState(youtubeSongs[0]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);
  const [showKorean, setShowKorean] = useState(true);
  const [showRomaji, setShowRomaji] = useState(true);
  const [playerReady, setPlayerReady] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const timeUpdateRef = useRef<NodeJS.Timeout>();

  // YouTube player options
  const opts = {
    height: '360',
    width: '640',
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      showinfo: 0,
      fs: 1,
      cc_load_policy: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
  };

  // YouTube player event handlers
  const onReady = useCallback((event: { target: YTPlayer }) => {
    playerRef.current = event.target;
    setPlayerReady(true);
    playerRef.current.setVolume(volume);
  }, [volume]);

  const onPlay = useCallback(() => {
    setIsPlaying(true);
    startTimeTracking();
  }, []);

  const onPause = useCallback(() => {
    setIsPlaying(false);
    stopTimeTracking();
  }, []);

  const onEnd = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLyricIndex(-1);
    stopTimeTracking();
  }, []);

  const onStateChange = useCallback((event: { data: number }) => {
    if (event.data === 1) { // PLAYING
      onPlay();
    } else if (event.data === 2) { // PAUSED
      onPause();
    } else if (event.data === 0) { // ENDED
      onEnd();
    }
  }, [onPlay, onPause, onEnd]);

  // Time tracking
  const startTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      clearInterval(timeUpdateRef.current);
    }

    timeUpdateRef.current = setInterval(() => {
      if (playerRef.current && playerReady) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 100);
  }, [playerReady]);

  const stopTimeTracking = useCallback(() => {
    if (timeUpdateRef.current) {
      clearInterval(timeUpdateRef.current);
      timeUpdateRef.current = undefined;
    }
  }, []);

  // Find current lyric based on time
  useEffect(() => {
    const currentLyric = selectedSong.lyrics.findIndex(lyric =>
      currentTime >= lyric.startTime && currentTime <= lyric.endTime
    );
    setCurrentLyricIndex(currentLyric);
  }, [currentTime, selectedSong.lyrics]);

  // Control functions
  const seekToTime = (time: number) => {
    if (playerRef.current && playerReady) {
      playerRef.current.seekTo(time, true);
      setCurrentTime(time);
    }
  };

  const selectSong = (song: typeof selectedSong) => {
    setSelectedSong(song);
    setCurrentTime(0);
    setCurrentLyricIndex(-1);
    setIsPlaying(false);
    stopTimeTracking();
  };

  // Cleanup
  useEffect(() => {
    return () => {
      stopTimeTracking();
    };
  }, [stopTimeTracking]);

  const headerChildren = (
    <div className="flex items-center gap-2">
      <Badge variant="outline" className="bg-red-100 text-red-600">
        실시간 동기화
      </Badge>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-100 p-4">
      <div className="container mx-auto max-w-7xl">
        <PageHeader
          title="YouTube J-Pop 학습"
          subtitle="실제 영상과 동기화된 가사로 일본어를 배워보세요!"
          gradientFrom="from-red-500 via-orange-500"
          gradientTo="to-yellow-500"
        >
          {headerChildren}
        </PageHeader>

        <SongSelection
          songs={youtubeSongs}
          selectedSong={selectedSong}
          onSelectSong={selectSong}
        />

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <YouTubePlayer
            selectedSong={selectedSong}
            currentTime={currentTime}
            isPlaying={isPlaying}
            playerReady={playerReady}
            volume={volume}
            isMuted={isMuted}
            showKorean={showKorean}
            showRomaji={showRomaji}
            setShowKorean={setShowKorean}
            setShowRomaji={setShowRomaji}
            playerRef={playerRef}
            opts={opts}
            onReady={onReady}
            onStateChange={onStateChange}
            seekToTime={seekToTime}
          />

          <div className="space-y-4">
            <LyricsSidebar
              lyrics={selectedSong.lyrics}
              currentLyricIndex={currentLyricIndex}
              showKorean={showKorean}
              showRomaji={showRomaji}
              seekToTime={seekToTime}
            />

            {currentLyricIndex >= 0 && (
              <CurrentLyricDisplay
                lyric={selectedSong.lyrics[currentLyricIndex]}
                showKorean={showKorean}
                showRomaji={showRomaji}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
