/* eslint-disable max-lines-per-function */
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Volume2, X } from 'lucide-react-native';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Svg, { Path } from 'react-native-svg';

import { type IWord } from '@/api/words/type';
import { Done } from '@/components/learn/complated';
import { MatchWords } from '@/components/learn/match-words';
import { PickCorrectAnswer } from '@/components/learn/pick-correct-answer';
import {
  type IQuestion,
  questionTitleMapping,
  QuestionType,
} from '@/components/learn/type';
import { shuffleArray, textToSpeech } from '@/core';
import { httpClient } from '@/services/httpClient';
import { Pressable, ProgressBar, Text, View } from '@/ui';

function getRandomType() {
  // Mảng chứa các chuỗi và tỉ lệ của chúng
  const stringsWithWeights = [
    { string: QuestionType.EN_TO_VN, weight: 0.25 },
    { string: QuestionType.VN_TO_EN, weight: 0.25 },
    { string: QuestionType.MATCH, weight: 0.25 },
    { string: QuestionType.FILL_BLANK, weight: 0.25 },
  ];

  // Tính tổng trọng số
  const totalWeight = stringsWithWeights.reduce(
    (total, current) => total + current.weight,
    0,
  );

  // Lấy một số ngẫu nhiên từ 0 đến tổng trọng số
  let random = Math.random() * totalWeight;

  // Lặp qua các chuỗi và trả về chuỗi theo tỉ lệ
  for (const item of stringsWithWeights) {
    if (random < item.weight) {
      return item.string;
    }
    random -= item.weight;
  }
}

export default function AddPost() {
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState<IQuestion[]>([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isDoingIncorrectWords, setIsDoingIncorrectWords] = useState(false);
  const [analysis, setAnalysis] = useState({
    correct: 0,
    incorrect: 0,
    time: 0,
    streak: 0,
    maxStreak: 0,
  });
  const [words, setWords] = useState<IWord[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const processRef: any = React.useRef();

  const router = useRouter();

  const { id: groupId } = useLocalSearchParams<{ id: string }>();

  useEffect(() => {
    httpClient.get('/words', { params: { group_id: groupId, random: true, limit: 20 } }).then((res) => {
      setWords(res.data.words);
    });
  }, [groupId]);

  useEffect(() => {
    const totalQuestions = Math.min(words.length * 2, 20);
    const q: IQuestion[] = [];
    const wordsWithExample = words.filter(
      (word) =>
        word.example &&
        word.example.toLowerCase().includes(word.word.toLowerCase()),
    );

    for (let i = 0; i < totalQuestions; i++) {
      let type = getRandomType();
      while (type === q[i - 1]?.type) {
        type = getRandomType();
      }
      const shouldShowAudio = Math.random() < 0.5 ? true : false;

      switch (type) {
        case QuestionType.MATCH:
          const words1 = shuffleArray(words).slice(0, 5);
          q.push({ type, words: words1, shouldShowAudio });
          break;
        case QuestionType.EN_TO_VN:
        case QuestionType.VN_TO_EN:
          const words2 = words[Math.floor(Math.random() * words.length)];
          q.push({ type, word: words2, shouldShowAudio });
          break;

        case QuestionType.FILL_BLANK:
          if (wordsWithExample.length < 1) {
            i--;
            break;
          }
          const randomIndex = Math.floor(
            Math.random() * wordsWithExample.length,
          );
          const w = wordsWithExample[randomIndex];
          q.push({ type, word: w, shouldShowAudio });
          wordsWithExample.splice(randomIndex, 1);
          break;

        default:
          break;
      }
    }
    setQuestions(q);
  }, [words]);

  const handleAnswer = React.useCallback(
    async (correct: boolean) => {
      processRef.current?.setProgress(
        Math.round(((currentQuestionIndex + 1) / questions.length) * 100),
      );

      setFeedbackMessage(
        correct
          ? '🎉 Correct! You got it right!'
          : '❌ Incorrect! Better luck next time!',
      );

      const newAnalysis = { ...analysis };

      if (correct) {
        newAnalysis.correct += 1;
        newAnalysis.streak += 1;
      } else {
        newAnalysis.incorrect += 1;
        newAnalysis.streak = 0;
      }

      newAnalysis.time += 1;
      newAnalysis.maxStreak = Math.max(
        newAnalysis.maxStreak,
        newAnalysis.streak,
      );
      setAnalysis(newAnalysis);

      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFeedbackMessage('');
      const newIncorrectWords = [...incorrectWords];

      if (!correct) {
        newIncorrectWords.push({
          ...questions[currentQuestionIndex],
          timestamp: Date.now(),
        });
        setIncorrectWords(newIncorrectWords);
      }

      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        return;
      }

      if (newIncorrectWords.length > 0) {
        setQuestions(shuffleArray(newIncorrectWords));
        setIncorrectWords([]);
        setCurrentQuestionIndex(0);
        setIsDoingIncorrectWords(true);
        processRef.current?.setProgress(0);
        return;
      }
      setIsCompleted(true);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    },
    [analysis, currentQuestionIndex, incorrectWords, questions],
  );

  const renderQuestion = React.useCallback(() => {
    const currentQuestion = questions[currentQuestionIndex];
    console.log('currentQuestion', currentQuestion, questions);

    if (!currentQuestion && isCompleted) return <Done analysis={analysis} />;

    switch (currentQuestion?.type) {
      case QuestionType.EN_TO_VN:
        return (
          <PickCorrectAnswer
            answer={currentQuestion.word?.meaning as string}
            question={
              currentQuestion.shouldShowAudio ? (
                <Pressable
                  onPress={() =>
                    textToSpeech(currentQuestion.word?.word as string)
                  }
                >
                  <Volume2 className="mx-auto cursor-pointer" size={20} />
                </Pressable>
              ) : (
                (currentQuestion.word?.word as string)
              )
            }
            options={shuffleArray(
              words
                .map((word) => word.meaning)
                .filter((option) => option !== currentQuestion.word?.meaning),
            ).slice(0, 3)}
            updateKey={currentQuestion.timestamp || currentQuestion.type}
            handleAnswer={handleAnswer}
            onPick={() => textToSpeech(currentQuestion.word?.word as string)}
          />
        );

      case QuestionType.VN_TO_EN:
        return (
          <PickCorrectAnswer
            question={currentQuestion.word?.meaning as string}
            answer={currentQuestion.word?.word as string}
            options={shuffleArray(
              words
                .map((word) => word.word)
                .filter((option) => option !== currentQuestion.word?.word),
            ).slice(0, 3)}
            updateKey={currentQuestion.timestamp || currentQuestion.type}
            handleAnswer={handleAnswer}
            onPick={(option: string) => textToSpeech(option)}
          />
        );

      case QuestionType.FILL_BLANK:
        return (
          <PickCorrectAnswer
            question={(currentQuestion.word?.example as string)
              .split(' ')
              .map((exampleWord) => {
                const question = (currentQuestion.word?.word as string)?.toLowerCase()
                if (exampleWord.toLowerCase().includes(question)) {
                  return (question).length > 10
                    ? '_______'
                    : new Array(exampleWord.length).fill('_').join('');
                }
                return exampleWord;
              })
              .join(' ')}
            answer={currentQuestion.word?.word as string}
            options={shuffleArray(
              words
                .map((word) => word.word)
                .filter((option) => option !== currentQuestion.word?.word),
            ).slice(0, 3)}
            updateKey={currentQuestion.timestamp || currentQuestion.type}
            handleAnswer={handleAnswer}
            onPick={(option: string) => textToSpeech(option)}
          />
        );
      case QuestionType.MATCH:
        return (
          <MatchWords question={currentQuestion} handleAnswer={handleAnswer} />
        );

      default:
        break;
    }
  }, [analysis, currentQuestionIndex, handleAnswer, questions, words]);

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="relative flex h-screen flex-col items-center gap-3 px-4 py-6">
        {currentQuestion && (
          <>
            <View className="flex w-full max-w-4xl flex-row items-center justify-between gap-4">
              <Pressable onPress={() => router.navigate('/')}>
                <X size={24} className="text-muted-foreground cursor-pointer" />
              </Pressable>
              <ProgressBar
                ref={processRef}
                className="flex-1"
                initialProgress={10}
              />
            </View>

            <View className="flex w-full max-w-4xl items-end gap-2">
              <Text className="inline-flex items-center">
                Streak: {analysis.streak}{' '}
                <Svg
                  width="20"
                  height="20"
                  viewBox="0 0 40 40"
                  className="mb-1"
                >
                  <Path
                    fill="#f78f8f"
                    d="M32.375,26.5c0,6.627-5.54,12-12.375,12s-12.375-5.373-12.375-12c0-9,11.344-16.5,11.344-25	c2.577,1.249,6.703,5.665,6.703,11.5c0,2.5-0.516,5-0.516,5c3.094-1,3.094-4.5,3.094-4.5S32.375,19,32.375,26.5z"
                  />
                  <Path
                    fill="#ffeea3"
                    d="M19.795,17.5c0.109,0.525,0.168,1.068,0.168,1.625c0,6.069-6.523,6.536-7.313,11.391 c-0.569,3.491,1.331,7.985,7.094,7.985c4.255,0,7.703-3.763,7.703-8.404C27.447,25.515,21.082,17.701,19.795,17.5z"
                  />
                  <Path
                    fill="#c74343"
                    d="M20,39c-7.099,0-12.875-5.607-12.875-12.5c0-4.722,2.991-9.005,5.883-13.148	c2.808-4.021,5.46-7.82,5.46-11.852c0-0.172,0.088-0.333,0.234-0.424c0.146-0.09,0.329-0.102,0.484-0.026	c2.9,1.406,6.985,6.043,6.985,11.95c0,1.603-0.204,3.187-0.358,4.155c1.911-1.165,1.936-3.627,1.936-3.655	c0-0.215,0.138-0.406,0.342-0.474c0.205-0.068,0.429,0.001,0.558,0.174c0.173,0.23,4.225,5.72,4.225,13.3	C32.875,33.393,27.099,39,20,39z M19.434,2.336c-0.334,4.039-3.011,7.873-5.605,11.589C11.024,17.94,8.125,22.093,8.125,26.5	C8.125,32.841,13.452,38,20,38s11.875-5.159,11.875-11.5c0-5.354-2.183-9.709-3.333-11.634c-0.322,1.227-1.143,2.935-3.231,3.61	c-0.168,0.056-0.355,0.016-0.487-0.103c-0.133-0.119-0.192-0.299-0.156-0.474c0.005-0.024,0.505-2.482,0.505-4.899	C25.172,8.045,21.963,3.957,19.434,2.336z"
                  />
                </Svg>
              </Text>
            </View>
          </>
        )}

        <View className="flex w-full max-w-2xl flex-1 flex-col justify-center gap-3">
          <Text className="text-red-500">
            {isDoingIncorrectWords &&
              !isCompleted &&
              'Cùng làm lại các câu sai nhé!'}
          </Text>

          {currentQuestion && (
            <Text className="text-xl font-medium">
              {
                questionTitleMapping[
                  questions[currentQuestionIndex]?.type as QuestionType
                ]
              }
            </Text>
          )}
          <View>{renderQuestion()}</View>

          <Text
            className={`text-center ${
              feedbackMessage.includes('Correct')
                ? 'text-green-400'
                : 'text-red-500'
            }`}
          >
            {feedbackMessage}
          </Text>
        </View>
      </View>
    </>
  );
}
