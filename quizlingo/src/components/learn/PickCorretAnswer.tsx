import { shuffleArray } from '@/core';
import { Button } from '@/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

type PickCorrectAnswerProps = {
  answer: string;
  question: string | React.ReactNode;
  key?: string | number;
  options: string[];
  handleAnswer: (isCorrect: boolean) => void;
  onPick?: (option: string) => void;
};

export const PickCorrectAnswer: React.FC<PickCorrectAnswerProps> = ({
  answer,
  question,
  key,
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
    [options, answer],
  );

  useEffect(() => {
    setSelectedOption(null);
  }, [question, key]);

  return (
    <View className="text-center">
      <Text className="text-lg font-semibold mb-8 capitalize text-center">
        {question}
      </Text>
      <View className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {shuffledOptions.map((option, index) => (
          <Button
            // variant="doulingo"
            key={index}
            className={`${
              selectedOption === option
                ? option === answer
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : ''
            }`}
            onPress={() => handleOptionClick(option)}
            disabled={!!selectedOption}
          >
            <Text>{option}</Text>
          </Button>
        ))}
      </View>
    </View>
  );
};
