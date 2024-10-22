'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { httpClient } from '@/services/httpClient'
import { useRouter } from 'next/navigation'

const NewCollectionClient = ({ collectionId }) => {
  const [collectionName, setCollectionName] = useState()
  const [words, setWords] = useState([
    { word: '', meaning: '', image: '', pronunciation: '', example: '' },
  ])

  const router = useRouter()

  const addNewWord = () => {
    setWords([...words, { word: '', meaning: '', image: '', pronunciation: '', example: '' }])
  }

  const handleChange = (index, field, value) => {
    const newWords = [...words]
    newWords[index][field] = value
    setWords(newWords)
  }

  const onFinish = () => {
    if (!collectionName) {
      alert('Vui lòng nhập tên tập')
      return
    }

    ;(words || []).forEach((word) => {
      if (!word.word || !word.meaning) {
        alert('Vui lòng nhập đủ thông tin từ mới')
        return
      }
    })

    const method = collectionId ? 'put' : 'post'
    const url = collectionId ? `/collections/${collectionId}` : '/collections'

    httpClient[method](url, {
      id: collectionId,
      name: collectionName,
      words,
    }).then(() => {
      router.push('/')
    })
  }

  useEffect(() => {
    if (collectionId) {
      httpClient.get(`/collections/${collectionId}`).then((res) => {
        setCollectionName(res.data.name)
        setWords(res.data.words)
      })
    }
  }, [])

  return (
    <div className="p-4 grid gap-4">
      <h2 className="text-2xl font-bold mb-4">{collectionId ? 'Sửa bộ từ' : 'Tạo bộ từ'}</h2>

      <Input
        type="text"
        placeholder="Tên tập"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />

      {words.map((word, index) => (
        <div key={index} className="flex gap-3 mb-3">
          <Input
            type="text"
            placeholder="Từ mới"
            value={word.word}
            onChange={(e) => handleChange(index, 'word', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ý nghĩa"
            value={word.meaning}
            onChange={(e) => handleChange(index, 'meaning', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Hình ảnh (URL)"
            value={word.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Ví dụ"
            value={word.example}
            onChange={(e) => handleChange(index, 'example', e.target.value)}
          />
        </div>
      ))}
      <Button onClick={addNewWord}>+ Thêm từ mới</Button>
      <Button onClick={onFinish}>Tạo</Button>
    </div>
  )
}

export default NewCollectionClient
