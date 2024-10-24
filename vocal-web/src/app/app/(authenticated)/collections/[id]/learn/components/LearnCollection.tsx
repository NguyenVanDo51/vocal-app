'use client'

import React, { useState, useEffect } from 'react'
import MatchWords from './MatchWords'
import { shuffleArray } from '@/lib/utils'
import { PickCorretAnswer } from './PickCorretAnswer'
import { textToSpeech } from '@/lib/textToSpeech'
import { useRouter } from 'next/navigation'
import { soundCorrect } from '@/lib/soundEffect'
import confetti from 'canvas-confetti'
import { X } from 'lucide-react'
import { Done } from './Done'
import { time } from 'console'

enum QuestionType {
  EN_TO_VN = 'en-to-vn',
  VN_TO_EN = 'vn-to-en',
  MATCH = 'match',
  DONE = 'done',
}

const questionTitleMapping = {
  [QuestionType.EN_TO_VN]: 'Select meaning',
  [QuestionType.VN_TO_EN]: 'Select segment',
  [QuestionType.MATCH]: 'Match the words',
}

function getRandomType() {
  // Mảng chứa các chuỗi và tỉ lệ của chúng
  const stringsWithWeights = [
    { string: QuestionType.EN_TO_VN, weight: 0.4 },
    { string: QuestionType.VN_TO_EN, weight: 0.4 },
    { string: QuestionType.MATCH, weight: 0.2 },
  ]

  // Tính tổng trọng số
  const totalWeight = stringsWithWeights.reduce((total, current) => total + current.weight, 0)

  // Lấy một số ngẫu nhiên từ 0 đến tổng trọng số
  let random = Math.random() * totalWeight

  // Lặp qua các chuỗi và trả về chuỗi theo tỉ lệ
  for (const item of stringsWithWeights) {
    if (random < item.weight) {
      return item.string
    }
    random -= item.weight
  }
}

const LearningScreen = ({ collection }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState([])
  const [currentComponent, setCurrentComponent] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [progress, setProgress] = useState(0)
  const [isDoingIncorrectWords, setIsDoingIncorrectWords] = useState(false)

  const router = useRouter()
  const totalQuestions = collection.words.length

  useEffect(() => {
    const q = []
    for (let i = 0; i < totalQuestions; i++) {
      let type = getRandomType()
      while (type === q[i - 1]?.type) {
        type = getRandomType()
      }
      const shouldShowAudio = Math.random() < 0.5 ? true : false
      // if (type === QuestionType.MATCH) {
      //   const words = shuffleArray(collection.words).slice(0, 5)
      //   q.push({ type, words, shouldShowAudio })
      // }
      if (type === QuestionType.EN_TO_VN || type === QuestionType.VN_TO_EN) {
        const word = collection.words[Math.floor(Math.random() * collection.words.length)]
        q.push({ type, word, shouldShowAudio })
      }
    }
    console.log('q', q)
    setQuestions(q)
  }, [collection])

  const handleAnswer = async (correct) => {
    // setCurrentComponent(<Done />)
    // return
    setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))

    setFeedbackMessage(
      correct ? '🎉 Correct! You got it right!' : '❌ Incorrect! Better luck next time!'
    )

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        ticks: 40,
      })
      soundCorrect()
    }
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFeedbackMessage('')
    const newIncorrectWords = [...incorrectWords]

    if (!correct) {
      newIncorrectWords.push({ ...questions[currentQuestionIndex], timestamp: Date.now() })
      setIncorrectWords(newIncorrectWords)
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      return
    }

    if (newIncorrectWords.length > 0) {
      setQuestions(shuffleArray(newIncorrectWords))
      setIncorrectWords([])
      setCurrentQuestionIndex(0)
      setIsDoingIncorrectWords(true)
      setProgress(0)
      return
    }
    setCurrentComponent(<Done />)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    switch (currentQuestion?.type) {
      case QuestionType.EN_TO_VN:
        setCurrentComponent(
          <PickCorretAnswer
            answer={currentQuestion.word.meaning}
            question={currentQuestion.word.word}
            options={shuffleArray(
              collection.words
                .map((word) => word.meaning)
                .filter((option) => option !== currentQuestion.word.meaning)
            ).slice(0, 3)}
            key={currentQuestion.timestamp}
            handleAnswer={handleAnswer}
            onPick={() => textToSpeech(currentQuestion.word.word)}
          />
        )
        break
      case QuestionType.VN_TO_EN:
        setCurrentComponent(
          <PickCorretAnswer
            question={currentQuestion.word.meaning}
            answer={currentQuestion.word.word}
            options={shuffleArray(
              collection.words
                .map((word) => word.word)
                .filter((option) => option !== currentQuestion.word.word)
            ).slice(0, 3)}
            key={currentQuestion.timestamp}
            handleAnswer={handleAnswer}
            onPick={(option) => textToSpeech(option)}
          />
        )
        break
      case QuestionType.MATCH:
        setCurrentComponent(<MatchWords question={currentQuestion} handleAnswer={handleAnswer} />)
        break
      default:
        break
    }
  }, [currentQuestionIndex, questions])

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="h-screen py-12 px-6 flex flex-col items-center relative">
      {/* Tiến độ */}
      {currentQuestion && (
        <div className="w-full max-w-4xl flex items-center justify-between gap-4 mb-6">
          <X
            size={24}
            className="cursor-pointer text-muted-foreground"
            onClick={() => router.push('/app')}
          />
          <div className="w-full bg-gray-300 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {isDoingIncorrectWords && (
        <div className="w-full max-w-4xl flex items-center justify-between gap-4 mb-6">
          <h3 className="text-xl font-bold mb-6">Let's try again with incorrect words</h3>
        </div>
      )}

      {/* Câu hỏi hiện tại */}
      <div className="w-full h-[80vh] max-w-xl flex flex-col justify-center">
        {currentQuestion && (
          <h3 className="text-2xl font-bold mb-6">
            {questionTitleMapping[questions[currentQuestionIndex]?.type]}
          </h3>
        )}

        {currentComponent}

        <div
          className={`text-2xl mt-8 font-bold h-10 w-full text-center ${
            feedbackMessage.includes('Correct') ? 'text-green-400' : 'text-red-500'
          }`}
        >
          {feedbackMessage}
        </div>
      </div>
    </div>
  )
}

export default LearningScreen
