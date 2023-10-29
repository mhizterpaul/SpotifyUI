'use client'
import Image from "next/image"
import Player from "./player"
import { useState } from 'react'
import withProvider, { Context } from '../main/withProvider'
import { useContext } from 'react';
import {IoIosArrowDropupCircle, IoIosArrowDropdownCircle} from 'react-icons/io'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pushRef, setNowPlayingView } from "@/store/reducers/main_slice"
import withStoreProvider from "@/store/with_provider"


const Footer = () => {
    const [favorite, setFavorite] = useState(false);
    const { nowPlaying } = useContext(Context);
    const dispatch = useAppDispatch();
    const nowPlayingView = useAppSelector(state => state.main.nowPlayingView);

    return (<footer className={`${nowPlaying?.artists[0].image ? '':'inactive'}`+' footer bg-[#181818] w-full relative flex items-center justify-between z-10 whitespace-nowrap pb-6 -mt-14 sm:min-w-[540px] min-h-[120px] h-[14vh] overflow-visible'}>

                <div className={`${nowPlaying?.artists[0].image? 'flex': 'invisible'}`+' flex-row items-center max-w-[30vw]'}>
                    <Image src={nowPlaying?.artists[0].image} className={'group relative w-2/6'} alt="album art" />
                    { !nowPlayingView ? <IoIosArrowDropupCircle onClick={()=>{dispatch(setNowPlayingView(true))}} className='group-hover:block hidden absolute top-1/2 left-1/2'/>
                     : <IoIosArrowDropdownCircle onClick={dispatch(setNowPlayingView(false))}  className={'group-hover:block hidden absolute top-1/2 left-1/2'}/>}
                    <span className='inline-block mx-2 leading-4 w-1/2'>
                        <span onClick={() => dispatch(pushRef(`playlist/${nowPlaying.id}`))}>{nowPlaying?.name}</span> <br />
                        <span className='hover:underline'>
                            {nowPlaying?.artists.map(artist => artist.name).join(', ')}
                        </span>
                    </span>
                    <span className='w-1/6 bg-red-600'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={(() => (setFavorite(prev => !prev)))} viewBox="0 0 24 24"><path fill={favorite ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                    </span>
                </div>
            <Player />
    </footer>)
}



export default withStoreProvider(withProvider(Footer))
