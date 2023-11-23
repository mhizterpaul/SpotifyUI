
import { BsPlayCircle } from 'react-icons/bs'
import { LiaTimesSolid } from 'react-icons/lia'
import { LuMusic3 } from 'react-icons/lu'
import { SlHeart, SlOptions } from 'react-icons/sl';

import { useAppDispatch } from '@/store/hooks';
import { setNowPlayingView } from '../../store/reducers/main_slice'
import { Context } from '@/containers/rootProvider';
import Image from 'next/image'
import { useContext } from 'react';
import { BiPlay } from 'react-icons/bi';
import { FaHeart } from 'react-icons/fa6';

const NowPlaying = () => {
    const dispatch = useAppDispatch();
    const { nowPlaying, currentPlaylist, Episodes, Tracks, removeMedia, addMedia } = useContext(Context)
    if (!currentPlaylist || !nowPlaying) return null;
    const queue = currentPlaylist.items || currentPlaylist.tracks || currentPlaylist.episodes?.toReversed();


    if (!nowPlaying || !queue) {
        dispatch(setNowPlayingView(false));
        return null;
    };
    const indexArr = queue?.map((item) => item.name);
    const nextInQueue = queue[indexArr.indexOf(nowPlaying.name) + 1];

    return (
        <section className={' p-[0.65rem] -mt-20 mb-12 overflow-y-scroll rounded-md bg-[#121212] flex flex-col gap-y-4 [&>section:not(section:first-of-type)]:rounded-md [&>section:not(section:first-of-type)]:bg-[#242424] '}>
            <h3 className={'flex justify-between items-center flex-nowrap pt-4'}>
                <span className={'inline-block max-w-[60%] truncate font-bold hover:underline text-white '}>
                    {nowPlaying.publisher || nowPlaying.name || nowPlaying.track?.name || nowPlaying.track?.album.name || nowPlaying.album?.name || currentPlaylist.name}
                </span>
                <LiaTimesSolid onClick={() => dispatch(setNowPlayingView(false))} className={'text-[#b3b3b3] w-8 h-8 p-2 rounded-full hover:bg-[#b3b3b38a] ] '} />
            </h3>
            <section className={'mt-6'}>
                <Image className={'w-[96%] h-auto'} src={nowPlaying.image || nowPlaying.track?.image || nowPlaying.album?.image || nowPlaying.track?.album.image || currentPlaylist.image} alt={nowPlaying.name || nowPlaying.album?.name} width={175} height={175} />
                <div className={'mt-4 flex justify-between items-center overflow-hidden [&>span]:whitespace-nowrap flex-nowrap rounded-sm text-[#B3B3B3]'}>
                    <h4 className={' w-[70%] [&>span]:whitespace-nowrap h-fit overflow-hidden'} style={{ boxShadow: '0.5rem 0 rgba(12,12,12, 0.2)' }}>
                        <span className=' text-white font-bold text-xl hover:underline '>{nowPlaying.name || nowPlaying.track?.name} </span><br />
                        {nowPlaying.artists || nowPlaying.track?.artists && (nowPlaying.artists || nowPlaying.track.artists).map((artist, index) => !index ? <span className={'hover:underline'}>{artist.name}</span> : <>,<span className={'hover:underline '}>{artist.name}</span></>)}
                        {!nowPlaying.artists && !nowPlaying.track?.artists && nowPlaying.artist || nowPlaying.track?.artist && (nowPlaying.artist || nowPlaying.track?.artist).map((artist, index) => !index ? <span className={'hover:underline'}>{artist}</span> : <>,<span className={'hover:underline '}>{artist}</span></>)}
                        {currentPlaylist.publisher || nowPlaying.show?.publisher && <span className='hover:underline '>
                            {currentPlaylist.publisher || nowPlaying.show?.publisher}
                        </span>}</h4>
                    <span className={'w-fit [&>svg]:inline-block [&>svg:hover]:text-white '}>
                        {(nowPlaying?.type === 'episode' ? Episodes : Tracks)[nowPlaying?.track?.id || nowPlaying?.id] ?
                            <FaHeart className={' text-[#1ED760]'} onClick={() => { nowPlaying?.type === 'episode' ? nowPlaying && removeMedia('Episodes', nowPlaying?.id) : removeMedia('Tracks', nowPlaying?.id || nowPlaying?.track?.id) }} />
                            :
                            <SlHeart onClick={() => { nowPlaying?.type === 'episode' ? addMedia('Episodes', nowPlaying?.id, nowPlaying) : nowPlaying && addMedia('Tracks', nowPlaying?.id || nowPlaying?.track?.id, nowPlaying) }} />}
                        <SlOptions className='ml-4 mr-2 ' />
                    </span>
                </div>
            </section>
            {
                nowPlaying.artists?.[0].image ? <section className={'mt-8 '} >
                    <div className=' relative '>
                        <Image className={'w-full h-auto'} src={nowPlaying.artists?.[0].image || nowPlaying.image || nowPlaying.track.image} alt={'image of ' + nowPlaying.name} className='relative' width={120} height={120} />
                        <span className='absolute top-0 left-0'>
                            About the Artist
                        </span>
                    </div>
                    <p className={' '}>
                        <h4 className='block'>{nowPlaying.artists?.map((artist, index) => !index ? <span className={'hover:underline'}>{artist.name}</span> : <>,<span className={'hover:underline '}>{artist.name}</span></>)}</h4>
                        <span className='flex justify-between '>
                            <p className={'w-[40%]'}>
                                {nowPlaying.artists[0].popularity || nowPlaying.track?.aritists[0].popularity || nowPlaying.followers || nowPlaying.popularity || nowPlaying.track?.popularity || nowPlaying.track?.followers}
                                monthly listeners
                            </p>
                            <button className={' rounded-3xl p-2 hover:scale-105 outline-[0.3px] outline text-white '}>
                                Follow
                            </button>
                        </span>
                    </p>
                </section> : null
            }
            {nextInQueue && <section className='mt-8 p-4 '>
                <h3 className='flex justify-between font-bold text-base mb-4'>
                    Next in queue
                    <span className='hover:underline text-[#b3b3b3] hover:text-white hover:scale-105 '>
                        Open queue
                    </span>
                </h3>
                <div className={'hover:bg-[#393939] group flex justify-start gap-x-4 rounded p-2 items-center overflow-hidden'} style={{ boxShadow: '0, 0.3rem 0 0 rgba(35,35,35,0.4)' }}>
                    <span className=' w-[5%]'>
                        <LuMusic3 className='group-hover:hidden block text-[#b3b3b3] ' />
                        <BiPlay className={'group-hover:block hidden text-[whitesmoke] '} />
                    </span>
                    <Image className={' rounded h-max w-max inline-block '}
                        src={nextInQueue.artists?.[0].image || nextInQueue.image || nextInQueue.track?.image
                            || nextInQueue.track?.album.image || nextInQueue.album?.image || nextInQueue.show?.image} alt={nextInQueue.name} width={45} height={45} />
                    <span className={'text-[#b3b3b3] '}>

                        <span className={'text-white hover:underline'}>
                            {nextInQueue.name || nextInQueue.track?.name}
                        </span> <br />
                        {nextInQueue.publisher && <span className={'hover:underline'}>{nextInQueue.publisher}</span>}

                        {nextInQueue.artists || nextInQueue.track?.artists && (nextInQueue.artists || nextInQueue.track?.artists).map((artist, index) => !index ? <span className={'hover:underline'}>{artist.name}</span> : <>,<span className={'hover:underline '}>{artist.name}</span></>)}

                        {!nextInQueue.artists && !nextInQueue.track?.artists && nextInQueue.artist || nextInQueue.track?.artist && (nextInQueue.artist || nextInQueue.track?.artist).map((artist, index) => !index ? <span className={'hover:underline'}>{artist}</span> : <>,<span className={'hover:underline '}>{artist}</span></>)}

                        {nextInQueue.show?.publisher && !nextInQueue.publisher && <span className={'hover:underline'}>{nextInQueue.show?.publisher}</span>}
                    </span>
                </div>
            </section>}

        </section >
    )
}
export default NowPlaying