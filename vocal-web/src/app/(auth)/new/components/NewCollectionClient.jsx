"use client"

import { Input } from '@/components/ui/input';
import { Button } from '../../../../components/ui/button';
import React, { useState } from 'react';
import { httpClient } from '@/services/httpClient';
import { useRouter } from 'next/navigation';

const NewCollectionClient = ({ initialValues }) => {
  const [collectionName, setCollectionName] = useState(initialValues?.name);
  const [words, setWords] = useState(initialValues?.words || [{ word: '', meaning: '', image: '', pronunciation: '', example: '' }]);

  const router = useRouter();

  const addNewWord = () => {
    setWords([...words, { word: '', meaning: '', image: '', pronunciation: '', example: '' }]);
  };

  const handleChange = (index, field, value) => {
    const newWords = [...words];
    newWords[index][field] = value;
    setWords(newWords);
  };

  const onFinish = () => {
    httpClient.post('/api/collections', {
      id: initialValues?.id,
      name: collectionName,
      words,
    }).then(() => {
      router.push('/')
    })
  }

  return (
    <div className='p-4 grid gap-4'>
      <h2 className='text-2xl font-bold mb-4'>Thêm bộ mới</h2>

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
            placeholder="Phát âm"
            value={word.pronunciation}
            onChange={(e) => handleChange(index, 'pronunciation', e.target.value)}
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
  );
};

export default NewCollectionClient;
