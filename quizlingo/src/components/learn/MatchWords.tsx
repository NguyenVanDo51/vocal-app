import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { Volume2 } from 'lucide-react-native';
import { Button } from '@/ui';
import { shuffleArray } from '@/core';
import { IQuestion } from './type';

const textToSpeech = (text: string) => {
}

type MatchWordsProps = {
  question: IQuestion
  handleAnswer: (isCorrect: boolean) => void;
};

export const MatchWords: React.FC<MatchWordsProps> = ({ question, handleAnswer }) => {
  const randomWords = question.words || [];
  const { shouldShowAudio } = question;

  const vietnameseWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.meaning)),
    [randomWords]
  );
  const englishWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.word)),
    [randomWords]
  );

  const [selectedVietnamese, setSelectedVietnamese] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [incorrectPair, setIncorrectPair] = useState<{ vietnamese: string; english: string } | null>(null);

  const handleMatch = (vietnamese: string, english: string) => {
    const word = randomWords.find((w) => w.meaning === vietnamese && w.word === english);
    if (word) {
      setMatchedPairs([...matchedPairs, word.word]);
      setSelectedVietnamese(null);
      setSelectedEnglish(null);
      setIncorrectPair(null);

      if (matchedPairs.length + 1 === randomWords.length) {
        handleAnswer(true);
      }
    } else {
      setIncorrectPair({ vietnamese, english });
      setTimeout(() => {
        setIncorrectPair(null);
        setSelectedVietnamese(null);
        setSelectedEnglish(null);
      }, 500);
    }
  };

  const handleVietnameseClick = (meaning: string) => {
    setSelectedVietnamese(meaning);
    if (selectedEnglish) {
      handleMatch(meaning, selectedEnglish);
    }
  };

  const handleEnglishClick = (word: string) => {
    setSelectedEnglish(word);
    textToSpeech(word);
    if (selectedVietnamese) {
      handleMatch(selectedVietnamese, word);
    }
  };

  useEffect(() => {
    setMatchedPairs([]);
    setSelectedVietnamese(null);
    setSelectedEnglish(null);
    setIncorrectPair(null);
  }, [question]);

  return (
    <View className="text-center">
      <View className="grid grid-cols-2 gap-4 mt-4">
        <View className="flex flex-col gap-4">
          {englishWords.map((word, index) => {
            const isMatched = matchedPairs.includes(word);
            const isIncorrect = incorrectPair?.english === word;
            const isSelected = selectedEnglish === word;
            let status;
            if (isSelected && !isIncorrect) {
              status = 'primary';
            } else if (isSelected && isIncorrect) {
              status = 'red';
            }
            return (
              <Button
                // variant="doulingo"
                key={index}
                className={`${
                  isMatched
                    ? 'bg-gray-300'
                    : status === 'primary'
                    ? 'bg-blue-500'
                    : status === 'red'
                    ? 'bg-red-500'
                    : ''
                }`}
                onPress={() => handleEnglishClick(word)}
                disabled={isMatched}
              >
                {shouldShowAudio ? <Volume2 size={20} /> : <Text>{word}</Text>}
              </Button>
            );
          })}
        </View>

        <View className="flex flex-col gap-4">
          {vietnameseWords.map((meaning, index) => {
            const isMatched = matchedPairs.includes(
              randomWords.find((w) => w.meaning === meaning)?.word || ''
            );
            const isIncorrect = incorrectPair?.vietnamese === meaning;
            const isSelected = selectedVietnamese === meaning;
            let status;
            if (isSelected && !isIncorrect) {
              status = 'primary';
            } else if (isSelected && isIncorrect) {
              status = 'red';
            }
            return (
              <Button
                // variant="doulingo"
                key={index}
                className={`${
                  isMatched
                    ? 'bg-gray-300'
                    : status === 'primary'
                    ? 'bg-blue-500'
                    : status === 'red'
                    ? 'bg-red-500'
                    : ''
                }`}
                onPress={() => handleVietnameseClick(meaning)}
                disabled={isMatched}
              >
                <Text>{meaning}</Text>
              </Button>
            );
          })}
        </View>
      </View>

      {incorrectPair && (
        <Text className="mt-4 text-red-600 font-semibold animate-pulse h-8">
          Cặp từ sai rồi! Thử lại nhé!
        </Text>
      )}
    </View>
  );
};

