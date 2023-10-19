'use client'
import Image from "next/image"
import Player from "./player"
import Volume from "./volume"
import { useState } from 'react'
import { RootState } from "@/store"
import { connect } from "react-redux"
import { ApiStatus } from "@/store/reducers/main_slice"
import withProvider, { Context } from '../main/withProvider'
import { useContext } from 'react';


const Footer = ({ status }: { status: ApiStatus }) => {
    const [favorite, setFavorite] = useState(false);
    const { nowPlaying } = useContext(Context);



    return (<footer className={`${nowPlaying.image ? '':'inactive'}`+' footer bg-[#181818] w-full z-10 whitespace-nowrap text-[2vw] min-w-[375px] min-h-12 overflow-hidden'}>
        <section className='flex items-center justify-between'>
            {nowPlaying.image ?
                <div className={'flex flex-row items-center max-w-[25vw]'}>
                    <Image src={nowPlaying.image} className={'w-2/6'} alt="album art" />
                    positioned arrow that initiates the now playling view on click
                    <span className='inline-block mx-2 leading-4 w-1/2'>
                        <span onClick={dispatch(pushRef(`playlist/${nowPlaying.href}`))}>{nowPlaying.name}</span> <br />
                        <span className='hover:underline'>
                            {nowPlaying.artists}
                        </span>
                    </span>
                    <span className='w-1/6 bg-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={(() => (setFavorite(prev => !prev)))} viewBox="0 0 24 24"><path fill={favorite ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                    </span>
                </div> : null
            }
            <Player />
            <Volume />
        </section>
    </footer>)
}

const mapStateToProps = (state: RootState) => ({
    status: state.main.fetchAccessTokenStatus,
});


export default withProvider(connect(mapStateToProps)(Footer))
