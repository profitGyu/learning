'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LyricLine, Song } from '@/data';
import { Star } from 'lucide-react';

interface TranslateModeProps {
  currentLine: LyricLine;
  currentLineIndex: number;
  setCurrentLineIndex: (index: number) => void;
  selectedSong: Song;
  userTranslation: string;
  setUserTranslation: (translation: string) => void;
  showTranslation: boolean;
  setShowTranslation: (show: boolean) => void;
}

export function TranslateMode({
  currentLine,
  currentLineIndex,
  setCurrentLineIndex,
  selectedSong,
  userTranslation,
  setUserTranslation,
  showTranslation,
  setShowTranslation
}: TranslateModeProps) {
  const checkTranslation = () => {
    setShowTranslation(true);
  };

  const handleNext = () => {
    if (currentLineIndex < selectedSong.lyrics.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
      setShowTranslation(false);
      setUserTranslation('');
    }
  };

  const getTranslationAccuracy = () => {
    if (!userTranslation || !currentLine) return 0;
    const userWords = userTranslation.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const correctWords = currentLine.korean.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);

    let matches = 0;
    userWords.forEach(word => {
      if (correctWords.some(correctWord => correctWord.includes(word) || word.includes(correctWord))) {
        matches++;
      }
    });

    return Math.round((matches / Math.max(userWords.length, correctWords.length)) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center">번역 연습</CardTitle>
          <p className="text-center text-gray-600">
            아래 일본어 가사를 한국어로 번역해보세요
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                {currentLine?.japanese}
              </div>
              <div className="text-lg text-gray-600">
                {currentLine?.romaji}
              </div>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-medium text-gray-700 mb-2 block">
                  한국어 번역을 입력하세요:
                </span>
                <Textarea
                  value={userTranslation}
                  onChange={(e) => setUserTranslation(e.target.value)}
                  placeholder="여기에 번역을 입력하세요..."
                  className="min-h-[100px]"
                />
              </label>

              <div className="flex gap-3">
                <Button
                  onClick={checkTranslation}
                  disabled={!userTranslation.trim()}
                  className="flex-1"
                >
                  번역 확인
                </Button>
                <Button
                  variant="outline"
                  onClick={handleNext}
                  disabled={currentLineIndex === selectedSong.lyrics.length - 1}
                >
                  다음 줄
                </Button>
              </div>
            </div>

            {showTranslation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-medium text-blue-800 mb-2">정답:</h4>
                  <p className="text-blue-700">{currentLine?.korean}</p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-medium text-green-800 mb-2 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    유사도: {getTranslationAccuracy()}%
                  </h4>
                  <p className="text-green-700">
                    {getTranslationAccuracy() >= 70
                      ? '훌륭한 번역입니다!'
                      : getTranslationAccuracy() >= 40
                        ? '좋은 시도입니다! 계속 연습해보세요.'
                        : '다시 한번 시도해보세요!'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
