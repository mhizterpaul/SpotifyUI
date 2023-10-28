import { BsPlayCircle } from "react-icons/bs"
import { SlHeart, SlOptions } from 'react-icons/sl'
import { LuClock3 } from 'react-icons/lu'
import { IoShareOutline } from 'react-icons/io5'
import { useState, useContext, useEffect, useRef } from "react";
import Image from 'next/image'
import { useParams} from 'react-router-dom'
import { ShareSocial } from 'react-share-social'
import BgColorDetector from './imageBackgroundDetector'
import { FaHeart } from 'react-icons/fa6'
import { LuPlusCircle } from "react-icons/lu";
import { BiPlay } from "react-icons/bi";
import Search from '../nav/search'
import { pushRef } from "@/store/reducers/main_slice";
import { useAppDispatch } from "@/store/hooks";
import { SiSpotify } from "react-icons/si";
import { LiaTimesSolid } from "react-icons/lia";
import { RiErrorWarningLine } from "react-icons/ri";


//this component requires you to set /playlist/id and have id in Cache
const Playlist = () => {
    const { id } = useParams();
    const [bgColor, setBgColor] = useState('');
    const { Cache, Tracks, Playlist } = useContext(Context)
    const containerRef = useRef<HTMLDivElement>(null);
    const [miniTable, setMiniTable] = useState((window.innerWidth - 300) <= 620 ? true : false);
    const dispatch = useAppDispatch();

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

    if (!Cache[id]||!id) return <div className='text-center my-auto text-xl font-extrabold'><div className='text-2xl'><RiErrorWarningLine/></div>Couldn't find that playlist <br/> <span className='text-sm font-semibold'>search for something else?</span> </div>;



    
    if (Cache[id]) return (
        <section ref={containerRef}>
            <h2>
                <div className='w-1/3 float-left'>
                    {bgColor ? <Image width={100} /> : <BgColorDetector callBack={(hexCode) => setBgColor(hexCode)} />}
                </div>
                <div>
                    <small>playlist</small>
                    <h3>{Cache[id].name}</h3>
                    <p>{Cache[id].description}</p>
                    <span><span>{Cache[id].owner} &bull; {Cache[id].followers} &bull; {Cache[id].total + ' songs'} </span> {'about ' + Cache[id].total * 3 / 60 + ' hr'} {(Cache[id].total * 3) % 60 + ' min'}</span>
                </div>
            </h2>
            <p>
                <h3>
                    <BsPlayCircle /> <SlHeart />{/*outline */} <FaHeart />{/*fill */} <SlOptions />
                </h3>
                <table>
                    <thead>
                        <tr className='border-s-neutral-600 '>
                            <td>#</td>
                            <td>Title</td>
                            <td>Album</td>
                            {miniTable ? null : <td>Date added</td>}
                            <td><LuClock3 /></td>
                        </tr>
                    </thead>
                    <tbody>
                        {Cache[id].items.map((track, index) => (() => {
                            const [favorite, setFavorite] = useState(!!Tracks[track.id]);
                            const [menu, setMenu] = useState(false);
                            const [hover, setHover] = useState(false);
                            const trRef = useRef<HTMLTableRowElement>(null);
                            const [position, setPosition] = useState({ top: '', right: '' });
                            useEffect(() => {
                                if (!trRef.current) return
                                let { top, right, width } = trRef.current.getBoundingClientRect();
                                top = window.innerHeight - top >= window.innerHeight / 2 ? '110%' : '-10%';
                                right = Math.abs(window.innerWidth - width) + 15 + 'px';


                            }, [trRef, menu])
                            return (
                                <>
                                <tr ref={trRef} className='relative' onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                                    <td>hover ? <BiPlay /> : {index}</td>
                                    <td>{track.image}<span>{track.name}</span><br /><span>{track.artists.join(', ')}</span></td>
                                    <td>{track.album}</td>
                                    {miniTable ? null : <td>{track.added_at}</td>}
                                    {Tracks[track.id] ? <FaHeart onClick={() => { Tracks[track.id] = null; setFavorite(false) }} /> : hover && <SlHeart onClick={() => { Tracks[track.id] = track; setFavorite(true) }} />}
                                    <td>{track.duration_ms / 60 + ':' + track.duration_ms % 60}</td>
                                    {hover && <SlOptions onClick={setMenu((menu) => !menu)} />}
                                </tr>
                                {menu && <ul className='absolute '>
                                    <li><LuPlusCircle /> Add to playlist</li>
                                    <li><IoShareOutline/> Share</li>
                                    <li><SiSpotify/>Open in app</li>
                                </ul>}
                                </>
                            )
                        })()
                        )}
                    </tbody>
                </table>
                {

                    !Cache[id].items.length && id.includes('playlist') && (
                      <div className="flex items-center justify-between">
                        <div>
                            <h3>Let's find something for your playlist</h3>
                            <Search className=''/>
                        </div>

                        <LiaTimesSolid/>
                      </div>  
                    )
                }
                {
                    !Cache[id].items.length && id.includes('songs') && (
                        <div className='w-full flex flex-col items-center gap-y-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M16 3h-2v10.56a3.96 3.96 0 0 0-2-.56a4 4 0 1 0 4 4V3m-4 16a2 2 0 1 1 2-2a2 2 0 0 1-2 2Z"/></svg>
                            <h4>Songs you like will appear here</h4>
                            <p>Save songs by tapping the heart icon.</p>
                            <button onClick={() => dispatch(pushRef('/search'))} className='hover:scale-130 bg-white text-xl active:bg-gray-600 underline text-black'>Find songs</button>
                        </div>
                    )
                }
            </p>
        </section>
    )
}

export default Playlist;