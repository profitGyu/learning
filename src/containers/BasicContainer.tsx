'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/domains/common/PageHeader';
import { CategorySelection } from '@/components/domains/basic/CategorySelection';
import { WordList } from '@/components/domains/basic/WordList';
import { QuizMode } from '@/components/domains/basic/QuizMode';
import { CompletionModal } from '@/components/domains/common/CompletionModal';
import { basicWords } from '@/lib/japanese-data';
import { RefreshCw } from 'lucide-react';
import Confetti from 'react-confetti';

const categories = [
  { name: '인사', icon: 'Users', color: 'bg-blue-500' },
  { name: '동물', icon: 'Book', color: 'bg-green-500' },
  { name: '음식', icon: 'Utensils', color: 'bg-orange-500' },
  { name: '숫자', icon: 'Hash', color: 'bg-purple-500' },
];

export function BasicContainer() {
  const [selectedCategory, setSelectedCategory] = useState('인사');
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateWindowSize();
    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  const categoryWords = basicWords.filter(word => word.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setScore(0);
    setAttempts(0);
    setQuizComplete(false);
  };

  const getScoreColor = () => {
    if (attempts === 0) return 'text-gray-600';
    const percentage = (score / attempts) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const headerChildren = mode === 'quiz' && (
    <div className="text-right">
      <p className={`font-bold ${getScoreColor()}`}>
        점수: {score}/{attempts}
      </p>
      <Button onClick={resetQuiz} variant="outline" size="sm">
        <RefreshCw className="h-4 w-4 mr-2" />
        다시 시작
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      {quizComplete && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      <div className="container mx-auto max-w-6xl">
        <PageHeader
          title="기초 일본어"
          subtitle="일상에서 자주 쓰이는 기본 일본어를 배워보세요"
          gradientFrom="from-blue-500 via-indigo-500"
          gradientTo="to-purple-600"
        >
          {headerChildren}
        </PageHeader>

        <CategorySelection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          basicWords={basicWords}
        />

        <AnimatePresence>
          {quizComplete && (
            <CompletionModal
              score={score}
              attempts={attempts}
              onRestart={resetQuiz}
              onHome={() => setMode('learn')}
            />
          )}
        </AnimatePresence>

        <Tabs value={mode} onValueChange={(value) => setMode(value as 'learn' | 'quiz')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="learn">학습하기</TabsTrigger>
            <TabsTrigger value="quiz">퀴즈</TabsTrigger>
          </TabsList>

          <TabsContent value="learn">
            <WordList words={categoryWords} />
          </TabsContent>

          <TabsContent value="quiz">
            {!quizComplete && categoryWords.length > 0 && (
              <QuizMode
                words={categoryWords}
                selectedCategory={selectedCategory}
                currentQuizIndex={currentQuizIndex}
                setCurrentQuizIndex={setCurrentQuizIndex}
                userAnswer={userAnswer}
                setUserAnswer={setUserAnswer}
                showAnswer={showAnswer}
                setShowAnswer={setShowAnswer}
                score={score}
                setScore={setScore}
                attempts={attempts}
                setAttempts={setAttempts}
                setQuizComplete={setQuizComplete}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
