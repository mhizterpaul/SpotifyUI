import Footer from '@/components/footer/footer'
import Nav from '@/components/nav/navbar'
import Main from '@/components/main/main'

export default function Home() {
  return (
    <section className='container relative h-screen max-w-[1124px] min-w-[625px]'>
      <Nav />
      <Main />
      <Footer />
    </section>
  )
}
