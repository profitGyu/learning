'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { WordData } from '@/lib/japanese-data';
import { Check, X } from 'lucide-react';

interface QuizModeProps {
  words: WordData[];
  selectedCategory: string;
  currentQuizIndex: number;
  setCurrentQuizIndex: (index: number) => void;
  userAnswer: string;
  setUserAnswer: (answer: string) => void;
  showAnswer: boolean;
  setShowAnswer: (show: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  attempts: number;
  setAttempts: (attempts: number) => void;
  setQuizComplete: (complete: boolean) => void;
}

export function QuizMode({
  words,
  selectedCategory,
  currentQuizIndex,
  setCurrentQuizIndex,
  userAnswer,
  setUserAnswer,
  showAnswer,
  setShowAnswer,
  score,
  setScore,
  attempts,
  setAttempts,
  setQuizComplete
}: QuizModeProps) {
  const currentQuizWord = words[currentQuizIndex];
  const progress = ((currentQuizIndex + 1) / words.length) * 100;

  const checkAnswer = () => {
    setShowAnswer(true);
    setAttempts(attempts + 1);

    const correct = userAnswer.toLowerCase().trim() === currentQuizWord.korean.toLowerCase() ||
      userAnswer.toLowerCase().trim() === currentQuizWord.romaji.toLowerCase();

    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuizIndex < words.length - 1) {
        setCurrentQuizIndex(currentQuizIndex + 1);
        setUserAnswer('');
        setShowAnswer(false);
      } else {
        setQuizComplete(true);
      }
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{selectedCategory} 퀴즈</span>
          <span>{currentQuizIndex + 1} / {words.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <motion.div
        key={currentQuizIndex}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-6 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {currentQuizWord.japanese}
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {currentQuizWord.romaji}
            </Badge>
            <p className="text-gray-600 mt-4">
              이 단어의 한국어 뜻을 입력하세요
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Answer Input */}
      {!showAnswer && (
        <div className="space-y-4">
          <Input
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="한국어 뜻을 입력하세요..."
            className="text-lg p-4"
            onKeyPress={(e) => {
              if (e.key === 'Enter' && userAnswer.trim()) {
                checkAnswer();
              }
            }}
          />
          <Button
            onClick={checkAnswer}
            disabled={!userAnswer.trim()}
            size="lg"
            className="w-full"
          >
            정답 확인
          </Button>
        </div>
      )}

      {/* Result Display */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className={`text-6xl mb-4 ${userAnswer.toLowerCase().trim() === currentQuizWord.korean.toLowerCase() ||
              userAnswer.toLowerCase().trim() === currentQuizWord.romaji.toLowerCase()
              ? 'text-green-500' : 'text-red-500'
            }`}>
            {userAnswer.toLowerCase().trim() === currentQuizWord.korean.toLowerCase() ||
              userAnswer.toLowerCase().trim() === currentQuizWord.romaji.toLowerCase() ? (
              <Check className="h-16 w-16 mx-auto" />
            ) : (
              <X className="h-16 w-16 mx-auto" />
            )}
          </div>
          <p className={`text-xl font-bold ${userAnswer.toLowerCase().trim() === currentQuizWord.korean.toLowerCase() ||
              userAnswer.toLowerCase().trim() === currentQuizWord.romaji.toLowerCase()
              ? 'text-green-600' : 'text-red-600'
            }`}>
            {userAnswer.toLowerCase().trim() === currentQuizWord.korean.toLowerCase() ||
              userAnswer.toLowerCase().trim() === currentQuizWord.romaji.toLowerCase()
              ? '정답입니다!' : '틀렸습니다!'}
          </p>
          <p className="text-gray-600 mt-2">
            정답: {currentQuizWord.korean}
          </p>
        </motion.div>
      )}
    </div>
  );
}
