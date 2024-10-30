'use client'

import { useProfile } from '@/hooks/useProfile'
import { useUserUnit } from '@/hooks/useUserUnit'
import { httpClient } from '@/services/httpClient'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { Collapse, CollapseProps, Dropdown, Modal } from 'antd'
import { Ellipsis } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { UnitSection } from './UnitSection'

export default function HomeClient() {
  const { profile } = useProfile()
  const [currentUnit, setCurrentUnit] = useState()
  const { userUnit } = useUserUnit()

  useEffect(() => {
    if (!currentUnit && userUnit?.length > 0) {
      setCurrentUnit(userUnit[0])
    }
  }, [userUnit])

  // Nếu không có bộ từ
  if (!userUnit) {
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

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <p>{'text'}</p>,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{'text'}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{'text'}</p>,
    },
  ]
  return (
    <div className="flex flex-col p-6">
      {/* Tiêu đề */}
      <h1 className="text-2xl font-bold mb-10">Vocabulary Sets</h1>

      <div className="max-w-[555px] grid gap-3 w-full mx-auto">
        {userUnit?.map((unit) => (
          <UnitSection unit={unit} key={unit.id} />
        ))}
        {/* Danh sách bộ từ */}
      </div>
    </div>
  )
}
