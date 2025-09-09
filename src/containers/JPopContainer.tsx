'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { SongSelection as JPopSongSelection } from '@/components/domains/jpop/SongSelection';
import { ListenMode } from '@/components/domains/jpop/ListenMode';
import { TranslateMode } from '@/components/domains/jpop/TranslateMode';
import { VocabMode } from '@/components/domains/jpop/VocabMode';
import { jpopLyrics, basicWords } from '@/data';
import { Heart } from 'lucide-react';

export function JPopContainer() {
  const [selectedSong, setSelectedSong] = useState(jpopLyrics[0]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'listen' | 'translate' | 'vocab'>('listen');
  const [userTranslation, setUserTranslation] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [vocabulary, setVocabulary] = useState<Array<{ word: string, meaning: string }>>([]);

  const currentLine = selectedSong.lyrics[currentLineIndex];

  // Auto-play simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && mode === 'listen') {
      interval = setInterval(() => {
        setCurrentLineIndex(prev => {
          if (prev < selectedSong.lyrics.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return 0;
          }
        });
      }, 3000); // 3 seconds per line
    }
    return () => clearInterval(interval);
  }, [isPlaying, mode, selectedSong]);

  // Extract vocabulary from current line
  useEffect(() => {
    if (currentLine) {
      const words = basicWords.filter(word =>
        currentLine.japanese.includes(word.japanese)
      );
      setVocabulary(words.map(w => ({ word: w.japanese, meaning: w.korean })));
    }
  }, [currentLine]);

  const handleSongChange = (songIndex: number) => {
    setSelectedSong(jpopLyrics[songIndex]);
    setCurrentLineIndex(0);
    setIsPlaying(false);
    setShowTranslation(false);
    setUserTranslation('');
  };

  const headerChildren = (
    <div className="flex items-center gap-2">
      <Heart className="h-5 w-5 text-pink-500" />
      <span className="text-sm text-gray-600">K-Pop ❤️ J-Pop</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="J-Pop으로 배우는 일본어"
          subtitle="좋아하는 노래로 재미있게 일본어를 배워보세요!"
          gradientFrom="from-purple-500 via-pink-500"
          gradientTo="to-orange-500"
        >
          {headerChildren}
        </PageHeader>

        <JPopSongSelection
          songs={jpopLyrics}
          selectedSong={selectedSong}
          onSongChange={handleSongChange}
        />

        <Tabs value={mode} onValueChange={(value) => setMode(value as 'listen' | 'translate' | 'vocab')} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="listen">듣기</TabsTrigger>
            <TabsTrigger value="translate">번역</TabsTrigger>
            <TabsTrigger value="vocab">단어장</TabsTrigger>
          </TabsList>

          <TabsContent value="listen">
            <ListenMode
              selectedSong={selectedSong}
              currentLineIndex={currentLineIndex}
              setCurrentLineIndex={setCurrentLineIndex}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              vocabulary={vocabulary}
            />
          </TabsContent>

          <TabsContent value="translate">
            <TranslateMode
              currentLine={currentLine}
              currentLineIndex={currentLineIndex}
              setCurrentLineIndex={setCurrentLineIndex}
              selectedSong={selectedSong}
              userTranslation={userTranslation}
              setUserTranslation={setUserTranslation}
              showTranslation={showTranslation}
              setShowTranslation={setShowTranslation}
            />
          </TabsContent>

          <TabsContent value="vocab">
            <VocabMode selectedSong={selectedSong} basicWords={basicWords} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
