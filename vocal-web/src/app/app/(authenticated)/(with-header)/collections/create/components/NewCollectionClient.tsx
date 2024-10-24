'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { httpClient } from '@/services/httpClient'
import { useRouter } from 'next/navigation'

const NewCollectionClient = ({ collectionId }) => {
  const [collectionName, setCollectionName] = useState<string>()
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
      router.push('/app')
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
    <div className="p-4 grid gap-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {collectionId ? 'Update collection' : 'Create collection'}
      </h2>

      <Input
        type="text"
        placeholder="Name"
        value={collectionName}
        onChange={(e) => setCollectionName(e.target.value)}
      />

      {words.map((word, index) => (
        <div key={index} className="flex gap-3">
          <Input
            type="text"
            placeholder="Segment"
            value={word.word}
            onChange={(e) => handleChange(index, 'word', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Meaning"
            value={word.meaning}
            onChange={(e) => handleChange(index, 'meaning', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Image (URL)"
            value={word.image}
            onChange={(e) => handleChange(index, 'image', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Example"
            value={word.example}
            onChange={(e) => handleChange(index, 'example', e.target.value)}
          />
        </div>
      ))}
      <Button variant="doulingo" size="lg" onClick={addNewWord}>
        + Thêm từ mới
      </Button>

      <div className="flex gap-4 justify-end">
        <Button variant="doulingo" status="primary" onClick={onFinish}>
          Save
        </Button>
      </div>
    </div>
  )
}

export default NewCollectionClient
