'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { CharacterChart } from '@/components/domains/katakana/CharacterChart';
import { PracticeMode } from '@/components/domains/katakana/PracticeMode';
import { MemoryGame } from '@/components/domains/katakana/MemoryGame';
import { CompletionModal } from '@/components/domains/common/CompletionModal';
import { katakanaData } from '@/data';
import { RotateCcw, Shuffle } from 'lucide-react';
import Confetti from 'react-confetti';

export function KatakanaContainer() {
  const [mode, setMode] = useState<'chart' | 'practice' | 'memory'>('chart');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [shuffledData, setShuffledData] = useState(katakanaData);
  const [memoryScore, setMemoryScore] = useState(0);
  const [memoryMoves, setMemoryMoves] = useState(0);

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const shuffleData = () => {
    // Deterministic shuffle to avoid hydration issues
    const shuffleArray = <T,>(array: T[]): T[] => {
      const result = [...array];
      let seed = Date.now() % 1000000; // Use a time-based seed for variety but client-side only

      for (let i = result.length - 1; i > 0; i--) {
        seed = (seed * 16807) % 2147483647;
        const j = seed % (i + 1);
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };

    setShuffledData(shuffleArray(katakanaData));
    resetPractice();
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setScore(0);
    setAttempts(0);
    setPracticeComplete(false);
    setShowAnswer(false);
    setSelectedAnswer('');
  };

  const getScoreColor = () => {
    const percentage = (score / attempts) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const headerChildren = mode === 'practice' ? (
    <div className="text-right space-y-2">
      <p className={`font-bold ${getScoreColor()}`}>
        점수: {score}/{attempts}
      </p>
      <div className="space-x-2">
        <Button onClick={shuffleData} variant="outline" size="sm">
          <Shuffle className="h-4 w-4 mr-2" />
          셔플
        </Button>
        <Button onClick={resetPractice} variant="outline" size="sm">
          <RotateCcw className="h-4 w-4 mr-2" />
          다시 시작
        </Button>
      </div>
    </div>
  ) : mode === 'memory' ? (
    <div className="text-right">
      <p className="text-sm text-gray-600">
        매칭: {memoryScore}/8 | 시도: {memoryMoves}
      </p>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 p-4">
      {(practiceComplete) && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="가타카나 학습"
          gradientFrom="from-purple-500"
          gradientTo="to-indigo-600"
        >
          {headerChildren}
        </PageHeader>

        <AnimatePresence>
          {practiceComplete && (
            <CompletionModal
              score={score}
              attempts={attempts}
              onRestart={resetPractice}
            />
          )}
        </AnimatePresence>

        <Tabs value={mode} onValueChange={(value) => setMode(value as 'chart' | 'practice' | 'memory')} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-8">
            <TabsTrigger value="chart">문자표</TabsTrigger>
            <TabsTrigger value="practice">연습하기</TabsTrigger>
            <TabsTrigger value="memory">메모리 게임</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <CharacterChart data={katakanaData} />
          </TabsContent>

          <TabsContent value="practice">
            {!practiceComplete && (
              <PracticeMode
                data={shuffledData}
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                score={score}
                setScore={setScore}
                attempts={attempts}
                setAttempts={setAttempts}
                selectedAnswer={selectedAnswer}
                setSelectedAnswer={setSelectedAnswer}
                setPracticeComplete={setPracticeComplete}
              />
            )}
          </TabsContent>

          <TabsContent value="memory">
            <MemoryGame
              data={katakanaData}
              score={memoryScore}
              setScore={setMemoryScore}
              moves={memoryMoves}
              setMoves={setMemoryMoves}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
