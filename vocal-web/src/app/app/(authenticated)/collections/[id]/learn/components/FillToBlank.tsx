import { useState } from "react"

export const FillToBlank = (question, handleAnswer) => {
  const [answer, setAnswer] = useState('')

  const correctWord = question.word.word
  const questionWithBlanks = question.word.example.replace(correctWord, '_____')


  return <div>
    <p>{questionWithBlanks}</p>
  </div>

}