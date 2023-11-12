import { AiOutlinePlaySquare } from 'react-icons/ai'
import { PiMicrophoneStageBold } from 'react-icons/pi'
import { TbDevices2 } from 'react-icons/tb'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { BsPip } from 'react-icons/bs'
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from 'react-icons/hi2'
import { useContext, useRef } from 'react'
import { pushRef, setNowPlayingView } from '@/store/reducers/main_slice'
import { useAppDispatch } from '@/store/hooks'
import NowPlaying from './nowPlaying'
import { Context } from '@/app/rootProvider'


const Volume = ({ audio }: { audio: React.RefObject<HTMLAudioElement> }) => {
    const volumeRef = useRef<HTMLInputElement>(null)
    const { nowPlaying, currentPlaylist } = useContext(Context)
    const dispatch = useAppDispatch();
    const isMobile = window.innerWidth < 530
    const styles = ' active:before:-content["."] active:before:absolute active:before:-bottom-2 hover:text-green-800 active:bg-800 '
    const handleVolumeChange = () => {
        if (audio.current && volumeRef.current) audio.current.volume = Number(volumeRef.current.value) / 10;
    }

    return (
        <>
            <div className={`${isMobile ? 'block w-14 p-2 peer' : 'hidden'}`}>
                &sdot; &sdot; &sdot;
            </div>
            <div className={`${isMobile ? 'flex-col hidden peer-hover:flex peer-active:flex absolute bottom-[150%] right-1/4 z-10' : ''}` + ' flex text-[3vw] gap-x-2 max-w-[30vw]'}>
                <AiOutlinePlaySquare onClick={() => dispatch(setNowPlayingView(true))} className={styles} />
                <PiMicrophoneStageBold onClick={() => dispatch(pushRef('/lyrics/' + nowPlaying?.id || nowPlaying?.track.id))} className={styles} />
                <HiOutlineQueueList onClick={() => dispatch(pushRef('/' + currentPlaylist?.type + '/' + currentPlaylist?.id))} className={styles} />
                <TbDevices2 />
                <button onClick={() => volumeRef.current.value = 0}>
                    {volumeRef.current && (Number(volumeRef.current.value) <= 50 ? <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 7.5S21 9 21 11.5s-1.5 4-1.5 4" /><path d="M2 13.857v-3.714a2 2 0 0 1 2-2h2.9a1 1 0 0 0 .55-.165l6-3.956a1 1 0 0 1 1.55.835v14.286a1 1 0 0 1-1.55.835l-6-3.956a1 1 0 0 0-.55-.165H4a2 2 0 0 1-2-2Z" /></g></svg> :
                        Number(volumeRef.current.value) === 0 ? <HiOutlineSpeakerXMark /> : <HiOutlineSpeakerWave />)}
                </button>
                <input type='range' onChange={handleVolumeChange} className={'w-2/6 '} ref={volumeRef} min={0} max={100} />
                <BsPip />
            </div>
        </>
    )
}

export default Volume