'use client'
import Image from "next/image"
import Player from "./player"
import { useContext, useState } from 'react'
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pushRef, setNowPlayingView } from "@/store/reducers/main_slice"
import withStoreProvider from "@/store/with_provider"
import { Context } from "@/app/rootProvider"
import { FaHeart } from "react-icons/fa6"
import { SlHeart } from "react-icons/sl"


const Footer = () => {
    const [favorite, setFavorite] = useState(false);
    const dispatch = useAppDispatch();
    const nowPlayingView = useAppSelector(state => state.main.nowPlayingView);
    const { nowPlaying, Tracks, addMedia, removeMedia } = useContext(Context);

    return (<footer className={`${nowPlaying?.album?.image || nowPlaying?.track?.album.image ? '' : 'inactive'}` + ' footer bg-[#181818] w-full relative flex items-center justify-between z-10 whitespace-nowrap pb-6 -mt-14 sm:min-w-[540px] min-h-[120px] h-[14vh] overflow-visible'}>

        <div className={`${nowPlaying?.album?.image || nowPlaying?.track.album.image ? 'flex' : 'invisible'}` + ' flex-row items-center max-w-[30vw]'}>
            <Image src={nowPlaying?.album?.image || nowPlaying?.track.album.image} className={'group relative w-2/6'} alt="album art" width={100} height={100} />
            {!nowPlayingView ? <IoIosArrowDropupCircle onClick={() => { dispatch(setNowPlayingView(true)) }} className='group-hover:block hidden absolute top-1/2 left-1/2' />
                : <IoIosArrowDropdownCircle onClick={dispatch(setNowPlayingView(false))} className={'group-hover:block hidden absolute top-1/2 left-1/2'} />}
            <span className='inline-block h-full mx-2 text-start align-middle leading-4 w-1/2'>
                <span className='hover:underline'>{nowPlaying?.name || nowPlaying?.track?.name}</span> <br />
                <span>
                    {(nowPlaying?.artists || nowPlaying?.track.artists || []).map(artist => artist.name).join(', ')}
                </span>
            </span>
            {Tracks[nowPlaying?.track?.id || nowPlaying?.id] ? <FaHeart onClick={() => { removeMedia('Track', nowPlaying?.id || nowPlaying?.track?.id) }} /> : <SlHeart onClick={() => { addMedia('Tracks', nowPlaying?.id || nowPlaying?.track?.id, nowPlaying) }} />}
        </div>
        <Player />
    </footer>)
}



export default withStoreProvider(Footer)
