import { Button } from '@/components/ui/button'
import { shuffleArray } from '@/lib/utils'
import { useEffect, useMemo, useState } from 'react'

export const PickCorretAnswer = ({
  answer,
  question,
  key,
  options = [],
  handleAnswer,
  onPick = (_) => {},
}) => {
  // Trạng thái để quản lý các hiệu ứng phản hồi khi người dùng chọn đáp án
  const [selectedOption, setSelectedOption] = useState(null)

  const handleOptionClick = (option) => {
    if (selectedOption) return // Chặn việc chọn đáp án khác sau khi đã chọn
    onPick(option)
    setSelectedOption(option)
    const isCorrect = option === answer
    handleAnswer(isCorrect)
  }

  const shuffledOptions = useMemo(() => shuffleArray([...options, answer]), [options, answer])

  useEffect(() => {
    console.log('question', question)
    setSelectedOption(null)
  }, [question, key])

  return (
    <div className="text-center">
      {/* Từ tiếng Anh được hỏi */}
      <h2 className="text-lg font-semibold mb-8 capitalize">{question}</h2>

      {/* Lựa chọn đáp án */}
      <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
        {shuffledOptions.map((option, index) => (
          <Button
            variant="doulingo"
            key={index}
            status={selectedOption === option ? (option === answer ? 'success' : 'red') : undefined}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption}
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  )
}
