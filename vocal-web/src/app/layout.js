import localFont from 'next/font/local'
import './globals.css'
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Providers from './provider'
import Link from 'next/link'
import { Header } from '@/components/app/Header'
import { Roboto } from 'next/font/google'

const inter = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Vocal - Learn English Easily",
  description:
    "Vocal is an interactive platform to learn English by creating and sharing custom vocabulary lists.",
  keywords: "learn English, vocabulary, language learning, Vocal, Duolingo alternative",
  authors: ["Your Name"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
