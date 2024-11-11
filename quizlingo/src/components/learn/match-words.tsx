/* eslint-disable max-lines-per-function */
import { Volume2 } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { shuffleArray, textToSpeech } from '@/core';

import { Option } from '../option';
import { type IQuestion } from './type';

type MatchWordsProps = {
  question: IQuestion;
  handleAnswer: (isCorrect: boolean) => void;
};

export const MatchWords: React.FC<MatchWordsProps> = ({
  question,
  handleAnswer,
}) => {
  const randomWords = useMemo(() => question.words || [], [question]);
  const { shouldShowAudio } = question;

  const vietnameseWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.meaning)),
    [randomWords],
  );

  const englishWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.word)),
    [randomWords],
  );

  const [selectedVietnamese, setSelectedVietnamese] = useState<string | null>(
    null,
  );
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [incorrectPair, setIncorrectPair] = useState<{
    vietnamese: string;
    english: string;
  } | null>(null);

  const handleMatch = (vietnamese: string, english: string) => {
    const word = randomWords.find(
      (w) => w.meaning === vietnamese && w.word === english,
    );
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
      }, 1000);
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

  const flexDirection = useMemo(
    () => (Math.random() > 0.5 ? 'row' : 'row-reverse'),
    [randomWords],
  );

  useEffect(() => {
    setMatchedPairs([]);
    setSelectedVietnamese(null);
    setSelectedEnglish(null);
    setIncorrectPair(null);
  }, [question]);

  return (
    <View className="text-center">
      <View className="mt-4 flex flex-row justify-center gap-4" style={{ flexDirection }}>
        <View className="flex flex-col gap-4">
          {englishWords.map((word, index) => {
            const isMatched = matchedPairs.includes(word);
            const isSelected = selectedEnglish === word;
            const isIncorrect = isSelected && incorrectPair?.english === word;

            return (
              <Option
                key={index}
                text={word}
                isSelected={isSelected}
                isDisabled={isMatched}
                isIncorrect={isIncorrect}
                onPress={() => handleEnglishClick(word)}
              >
                {shouldShowAudio ? <Volume2 size={20} /> : word}
              </Option>
            );
          })}
        </View>

        <View className="flex flex-col gap-4">
          {vietnameseWords.map((meaning, index) => {
            const isMatched = matchedPairs.includes(
              randomWords.find((w) => w.meaning === meaning)?.word || '',
            );
            const isSelected = selectedVietnamese === meaning;
            const isIncorrect =
              isSelected && incorrectPair?.vietnamese === meaning;

            return (
              <Option
                key={index}
                text={meaning}
                isSelected={isSelected}
                isIncorrect={isIncorrect}
                isDisabled={isMatched}
                onPress={() => handleVietnameseClick(meaning)}
              ></Option>
            );
          })}
        </View>
      </View>

      <View className="mt-4 h-8">
        {incorrectPair && (
          <Text className="animate-pulse font-semibold text-red-600">
            Cặp từ sai rồi! Thử lại nhé!
          </Text>
        )}
      </View>
    </View>
  );
};
