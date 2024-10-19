import { shuffleArray } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

export const PickCorretAnswer = ({
  answer,
  question,
  options,
  handleAnswer,
  words,
  type = 'en-to-vn',
}) => {
  console.log('type', type)
  // Trạng thái để quản lý các hiệu ứng phản hồi khi người dùng chọn đáp án
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    if (selectedOption) return // Chặn việc chọn đáp án khác sau khi đã chọn

    setSelectedOption(option)
    const isCorrect = option === answer
    handleAnswer(isCorrect)
  }

  useEffect(() => {
    setSelectedOption(null)
  }, [question])

  return (
    <div className="text-center">
      {/* Từ tiếng Anh được hỏi */}
      <h2 className="text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 inline-block py-2 px-6 rounded-lg mb-6 animate-pulse">
        {question}
      </h2>

      {/* Lựa chọn đáp án */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((option, index) => (
          <button
            key={index}
            className={`py-3 px-5 rounded-lg font-semibold transition-all transform ${
              selectedOption === option
                ? option === answer
                  ? 'bg-green-500 text-white scale-105 animate-wiggle animate-infinite'
                  : 'bg-red-500 text-white scale-95'
                : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105'
            }`}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption} 
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
