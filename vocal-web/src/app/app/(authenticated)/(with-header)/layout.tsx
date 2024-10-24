import { Header } from '@/components/app/Header'

export default function RootLayout({ children }) {
  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto">{children}</div>
    </>
  )
}
