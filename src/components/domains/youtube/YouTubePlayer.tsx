'use client';

import { MutableRefObject } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { YouTubeSong } from '@/data/types';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Eye,
  EyeOff
} from 'lucide-react';
import YouTube, { YouTubePlayer as YTPlayer } from 'react-youtube';

interface YouTubePlayerProps {
  selectedSong: YouTubeSong;
  currentTime: number;
  isPlaying: boolean;
  playerReady: boolean;
  isMuted: boolean;
  showKorean: boolean;
  showRomaji: boolean;
  currentLyricIndex: number;
  setShowKorean: (show: boolean) => void;
  setShowRomaji: (show: boolean) => void;
  playerRef: MutableRefObject<YTPlayer | null>;
  opts: unknown;
  onReady: (event: { target: YTPlayer }) => void;
  onStateChange: (event: { data: number }) => void;
  seekToTime: (time: number) => void;
  toggleMute: () => void;
}

export function YouTubePlayer({
  selectedSong,
  currentTime,
  isPlaying,
  playerReady,
  isMuted,
  showKorean,
  showRomaji,
  currentLyricIndex,
  setShowKorean,
  setShowRomaji,
  playerRef,
  opts,
  onReady,
  onStateChange,
  seekToTime,
  toggleMute
}: YouTubePlayerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (!playerRef.current || !playerReady) return;

    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  };

  const skipForward = () => {
    // 다음 가사 구간으로 이동
    const nextLyricIndex = currentLyricIndex + 1;
    if (nextLyricIndex < selectedSong.lyrics.length) {
      seekToTime(selectedSong.lyrics[nextLyricIndex].startTime);
    } else {
      // 마지막 가사라면 곡의 끝으로 이동
      seekToTime(selectedSong.duration - 1);
    }
  };

  const skipBackward = () => {
    // 이전 가사 구간으로 이동
    if (currentLyricIndex > 0) {
      seekToTime(selectedSong.lyrics[currentLyricIndex - 1].startTime);
    } else if (currentLyricIndex === 0) {
      // 첫 번째 가사라면 곡의 시작으로 이동
      seekToTime(0);
    } else {
      // 현재 가사가 없으면 현재 시간 이전의 가장 가까운 가사로 이동
      const previousLyric = selectedSong.lyrics
        .slice()
        .reverse()
        .find(lyric => lyric.startTime < currentTime);

      if (previousLyric) {
        seekToTime(previousLyric.startTime);
      } else {
        seekToTime(0);
      }
    }
  };

  // toggleMute 함수는 props로 받음

  return (
    <div className="space-y-4">
      {/* YouTube Player - 모바일 최적화 */}
      <Card className="bg-black">
        <CardContent className="p-2 sm:p-4">
          <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
            <YouTube
              videoId={selectedSong.youtubeId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Custom Controls - 모바일 최적화 */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-3 sm:p-4">
          {/* Progress Bar - 모바일 최적화 */}
          <div className="mb-3 sm:mb-4">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(selectedSong.duration)}</span>
            </div>
            <div className="relative">
              <Progress
                value={(currentTime / selectedSong.duration) * 100}
                className="h-2 cursor-pointer"
              />
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = Math.max(0, Math.min(1, x / rect.width));
                  const newTime = percentage * selectedSong.duration;
                  seekToTime(newTime);
                }}
              />
            </div>
          </div>

          {/* Control Buttons - 모바일 최적화 */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={skipBackward}
              disabled={!playerReady}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={togglePlayPause}
              size="lg"
              disabled={!playerReady}
              className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={skipForward}
              disabled={!playerReady}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume and Settings - 모바일 친화적 레이아웃 */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMute}
                disabled={!playerReady}
                className="flex-shrink-0"
              >
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                <span className="hidden sm:inline ml-1">분류</span>
              </Button>
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRomaji(!showRomaji)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showRomaji ? 'bg-blue-100' : ''
                  }`}
              >
                {showRomaji ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span className="ml-1">한국어 발음</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowKorean(!showKorean)}
                className={`flex-shrink-0 text-xs sm:text-sm ${showKorean ? 'bg-green-100' : ''
                  }`}
              >
                {showKorean ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                <span className="ml-1">한국어</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
