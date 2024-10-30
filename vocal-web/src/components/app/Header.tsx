'use client'

import { useProfile } from '@/hooks/useProfile'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Link from 'next/link'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteCookie } from '@/lib/utils'
import { Dropdown } from 'antd'
import { useRouter } from 'next/navigation'
import { ModalChangeUnit } from './ModalChangeUnit'
import { useState } from 'react'

export const Header = () => {
  const { profile } = useProfile()
  const router = useRouter()
  const [openUnitCreateModal, setOpenUnitCreateModal] = useState(false)

  return (
    <header className="flex justify-between items-center py-2 px-4">
      <Link href="/app" className="text-xl font-bold uppercase">
        QuizLingo
      </Link>

      <div className="flex items-center gap-6">
        <Link href="/app/community" className="hover:text-primary">
          <span className="cursor-pointer">Community</span>
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <Dropdown
          menu={{
            items: [
              { label: 'Unit', key: '1', onClick: () => setOpenUnitCreateModal(true) },
              {
                label: 'Lesson',
                key: 2,
                onClick: () => router.push('/app/collections/create'),
              },
            ],
          }}
        >
          <Button className="min-w-[unset]" size="lg">
            Create
          </Button>
        </Dropdown>

        <span className="cursor-pointer">
          <svg
            width="24"
            height="24"
            viewBox="0 0 20 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.967 8.6652C15.2087 8.11687 14.4853 7.53354 13.8787 6.85687C11.9303 4.6402 11.6737 2.63354 11.802 1.3152C11.872 0.638537 11.1953 0.125204 10.5887 0.41687C5.642 2.72687 4.452 5.98187 4.382 8.46687V8.4902C4.382 8.4902 4.312 10.1235 5.24533 11.7802C5.537 12.3052 5.222 12.9469 4.56866 13.1102C4.032 13.2502 3.49533 13.0169 3.262 12.5969C3.18033 12.4452 3.087 12.2935 3.017 12.1069C2.74866 11.3602 1.73366 11.1735 1.372 11.8269C0.94033 12.6319 0.80033 13.3435 0.706997 14.1719C0.263664 18.2785 3.507 22.0935 8.162 22.8985C13.4937 23.8202 18.5337 20.6352 19.257 16.0152C19.7003 13.1219 18.347 10.3802 15.9437 8.65354L15.967 8.6652Z"
              fill="#6D7783"
            ></path>
          </svg>
        </span>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={profile?.avatar} />
              <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{profile?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                deleteCookie('jwt')
                window.location.href = '/'
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ModalChangeUnit open={openUnitCreateModal} onCancel={() => setOpenUnitCreateModal(false)} />
    </header>
  )
}
