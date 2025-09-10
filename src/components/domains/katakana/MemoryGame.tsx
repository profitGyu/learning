'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CharacterData } from '@/data';

interface MemoryGameProps {
  data: CharacterData[];
  score: number;
  setScore: (score: number) => void;
  moves: number;
  setMoves: (moves: number) => void;
}

interface MemoryCard {
  id: number;
  character: string;
  korean: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGame({ data, score, setScore, moves, setMoves }: MemoryGameProps) {
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  useEffect(() => {
    const selectedCharacters = data.slice(0, 8); // Use first 8 characters
    const cards: MemoryCard[] = [];

    selectedCharacters.forEach((char, index) => {
      cards.push({
        id: index * 2,
        character: char.character,
        korean: char.korean,
        isFlipped: false,
        isMatched: false
      });
      cards.push({
        id: index * 2 + 1,
        character: char.character,
        korean: char.korean,
        isFlipped: false,
        isMatched: false
      });
    });

    // Deterministic shuffle using a simple algorithm
    const shuffleArray = <T,>(array: T[]): T[] => {
      const result = [...array];
      let seed = 12345; // Fixed seed for consistent results

      for (let i = result.length - 1; i > 0; i--) {
        seed = (seed * 16807) % 2147483647;
        const j = seed % (i + 1);
        [result[i], result[j]] = [result[j], result[i]];
      }
      return result;
    };

    setMemoryCards(shuffleArray(cards));
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
  }, [data, setScore, setMoves]);

  const handleCardClick = (cardId: number) => {
    if (flippedCards.length === 2) return;
    if (flippedCards.includes(cardId)) return;
    if (memoryCards.find(card => card.id === cardId)?.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      const firstCard = memoryCards.find(card => card.id === first);
      const secondCard = memoryCards.find(card => card.id === second);

      if (firstCard && secondCard && firstCard.character === secondCard.character) {
        // Match found
        setTimeout(() => {
          setMemoryCards(prev => prev.map(card =>
            card.id === first || card.id === second
              ? { ...card, isMatched: true }
              : card
          ));
          setScore(score + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-4 gap-4">
        {memoryCards.map((card) => {
          const isFlipped = flippedCards.includes(card.id) || card.isMatched;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: card.id * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Card
                className={`aspect-square cursor-pointer transition-all duration-300 ${card.isMatched ? 'bg-green-100 border-green-300' : 'bg-white/80 hover:shadow-lg'
                  }`}
                onClick={() => handleCardClick(card.id)}
              >
                <CardContent className="p-4 flex items-center justify-center h-full">
                  <div className="text-center">
                    {isFlipped ? (
                      <>
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                          {card.character}
                        </div>
                        <div className="text-sm text-purple-600 font-medium">
                          {card.korean}
                        </div>
                      </>
                    ) : (
                      <div className="text-4xl">❓</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
