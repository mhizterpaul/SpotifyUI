import { Inter } from 'next/font/google'
import './globals.css'
import RootRouterProvider from './rootProvider';
import Nav from '@/containers/navbarContainer';
import Footer from '@/components/footer/footer';
import { Metadata } from 'next';
import Favicon from './favicon.ico'


export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'spotify clone',

}

icons: [{ rel: 'icon', url: Favicon.src }]

const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,

}: {

  children: React.ReactNode

}) {

  //const headersList = headers();
  //const pathname = headersList.get("x-invoke-path") || "";

  return (
    <html lang="en">
      <body className={inter.className}>
        <section className='main-container md:p-x-4 relative max-h-[914px] h-screen'>
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

