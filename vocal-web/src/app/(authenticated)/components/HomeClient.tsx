'use client'

import { useProfile } from '@/hooks/useProfile'
import { httpClient } from '@/services/httpClient'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const bgColors = ['#d4edfc', '#ffe5cf', '#f0dcf6', '#ffe5cf']

const emojis = [
  '🐶',
  '🐱',
  '🐭',
  '🐹',
  '🐰',
  '🦊',
  '🐻',
  '🐼',
  '🐻‍❄️',
  '🐨',
  '🐯',
  '🦁',
  '🐮',
  '🐷',
  '🐽',
  '🐀',
  '🐇',
  '🐉',
  '🐍',
  '🐎',
  '🐐',
  '🐒',
  '🐓',
  '🐶',
  '🐖',
  '🐱',
  '🦉',
  '🐟',
  '🐢',
  '🐝',
  '🐛',
  '🦋',
  '🐌',
  '🐞',
  '🐜',
  '🕷',
  '🕸',
  '🦂',
  '🦀',
  '🐙',
  '🐬',
  '🐳',
  '🦖',
  '🦕',
  '🦄',
  '🦩',
  '🦜',
  '🦚',
  '🐿️',
  '🦔',
  '🦦',
  '🦥',
  '🦘',
  '🦙',
  '🦒',
  '🐘',
  '🦏',
  '🦛',
  '🐪',
  '🐫',
  '🐃',
  '🐂',
  '🐄',
  '🐎',
  '🐖',
  '🐏',
  '🐑',
  '🐐',
  '🦌',
  '🐕',
  '🐩',
  '🦮',
  '🐕‍🦺',
  '🐈',
  '🐈‍⬛',
  '🐓',
  '🦃',
  '🦤',
  '🕊️',
  '🐇',
  '🦝',
  '🦨',
  '🦡',
  '🦫',
  '🦦',
  '🦥',
  '🐁',
  '🐀',
  '🐿️',
  '🦔',
  '🐾',
  '🐉',
  '🐲',
  '🐦‍🔥',
  '🌵',
  '🎄',
  '🌲',
  '🌳',
  '🌴',
  '🪵',
  '🌱',
  '🌿',
  '☘️',
  '🍀',
  '🎍',
  '🪴',
  '🎋',
  '🍃',
  '🍂',
  '🍁',
  '🍄',
  '🍄‍🟫',
  '🐚',
  '🪨',
  '🌾',
  '💐',
  '🌷',
  '🌹',
  '🥀',
  '🌺',
  '🌸',
]

export default function HomeClient() {
  const { profile } = useProfile()
  const router = useRouter()

  const { data, isLoading } = useQuery({
    queryKey: ['my-collections', profile?.id],
    queryFn: ({ queryKey }) =>
      httpClient.get(`/users/${queryKey[1]}/collections`).then((r) => r.data),
    enabled: !!profile?.id,
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
    <div className="min-h-screen flex flex-col p-6">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-10">Your vocal packages</h1>

      {/* Danh sách bộ từ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {data.map((collection, index) => (
          <Link
            href={`/collections/${collection.id}/learn`}
            key={collection.id}
            style={{
              backgroundColor: bgColors[index % bgColors.length],
            }}
            className="rounded-lg shadow-lg p-4 hover:shadow-xl transition duration-300 flex items-center gap-3"
          >
            <span className="text-4xl font-bold">
              {emojis[index % emojis.length]}
            </span>

            <div>
              <h3 className="text-lg font-semibold mb-1">{collection.name}</h3>
              <span>{collection.words.length} thuật ngữ</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
