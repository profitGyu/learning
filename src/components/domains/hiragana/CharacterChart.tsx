'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CharacterData } from '@/data';

interface CharacterChartProps {
  data: CharacterData[];
}

export function CharacterChart({ data }: CharacterChartProps) {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card className="aspect-square cursor-pointer hover:shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-3 flex flex-col items-center justify-center h-full">
              <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                {item.character}
              </div>
              <div className="text-xs text-gray-600 text-center">
                <div>{item.romaji}</div>
                <div className="text-pink-600 font-medium">{item.korean}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
