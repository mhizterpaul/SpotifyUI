import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { Context } from "./withProvider";
import Image from 'next/image'
import useData from "../data_hook";
import {RiErrorWarningLine} from 'react-icons/ri'
import { getEpisode, getSeveralEpisodes } from "@/utils/api";
import { useAppSelector } from "@/store/hooks";
import { BsPlayCircle } from "react-icons/bs";
import { LuPlusCircle } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { BiSolidCheckCircle } from "react-icons/bi";
import SeeAll from "./see-all";
import { IoShareOutline } from "react-icons/io5";
import {SiSpotify} from 'react-icons/si'



const Episodes = () => {
    //getLocation if user is visiting /episode display list of ownEpisodes
    const { id } = useParams();
    const location = useLocation();
    const pathname = location.pathname;
    const {Episodes} = useContext(Context)
    const access_token = useAppSelector((state) => state.main.access_token) || '';
    const { Cache } = useContext(Context);
    const episodeData = id ? Cache[id] : null;
    const { data } = episodeData && access_token ? useData({ callBack: () => getEpisode(access_token, episodeData.id) }) : { data: null };
    const navigate = useNavigate();
    useEffect(() => {

    }, [data])

    if (!episodeData || (!access_token && pathname === '/episodes')) return <div className='text-center my-auto text-xl'><div className='text-2xl'><RiErrorWarningLine/></div>something went wrong </div>;

    if (pathname === '/episodes' && !Object.keys(Episodes).length) return <SeeAll title={'Episodes'} callBack={(index: string) => getSeveralEpisodes(access_token, index).then(
        (data) => data.map(async (el) => {
            const moredata = await getEpisode(access_token, el.id);
            return {
                ...el,
                ...moredata
            }
        })
    )} />;


    if (pathname === '/episodes') return (
        <section>
            <h2 className={'p-2 pt-4 flex bg-[#045141] gap-x-2 max-h-[375px] h-[50%]'}>
                <div className='rounded-sm bg-[#056952] float-left'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" className={'text-[#1ED760]'} viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"></path><path fill="currentColor" d="M4 5a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v16.028c0 1.22-1.38 1.93-2.372 1.221L12 18.229l-5.628 4.02c-.993.71-2.372 0-2.372-1.22V5Z"></path></g></svg>
                </div>
                <div className='mr-4'>
                    <small>Playlist</small>
                    <h3 className='font-bold capitalize text-xl'>Your Episodes</h3>
                    <small>user &bull; {Episodes.length} episode</small>
                </div>
            </h2>
            <p>
                <h4>
                    <BsPlayCircle className='text-2xl text-[#1ED760]'/>
                </h4>
                <hr />
                <div className='px-4 py-2'>
                {Episodes.map((episode, index) => (() => {
                    const [hover, setHover] = useState(false);
                    const tooltip = ' hover:before:absolute hover:before:bottom-[110%] hover:before:right-[50%] hover:before:p-2 hover:before:bg-zinc-900 hover:before:shadow-md ';
                    const optionsContent = ` hover:before:content-['More Options for ${episode.name}'}] `;
                return <div onMouseEnter={() => setHover(true)}>
                    <Image src={episode.image} height={75} width={75} alt = {episode.name} />
                    <div>
                        <h5>{episode.name}</h5>
                        <small>{episode.publisher}</small>
                    </div>
                    <p>
                        {episode.description}
                    </p>
                    <div className='relative'>
                        <BsPlayCircle /> {episode.release_date} &bull; {episode.duration_ms/60 + ' min'} {episode.duration_ms%60 + ' sec'} <div className={'relative '}><IoShareOutline className={tooltip + (hover? 'inline-block': 'hidden') + ' hover:before:content-["Share"] '}/></div> <div className={'relative '}><BiSolidCheckCircle className={tooltip + " hover:before:content-['Remove from Your Library'] "} onClick={()=> Episodes.splice(index, 1)}/></div> <div className={'relative '}><SlOptions className={tooltip + (hover?'inline-block': 'hidden') + optionsContent} onClick={() => setEpisodeSubMenu(true)}/></div>
                        <ul className={'[&_li]:hover:bg-gray-700 [&_li_svg]:text-stone-600 bg-[#282828]' + episodeSubMenu ? 'block': 'hidden'}>
                            <li><BiSolidCheckCircle/> Remove from Your Episodes</li>
                            <li><svg aria-hidden="true" viewBox="0 0 16 16"><path d="M3.404 3.404a6.5 6.5 0 0 1 9.192 9.192l1.06 1.06a8 8 0 1 0-11.313 0l1.06-1.06a6.5 6.5 0 0 1 0-9.192z"></path><path d="M11 9.25a3.001 3.001 0 0 1-2.25 2.905v1.474l1.773 1.488a.5.5 0 0 1-.321.883H5.799a.5.5 0 0 1-.322-.883l1.773-1.488v-1.474A3.001 3.001 0 0 1 5 9.25V7a3 3 0 0 1 6 0v2.25zM8 5.5A1.5 1.5 0 0 0 6.5 7v2.25a1.5 1.5 0 0 0 3 0V7A1.5 1.5 0 0 0 8 5.5z"></path></svg> See Episode Description</li>
                            <li><SiSpotify/>Open in app</li>
                        </ul>
                    </div>
                </div>})())}
                </div>
            </p>
        </section>
    );




    const hover = `hover:before:contents[${episodeData.name}]`
    return (
        <section>
            <h2 className=' flex items-center bg-[7A2D85] justify-around'>
                <Image src={episodeData.image} alt='Playlist cover photo' width={100} height={100} />
                <div className='flex flex-col justify-around items-center'>
                    <small>playlist Episode</small>
                    <h3 className='capitalize'>{episodeData.name}</h3>
                    <p>{data.publisher || ''}</p>
                </div>
            </h2>
            <section className='bg-gradient-to-b from-[491B4F] to-[121212]'>
                <h2 className='flex flex-col h-16'>
                    <small>{episodeData.release_date} &bull; {episodeData.duration_ms / 60 + ' min ' + episodeData.duration_ms % 60 + ' sec'}</small>
                    <div className='flex gap-x-4 text-[1ED760] justify-start items-center relative'><BsPlayCircle className=' hover:scale-130' /><LuPlusCircle className={'hover:scale-130 '} /><BiSolidCheckCircle aria-hidden className={`hidden`} /><SlOptions className={'text-[A7A7A7] hover:before:absolute hover:before:bottom-[110%] hover:before:right-[50%] hover:before:p-2 hover:before:bg-zinc-900 hover:before:shadow-md ' + hover} /></div>
                </h2>
                <p>
                    <h3>Episode Description</h3>
                    <div className='text-[B3B3B3] '>
                        {episodeData.description}
                    </div>
                    <button type='submit' aria-disabled onClick={() => { }} className='rounded-2xl h-6 p-2 text-base font-bold capitalize border-2 border-[smokewhite] hover:scale-130'>
                        see all episodes
                    </button>
                </p>
            </section>
        </section>
    )
}

export default Episodes