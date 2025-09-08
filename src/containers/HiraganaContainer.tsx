'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { CharacterChart } from '@/components/domains/hiragana/CharacterChart';
import { PracticeMode } from '@/components/domains/hiragana/PracticeMode';
import { CompletionModal } from '@/components/domains/common/CompletionModal';
import { hiraganaData } from '@/lib/japanese-data';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti';

export function HiraganaContainer() {
  const [mode, setMode] = useState<'chart' | 'practice'>('chart');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

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

  const headerChildren = mode === 'practice' && (
    <div className="text-right">
      <p className={`font-bold ${getScoreColor()}`}>
        점수: {score}/{attempts}
      </p>
      <Button onClick={resetPractice} variant="outline" size="sm">
        <RotateCcw className="h-4 w-4 mr-2" />
        다시 시작
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 p-4">
      {practiceComplete && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="히라가나 학습"
          gradientFrom="from-pink-500"
          gradientTo="to-purple-600"
        >
          {headerChildren}
        </PageHeader>

        <AnimatePresence>
          {practiceComplete && (
            <CompletionModal
              score={score}
              attempts={attempts}
              onRestart={resetPractice}
              onHome={() => { }}
            />
          )}
        </AnimatePresence>

        <Tabs value={mode} onValueChange={(value) => setMode(value as 'chart' | 'practice')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="chart">문자표</TabsTrigger>
            <TabsTrigger value="practice">연습하기</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <CharacterChart data={hiraganaData} />
          </TabsContent>

          <TabsContent value="practice">
            {!practiceComplete && (
              <PracticeMode
                data={hiraganaData}
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
        </Tabs>
      </div>
    </div>
  );
}
