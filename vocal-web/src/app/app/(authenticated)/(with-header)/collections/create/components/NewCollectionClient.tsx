'use client'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { httpClient } from '@/services/httpClient'
import { useRouter } from 'next/navigation'
import { Avatar, Select } from 'antd'
import { Plus, Trash } from 'lucide-react'
import { SelectImageModal } from '@/components/app/SelectImageModal'
import { useUserUnit } from '@/hooks/useUserUnit'

const NewCollectionClient = ({ collectionId }) => {
  const [collectionName, setCollectionName] = useState<string>()
  const [words, setWords] = useState([
    { word: '', meaning: '', image: '', pronunciation: '', example: '' },
  ])
  const [unitId, setUnitId] = useState()
  const [currentIndexToChangeImage, setCurrentIndexToChangeImage] = useState(undefined)
  const { userUnit } = useUserUnit()
  const router = useRouter()

  const addNewWord = () => {
    setWords([...words, { word: '', meaning: '', image: '', pronunciation: '', example: '' }])
  }

  const handleChange = (index, field, value) => {
    const newWords = [...words]
    newWords[index][field] = value
    setWords(newWords)
  }

  const handleDelete = (index) => {
    const newWords = [...words]
    newWords.splice(index, 1)
    setWords(newWords)
  }

  const onFinish = () => {
    if (!collectionName) {
      alert('Please enter the collection name')
      return
    }

    ;(words || []).forEach((word) => {
      if (!word.word || !word.meaning) {
        alert('Please enter the word and meaning')
        return
      }
    })

    const method = collectionId ? 'put' : 'post'
    const url = collectionId ? `/collections/${collectionId}` : '/collections'

    httpClient[method](url, {
      id: collectionId,
      name: collectionName,
      unit_id: unitId,
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
        setUnitId(res.data.unit_id)
      })
    }
  }, [])

  return (
    <div className="p-4 grid gap-4 mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {collectionId ? 'Update collection' : 'Create collection'}
      </h2>

      <div className="flex md:flex-row gap-3">
        <Input
          type="text"
          placeholder="Name"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />

        <Select
          options={userUnit}
          fieldNames={{ label: 'name', value: 'id' }}
          value={unitId}
          onChange={(value) => setUnitId(value)}
          placeholder="Select unit"
          className='w-60'
        />
      </div>

      {words.map((word, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row gap-3 items-center bg-black/5 p-3 rounded-md"
        >
          <span className="hidden md:inline">{index + 1}</span>

          <Input
            className="border-black/20"
            type="text"
            placeholder="Segment"
            value={word.word}
            onChange={(e) => handleChange(index, 'word', e.target.value)}
          />

          <Input
            className="border-black/20"
            type="text"
            placeholder="Meaning"
            value={word.meaning}
            onChange={(e) => handleChange(index, 'meaning', e.target.value)}
          />

          <Input
            className="border-black/20"
            type="text"
            placeholder="Example"
            value={word.example}
            onChange={(e) => handleChange(index, 'example', e.target.value)}
          />
          <div className="flex flex-row gap-2 items-center justify-between w-full md:w-auto">
            {word.image ? (
              <div className="relative">
                <span
                  className="absolute top-1 right-1 cursor-pointer z-10 bg-white/10 p-0.5 rounded"
                  onClick={() => handleChange(index, 'image', '')}
                >
                  <Trash className="text-red-500" size={20} />
                </span>

                <Avatar
                  src={word.image}
                  alt=""
                  size={'large'}
                  className="min-w-16 min-h-16"
                  shape="square"
                />
              </div>
            ) : (
              <button
                className="border border-dashed border-black/20 hover:border-primary hover:text-primary rounded-md p-2 cursor-pointer flex-col inline-flex justify-center min-w-16 h-16 text-sm items-center"
                type="button"
                onClick={() => setCurrentIndexToChangeImage(index)}
              >
                <Plus />
                <div style={{ marginTop: 8 }}>Image</div>
              </button>
            )}

            <span className="cursor-pointer p-1" onClick={() => handleDelete(index)}>
              <Trash size={18} className="text-red-500" />
            </span>
          </div>
        </div>
      ))}
      <button
        className="border border-dashed hover:border-primary hover:text-primary border-black/20 rounded-md p-2 cursor-pointer flex-col inline-flex justify-center min-w-16 text-sm items-center"
        onClick={addNewWord}
      >
        + Add new word
      </button>

      <div className="flex gap-4 justify-end">
        <Button variant="secondary" size="lg" onClick={() => router.push('/app')}>
          Cancel
        </Button>

        <Button size="lg" onClick={onFinish}>
          Save
        </Button>
      </div>

      <SelectImageModal
        open={currentIndexToChangeImage !== undefined}
        onCancel={() => setCurrentIndexToChangeImage(undefined)}
        onFinish={(selectedImage) => {
          handleChange(currentIndexToChangeImage, 'image', selectedImage)
        }}
        key={currentIndexToChangeImage}
        initialValue={words[currentIndexToChangeImage]?.word}
      />
    </div>
  )
}

export default NewCollectionClient
