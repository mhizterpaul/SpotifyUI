import { BsPlayCircle } from "react-icons/bs"
import { SlHeart, SlOptions } from 'react-icons/sl'
import { LuClock3, LuPlusCircle } from 'react-icons/lu'
import { IoShareOutline } from 'react-icons/io5'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Image from 'next/image'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { ShareSocial } from 'react-share-social'
import BgColorDetector from './imageBackgroundDetector'
import { FaHeart } from 'react-icons/fa6'
import { BiPlay } from "react-icons/bi";
import Search from '../nav/search'
import { pushRef, setNowPlayingView } from "@/store/reducers/main_slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SiSpotify } from "react-icons/si";
import { LiaTimesSolid } from "react-icons/lia";
import { RiErrorWarningLine } from "react-icons/ri";
import { Context, OwnPlaylist } from "@/app/rootProvider";
import { Album, CategoryPlaylist, Playlist as Play, Playlist, Track } from '../../utils/types'
import { getAlbum, getCategoyPlaylist, getPlaylist } from "@/utils/api";
import Loader from "../network_request";
import { likedStyles } from "../nav/sidebar";
import { hexToHSL, random } from "@/utils";
import styles from './main.list.module.css'
import { AxiosError } from "axios";


const Playlist = () => {
    const { id } = useParams();
    const [bgColor, setBgColor] = useState('');
    const access_token = useAppSelector((state) => state.main.access_token) || '';
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname;
    const [searchParams] = useSearchParams();
    const searchId = searchParams.get('album') || searchParams.get('category');
    const { removeMedia, nowPlaying, currentPlaylist, addMedia, Tracks, Playlist, setProp } = useContext(Context)
    const [error, setError] = useState<AxiosError | {}>({});
    const containerRef = useRef<HTMLDivElement>(null);
    const [fetchedPlaylist, setFetchedPlaylist] = useState<Play | Play & { tracks: Track[] } | Album | {}>({});
    const [miniTable, setMiniTable] = useState((window.innerWidth - 300) <= 620 ? true : false);
    const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDN2MTRhNCA0IDAgMSAxLTItMy40NjVWNUg5djEyYTQgNCAwIDEgMS0yLTMuNDY1VjNoMTNaTTUgMTlhMiAyIDAgMSAwIDAtNGEyIDIgMCAwIDAgMCA0Wm0xMSAwYTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNFoiLz48L3N2Zz4=';
    useEffect(() => {
        if (containerRef.current == null) return
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (!entry.contentBoxSize) continue
                entry.contentBoxSize[0].inlineSize <= 620 ? setMiniTable(true) : setMiniTable(false);
            }
        })
        resizeObserver.observe(containerRef.current, { box: 'content-box' })
    }, [containerRef.current])

    useEffect(() => {
        setProp('BgColor', id === 'songs' ? '#503A9B' : bgColor);
    }, [bgColor]);
    useEffect(() => {
        if ((!id && !searchId) || !access_token || id === 'songs' || !isNaN(Number(id))) return;
        (
            async () => {


                let res = {};
                if (id !== 'songs' && isNaN(Number(id)) && pathname.includes('/playlist/')) res = await getPlaylist(access_token, id);
                if (searchParams.get('category')) {
                    const temp = await getCategoyPlaylist(access_token, searchId, random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']));
                    res = {
                        ...currentPlaylist,
                        tracks: temp
                    }
                }
                if (searchParams.get('album')) res = await getAlbum(access_token, searchId)

                setFetchedPlaylist(res);


            }
        )();
    }, [access_token, id, searchId]);

    const ownPlaylist = Object.fromEntries(Object.entries(Playlist).filter((value) => typeof Number(value[0]) === 'number')) as { [key: string]: OwnPlaylist };
    const gradient = {
        backgroundImage: `linear-gradient(to bottom, ${id === 'songs' ? '#503A9B' : bgColor} 0 345px, ${hexToHSL(id === 'songs' ? '#503A9B' : bgColor, 20)} 345px 25%, ${hexToHSL(id === 'songs' ? '#503A9B' : bgColor, 10)} , #121212)`
    }

    const Data = id === 'songs' ? {
        name: 'Liked Songs',
        description: '',
        owner: '',
        id: 'songs',
        followers: 0,
        total: Object.values(Tracks).length,
        image: '',
        items: Object.values(Tracks)
    } : !isNaN(Number(id)) ? id ? ownPlaylist[id] : {} : fetchedPlaylist;


    if (!Object.keys(Data).length) return <Loader status='PENDING' meta={'Playlist'} />
    if (Object.keys(error).length || (!id && !searchId)) return <div className='text-center my-auto text-2xl'><RiErrorWarningLine className='text-5xl block mx-auto mb-4' />Couldn't find that playlist <br /> <span className='text-sm font-semibold'>search for something else?</span></div>;



    const added_at = (date: string) => {
        if (!date) return;
        const currDate = new Date();
        const month = currDate.toLocaleString('default', { month: 'numeric' });
        const day = currDate.toLocaleString('default', { day: 'numeric' });
        const year = currDate.toLocaleString('default', { year: 'numeric' });
        const target = date.substring(0, 10).split('-');

        return `${(Math.abs(Number(target[0]) - Number(year)) * 365)
            + Math.round(Math.abs(Number(target[1]) - Number(month)) * 30.42) +
            Math.abs(Number(target[2]) - Number(day))} days ago`
    }



    return (() => {

        const data = Data as OwnPlaylist | Album | Playlist | CategoryPlaylist;
        if (!data.image) data.image = defaultSrc;

        const TableRow = ({ item, index }) => {
            //on mouse in component rerenders infinitly
            const [menu, setMenu] = useState(false);
            const [hover, setHover] = useState(false);
            const trRef = useRef<HTMLTableRowElement>(null);
            const [position, setPosition] = useState({ top: '', right: '' });
            useEffect(() => {
                if (!trRef.current) return
                const { top, width } = trRef.current.getBoundingClientRect();
                const insetTop = window.innerHeight - top >= window.innerHeight / 2 ? '110%' : '-10%';
                const insetRight = Math.abs(window.innerWidth - width) + 15 + 'px';
                setPosition(() => ({ top: insetTop, right: insetRight }))

            }, [trRef, menu])


            return (
                <tr ref={trRef} className='relative  [&>td]:text-sm [&>td:not(&>td:last-child)]:mr-2 [&>td]:text-start [&>td]:h-14 [&>td]:mb-2 hover:bg-[rgba(114,114,114,0.62)] bg-clip-border w-full px-4 ' onMouseEnter={() => !hover && setHover(true)} onMouseLeave={() => hover && setHover(false)}>
                    <td className={' w-8 mx-auto rounded-l-md '} onClick={() => { setProp('nowPlaying', item); setProp('currentPlaylist', data); }}>
                        {hover ? <BiPlay className={'w-6 h-6'} /> : <span className={' text-base ' + (Object.is(nowPlaying, item) ? ' text-[#1ED760] ' : '')}>{index + 1}</span>}</td>
                    <td className={'w-1/2 '}>
                        <Image height={45} width={45} alt={item.name || item.track?.name} src={item.track?.album?.image || item.image || item.album?.image || defaultSrc} className={' inline-block mr-3 '} />
                        <span className='inline-block align-middle font-semibold text-start w-[calc(100%-61px)] truncate'>
                            <span className={` capitalize hover:underline ${Object.is(nowPlaying, item) ? ' text-[#1ED760] ' : ' text-white '}`}>{item.name || item.track.name}</span><br />

                            <span className={'[&>span:hover]:underline '}>{(item.artists || item.track?.artists || []).map((artist, index, arr) => { return index < arr.length - 1 ? <><span>{artist.name}</span>,</> : <span>{artist.name}</span> })}</span></span></td>

                    {data.type !== 'album' && <td className={'hover:underline truncate'} onClick={() => dispatch(pushRef('/playlist?album=' + (item.album?.id || item.track?.album?.id || '')))}>{item.album?.name || item.track?.album.name}</td>}

                    {miniTable ? null : <td>{added_at(item.added_at || item.track?.added_at)}</td>}

                    <td className='flex justify-around [&>svg:hover]:scale-105 gap-x-4 items-center flex-nowrap min-w-fit rounded-r-md '>{Tracks[item.track?.id || item.id] ? <FaHeart className={'hover:scale-105 text-[#1ED760] '} onClick={() => { removeMedia('Track', item.id || item.track?.id) }} /> : hover ? <SlHeart className={'hover:scale-105 hover:text-white '} onClick={() => { addMedia('Tracks', item.id || item.track?.id, item) }} /> : null}
                        <span className={' whitespace-nowrap '}>{Math.trunc((item.duration_ms || item.track.duration_ms || 0) / (60 * 1000))} : {Math.round(((item.duration_ms || item.track.duration_ms || 0) / 1000) % 60)}</span>
                        {hover && <SlOptions className={'hover:text-white '} onClick={() => setMenu((menu) => !menu)} />}</td>
                    {
                        menu && <ul className='absolute ' style={{ ...position }}>
                            <li><LuPlusCircle /> Add to playlist</li>
                            <li><IoShareOutline /> Share</li>
                            <li><SiSpotify />Open in app</li>
                        </ul>
                    }
                </tr >
            )
        }

        return (
            <div className={" overflow-y-scroll h-[85vh] -mt-14 w-full " + styles.list}>
                <section ref={containerRef} className=' h-max p-8  rounded-md min-w-[550px] ' style={gradient}>
                    <h2 className={(id === 'songs' ? ' #503A9B ' : '') + 'h-fit w-full pt-[6rem] pb-4 flex gap-x-4 mb-6 '} style={{ backgroundColor: bgColor }}>
                        {id === 'songs' ? <div className='w-48 h-48 shadow-sm shadow-black flex items-center justify-center' style={likedStyles}>
                            <svg xmlns="http://www.w3.org/2000/svg" className=' w-16 h-16 ' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                        </div> :
                            bgColor ? <Image src={data.image} className={'shadow-black shadow-md'} width={195} height={195} alt={data.name} /> : <BgColorDetector imageUrl={data.image} dim={195} callBack={(hexCode) => setBgColor(hexCode)} />}
                        <div className='flex flex-col gap-y-4 '>
                            {<small className="text-sm">{data.album_type || 'playlist'}</small>}

                            <h3 className={id === 'songs' ? ' text-5xl ' : "text-3xl "} >{data.name}</h3>

                            {data.description ? <p className=' text-[#B3B3B3] text-sm [&>a]:text-white [&>a]:hover:underline ' dangerouslySetInnerHTML={{ __html: data.description }} /> : null}

                            <span className={'text-[#B3B3B3] '}>
                                <span className='text-white '>
                                    {data.owner || data.artists ? <b>{data.owner || data.artists?.join(', ')}</b> : null} &bull;&thinsp;
                                    {data.popularity && (Number(data.popularity)).toLocaleString() + ' likes'}
                                    {data.followers && (Number(data.followers)).toLocaleString() + ' followers'}&thinsp;&bull;&thinsp;

                                    {data.items?.length || data.tracks?.length || 0}&thinsp;songs,
                                </span>
                                &thinsp;about&thinsp;{Math.trunc((data.items?.length || data.tracks?.length || 0) * 2.5 / 60)}&thinsp;hr&thinsp;
                                {Math.trunc((data.items?.length || data.tracks?.length || 0) * 2.5 % 60)}&thinsp;min</span>
                        </div>
                    </h2>
                    <div className=' ' >
                        <h3 className={' flex justify-start items-center gap-x-4 [&>svg:hover]:scale-105 '}>
                            {!(data.items?.length) && !(data.tracks?.length) ? null : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={`h-16 w-16 text-[#1ed760] rounded-full 
                        bg-gradient-to-r from-black to-black bg-no-repeat bg-center `}
                                onClick={() => { dispatch(setNowPlayingView(true)); setProp('nowPlaying', data.items[0]?.track || data.tracks[0]); setProp('currentPlaylist', data); }} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>}

                            {isNaN(Number(id)) && id !== 'songs' ? (!Playlist[id] ? < SlHeart className='hover:text-white text-[#B3B3B3] ' onClick={() => { addMedia('Playlist', data.id, data) }} /> : <FaHeart className={'text-[#1ed760]'} onClick={() => { removeMedia('Playlist', id) }} />) : null}
                            {id !== 'songs' ? <SlOptions className={' text-[#B3B3B3] hover:text-white '} /> : null}
                        </h3>
                        <table className="table-fixed w-full text-[#B3B3B3]">
                            <thead className={' border-b-[0.1px] border-b-[#b3b3b33a] border-solid '}>
                                <tr className='text-[#b3b3b3] p-2 [&>th]:text-start '>
                                    <th scope='col' className='w-8 p-2 '>#</th>
                                    {data.type === 'album' ? null : (<><th scope='col' className={' w-[37%] '}>Title</th>
                                        <th scope='col' className={miniTable ? ' w-[20%] ' : ' w-[30%] '}>Album</th>
                                        {miniTable ? null : <th scope='col' className=' w-[20%] '>Date added</th>}</>)}
                                    <th scope='col' className={miniTable ? ' w-[20%] ' : ' w-[30%] '}><LuClock3 className=' mx-auto ' /></th>
                                </tr>
                            </thead>
                            <tbody className={''}>
                                {(data.items || data.tracks).map((item: Track | { added_at: string, track: Track }, index: number) => <TableRow item={item} index={index} key={item.id || item.track.id} />)}
                            </tbody>
                        </table>
                        {

                            id && !isNaN(Number(id)) && !ownPlaylist[id].items.length ? (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3>Let's find something for your playlist</h3>
                                        <Search className='' style={{}} />
                                    </div>

                                    <LiaTimesSolid />
                                </div>
                            ) : null
                        }
                        {
                            !Object.values(Tracks).length && id === 'songs' ? (
                                <div className='w-full flex flex-col items-center gap-y-4'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16 3h-2v10.56a3.96 3.96 0 0 0-2-.56a4 4 0 1 0 4 4V3m-4 16a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z" /></svg>
                                    <h4>Songs you like will appear here</h4>
                                    <p>Save songs by tapping the heart icon.</p>
                                    <button onClick={() => dispatch(pushRef('/search'))} className='hover:scale-110 bg-white text-xl active:bg-gray-600 underline text-black'>Find songs</button>
                                </div>
                            ) : null
                        }
                    </div>
                </section>
            </div>
        )
    })()
}

export default Playlist;
