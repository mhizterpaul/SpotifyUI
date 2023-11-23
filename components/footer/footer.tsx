'use client'
import Image from "next/image"
import Player from "./player"
import { useContext, useState } from 'react'
import { IoIosArrowDropupCircle, IoIosArrowDropdownCircle } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { pushRef, setNowPlayingView } from "@/store/reducers/main_slice"
import { Context } from "@/containers/rootProvider"
import { FaHeart } from "react-icons/fa6"
import { SlHeart } from "react-icons/sl"

//make footer understand and play episode
const Footer = () => {
    const [favorite, setFavorite] = useState(false);
    const dispatch = useAppDispatch();
    const nowPlayingView = useAppSelector(state => state.main.nowPlayingView);
    const { nowPlaying, currentPlaylist, Episodes, Tracks, addMedia, removeMedia } = useContext(Context);

    return (<footer className={`${nowPlaying?.album?.image || nowPlaying?.track?.album.image || nowPlaying?.image || nowPlaying?.show?.image ? '' : ' inactive '}` + ' footer bg-[#181818] w-screen relative flex items-center justify-between z-10 whitespace-nowrap pb-6 -mt-20 md:min-w-[540px] min-h-[120px] h-[14vh] gap-x-2 overflow-visible'}>

        <div className={`${nowPlaying?.image || nowPlaying?.album?.image || nowPlaying?.track?.album.image || nowPlaying?.show?.image ? 'flex' : 'invisible'}` + ' flex-row items-center max-w-[30vw]'}>
            <div className={' group mx-2 relative min-w-fit w-max-[40%] '}>
                <Image src={nowPlaying?.image || nowPlaying?.album?.image || nowPlaying?.track?.album?.image || nowPlaying?.show?.image} className={' '} alt="album art" width={80} height={80} />
                {!nowPlayingView ? <IoIosArrowDropupCircle onClick={() => { dispatch(setNowPlayingView(true)) }} className='group-hover:block hidden absolute top-1/2 left-1/2' />
                    : <IoIosArrowDropdownCircle onClick={() => dispatch(setNowPlayingView(false))} className={'group-hover:block hidden absolute top-1/2 left-1/2'} />}
            </div>
            <span className='inline-block h-full text-sm mx-2 text-start align-middle truncate mr-2 leading-4 whitespace-normal max-w-[40%]'>
                <span className='hover:underline font-semibold inline-block w-full truncate '>{nowPlaying?.name || nowPlaying?.track?.name}</span> <br />
                {nowPlaying?.artists || nowPlaying?.track?.artists ? <span>
                    {(nowPlaying.artists || nowPlaying.track?.artists).map(artist => artist.name).join(', ')}
                </span> : null}
                {nowPlaying?.show?.publisher || currentPlaylist?.publisher ?
                    <span>
                        {nowPlaying?.show?.publisher || currentPlaylist?.publisher}
                    </span> : null
                }
            </span>
            {(nowPlaying?.type === 'episode' ? Episodes : Tracks)[nowPlaying?.track?.id || nowPlaying?.id] ? <FaHeart className={' text-[#1ED760]'} onClick={() => { nowPlaying?.type === 'episode' ? nowPlaying && removeMedia('Episodes', nowPlaying?.id) : removeMedia('Tracks', nowPlaying?.id || nowPlaying?.track?.id) }} /> : <SlHeart onClick={() => { nowPlaying?.type === 'episode' ? addMedia('Episodes', nowPlaying?.id, nowPlaying) : nowPlaying && addMedia('Tracks', nowPlaying?.id || nowPlaying?.track?.id, nowPlaying) }} />}
        </div>
        <Player />
    </footer >)
}



export default Footer
