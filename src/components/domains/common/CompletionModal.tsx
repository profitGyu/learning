'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Star, Trophy } from 'lucide-react';

interface CompletionModalProps {
  score: number;
  attempts: number;
  onRestart: () => void;
  onHome: () => void;
}

export function CompletionModal({ score, attempts, onRestart, onHome }: CompletionModalProps) {
  const getScoreColor = () => {
    const percentage = (score / attempts) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const percentage = Math.round((score / attempts) * 100);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className="bg-white rounded-xl p-8 max-w-md w-full text-center"
      >
        <div className="text-6xl mb-4">
          <Trophy className="h-16 w-16 mx-auto text-yellow-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">수고하셨습니다!</h2>
        <div className="space-y-2 mb-6">
          <p className="text-lg">최종 점수</p>
          <p className={`text-3xl font-bold ${getScoreColor()}`}>
            {score}/{attempts} ({percentage}%)
          </p>
          <div className="flex justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < Math.floor((score / attempts) * 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <Button onClick={onRestart} className="flex-1">
            다시 도전
          </Button>
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              홈으로
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
