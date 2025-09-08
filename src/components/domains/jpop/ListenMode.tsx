'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Song } from '@/lib/japanese-data';
import { Play, Pause, SkipForward, SkipBack, Lightbulb } from 'lucide-react';

interface ListenModeProps {
  selectedSong: Song;
  currentLineIndex: number;
  setCurrentLineIndex: (index: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  vocabulary: Array<{ word: string, meaning: string }>;
}

export function ListenMode({
  selectedSong,
  currentLineIndex,
  setCurrentLineIndex,
  isPlaying,
  setIsPlaying,
  vocabulary
}: ListenModeProps) {
  const currentLine = selectedSong.lyrics[currentLineIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (currentLineIndex < selectedSong.lyrics.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Player Controls */}
      <Card className="mb-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentLineIndex === 0}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            <Button
              onClick={handlePlayPause}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentLineIndex === selectedSong.lyrics.length - 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              {currentLineIndex + 1} / {selectedSong.lyrics.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${((currentLineIndex + 1) / selectedSong.lyrics.length) * 100}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Line Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentLineIndex}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="text-center p-8 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              <div className="text-3xl md:text-4xl font-bold text-gray-800">
                {currentLine?.japanese}
              </div>
              <div className="text-lg text-gray-600">
                {currentLine?.romaji}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-lg text-purple-600 font-medium"
              >
                {currentLine?.korean}
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Vocabulary Helper */}
      {vocabulary.length > 0 && (
        <Card className="mt-6 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              이 줄의 단어들
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {vocabulary.map((item, index) => (
                <Badge key={index} variant="outline" className="bg-white">
                  {item.word} → {item.meaning}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
