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
import Loader from "../network_request";
import { hexToHSL } from "@/utils";
import { RxDotFilled } from "react-icons/rx";


const Episodes = () => {

    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const searchId = searchParams.get('show');
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname;
    const [bgColor, setBgColor] = useState('')
    const [Data, setData] = useState<EpisodeFull | Show | 'loading' | 'failed'>('loading');
    const access_token = useAppSelector((state) => state.main.access_token) || '';
    const { Episodes, setProp, removeMedia, addMedia } = useContext(Context);

    useEffect(() => {
        if (pathname === '/episode)' && access_token) {
            (async () => {
                try {
                    let data: EpisodeFull | Show | 'loading' = 'loading';
                    if (id) data = await getEpisode(access_token, id);
                    if (searchId) data = await getShow(access_token, searchId);
                    setData(data);
                } catch (e) {
                    setData('failed');
                }
            })()
        }
    }, [id, searchId, access_token]);
    const navigate = useNavigate();
    const [episodeSubMenu, setEpisodeSubMenu] = useState(false);
    const gradient = {
        backgroundImage: `linear-gradient(to bottom, ${bgColor} 0 345px, ${hexToHSL(bgColor, 20)} 345px 40%, ${hexToHSL(bgColor, 15)} , #121212)`
    }





    if (!access_token) return <div className='text-center my-auto text-2xl'><RiErrorWarningLine className='text-5xl block mx-auto mb-4' />cannot connect to the internet </div>;

    if (Data === 'failed' && pathname === '/episode') return <div className='text-center my-auto text-xl font-extrabold'><div className='text-2xl'><RiErrorWarningLine /></div>Couldn't find that {searchParams.get('show') ? 'show' : 'episode'} <br /> <span className='text-sm font-semibold'>search for something else?</span> </div>;
    if (Data === 'loading' && pathname === '/episode') return <Loader status={'PENDING'} meta={'Episode'} />
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
                <div className='mr-4'>
                    <small>Playlist</small>
                    <h3 className='font-bold capitalize text-xl'>Your Episodes</h3>
                    <small>user &bull; {Object.keys(Episodes).length} episode</small>
                </div>
            </h2>
            <p >
                <h4>
                    <BsPlayCircle className='text-2xl text-[#1ED760]'
                        onClick={() => { setProp('nowPlayling', Object.values(Episodes)[0]); setProp('currentPlaylist', Episodes); dispatch(setNowPlayingView(true)) }} />
                </h4>
                <hr />
                <div className='px-4 py-2'>
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
                            <p>
                                {episode.description}
                            </p>
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
                <section className=' h-max p-8 -ml-[1.4rem] ' style={gradient}>
                    <h2 className={'h-fit w-full pt-[6rem] pb-4 flex mb-6 '} >
                        {bgColor ? <Image src={data.image} className={'shadow-black shadow-md'} width={195} height={195} alt={data.name} /> : <BgColorDetector imageUrl={data.image} callBack={(hexCode) => setBgColor(hexCode)} />}
                        <div className='flex flex-col gap-y-4 '>
                            <small className="text-sm">podcast</small>
                            <h3 className={' text-5xl '} >{data.name}</h3>
                            <p className='text-sm'>{data.description}</p>
                            <span>{data.publisher}</span>
                        </div>
                    </h2>
                    <div className=' ' >
                        <h3 className={' flex justify-start items-center gap-x-4 [&_*]:hover:scale-105 [&_*]:hover:text-white [&_*]:hover:border-white'}>
                            <button className={'h-8 border-[0.1px] border-[#b3b3b349] border-solid'}>Follow</button>
                            <SlOptions className={'text-[#b3b3b3]'} />
                        </h3>
                        <p>
                            <h4>
                                About
                            </h4>
                            {data.description}
                        </p>
                        <button className={'bg-[#2A2A2A] opacity-40 '}>{data.media_type}</button>
                        <section>
                            <h6>Up next</h6>
                            <RxDotFilled className='text-[#2E77D0] w-[20px] h-[20px] inline-block' /> {data.name}|{data.episodes[0].name}|{data.publisher} Podcast <br />
                            {data.publisher} <br />
                            {data.episodes[0].description} <br />
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                onClick={() => { setProp('nowPlayling', data.episodes[0]); setProp('currentPlaylist', data); dispatch(setNowPlayingView(true)) }} className={`h-16 w-16 text-[#1ed760] rounded-full 
                        bg-gradient-to-r from-black to-black bg-no-repeat bg-center `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg> {data.episodes[0].release_date} {data.episodes[0].duration_ms / 60 + 'hr ' +
                                    data.episodes[0].duration_ms % 60 + 'min'}
                        </section>
                        <section>
                            <h4>
                                All Episodes
                            </h4>
                            {
                                data.episodes.map((episode) => {
                                    return (() => {
                                        return (
                                            <section className={'flex justify-start items-center'} onClick={() => dispatch(pushRef('/episode/'+episode.id))}>
                                                <Image src={episode.image} height={100} width={100} alt={episode.name} />

                                                <div>
                                                    <RxDotFilled className='text-[#2E77D0] w-[20px] h-[20px] inline-block' /> {data.name}|{episode.name}|{data.publisher} Podcast <br />
                                                    {data.publisher} <br />
                                                    {episode.description} <br />
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32"
                                                     onClick={()=>{setProp('currentPlaylist', data); setProp('nowPlaying', episode); dispatch(setNowPlayingView(true))}} className={`h-16 w-16 text-white rounded-full 
                        bg-gradient-to-r from-black to-black bg-no-repeat bg-center `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg> {episode.release_date} {episode.duration_ms / 60 + 'hr ' +
                                                            episode.duration_ms % 60 + 'min'}
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
            <section>
                <h2 className=' flex items-center bg-[7A2D85] justify-around'>
                    {bgColor ? <Image src={data.image} width={100} height={100} alt={data.name} /> : <BgColorDetector imageUrl={data.image} callBack={(hexCode) => setBgColor(hexCode)} />}
                    <div className='flex flex-col justify-around items-center'>
                        <small>playlist Episode</small>
                        <h3 className='capitalize'>{data.name}</h3>
                        <p>{data.show.publisher}</p>
                    </div>
                </h2>
                <section className='bg-gradient-to-b from-[491B4F] to-[121212]'>
                    <h2 className='flex flex-col h-16'>
                        <small>{data.release_date} &bull; {data.duration_ms / 60 + ' min ' + data.duration_ms % 60 + ' sec'}</small>
                        <div className='flex gap-x-4 text-[1ED760] justify-start items-center relative'><BsPlayCircle className=' hover:scale-110' /><LuPlusCircle className={'hover:scale-110 '} /><BiSolidCheckCircle aria-hidden className={`hidden`} /><SlOptions className={'text-[A7A7A7] '} /></div>
                    </h2>
                    <p>
                        <h3>Episode Description</h3>
                        <div className='text-[B3B3B3] '>
                            {data.description}
                        </div>
                        <button type='submit' aria-disabled onClick={() => { dispatch(pushRef('/episode?show=' + data.show.id)) }} className='rounded-2xl h-6 p-2 text-base font-bold capitalize border-2 border-[smokewhite] hover:scale-110'>
                            see all episodes
                        </button>
                    </p>
                </section>
            </section>
        )
    })()
}

export default Episodes