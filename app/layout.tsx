'use client'
import Footer from '@/components/footer/footer'
import Nav from '@/containers/navbarContainer'
import './globals.css'
import { Inter } from 'next/font/google'
import { BrowserRouter as Router, Routes } from 'react-router-dom'


const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <head>
      <title>Spotify Clone</title>
      <meta charSet="UTF-8" />
      <meta name="description" content="Spotify Clone" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
      </head>
      <body className={inter.className}>
        <section className='container relative h-screen max-w-[1124px] min-w-[625px]'>
          <Router>
            < Nav />
            {children}
            < Footer />
          </Router>
        </section>
      </body>
    </html>
  )
}
