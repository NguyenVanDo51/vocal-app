'use client'

import { httpClient } from '@/services/httpClient'
import { useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function HomeClient() {
  const { data, isLoading } = useSuspenseQuery({
    queryKey: ['my-collections'],
    queryFn: () => httpClient.get('/api/collections/mine').then((r) => r.data),
  })

  // Loading state
  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>
  }

  // Nếu không có bộ từ
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-white mt-10">
        <p>Bạn chưa có bộ từ nào. Hãy tạo mới một bộ từ!</p>
        <Link href="/collections/create">
          <button className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 font-bold">
            + Tạo mới
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-6">
      {/* Tiêu đề */}
      <h1 className="text-4xl font-bold text-white mb-10">Bộ từ của bạn</h1>

      {/* Nút Tạo mới */}
      <div className="w-full flex justify-end mb-6">
        <Link href="/collections/create">
          <button className="bg-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-600 transition duration-300 font-bold">
            + Tạo mới
          </button>
        </Link>
      </div>

      {/* Danh sách bộ từ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data.map((collection) => (
          <div
            key={collection.id}
            className="bg-gray-800 text-white rounded-lg shadow-lg p-6 hover:shadow-2xl transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2">{collection.collectionName}</h3>
            <p className="text-gray-400 mb-4">Số từ: {collection.words.length}</p>

            <ul className="mb-4">
              {collection.words.slice(0, 3).map((word, index) => (
                <li key={index} className="text-sm text-gray-300">
                  {word.word} - {word.meaning}
                </li>
              ))}
              {collection.words.length > 3 && (
                <li className="text-sm text-gray-400">... và {collection.words.length - 3} từ khác</li>
              )}
            </ul>

            {/* Nút sửa và học */}
            <div className="flex justify-between">
              <Link href={`/collections/${collection.id}/update`}>
                <button className="bg-yellow-500 text-black py-2 px-4 rounded-full hover:bg-yellow-600 transition duration-300">
                  Sửa
                </button>
              </Link>

              <Link href={`/collections/${collection.id}/learn`}>
                <button className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-300">
                  Học ngay
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
