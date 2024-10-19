import { textToSpeech } from '@/lib/textToSpeech'
import { shuffleArray } from '@/lib/utils'
import clsx from 'clsx'
import React, { useMemo, useState } from 'react'

const MatchWords = ({ words, handleAnswer }) => {
  // Chọn 5 từ ngẫu nhiên từ danh sách
  const randomWords = words

  // Tạo cột tiếng Việt và tiếng Anh
  const vietnameseWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.meaning)),
    [randomWords]
  )
  const englishWords = useMemo(
    () => shuffleArray(randomWords.map((word) => word.word)),
    [randomWords]
  )

  // Trạng thái lưu từ được chọn
  const [selectedVietnamese, setSelectedVietnamese] = useState(null)
  const [selectedEnglish, setSelectedEnglish] = useState(null)
  const [matchedPairs, setMatchedPairs] = useState([]) // Từ đã match đúng
  const [incorrectPair, setIncorrectPair] = useState(null) // Từ sai gần nhất

  // Kiểm tra kết hợp từ
  const handleMatch = (vietnamese, english) => {
    const word = randomWords.find((w) => w.meaning === vietnamese && w.word === english)
    if (word) {
      // Nếu đúng, thêm vào danh sách các từ đã đúng
      setMatchedPairs([...matchedPairs, word.word])
      setSelectedVietnamese(null)
      setSelectedEnglish(null)
      setIncorrectPair(null) // Xóa highlight đỏ khi match đúng

      if (matchedPairs.length + 1 === randomWords.length) {
        handleAnswer(true) // Tất cả từ đã đúng
      }
    } else {
      // Nếu sai, highlight đỏ
      setIncorrectPair({ vietnamese, english })
      setTimeout(() => {
        setIncorrectPair(null)
        setSelectedVietnamese(null)
        setSelectedEnglish(null)
      }, 500)
    }
  }

  const handleVietnameseClick = (meaning) => {
    setSelectedVietnamese(meaning)
    if (selectedEnglish) {
      handleMatch(meaning, selectedEnglish)
    }
  }

  const handleEnglishClick = (word) => {
    setSelectedEnglish(word)
    textToSpeech(word)
    if (selectedVietnamese) {
      handleMatch(selectedVietnamese, word)
    }
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-green-400 to-blue-500 inline-block py-2 px-6 rounded-lg mb-6 animate-pulse">
        Chọn cặp từ
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Cột tiếng Việt */}
        <div className="flex flex-col gap-4">
          {vietnameseWords.map((meaning, index) => {
            const isMatched = matchedPairs.includes(
              randomWords.find((w) => w.meaning === meaning).word
            )
            const isIncorrect = incorrectPair?.vietnamese === meaning
            const isSelected = selectedVietnamese === meaning

            return (
              <button
                key={index}
                className={clsx(
                  'py-3 px-4 shadow rounded transition-all transform border hover:scale-105 duration-300',
                  {
                    'bg-red-400 text-white opacity-75': isIncorrect,
                    'cursor-not-allowed bg-gray-400': isMatched,
                    'bg-blue-500 text-white scale-105': isSelected,
                    'text-white': isIncorrect || isMatched,
                    'hover:bg-blue-500': !isMatched && !isSelected,
                  }
                )}
                onClick={() => handleVietnameseClick(meaning)}
                disabled={isMatched}
              >
                {meaning}
              </button>
            )
          })}
        </div>

        {/* Cột tiếng Anh */}
        <div className="flex flex-col gap-4">
          {englishWords.map((word, index) => {
            const isMatched = matchedPairs.includes(word)
            const isIncorrect = incorrectPair?.english === word
            const isSelected = selectedEnglish === word
            return (
              <button
                key={index}
                className={clsx(
                  'py-3 px-4 shadow rounded transition-all transform border hover:scale-105 duration-300',
                  {
                    'bg-red-400 text-white opacity-75': isIncorrect,
                    'cursor-not-allowed bg-gray-400': isMatched,
                    'bg-green-500 text-white scale-105': isSelected,
                    'text-white': isIncorrect || isMatched,
                    'hover:bg-green-500': !isMatched && !isSelected,
                  }
                )}
                onClick={() => handleEnglishClick(word)}
                disabled={isMatched}
              >
                {word}
              </button>
            )
          })}
        </div>
      </div>

      {/* Thông báo nếu chọn sai */}
      {incorrectPair && (
        <div className="mt-4 text-red-600 font-semibold animate-pulse">
          Cặp từ sai rồi! Thử lại nhé!
        </div>
      )}
    </div>
  )
}

export default MatchWords
