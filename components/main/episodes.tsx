import { useContext, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom"
import Image from 'next/image'
import { RiErrorWarningLine } from 'react-icons/ri'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { BsPlayCircle } from "react-icons/bs";
import { LuPlusCircle } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { BiSolidCheckCircle } from "react-icons/bi";
import { IoShareOutline } from "react-icons/io5";
import { SiSpotify } from 'react-icons/si'
import BgColorDetector from '../main/imageBackgroundDetector'
import { pushRef, setNowPlayingView } from "@/store/reducers/main_slice";
import { Episode, EpisodeFull, Show } from "@/utils/types";
import { Context, V } from "@/app/rootProvider";
import { getShow, getEpisode } from "@/utils/api";
import styles from './main.list.module.css'
import Loader from "../networkRequest";
import { hexToHSL, random } from "@/utils";
import { RxDotFilled } from "react-icons/rx";


const Episodes = () => {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const searchId = searchParams.get('show');
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname;
    const [bgColor, setBgColor] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [playlistData, setPlaylistData] = useState<Show | 'loading' | 'failed'>('loading');
    const [Data, setData] = useState<EpisodeFull | Show | 'loading' | 'failed'>('loading');
    const access_token = useAppSelector((state) => state.main.access_token) || '';
    const { Episodes, setProp, removeMedia, addMedia } = useContext(Context);

    useEffect(() => {
        if (pathname.includes('/episode') && (id || searchId) && access_token) {
            (async () => {
                try {
                    let data: EpisodeFull | Show | 'loading' = 'loading';
                    if (id) data = await getEpisode(access_token, id, random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']));
                    if (searchId) data = await getShow(access_token, searchId);
                    setData(data);
                } catch (e) {
                    setData('failed');
                }
            })()
        }
    }, [id, searchId, access_token]);
    useEffect(() => {
        if (pathname.includes('/episode/') && id && typeof Data === 'object' && access_token) {
            (async () => {
                try {
                    let data: Show | 'loading' = 'loading';

                    data = await getShow(access_token, Data.show.id);

                    setPlaylistData(data);
                } catch (e) {
                    setPlaylistData('failed');
                }
            })()
        }
    }, [id, access_token, Data]);
    useMemo(() => setProp('BgColor', bgColor), [bgColor])
    const navigate = useNavigate();
    const [episodeSubMenu, setEpisodeSubMenu] = useState(false);
    const gradient = {
        backgroundImage: `linear-gradient(to bottom, ${hexToHSL(bgColor, 50)} 0 300px, ${hexToHSL(bgColor, 25)} 300px,${hexToHSL(bgColor, 10)} 27.5%, #121212 30%)`,
        backgroundBlendMode: 'screen'
    }






    if (Data === 'failed' && (id || searchId) && pathname.includes('/episode')) return <div className='text-center my-auto text-2xl'><RiErrorWarningLine className='text-5xl block mx-auto mb-4' />Couldn't find that playlist <br /> <span className='text-sm font-semibold'>search for something else?</span></div>;
    if (Data === 'loading' && (id || searchId) && pathname.includes('/episode')) return <Loader status={'PENDING'} meta={'Episode'} />
    if (pathname === '/episodes' && !Object.keys(Episodes).length) {
        dispatch(pushRef('/see-all/episodes'));
        return null;
    }


    if (pathname === '/episodes') return (
        <section>
            <h2 className={'p-2 pt-4 flex bg-[#045141] gap-x-2 max-h-[375px] h-[50%] '}>
                <div className='rounded-sm bg-[#056952] float-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className={'text-[#1ED760]'} viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path><path fill="currentColor" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Z"></path></g></svg>
                </div>
                <div className='mr-4 '>
                    <small>Playlist</small>
                    <h3 className='font-bold capitalize text-xl'>Your Episodes</h3>
                    <small>user &bull; {Object.keys(Episodes).length} episode</small>
                </div>
            </h2>
            <p >
                <h4>
                    <BsPlayCircle className='text-2xl text-[#1ED760]'
                        onClick={() => { setProp('nowPlaying', Object.values(Episodes)[0]); setProp('currentPlaylist', Episodes); dispatch(setNowPlayingView(true)) }} />
                </h4>
                <hr />
                <div className='px-4 py-2 '>
                    {Object.values(Episodes).map((episode: Episode, index: number) => (() => {
                        const [hover, setHover] = useState(false);
                        const tooltip = ' hover:before:absolute hover:before:bottom-[110%] hover:before:right-[50%] hover:before:p-2 hover:before:bg-zinc-900 hover:before:shadow-md ';
                        const optionsContent = ` hover:before:content-['More Options for ${episode.name}'}] `;
                        return <div onClick={() => dispatch(pushRef('/episode/' + episode.id))} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                            <Image src={episode.image} height={75} width={75} alt={episode.name} />
                            <div>
                                <h5>{episode.name}</h5>
                                <small>{episode.publisher}</small>
                            </div>
                            <p dangerouslySetInnerHTML={{ __html: episode.description }} />
                            <div className='relative'>
                                <BsPlayCircle onClick={() => { setProp('nowPlaying', episode); setProp('currentPlaylist', Episodes) }} /> {episode.release_date} &bull; {episode.duration_ms / 60 + ' min'} {episode.duration_ms % 60 + ' sec'} <div className={'relative '}><IoShareOutline className={tooltip + (hover ? 'inline-block' : 'hidden') + ' hover:before:content-["Share"] '} /></div> <div className={'relative '}><BiSolidCheckCircle className={tooltip + " hover:before:content-['Remove from Your Library'] "} onClick={() => removeMedia('Episodes', episode.id)} /></div> <div className={'relative '}><SlOptions className={tooltip + (hover ? 'inline-block' : 'hidden') + optionsContent} onClick={() => setEpisodeSubMenu(true)} /></div>
                                <ul className={'[&_li]:hover:bg-gray-700 [&_li_svg]:text-stone-600 bg-[#282828]' + episodeSubMenu ? 'block' : 'hidden'}>
                                    <li onClick={() => removeMedia('Episodes', episode.id)}><BiSolidCheckCircle /> Remove from Your Episodes</li>
                                    <li><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3.404 3.404a6.5 6.5 0 0 1 9.192 9.192l1.06 1.06a8 8 0 1 0-11.313 0l1.06-1.06a6.5 6.5 0 0 1 0-9.192z"></path><path d="M11 9.25a3.001 3.001 0 0 1-2.25 2.905v1.474l1.773 1.488a.5.5 0 0 1-.321.883H5.799a.5.5 0 0 1-.322-.883l1.773-1.488v-1.474A3.001 3.001 0 0 1 5 9.25V7a3 3 0 0 1 6 0v2.25zM8 5.5A1.5 1.5 0 0 0 6.5 7v2.25a1.5 1.5 0 0 0 3 0V7A1.5 1.5 0 0 0 8 5.5z"></path></svg> See Episode Description</li>
                                    <li><SiSpotify />Open in app</li>
                                </ul>
                            </div>
                        </div>
                    })())}
                </div>
            </p>
        </section>
    );



    if (searchParams.get('show')) return (() => {
        const data = Data as Show;
        return (

            <div className={" overflow-y-scroll h-[80vh] rounded-md -mt-14 w-full " + styles.list}>
                <section className=' h-max p-8 pt-20 -ml-[1.2rem] ' style={gradient}>
                    <h2 className={'h-fit w-full flex gap-x-4 items-stretch justify-start '} >
                        {bgColor ? <Image src={data.image} className={'shadow-black shadow-md rounded-md '} width={195} height={195} alt={data.name} /> : <BgColorDetector imageUrl={data.image} dim={195} callBack={(hexCode) => setBgColor(hexCode)} />}
                        <div className='flex flex-col items-start justify-center gap-y-4 pt-12 '>
                            <small className="text-sm capitalize">podcast</small>
                            <h3 className={' text-4xl font-serif '} >{data.name}</h3>
                            <span>{data.publisher}</span>
                        </div>
                    </h2>
                    <div className=' mt-12 ' >
                        <h3 className={' flex justify-start my-8 items-center gap-x-4 [&_*:hover]:scale-105 [&_*:hover]:text-white [&_*:hover]:border-white'}>
                            <button className={'h-fit font-bold border-[0.1px] w-24 border-[#b3b3b349] border-solid rounded-3xl p-2 text-sm '}>Follow</button>
                            <SlOptions className={'text-[#b3b3b3]'} />
                        </h3>
                        <p className='mt-8 '>
                            <h4 className=' font-bold text-xl mb-6'>
                                About
                            </h4>
                            <div className={` text-[#b3b3b3] ${!expanded ? ' h-[4.5rem] overflow-hidden text-ellipsis ' : ' h-max'} `} dangerouslySetInnerHTML={{ __html: data.description }} />
                            <div className="font-bold text-base" onClick={() => setExpanded(state => !state)}>{expanded ? 'Show less' : '...Show more'}</div>
                        </p>
                        <button className={'bg-[#2a2a2a6a] mt-4 min-h-[2.2rem] min-w-[5rem] hover:bg-[#2a2a2a] capitalize rounded-2xl p-2 text-sm h-fit w-fit '}>{data.media_type}</button>

                        <section className="text-[#b3b3b3] group hover:rounded-md mt-6 p-4 hover:bg-[#2a2a2a] ">
                            <h6 className={' text-xs mb-2 '}>Up next</h6>
                            <span className={'text-white hover:underline '}><RxDotFilled className='text-[#2E77D0] w-[20px] h-[20px] inline-block' />{data.name}</span> <br />
                            <span className={'inline-block ml-[10px] mb-4 hover:underline '}>{data.publisher}</span>
                            <div className={' h-[4.5rem] overflow-hidden text-ellipsis mb-4 '} dangerouslySetInnerHTML={{ __html: data.episodes[0].description }} />
                            <div className="mb-2 w-full flex justify-between items-center ">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                        onClick={() => { setProp('nowPlaying', data.episodes[0]); setProp('currentPlaylist', data); dispatch(setNowPlayingView(true)) }} className={`h-12 w-12 text-[#1ed760] rounded-full 
                        bg-gradient-to-r from-black to-black inline-block bg-no-repeat bg-center mr-6 hover:scale-105 `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
                                    <span>{(() => { const date = new Date(data.episodes[0].release_date.substring(5, 10)); return date.toLocaleString('default', { month: 'short', day: 'numeric' }) })()}&thinsp;&bull;&thinsp; {Math.trunc(data.episodes[0].duration_ms / (60 * 1000)) + ' min ' + Math.round((data.episodes[0].duration_ms / 1000) % 60) + ' sec'}</span>
                                </div>
                                <span className={' hidden group-hover:inline-block [&>svg]:mr-6 [&>svg]:h-6 [&>svg]:w-6 [&>svg:hover]:scale-105 [&>svg:hover]:text-white'}>
                                    <IoShareOutline className={'inline-block '} />
                                    {Episodes[data.episodes[0].id] ? <BiSolidCheckCircle onClick={() => removeMedia('Episodes', data.episodes[0].id)} className={`inline-block `} /> : <LuPlusCircle onClick={() => addMedia('Episodes', data.episodes[0].id, data.episodes[0])} className={'hover:scale-105 text-xl hover:text-white inline-block '} />}
                                </span>
                            </div>
                        </section>
                        <section className={'[&>section:first-of-type]:mt-4 '}>
                            <h4 className={'mt-4 text-xl font-bold'}>
                                All Episodes
                            </h4>
                            {
                                data.episodes.map((episode) => {
                                    return (() => {
                                        return (
                                            <section className={'flex group text-[#b3b3b3] px-4 pt-6 justify-around gap-x-4 items-start border-t-[0.1px] border-[#b3b3b35b] hover:border-0 [&+section]:hover:border-0 hover:rounded-md hover:bg-[#2a2a2a]'} onClick={() => dispatch(pushRef('/episode/' + episode.id))}>

                                                <Image src={episode.image} height={120} width={120} className={'rounded '} alt={episode.name} />
                                                <div className={'flex flex-col justify-center items-start gap-y-4'}>
                                                    <div>
                                                        <span className={'text-white hover:underline '}><RxDotFilled className='text-[#2E77D0] w-[20px] h-[20px] inline-block' />{data.name}</span><br />
                                                        <span className={'inline-block ml-[10px] hover:underline '}>{data.publisher}</span>
                                                    </div>

                                                    <div className={'h-12 overflow-hidden text-ellipsis '} dangerouslySetInnerHTML={{ __html: episode.description }} />
                                                    <div className={'flex justify-between w-full items-center mb-4 '}>
                                                        <div>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                                onClick={() => { setProp('currentPlaylist', data); setProp('nowPlaying', episode); dispatch(setNowPlayingView(true)) }} className={`h-12 w-12 text-white rounded-full 
                        bg-gradient-to-r from-black to-black inline-block bg-no-repeat bg-center mr-6 hover:scale-105 `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
                                                            <span>{(() => { const date = new Date(episode.release_date.substring(5, 10)); return date.toLocaleString('default', { month: 'short', day: 'numeric' }) })()}&thinsp;&bull;&thinsp; {Math.trunc(episode.duration_ms / (60 * 1000)) + ' min ' + Math.round((episode.duration_ms / 1000) % 60) + ' sec'}</span>
                                                        </div>
                                                        <span className={' hidden group-hover:inline-block [&>svg]:mr-6 [&>svg]:h-6 [&>svg]:w-6 [&>svg]:inline-block [&>svg:hover]:scale-105 [&>svg:hover]:text-white '}>
                                                            <IoShareOutline className={' '} />
                                                            {Episodes[episode.id] ? <BiSolidCheckCircle onClick={() => removeMedia('Episodes', episode.id)} className={` `} /> : <LuPlusCircle className={'hover:scale-105 text-xl hover:text-white '} onClick={() => addMedia('Episodes', episode.id, episode)} />}
                                                        </span>
                                                    </div>
                                                </div>
                                            </section>
                                        )
                                    })()
                                })
                            }
                        </section>
                    </div>
                </section>
            </div>
        )
    })()


    if (id) return (() => {
        const data = Data as EpisodeFull
        return (
            <div className={" overflow-y-scroll h-[80vh] rounded-md -mt-14 w-full " + styles.list}>
                <section className=' h-max p-8 pt-20 -ml-[1.2rem] ' style={gradient}>
                    <h2 className=' flex items-stretch text-white justify-start gap-x-4 '>
                        {bgColor ? <Image src={data.image} className={' rounded-md '} width={195} height={195} alt={data.name} /> : <BgColorDetector imageUrl={data.image} dim={100} callBack={(hexCode) => setBgColor(hexCode)} />}
                        <div className='flex flex-col pt-12 gap-y-6 justify-center items-start '>
                            <small className='text-sm '>playlist Episode</small>
                            <h3 className='capitalize font-serif font-bold text-2xl '>{data.name}</h3>
                            <p className={'font-bold hover:underline '}>{data.show?.publisher}</p>
                        </div>
                    </h2>
                    <section className=' mt-12 '>
                        <h2 className='flex flex-col h-fit '>
                            <span className={'inline-block text-[#A7A7A7] mb-2 '}>{(() => { const date = new Date(data.release_date.substring(5, 10)); return date.toLocaleString('default', { month: 'short', day: 'numeric' }) })()} &bull; {Math.trunc(data.duration_ms / (60 * 1000)) + ' min ' + Math.round((data.duration_ms / 1000) % 60) + ' sec'}</span>
                            <div className='flex gap-x-4 h-18 text-[#A7A7A7]  justify-start items-center relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={`h-16 w-16 text-[#1ed760] rounded-full 
                        bg-gradient-to-r from-black to-black bg-no-repeat hover:scale-105 bg-center `}
                                    onClick={() => { setProp('nowPlaying', data); setProp('currentPlaylist', playlistData); dispatch(setNowPlayingView(true)) }}
                                    style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
                                {Episodes[id] ? <BiSolidCheckCircle className={` text-2xl `} onClick={() => removeMedia('Episodes', data.id)} /> : <LuPlusCircle className={'hover:scale-105 text-2xl hover:text-white '} onClick={() => addMedia('Episodes', data.id, data)} />}
                                <SlOptions className={'text-[#A7A7A7] hover:scale-105 hover:text-white  text-lg '} /></div>
                        </h2>
                        <p className={'mt-4 '}>
                            <h3 className={''}>Episode Description</h3>
                            <div className={`text-[#B3B3B3] ${expanded ? ' h-max ' : ' h-[4.5rem] overflow-hidden text-ellipsis '}`} dangerouslySetInnerHTML={{ __html: data.description }} />
                            <div className={'cursor-pointer mb-12 mt-2 w-max h-max'} onClick={() => setExpanded(state => !state)}>{expanded ? 'Show less' : '...Show more'}</div>
                            <button type='submit' onClick={() => { dispatch(pushRef('/episode?show=' + data.show.id)) }} className=' mt-8 rounded-2xl h-[2.2rem] p-2 text-sm font-bold border-[0.3px] border-[smokewhite] hover:border-white hover:scale-105'>
                                See all episodes
                            </button>
                        </p>
                    </section>
                </section>
            </div>
        )
    })()
}

export default Episodes