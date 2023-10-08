'use client'
import Image from "next/image"
import ControlInfo from "./controlInfo"
import Player from "./player"
import Volume from "./volume"
import react from '@/public/vercel.svg'


const Footer = () => {
    return (<footer className='footer bg-[#181818] w-full min-h-12 overflow-hidden'>
        <section className='w-full flex items-center justify-between'>
            <div className='flex flex-row items-center'>
                <Image src={react} alt="album art" />
                <span className='inline-block mx-2 leading-4'>
                    track <br />
                    <span>
                        artist name
                    </span>
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#1db954" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
            </div>
            <Player />
            <Volume />
        </section>
        <ControlInfo />
    </footer>)
}

export default Footer