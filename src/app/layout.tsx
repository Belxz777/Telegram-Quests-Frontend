import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TmaSDKLoader } from './TmaSDKLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'QuestApp',
  description: 'Made by belxz777 and vercel',
  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  //all
  return (
    <html lang="en">
    <head/>
      <body className={inter.className}>
            <TmaSDKLoader>
        {children}
      </TmaSDKLoader>
      </body>
    </html>
  )
}
