'use client'

import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <section className='container relative h-screen max-w-[1124px] min-w-[625px]'>
            < Nav />
            {children}
            < Footer />
          </section>
        </Provider>
      </body>
    </html>
  )
}
