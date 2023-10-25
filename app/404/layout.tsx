import '../globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next';


export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'spotify clone',
}

const inter = Inter({ subsets: ['latin'] });



export default function RootLayout({
  children,

}: {

  children: React.ReactNode

}) {


  return (
    <html lang="en">
      <body className={inter.className} >
        <section className='main-container sm:p-x-4 relative my-auto max-h-[914px] h-screen overflow-hidden'>
                {children}
        </section>
      </body>
    </html>
  )
}

