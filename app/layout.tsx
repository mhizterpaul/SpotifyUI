import './globals.css'
import { Inter } from 'next/font/google'
import RootRouterProvider from './rootRouterProvider';
import Nav from '@/containers/navbarContainer';
import Footer from '@/components/footer/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'spotify clone',<nav></nav>
}

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <section className='container relative h-screen max-w-[1124px] min-w-[625px]'>
          <RootRouterProvider>
            < Nav />
            {children}
            < Footer />
          </RootRouterProvider>
        </section>
      </body>
    </html>
  )
}
