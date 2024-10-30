import { httpClient } from '@/services/httpClient'
import { useQuery } from '@tanstack/react-query'
import { Collapse, Dropdown, Modal } from 'antd'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import router from 'next/router'

export const UnitSection = ({ unit }) => {
  const { data, refetch } = useQuery({
    queryKey: ['unit', unit.id],
    queryFn: () => httpClient.get(`/unit/${unit.id}/collections`).then((res) => res.data),
    enabled: !!unit.id,
  })

  console.log('data', data)
  return (
    <Collapse
      bordered={false}
      items={[
        {
          key: unit.id,
          label: unit.name,
          children: (
            <>
              <div className="grid grid-cols-1 gap-4 md:gap-6 w-full ">
                {data?.length > 0 ? (
                  data.map((collection) => (
                    <Link
                      href={`/app/collections/${collection.id}/learn`}
                      key={collection.id}
                      style={{
                        backgroundColor: bgColors[Math.floor(Math.random() * bgColors.length)],
                      }}
                      className="rounded-lg shadow px-4 py-3 hover:shadow-lg transition duration-300 flex items-center justify-between gap-3"
                    >
                      <div className="flex gap-2">
                        <span className="text-4xl font-bold">{emojis[Math.floor(Math.random() * emojis.length)]}</span>

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
                                      httpClient
                                        .delete(`/collections/${collection.id}`)
                                        .then(() => {
                                          refetch()
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
                  ))
                ) : (
                  <span>No collections</span>
                )}
              </div>
            </>
          ),
        },
      ]}
      key={unit.id}
    />
  )
}

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
