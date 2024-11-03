import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { type IWord } from '@/api/words/type';
import { Input } from '@/ui';

import { type IQuestion } from './type';

type FillToBlankProps = {
  question: Omit<IQuestion, 'word'> & { word: IWord };
  handleAnswer: (isCorrect: boolean) => void;
};

export const FillToBlank: React.FC<FillToBlankProps> = ({
  question,
  handleAnswer,
}) => {
  const [answer, setAnswer] = useState('');

  const correctWord = question.word.word;
  const questionWithBlanks = (question.word.example as string).replace(
    correctWord,
    '_____',
  );

  const checkAnswer = () => {
    const isCorrect = answer.trim().toLowerCase() === correctWord.toLowerCase();
    handleAnswer(isCorrect);
  };

  return (
    <View className="p-4">
      <Text className="mb-4 text-lg font-semibold">{questionWithBlanks}</Text>
      <Input
        className="rounded border border-gray-300 p-2"
        placeholder="Điền vào chỗ trống"
        value={answer}
        onChangeText={setAnswer}
        onEndEditing={checkAnswer}
      />
    </View>
  );
};
