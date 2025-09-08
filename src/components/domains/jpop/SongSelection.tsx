'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Song } from '@/lib/japanese-data';
import { Music } from 'lucide-react';

interface SongSelectionProps {
  songs: Song[];
  selectedSong: Song;
  onSongChange: (index: number) => void;
}

export function SongSelection({ songs, selectedSong, onSongChange }: SongSelectionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Music className="h-5 w-5" />
        노래 선택
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        {songs.map((song, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className={`cursor-pointer transition-all duration-200 ${selectedSong === song
                  ? 'ring-2 ring-purple-500 bg-purple-50'
                  : 'hover:shadow-lg bg-white/80'
                }`}
              onClick={() => onSongChange(index)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">{song.title}</CardTitle>
                <p className="text-sm text-gray-600">{song.artist}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{song.lyrics.length}줄</Badge>
                  <Badge variant="secondary">J-Pop</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
