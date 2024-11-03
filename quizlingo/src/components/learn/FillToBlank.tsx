import React, { useState } from "react";
import { View, Text } from "react-native";
import { Input } from "@/ui";
import { IQuestion } from "./type";
import { IWord } from "@/api/words/type";

type FillToBlankProps = {
  question: Omit<IQuestion, "word"> & {word: IWord};
  handleAnswer: (isCorrect: boolean) => void;
};

export const FillToBlank: React.FC<FillToBlankProps> = ({ question, handleAnswer }) => {
  const [answer, setAnswer] = useState("");

  const correctWord = question.word.word;
  const questionWithBlanks = (question.word.example as string).replace(correctWord, "_____");

  const checkAnswer = () => {
    const isCorrect = answer.trim().toLowerCase() === correctWord.toLowerCase();
    handleAnswer(isCorrect);
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-semibold mb-4">{questionWithBlanks}</Text>
      <Input
        className="border border-gray-300 p-2 rounded"
        placeholder="Điền vào chỗ trống"
        value={answer}
        onChangeText={setAnswer}
        onEndEditing={checkAnswer}
      />
    </View>
  );
};
