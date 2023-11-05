import { BsPlayCircle } from "react-icons/bs"
import { SlHeart, SlOptions } from 'react-icons/sl'
import { LuClock3 } from 'react-icons/lu'
import { IoShareOutline } from 'react-icons/io5'
import { useState, useContext, useEffect, useRef } from "react";
import Image from 'next/image'
import { useParams } from 'react-router-dom'
import { ShareSocial } from 'react-share-social'
import BgColorDetector from './imageBackgroundDetector'
import { FaHeart } from 'react-icons/fa6'
import { LuPlusCircle } from "react-icons/lu";
import { BiPlay } from "react-icons/bi";
import Search from '../nav/search'
import { pushRef } from "@/store/reducers/main_slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SiSpotify } from "react-icons/si";
import { LiaTimesSolid } from "react-icons/lia";
import { RiErrorWarningLine } from "react-icons/ri";
import { Context, OwnPlaylist } from "./withProvider";
import { Playlist as Play } from '../../utils/types'
import { getPlaylist } from "@/utils/api";
import Loader from "../network_request";
import { likedStyles } from "../nav/sidebar";
import { hexToHSL } from "@/utils";

//please load playlist yourself by making a network request

const Playlist = () => {
    const { id } = useParams();
    const [bgColor, setBgColor] = useState('');
    const { removeMedia, addMedia, Tracks, Playlist, setProp } = useContext(Context);
    const access_token = useAppSelector((state) => state.main.access_token) || '';
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const [fetchedPlaylist, setFetchedPlaylist] = useState({} as Play);
    const [miniTable, setMiniTable] = useState((window.innerWidth - 300) <= 620 ? true : false);
    const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDN2MTRhNCA0IDAgMSAxLTItMy40NjVWNUg5djEyYTQgNCAwIDEgMS0yLTMuNDY1VjNoMTNaTTUgMTlhMiAyIDAgMSAwIDAtNGEyIDIgMCAwIDAgMCA0Wm0xMSAwYTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNFoiLz48L3N2Zz4=';
    useEffect(() => {
        if (containerRef.current === null) return
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                if (!entry.contentBoxSize) continue
                entry.contentBoxSize[0].inlineSize <= 620 ? (!miniTable && setMiniTable(true)) : (miniTable && setMiniTable(false));
            }
        })
        resizeObserver.observe(containerRef.current, { box: 'content-box' })
    }, [containerRef.current])

    const ownPlaylist: { [key: string]: OwnPlaylist } = Object.fromEntries(Object.entries(Playlist).filter((value) => typeof Number(value[0]) === 'number'));

    if (!id) return <div className='text-center my-auto text-xl font-extrabold'><div className='text-2xl'><RiErrorWarningLine /></div>Couldn't find that playlist <br /> <span className='text-sm font-semibold'>search for something else?</span> </div>;

    if (id !== 'songs' && Number.isNaN(Number(id))) {
        getPlaylist(access_token, id).then(
            (data) => setFetchedPlaylist(data)
        )
        return <Loader meta={'Playlist'} status={'PENDING'} />
    }

    const data = id === 'songs' ? {
        name: 'Liked Songs',
        description: '',
        owner: '',
        id: 'songs',
        followers: 0,
        total: Object.values(Tracks).length,
        image: '',
        items: {
            added_at: (() => { const date = new Date; return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() })(),
            track: Object.values(Tracks)
        }
    } : !isNaN(Number(id)) ? ownPlaylist[id] : fetchedPlaylist;

    setProp('BgColor', bgColor);
    const gradient = {
        backgroundImage: `linear-gradient(to bottom, #503A9B 0 300px,${hexToHSL(id === 'songs' ? '#503A9B' : bgColor, 11)}, #121212)`
    }





    return (
        <div className=" overflow-y-scroll w-[72vh] ">
            <section ref={containerRef} className=' h-max p-8 -ml-[1.4rem] ' style={gradient}>
                <h2 className={(id === 'songs' ? ' #503A9B ' : '') + 'h-fit w-full pt-[6rem] pb-4 flex '} style={{ backgroundColor: bgColor }}>
                    {id === 'songs' ? <div className='w-44 h-44 shadow-md flex items-center justify-center' style={likedStyles}>
                        <svg xmlns="http://www.w3.org/2000/svg" className='small-svg ' width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                    </div> :
                        bgColor ? <Image src={data.image || defaultSrc} width={175} height={175} alt={data.name} /> : <BgColorDetector imageUrl={data.image || defaultSrc} callBack={(hexCode) => setBgColor(hexCode)} />}
                    <div className='flex flex-col gap-y-4 '>
                        <small className="text-sm">playlist</small>
                        <h3 className={id === 'songs' ? ' text-5xl ' : "text-3xl "} >{data.name}</h3>
                        <p className='text-sm'>{data.description}</p>
                        <span><span><b>{data.owner}</b> &bull; {data.followers} &bull; {data.total + ' songs'} </span> {'about ' + data.total * 3 / 60 + ' hr'} {(data.total * 3) % 60 + ' min'}</span>
                    </div>
                </h2>
                <p className=' ' >
                    <h3 className={' flex justify-start items-center gap-x-4 '}>
                        {!isNaN(Number(id)) ? null : <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={`h-14 w-14 text-[#1ed760] rounded-full 
                    bg-gradient-to-r from-black to-black bg-no-repeat bg-center `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>}
                        {isNaN(Number(id)) && id !== 'songs' ? (!Playlist[id] ? < SlHeart className='hover:text-white ' onClick={() => { addMedia('Playlist', data.id, data) }} /> : <FaHeart className={'text-[#1ed760]'} onClick={() => { removeMedia('Playlist', id) }} />) : null}
                        {id !== 'songs' ? <SlOptions /> : null}
                    </h3>
                    <table className="table-fixed w-full ">
                        <thead>
                            <tr className='text-[#b3b3b3] p-2 '>
                                <th scope='col' className='w-8 p-2 '>#</th>
                                <th scope='col' className={miniTable ? ' w-[37%] ' : ' w-[47%] '}>Title</th>
                                <th scope='col' className={miniTable ? ' w-[20%] ' : ' w-[30%] '}>Album</th>
                                {miniTable ? null : <th scope='col' className=' w-[20%] '>Date added</th>}
                                <th scope='col' className={miniTable ? ' w-[20%] ' : ' w-[30%] '}><LuClock3 /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.items.track.length && data.items.track.map((track, index: number) => (() => {
                                const [menu, setMenu] = useState(false);
                                const [hover, setHover] = useState(false);
                                const trRef = useRef<HTMLTableRowElement>(null);
                                const [position, setPosition] = useState({ top: '', right: '' });
                                useEffect(() => {
                                    if (!trRef.current) return
                                    const { top, right, width } = trRef.current.getBoundingClientRect();
                                    const insetTop = window.innerHeight - top >= window.innerHeight / 2 ? '110%' : '-10%';
                                    const insetRight = Math.abs(window.innerWidth - width) + 15 + 'px';
                                    setPosition(() => ({ top: insetTop, right: insetRight }))

                                }, [trRef, menu])

                                return (
                                    <tr ref={trRef} className='relative hover:bg-[rgba(114,114,114,0.62)] rounded-sm' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                        <td>{hover ? <BiPlay /> : index}</td>
                                        <td><Image height={45} width={45} alt={track.name} src={track.album.image} className={' inline-block pl-2'} /><span>{track.name}</span><br /><span>{track.artists.map(artist => artist.name).join(', ')}</span></td>
                                        <td>{track.album.name}</td>
                                        {miniTable ? null : <td>{data.items.added_at}</td>}
                                        <td> {Tracks[track.id] ? <FaHeart onClick={() => { removeMedia('Track', id) }} /> : hover ? <SlHeart onClick={() => { Tracks[track.id] = track }} /> : null}
                                            {track.duration_ms / 60 + ':' + track.duration_ms % 60}
                                            {hover && <SlOptions onClick={setMenu((menu) => !menu)} />}</td>
                                        {menu && <ul className='absolute '>
                                            <li><LuPlusCircle /> Add to playlist</li>
                                            <li><IoShareOutline /> Share</li>
                                            <li><SiSpotify />Open in app</li>
                                        </ul>}
                                    </tr>
                                )
                            })()
                            )}
                        </tbody>
                    </table>
                    {

                        !Object.keys(ownPlaylist).length && !isNaN(Number(id)) && (
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3>Let's find something for your playlist</h3>
                                    <Search className='' style={{}} />
                                </div>

                                <LiaTimesSolid />
                            </div>
                        )
                    }
                    {
                        !Object.values(Tracks).length && id === 'songs' && (
                            <div className='w-full flex flex-col items-center gap-y-4'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16 3h-2v10.56a3.96 3.96 0 0 0-2-.56a4 4 0 1 0 4 4V3m-4 16a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z" /></svg>
                                <h4>Songs you like will appear here</h4>
                                <p>Save songs by tapping the heart icon.</p>
                                <button onClick={() => dispatch(pushRef('/search'))} className='hover:scale-110 bg-white text-xl active:bg-gray-600 underline text-black'>Find songs</button>
                            </div>
                        )
                    }
                </p>
            </section>
        </div>
    )
}

export default Playlist;