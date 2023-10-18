import {AiOutlinePlaySquare} from 'react-icons/ai'
import {PiMicrophoneStageBold} from 'react-icons/pi'
import {TbDevices2} from 'react-icons/tb'
import {HiOutlineQueueList} from 'react-icons/hi2'
import {BsPip} from 'react-icons/bs'
import {HiOutlineSpeakerWave, HiOutlineSpeakerXMark} from 'react-icons/hi2'
import {useRef} from 'react'


const Volume = () => {
    const volumeRef = useRef<HTMLInputElement>(null)
    return (
        <div className='flex flex-row text-[2vw] max-w-[25vw]'>
            <AiOutlinePlaySquare />
            <PiMicrophoneStageBold />
            <HiOutlineQueueList />
            <TbDevices2 />

            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className='hidden' viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="m18 14l2-2m2-2l-2 2m0 0l-2-2m2 2l2 2" /><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" /></g></svg>
            {volumeRef.current && (Number(volumeRef.current.value) <= 50 ?  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 7.5S21 9 21 11.5s-1.5 4-1.5 4"/><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z"/></g></svg> : 
            Number(volumeRef.current.value) === 0 ? <HiOutlineSpeakerXMark/> : <HiOutlineSpeakerWave />)}

            <input type='range' ref={volumeRef} min={0} max={100} />
            <BsPip />
        </div>
    )
}

export default Volume