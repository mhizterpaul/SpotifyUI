
import { BsPlayCircle } from 'react-icons/bs'
import { LiaTimesSolid } from 'react-icons/lia'
import { LuMusic3 } from 'react-icons/lu'
import { SlOptions } from 'react-icons/sl';

import { useAppDispatch } from '@/store/hooks';
import { setNowPlayingView } from '../../store/reducers/main_slice'
import { Context } from '@/app/rootProvider';
import Image from 'next/image'
import { useContext } from 'react';

const NowPlaying = () => {
    const dispatch = useAppDispatch();
    const { nowPlaying, currentPlaylist, Episodes, Tracks, removeMedia, addMedia } = useContext(Context)
    if (!currentPlaylist || !nowPlaying) return null;
    const queue = currentPlaylist.items || currentPlaylist.tracks || currentPlaylist.episodes;


    if (!nowPlaying || !queue) {
        dispatch(setNowPlayingView(false));
        return null;
    };
    const nextInQueue = queue[queue.indexOf(nowPlaying) + 1];

    return (
        <section>
            <h3>
                <span>
                    {nowPlaying.album?.name || nowPlaying.name}
                </span>
                <LiaTimesSolid onClick={() => dispatch(setNowPlayingView(false))} />
            </h3>
            <section>
                <Image src={nowPlaying.album?.image || nowPlaying.image || currentPlaylist.image} alt={nowPlaying.name || nowPlaying.album?.name} width={175} height={175} />
                <div>
                    <span>
                        {nowPlaying.name}
                        {nowPlaying.artists?.map(el => el.name).join(', ') || nowPlaying.artist?.join(', ') || nowPlaying.show?.publisher || nowPlaying.publisher}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={(() => {
                            nowPlaying.type === 'episode' ?
                                Episodes[nowPlaying.id] ? removeMedia('Episodes', nowPlaying.id) : addMedia('Episodes', nowPlaying.id, nowPlaying)
                                :
                                Tracks[nowPlaying.id] ? removeMedia('Tracks', id) : addMedia('Tracks', nowPlaying.id, nowPlaying)
                        })} viewBox="0 0 24 24"><path fill={Tracks[nowPlaying.id] ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                        <SlOptions />
                    </span>
                </div>
            </section>
            <section>
                <Image src={nowPlaying.artists?.[0].image || nowPlaying.image || nowPlaying.show?.image || nowPlaying.album?.image} alt={'image of ' + nowPlaying.name} className='relative' width={120} height={120} />
                <span className='absolute top-0 left-0'>
                    About the Artist
                </span>
                <p>
                    <h4>
                        <span className='block'>{nowPlaying.artists?.map(el => el.name).join(', ') || nowPlaying.artist?.join(', ') || nowPlaying.show?.publisher}</span>
                        <span className='flex'>
                            {nowPlaying.artists?.[0]?.popularity || nowPlaying.followers || nowPlaying.popularity}
                            monthly listeners
                            <button>
                                Follow
                            </button>
                        </span>
                    </h4>
                    <p>
                        get artist info
                    </p>
                </p>
            </section>
            <section>
                <h3 className='flex'>
                    Next in queue
                    <span className='self-end'>
                        open queue
                    </span>
                </h3>
                <div className='group'>
                    <LuMusic3 className='group-hover:hidden' />
                    <BsPlayCircle />

                    <span>
                        {nextInQueue.publisher || nextInQueue.artists?.map(el => el.name).join(' ') || nextInQueue.name}
                        <span>
                            {nextInQueue.name}
                        </span>
                        <Image src={nextInQueue.artists?.[0].image || nextInQueue.image || nextInQueue.album?.image || nextInQueue.show?.image} alt={nextInQueue.name} width={62.5} height={62.5} />
                    </span>
                </div>
            </section>

        </section>
    )
}
export default NowPlaying