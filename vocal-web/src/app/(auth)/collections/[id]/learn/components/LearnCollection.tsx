'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import MatchWords from './MatchWords'
import { shuffleArray } from '@/lib/utils'
import { PickCorretAnswer } from './PickCorretAnswer'

const LearningScreen = ({ collection }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [incorrectWords, setIncorrectWords] = useState([])
  const [currentComponent, setCurrentComponent] = useState(null)
  const [feedbackMessage, setFeedbackMessage] = useState('')
  const [progress, setProgress] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)

  const randomWords = useMemo(() => shuffleArray(collection.words), [collection.words])

  // Khởi tạo câu hỏi và thêm 2-3 câu hỏi "MatchWords"
  useEffect(() => {
    const wordQuestions = shuffleArray(
      collection.words.flatMap((word) => [
        { type: 'en-to-vn', word },
        { type: 'vn-to-en', word },
      ])
    )

    const matchWordsQuestions = []
    let currentIndex = 0
    while (currentIndex < collection.words.length) {
      matchWordsQuestions.push({
        type: 'match',
        words: randomWords.slice(currentIndex, currentIndex + 5),
      })
      currentIndex += 5
    }

    const shuffledQuestions = shuffleArray([...matchWordsQuestions, ...wordQuestions])
    setQuestions(shuffledQuestions)
  }, [collection])

  const handleAnswer = async (correct) => {
    setFeedbackMessage(
      correct ? '🎉 Tuyệt vời, bạn đã trả lời đúng!' : '❌ Đáp án sai rồi, thử lại lần sau nhé!'
    )

    // Hiệu ứng confetti nếu trả lời đúng
    if (correct) setShowConfetti(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setFeedbackMessage('')
    setShowConfetti(false)

    if (!correct) {
      setIncorrectWords([...incorrectWords, questions[currentQuestionIndex].word])
    }

    // Tính tiến độ (tính phần trăm)
    setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else if (incorrectWords.length > 0) {
      // Lặp lại các từ sai
      setQuestions(
        shuffleArray(
          incorrectWords.flatMap((word) => [
            { type: 'en-to-vn', word },
            { type: 'vn-to-en', word },
          ])
        )
      )
      setIncorrectWords([])
      setCurrentQuestionIndex(0)
    } else {
      alert('Hoàn thành tất cả các câu hỏi!')
    }
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    if (currentQuestion?.type === 'en-to-vn') {
      setCurrentComponent(
        <PickCorretAnswer
          answer={currentQuestion.word.meaning}
          question={currentQuestion.word.word}
          options={shuffleArray(collection.words.map((word) => word.meaning))}
          words={collection.words}
          handleAnswer={handleAnswer}
          type="en-to-vn"
        />
      )
    } else if (currentQuestion?.type === 'vn-to-en') {
      setCurrentComponent(
        <PickCorretAnswer
          question={currentQuestion.word.meaning}
          answer={currentQuestion.word.word}
          options={shuffleArray(collection.words.map((word) => word.word))}
          words={collection.words}
          handleAnswer={handleAnswer}
          type="vn-to-en"
        />
      )
    } else if (currentQuestion?.type === 'match') {
      setCurrentComponent(<MatchWords words={currentQuestion.words} handleAnswer={handleAnswer} />)
    }
  }, [currentQuestionIndex, questions])

  return (
    <div className="min-h-[calc(100vh-50.4px)] bg-gray-900 p-6 flex flex-col items-center justify-center text-white relative">
      {/* Hiệu ứng confetti */}
      {showConfetti && (
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="confetti"></div>
        </div>
      )}

      {/* Tiến độ */}
      <div className="w-full max-w-xl flex items-center justify-between gap-4 mb-6">
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-center text-sm text-gray-300">
          {currentQuestionIndex + 1}/{questions.length}
        </span>
      </div>

      {/* Câu hỏi hiện tại */}
      <div className="w-full max-w-xl p-2 md:p-6 bg-gray-800 rounded-xl shadow-lg">
        {currentComponent}
      </div>

      <div
        className={`text-2xl mt-4 font-bold h-10 w-full text-center ${
          feedbackMessage.includes('đúng') ? 'text-green-400' : 'text-red-500'
        }`}
      >
        {feedbackMessage}
      </div>
    </div>
  )
}

export default LearningScreen
