import { Coin } from '@/components/app/Coin'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const Done = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <img src='/images/success.gif' alt='done' />

      <p className="text-2xl font-bold text-primary">
        Well done! You have completed this collection!
      </p>

      <div className="flex text-lg">
        You earned: 10 <Coin />
      </div>

      <div className="flex gap-4">
        <Button variant="doulingo">Share</Button>
        <Link href={'/app'}>
          <Button variant="doulingo" status="primary">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
