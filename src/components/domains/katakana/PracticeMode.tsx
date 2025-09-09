'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CharacterData } from '@/data';
import { Check, X } from 'lucide-react';

interface PracticeModeProps {
  data: CharacterData[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  showAnswer: boolean;
  setShowAnswer: (show: boolean) => void;
  score: number;
  setScore: (score: number) => void;
  attempts: number;
  setAttempts: (attempts: number) => void;
  selectedAnswer: string;
  setSelectedAnswer: (answer: string) => void;
  setPracticeComplete: (complete: boolean) => void;
}

export function PracticeMode({
  data,
  currentIndex,
  setCurrentIndex,
  showAnswer,
  setShowAnswer,
  score,
  setScore,
  attempts,
  setAttempts,
  selectedAnswer,
  setSelectedAnswer,
  setPracticeComplete
}: PracticeModeProps) {
  const [options, setOptions] = useState<string[]>([]);

  const currentCharacter = data[currentIndex];
  const progress = ((currentIndex + 1) / data.length) * 100;

  const generateOptions = () => {
    const correct = currentCharacter.korean;
    const incorrect = data
      .filter(item => item.korean !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(item => item.korean);

    return [correct, ...incorrect].sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setOptions(generateOptions());
    setShowAnswer(false);
    setSelectedAnswer('');
  }, [currentIndex]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowAnswer(true);
    setAttempts(attempts + 1);

    if (answer === currentCharacter.korean) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < data.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setPracticeComplete(true);
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <Progress value={progress} className="w-64 mx-auto mb-2" />
        <p className="text-sm text-gray-600 text-center">
          {currentIndex + 1} / {data.length}
        </p>
      </div>

      {/* Question Card */}
      <motion.div
        key={currentIndex}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="mb-8 bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <div className="text-8xl md:text-9xl font-bold text-gray-800 mb-4">
              {currentCharacter.character}
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {currentCharacter.romaji}
            </Badge>
            {showAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <div className="text-2xl font-bold text-purple-600">
                  {currentCharacter.korean}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Answer Options */}
      {!showAnswer && (
        <div className="grid grid-cols-2 gap-4">
          {options.map((option, index) => (
            <motion.div
              key={option}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => handleAnswer(option)}
                variant="outline"
                size="lg"
                className="w-full h-16 text-lg hover:bg-purple-50 transition-colors"
              >
                {option}
              </Button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Result Display */}
      {showAnswer && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className={`text-6xl mb-4 ${selectedAnswer === currentCharacter.korean ? 'text-green-500' : 'text-red-500'}`}>
            {selectedAnswer === currentCharacter.korean ? (
              <Check className="h-16 w-16 mx-auto" />
            ) : (
              <X className="h-16 w-16 mx-auto" />
            )}
          </div>
          <p className={`text-xl font-bold ${selectedAnswer === currentCharacter.korean ? 'text-green-600' : 'text-red-600'}`}>
            {selectedAnswer === currentCharacter.korean ? '정답입니다!' : '틀렸습니다!'}
          </p>
          {selectedAnswer !== currentCharacter.korean && (
            <p className="text-gray-600 mt-2">
              정답: {currentCharacter.korean}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
