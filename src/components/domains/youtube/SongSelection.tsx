'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { YouTubeSong } from '@/data/types';
import { Youtube, Clock } from 'lucide-react';

interface SongSelectionProps {
  songs: YouTubeSong[];
  selectedSong: YouTubeSong;
  onSelectSong: (song: YouTubeSong) => void;
}

export function SongSelection({ songs, selectedSong, onSelectSong }: SongSelectionProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Youtube className="h-5 w-5 text-red-500" />
        YouTube 영상 선택
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {songs.map((song) => (
          <motion.div
            key={song.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${selectedSong.id === song.id
                ? 'ring-2 ring-red-500 bg-red-50'
                : 'hover:shadow-lg bg-white/80'
                }`}
              onClick={() => onSelectSong(song)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <Youtube className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{song.title}</CardTitle>
                    <p className="text-sm text-gray-600">{song.artist}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatTime(song.duration)}
                  </Badge>
                  <Badge variant="secondary">{song.lyrics.length}개 가사</Badge>
                  <Badge variant="outline" className="bg-red-50 text-red-600">
                    YouTube 연동
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
