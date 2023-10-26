import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Context } from "./withProvider";
import Image from 'next/image'
import useData from "../data_hook";
import { getEpisode } from "@/utils/api";
import { useAppSelector } from "@/store/hooks";
import { BsPlayCircle } from "react-icons/bs";
import { LuPlusCircle } from "react-icons/lu";
import { SlOptions } from "react-icons/sl";
import { BiSolidCheckCircle } from "react-icons/bi";



const Episodes = ({ episode }) => {
    const { id } = useParams();
    const access_token = useAppSelector((state) => state.main.access_token)
    const { Episodes } = useContext(Context);
    const episodeData = id ? Episodes[id] : episode ? episode : null;
    const { data } = episodeData && access_token ? useData({ callBack: () => getEpisode(access_token, episodeData.id) }) : { data: null };
    useEffect(() => {

    }, [data])

    if (!episodeData) return <div className='text-center my-auto'>something went wrong</div>;

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
                    <small>{episodeData.release_date} &bull; {episodeData.duration_ms/60 + ' min ' + episodeData.duration_ms%60 + ' sec' }</small>
                    <div className='flex gap-x-4 text-[1ED760] justify-start items-center relative'><BsPlayCircle className=' hover:scale-130'/><LuPlusCircle className={'hover:scale-130 '} /><BiSolidCheckCircle aria-hidden className={`hidden`}/><SlOptions className={'text-[A7A7A7] hover:before:absolute hover:before:bottom-[110%] hover:before:right-[50%] hover:before:p-2 hover:before:bg-zinc-900 hover:before:shadow-md ' + hover}/></div>
                </h2>
                <p>
                    <h3>Episode Description</h3>
                    <div className='text-[B3B3B3] '>
                        {episodeData.description}
                    </div>
                    <button type='submit' aria-disabled onClick = {()=>{}} className='rounded-2xl h-6 p-2 text-base font-bold capitalize border-2 border-[smokewhite] hover:scale-130'>
                        see all episodes
                    </button>
                </p>
            </section>
        </section>
    )
}