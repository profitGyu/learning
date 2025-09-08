'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Song, WordData } from '@/lib/japanese-data';
import { BookOpen } from 'lucide-react';

interface VocabModeProps {
  selectedSong: Song;
  basicWords: WordData[];
}

export function VocabMode({ selectedSong, basicWords }: VocabModeProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {selectedSong.title} - 단어장
          </CardTitle>
          <p className="text-gray-600">
            이 노래에 나오는 일본어 단어들을 학습해보세요
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {basicWords.slice(0, 12).map((word, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-lg font-bold text-gray-800">
                        {word.japanese}
                      </div>
                      <div className="text-sm text-gray-600">
                        {word.romaji}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-600 font-medium">
                        {word.korean}
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {word.category}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
