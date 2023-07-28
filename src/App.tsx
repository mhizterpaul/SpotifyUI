//import { useState, useEffect } from 'react';
import Nav from './components/navbar'
import Sidebar from './components/sidebar'
import Main from './components/main'
import Footer from "./components/footer";


function App() {

  return (
    <section className='container h-screen max-w-[1124px] min-w-[625px]'>
      <Nav />
      <Sidebar />
      <Main />
      <Footer />
    </section>
  )
}







export default App
