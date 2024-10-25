'use client'

import React, { useState, useEffect } from 'react'
import MatchWords from './MatchWords'
import { shuffleArray } from '@/lib/utils'
import { PickCorretAnswer } from './PickCorretAnswer'
import { textToSpeech } from '@/lib/textToSpeech'
import { useRouter } from 'next/navigation'
import { soundCorrect } from '@/lib/soundEffect'
import confetti from 'canvas-confetti'
import { Volume2, X } from 'lucide-react'
import { Done } from './Done'
import { time } from 'console'

enum QuestionType {
  EN_TO_VN = 'en-to-vn',
  VN_TO_EN = 'vn-to-en',
  MATCH = 'match',
  DONE = 'done',
  FILL_BLANK = 'fill-blank',
}

const questionTitleMapping = {
  [QuestionType.EN_TO_VN]: 'Select meaning',
  [QuestionType.VN_TO_EN]: 'Select segment',
  [QuestionType.MATCH]: 'Match the words',
  [QuestionType.FILL_BLANK]: 'Fill the blank',
}

function getRandomType() {
  // Mảng chứa các chuỗi và tỉ lệ của chúng
  const stringsWithWeights = [
    { string: QuestionType.EN_TO_VN, weight: 0.2 },
    { string: QuestionType.VN_TO_EN, weight: 0.2 },
    { string: QuestionType.MATCH, weight: 0.2 },
    { string: QuestionType.FILL_BLANK, weight: 0.2 },
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
  const [analysis, setAnalysis] = useState({
    correct: 0,
    incorrect: 0,
    time: 0,
    streak: 0,
    maxStreak: 0,
  })

  const router = useRouter()
  const totalQuestions = collection.words.length

  useEffect(() => {
    const q = []
    const wordsWithExample = collection.words.filter(
      (word) => word.example && word.example.toLowerCase().includes(word.word.toLowerCase())
    )

    for (let i = 0; i < totalQuestions; i++) {
      let type = getRandomType()
      while (type === q[i - 1]?.type) {
        type = getRandomType()
      }
      const shouldShowAudio = Math.random() < 0.5 ? true : false

      switch (type) {
        case QuestionType.MATCH:
          const words = shuffleArray(collection.words).slice(0, 5)
          q.push({ type, words, shouldShowAudio })
          break
        case QuestionType.EN_TO_VN:
        case QuestionType.VN_TO_EN:
          const word = collection.words[Math.floor(Math.random() * collection.words.length)]
          q.push({ type, word, shouldShowAudio })
          break

        case QuestionType.FILL_BLANK:
          if (wordsWithExample.length < 1) {
            i--
            break
          }
          const randomIndex = Math.floor(Math.random() * wordsWithExample.length)
          const w = wordsWithExample[randomIndex]
          q.push({ type, word: w, shouldShowAudio })
          wordsWithExample.splice(randomIndex, 1)
          break

        default:
          break
      }
    }
    console.log('q', q)
    setQuestions(q)
  }, [collection])

  const handleAnswer = async (correct) => {
    setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))

    setFeedbackMessage(
      correct ? '🎉 Correct! You got it right!' : '❌ Incorrect! Better luck next time!'
    )

    const newAnalysis = { ...analysis }

    if (correct) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        ticks: 40,
      })
      soundCorrect()
      newAnalysis.correct += 1
      newAnalysis.streak += 1
    } else {
      newAnalysis.incorrect += 1
      newAnalysis.streak = 0
    }

    newAnalysis.time += 1
    newAnalysis.maxStreak = Math.max(newAnalysis.maxStreak, newAnalysis.streak)
    setAnalysis(newAnalysis)

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
    setCurrentComponent(<Done analysis={analysis} />)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]
    console.log('currentQuestion', currentQuestion)

    if (!currentQuestion) return

    switch (currentQuestion?.type) {
      case QuestionType.EN_TO_VN:
        setCurrentComponent(
          <PickCorretAnswer
            answer={currentQuestion.word.meaning}
            question={
              currentQuestion.shouldShowAudio ? (
                <Volume2
                  className="mx-auto cursor-pointer"
                  onClick={() => textToSpeech(currentQuestion.word.word)}
                  size={20}
                />
              ) : (
                currentQuestion.word.word
              )
            }
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

      case QuestionType.FILL_BLANK:
        setCurrentComponent(
          <PickCorretAnswer
            question={currentQuestion.word.example
              .split(' ')
              .map((word) => {
                if (word.includes(currentQuestion.word.word)) {
                  return currentQuestion.word.word.length > 10
                    ? '_______'
                    : new Array(word.length).fill('_').join('')
                }
                return word
              })
              .join(' ')}
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
    <div className="h-screen py-8 px-6 items-center relative flex flex-col gap-3">
      {/* Tiến độ */}
      {currentQuestion && (
        <>
          <div className="w-full max-w-4xl flex items-center justify-between gap-4">
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

          <div className="w-full max-w-4xl flex items-center justify-between gap-4">
            <h3 className="text-xl font-bold">
              {isDoingIncorrectWords && <>Let's try again with incorrect words</>}
            </h3>
            <span className="inline-flex items-center text-lg font-medium">
              Streak: {analysis.streak}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="20"
                height="20"
                viewBox="0 0 40 40"
                className="mb-1"
              >
                <path
                  fill="#f78f8f"
                  d="M32.375,26.5c0,6.627-5.54,12-12.375,12s-12.375-5.373-12.375-12c0-9,11.344-16.5,11.344-25	c2.577,1.249,6.703,5.665,6.703,11.5c0,2.5-0.516,5-0.516,5c3.094-1,3.094-4.5,3.094-4.5S32.375,19,32.375,26.5z"
                ></path>
                <path
                  fill="#ffeea3"
                  d="M19.795,17.5c0.109,0.525,0.168,1.068,0.168,1.625c0,6.069-6.523,6.536-7.313,11.391 c-0.569,3.491,1.331,7.985,7.094,7.985c4.255,0,7.703-3.763,7.703-8.404C27.447,25.515,21.082,17.701,19.795,17.5z"
                ></path>
                <path
                  fill="#c74343"
                  d="M20,39c-7.099,0-12.875-5.607-12.875-12.5c0-4.722,2.991-9.005,5.883-13.148	c2.808-4.021,5.46-7.82,5.46-11.852c0-0.172,0.088-0.333,0.234-0.424c0.146-0.09,0.329-0.102,0.484-0.026	c2.9,1.406,6.985,6.043,6.985,11.95c0,1.603-0.204,3.187-0.358,4.155c1.911-1.165,1.936-3.627,1.936-3.655	c0-0.215,0.138-0.406,0.342-0.474c0.205-0.068,0.429,0.001,0.558,0.174c0.173,0.23,4.225,5.72,4.225,13.3	C32.875,33.393,27.099,39,20,39z M19.434,2.336c-0.334,4.039-3.011,7.873-5.605,11.589C11.024,17.94,8.125,22.093,8.125,26.5	C8.125,32.841,13.452,38,20,38s11.875-5.159,11.875-11.5c0-5.354-2.183-9.709-3.333-11.634c-0.322,1.227-1.143,2.935-3.231,3.61	c-0.168,0.056-0.355,0.016-0.487-0.103c-0.133-0.119-0.192-0.299-0.156-0.474c0.005-0.024,0.505-2.482,0.505-4.899	C25.172,8.045,21.963,3.957,19.434,2.336z"
                ></path>
              </svg>
            </span>
          </div>
        </>
      )}

      {/* Câu hỏi hiện tại */}
      <div className="w-full flex-1 max-w-xl flex flex-col justify-center">
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
