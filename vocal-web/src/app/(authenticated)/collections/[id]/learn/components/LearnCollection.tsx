'use client'

import React, { useState, useEffect, useCallback, useMemo } from 'react'
import MatchWords from './MatchWords'
import { shuffleArray } from '@/lib/utils'
import { PickCorretAnswer } from './PickCorretAnswer'
import { textToSpeech } from '@/lib/textToSpeech'
import { useRouter } from 'next/navigation'
import { soundCorrect } from '@/lib/soundEffect'
import confetti from 'canvas-confetti'

enum QuestionType {
  EN_TO_VN = 'en-to-vn',
  VN_TO_EN = 'vn-to-en',
  MATCH = 'match',
}

const questionTitleMapping = {
  [QuestionType.EN_TO_VN]: 'Chọn nghĩa tiếng Việt',
  [QuestionType.VN_TO_EN]: 'Chọn từ tiếng Anh',
  [QuestionType.MATCH]: 'Nối từ',
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
  const [progress, setProgress] = useState(5)
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()
  const totalQuestions = collection.words.length

  // Khởi tạo câu hỏi và thêm 2-3 câu hỏi "MatchWords"
  useEffect(() => {
    const q = []
    for (let i = 0; i < totalQuestions; i++) {
      let type = getRandomType()
      while (type === q[i - 1]?.type) {
        type = getRandomType()
      }
      const shouldShowAudio = Math.random() < 0.5 ? true : false
      if (type === QuestionType.MATCH) {
        const words = shuffleArray(collection.words).slice(0, 5)
        q.push({ type, words, shouldShowAudio })
      }
      // if (type === QuestionType.EN_TO_VN || type === QuestionType.VN_TO_EN) {
      //   const word = collection.words[Math.floor(Math.random() * collection.words.length)]
      //   q.push({ type, word, shouldShowAudio })
      // }
    }
    console.log('q', q)
    setQuestions(q)
  }, [collection])

  const handleAnswer = async (correct) => {
    setFeedbackMessage(
      correct ? '🎉 Tuyệt vời, bạn đã trả lời đúng!' : '❌ Đáp án sai rồi, thử lại lần sau nhé!'
    )

    // Hiệu ứng confetti nếu trả lời đúng
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

    if (!correct) {
      setIncorrectWords([...incorrectWords, questions[currentQuestionIndex].word])
    }

    // Tính tiến độ (tính phần trăm)
    setProgress(Math.round(((currentQuestionIndex + 1) / questions.length) * 100))

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      return
    }

    if (incorrectWords.length > 0) {
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
      return
    }

    alert('Hoàn thành tất cả các câu hỏi!')
    router.push('/')
  }

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]
    if (!currentQuestion) return

    if (currentQuestion?.type === 'en-to-vn') {
      setCurrentComponent(
        <PickCorretAnswer
          answer={currentQuestion.word.meaning}
          question={currentQuestion.word.word}
          options={shuffleArray(
            collection.words
              .map((word) => word.meaning)
              .filter((option) => option !== currentQuestion.word.meaning)
          ).slice(0, 3)}
          handleAnswer={handleAnswer}
          onPick={(option) => textToSpeech(currentQuestion.word.word)}
        />
      )
    } else if (currentQuestion?.type === 'vn-to-en') {
      setCurrentComponent(
        <PickCorretAnswer
          question={currentQuestion.word.meaning}
          answer={currentQuestion.word.word}
          options={shuffleArray(
            collection.words
              .map((word) => word.word)
              .filter((option) => option !== currentQuestion.word.word)
          ).slice(0, 3)}
          handleAnswer={handleAnswer}
          onPick={(option) => textToSpeech(option)}
        />
      )
    } else if (currentQuestion?.type === 'match') {
      setCurrentComponent(<MatchWords question={currentQuestion} handleAnswer={handleAnswer} />)
    }
  }, [currentQuestionIndex, questions])

  return (
    <div className="min-h-[calc(100vh-56px)] p-6 flex flex-col items-center relative">
      {/* Tiến độ */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-4 mb-6">
        <div className="w-full bg-gray-300 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Câu hỏi hiện tại */}
      <div className="w-full h-[80vh] max-w-xl flex flex-col justify-center">
        <h3 className='text-2xl font-bold mb-6'>{questionTitleMapping[questions[currentQuestionIndex]?.type]}</h3>
        
        {currentComponent}

        <div
          className={`text-2xl mt-8 font-bold h-10 w-full text-center ${
            feedbackMessage.includes('đúng') ? 'text-green-400' : 'text-red-500'
          }`}
        >
          {feedbackMessage}
        </div>
      </div>
    </div>
  )
}

export default LearningScreen
