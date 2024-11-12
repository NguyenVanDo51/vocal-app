import React, { useEffect, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { shuffleArray } from '@/core';

import { Option } from '../option';

type PickCorrectAnswerProps = {
  answer: string;
  question: string | React.ReactNode;
  updateKey?: string | number | undefined;
  options: string[];
  handleAnswer: (isCorrect: boolean) => void;
  onPick?: (option: string) => void;
};

export const PickCorrectAnswer: React.FC<PickCorrectAnswerProps> = ({
  answer,
  question,
  updateKey,
  options = [],
  handleAnswer,
  onPick = (_) => {},
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    if (selectedOption) return;
    onPick(option);
    setSelectedOption(option);
    const isCorrect = option === answer;
    handleAnswer(isCorrect);
  };

  const shuffledOptions = useMemo(
    () => shuffleArray([...options, answer]),
    [answer],
  );

  useEffect(() => {
    setSelectedOption(null);
  }, [updateKey]);

  return (
    <View className="text-center">
      <Text className="mb-8 text-center text-lg font-semibold">
        {question}
      </Text>

      <View className="mx-auto grid grid-cols-2 gap-4">
        {shuffledOptions.map((option, index) => (
          <Option
            text={option}
            isSelected={option === selectedOption}
            isIncorrect={option === selectedOption && option !== answer}
            key={index}
            onPress={() => handleOptionClick(option)}
          >
            {option}
          </Option>
        ))}
      </View>
    </View>
  );
};
