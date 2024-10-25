'use client'

import { useProfile } from '@/hooks/useProfile'
import { httpClient } from '@/services/httpClient'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Dropdown, Modal } from 'antd'
import { Ellipsis } from 'lucide-react'
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
        <Link href="/app/collections/create">
          <button className="mt-4 bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 font-bold">
            + Tạo mới
          </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col p-6">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-10">Vocabulary Sets</h1>

      {/* Danh sách bộ từ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full">
        {data.map((collection, index) => (
          <Link
            href={`/app/collections/${collection.id}/learn`}
            key={collection.id}
            style={{
              backgroundColor: bgColors[index % bgColors.length],
            }}
            className="rounded-lg shadow-lg px-4 py-3 hover:shadow-xl transition duration-300 flex items-center justify-between gap-3"
          >
            <div className="flex gap-2">
              <span className="text-4xl font-bold">{emojis[index % emojis.length]}</span>

              <div>
                <h3 className="text-lg font-semibold">{collection.name}</h3>
                <span>{collection.words.length} words</span>
              </div>
            </div>

            <div onClick={(e) => e.preventDefault()}>
              <Dropdown
                menu={{
                  items: [
                    {
                      key: 'edit',
                      label: 'Edit',
                      onClick: (e) => {
                        router.push(`/app/collections/${collection.id}/update`)
                      },
                    },
                    {
                      key: 'delete',
                      label: 'Delete',
                      onClick: () => {
                        Modal.confirm({
                          title: 'Are you sure delete this collection?',
                          centered: true,
                          okText: 'Yes',
                          cancelText: 'No',
                          onOk: () => {
                            httpClient.delete(`/collections/${collection.id}`).then(() => {
                              router.refresh()
                            })
                          },
                        })
                      },
                    },
                  ],
                }}
              >
                <Ellipsis />
              </Dropdown>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
