import './globals.css'
import { Inter } from 'next/font/google'
import RootRouterProvider from './rootRouterProvider';
import Nav from '@/containers/navbarContainer';
import Footer from '@/components/footer/footer';
import { Metadata } from 'next';
import PageNotFound from './404/page';
import { headers } from "next/headers";


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

  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  if (pathname === '/404') return < PageNotFound />
  return (
    <html lang="en">
      <body className={inter.className}>
      <section className='main-container sm:p-x-4 relative max-h-[650px] h-screen overflow-x-hidden overflow-y-scroll'>
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

