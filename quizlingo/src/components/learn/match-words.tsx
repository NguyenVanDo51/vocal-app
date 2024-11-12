/* eslint-disable max-lines-per-function */
import { Volume2 } from 'lucide-react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { shuffleArray, textToSpeech } from '@/core';

import { Option } from '../option';
import { type IQuestion } from './type';
import { IWord } from '@/api/words/type';

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
    () => shuffleArray(randomWords),
    [randomWords],
  );

  const englishWords = useMemo(() => shuffleArray(randomWords), [randomWords]);

  const [selectedVietnamese, setSelectedVietnamese] = useState<number | null>(
    null,
  );
  const [selectedEnglish, setSelectedEnglish] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);

  const handleVietnameseClick = (word: IWord) => {
    setSelectedVietnamese(word.id);
  };

  const handleEnglishClick = (word: IWord) => {
    console.log('word', word);
    setSelectedEnglish(word.id);
    textToSpeech(word.word);
  };

  const flexDirection = useMemo(
    () => (Math.random() > 0.5 ? 'row' : 'row-reverse'),
    [randomWords],
  );

  useEffect(() => {
    setMatchedIds([]);
    setSelectedVietnamese(null);
    setSelectedEnglish(null);
  }, [question]);

  useEffect(() => {
    if (!!selectedEnglish && !!selectedVietnamese) {
      if (selectedEnglish === selectedVietnamese) {
        const word = randomWords.find((w) => w.id === selectedEnglish);

        if (word) {
          setMatchedIds([...matchedIds, word.id]);
          setSelectedVietnamese(null);
          setSelectedEnglish(null);

          if (matchedIds.length + 1 === randomWords.length) {
            handleAnswer(true);
          }
        }
      } else {
        setTimeout(() => {
          setSelectedVietnamese(null);
          setSelectedEnglish(null);
        }, 1000);
      }
    }
  }, [selectedEnglish, selectedVietnamese]);

  const isIncorrectCurrent =
    !!selectedEnglish &&
    !!selectedVietnamese &&
    selectedEnglish !== selectedVietnamese;

  return (
    <View className="text-center">
      <View
        className="mt-4 flex flex-row justify-center gap-4"
        style={{ flexDirection }}
      >
        <View className="flex flex-col gap-4">
          {englishWords.map((w, index) => {
            const { id, word } = w;
            const isMatched = matchedIds.includes(id);
            const isSelected = selectedEnglish === id;
            const isIncorrect = isSelected && isIncorrectCurrent;

            return (
              <Option
                key={index}
                text={word}
                isSelected={isSelected}
                isDisabled={isMatched}
                isIncorrect={isIncorrect}
                onPress={() => handleEnglishClick(w)}
              >
                {shouldShowAudio ? <Volume2 size={20} /> : word}
              </Option>
            );
          })}
        </View>

        <View className="flex flex-col gap-4">
          {vietnameseWords.map((w, index) => {
            const { id, meaning } = w;
            const isMatched = matchedIds.includes(id);
            const isSelected = selectedVietnamese === id;
            const isIncorrect = isSelected && isIncorrectCurrent;

            return (
              <Option
                key={index}
                text={meaning}
                isSelected={isSelected}
                isIncorrect={isIncorrect}
                isDisabled={isMatched}
                onPress={() => handleVietnameseClick(w)}
              ></Option>
            );
          })}
        </View>
      </View>

      <View className="mt-4 h-8">
        {isIncorrectCurrent && (
          <Text className="animate-pulse font-semibold text-red-600">
            Cặp từ sai rồi! Thử lại nhé!
          </Text>
        )}
      </View>
    </View>
  );
};
