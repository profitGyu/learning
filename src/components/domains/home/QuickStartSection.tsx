'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

export function QuickStartSection() {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 backdrop-blur-sm border-white/30">
        <CardHeader>
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            학습 시작하기
          </CardTitle>
          <CardDescription className="text-lg">
            어떤 방식으로 일본어를 배우고 싶으신가요?
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/hiragana">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
              히라가나부터 시작
            </Button>
          </Link>
          <Link href="/youtube">
            <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
              YouTube로 시작
            </Button>
          </Link>
          <Link href="/jpop">
            <Button size="lg" variant="outline" className="border-purple-300 hover:bg-purple-50">
              J-Pop으로 시작
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
