import { Coin } from '@/components/app/Coin'
import { Button } from '@/components/ui/button'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import Link from 'next/link'

export const Done = ({ analysis }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-8">
      <DotLottieReact style={{width: 333, height: 222}} src="/images/success.lottie" loop autoplay />

      <p className="text-2xl font-bold text-primary">
        Well done! You have completed this collection!
      </p>

      <div className="flex flex-col gap-3 text-lg font-medium">
        <div>
          You earned: 10 <Coin />
        </div>

        <div>Max streak: {analysis?.maxStreak}</div>
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
