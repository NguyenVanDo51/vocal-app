import { Button } from '@/components/ui/button'
import { textToSpeech } from '@/lib/textToSpeech'
import { shuffleArray } from '@/lib/utils'
import clsx from 'clsx'
import { Speaker, Volume2 } from 'lucide-react'
import React, { useEffect, useMemo, useState } from 'react'

const MatchWords = ({ question, handleAnswer }) => {
  // Chọn 5 từ ngẫu nhiên từ danh sách
  const randomWords = question.words
  const { shouldShowAudio } = question

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
      console.log('matchedPairs', matchedPairs)
      console.log('randomWords', randomWords)

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

  useEffect(() => {
    setMatchedPairs([]) // Reset danh sách từ đã đúng khi words thay đổi
    setSelectedVietnamese(null)
    setSelectedEnglish(null)
    setIncorrectPair(null)
  }, [question])

  return (
    <div className="text-center">
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Cột tiếng Anh */}
        <div className="flex flex-col gap-4">
          {englishWords.map((word, index) => {
            const isMatched = matchedPairs.includes(word)
            const isIncorrect = incorrectPair?.english === word
            const isSelected = selectedEnglish === word
            let status = undefined
            if (isSelected && !isIncorrect) {
              status = 'primary'
            } else if (isSelected && isIncorrect) {
              status = 'red'
            }
            return (
              <Button
                variant="doulingo"
                key={index}
                status={status}
                onClick={() => handleEnglishClick(word)}
                disabled={isMatched}
              >
                {shouldShowAudio ? <Volume2 size={20} /> : word}
              </Button>
            )
          })}
        </div>

        {/* Cột tiếng Việt */}
        <div className="flex flex-col gap-4">
          {vietnameseWords.map((meaning, index) => {
            const isMatched = matchedPairs.includes(
              randomWords.find((w) => w.meaning === meaning).word
            )
            const isIncorrect = incorrectPair?.vietnamese === meaning
            const isSelected = selectedVietnamese === meaning
            let status = undefined
            if (isSelected && !isIncorrect) {
              status = 'primary'
            } else if (isSelected && isIncorrect) {
              status = 'red'
            }
            return (
              <Button
                variant="doulingo"
                key={index}
                status={status}
                onClick={() => handleVietnameseClick(meaning)}
                disabled={isMatched}
              >
                {meaning}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Thông báo nếu chọn sai */}
      {
        <div className="mt-4 text-red-600 font-semibold animate-pulse h-8">
          {incorrectPair && `Cặp từ sai rồi! Thử lại nhé!`}
        </div>
      }
    </div>
  )
}

export default MatchWords
