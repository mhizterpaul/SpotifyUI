
import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Spotify',
  description: 'Spotify clone'
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <section className='container relative h-screen max-w-[1124px] min-w-[625px]'>
            < Nav />
            {children}
            < Footer />
        </section>
      </body>
    </html>
  )
}
