import { AiOutlinePlaySquare } from 'react-icons/ai'
import { PiMicrophoneStageBold } from 'react-icons/pi'
import { TbDevices2 } from 'react-icons/tb'
import { HiOutlineQueueList } from 'react-icons/hi2'
import { BsPip } from 'react-icons/bs'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { pushRef, setNowPlayingView } from '@/store/reducers/main_slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { Context } from '@/containers/rootProvider'
import { SlVolume1, SlVolume2, SlVolumeOff } from 'react-icons/sl'
import { useLocation } from 'react-router-dom'
export const ActiveDot = ({ children, render }: { children: React.ReactNode, render?: boolean }) => {
    const [active, setActive] = useState(false)
    const { currentPlaylist } = useContext(Context)
    useMemo(() => !currentPlaylist && setActive(false), [currentPlaylist])
    return (
        <div onClick={() => setActive(state => !state)} className={active || render ? 'relative w-fit before:content-["•"] before:z-10 before:font-bold before:text-lg before:absolute before:left-[calc(1rem/2)] before:-bottom-4 text-[#1DB954] ' : ''}>
            {children}
        </div>
    )
}

const Volume = ({ audio, progressBarIndicator }: { audio: React.RefObject<HTMLAudioElement>; progressBarIndicator: (target: HTMLInputElement | null, eventName?: 'mouseLeave' | 'mouseEnter') => void }) => {
    const volumeRef = useRef<HTMLInputElement>(null)
    const nowPlayingView = useAppSelector(state => state.main.nowPlayingView);
    const { nowPlaying, currentPlaylist } = useContext(Context)
    const dispatch = useAppDispatch();
    const pathname = useLocation().pathname
    const [floatedOptions, setFloatedOptions] = useState(false);
    const [hover, setHover] = useState(false);
    const [volumeChange, setVolumeChange] = useState<'high' | 'low' | 'mute'>('high');
    const handleVolumeChange = () => {
        if (audio.current && volumeRef.current) audio.current.volume = Number(volumeRef.current.value) / 100;
    }
    const styles = ' hover:scale-105 ';

    useEffect(() => { volumeRef.current && progressBarIndicator(volumeRef.current, 'mouseLeave') }, [])

    return (
        <>
            <button onClick={() => setFloatedOptions(state => !state)} onBlur={() => !hover && setFloatedOptions(false)} className={'block w-14 p-2 peer sm:hidden'}>
                &sdot; &sdot; &sdot;
            </button>
            <div onMouseEnter={() => { window.innerWidth < 530 && setFloatedOptions(true); window.innerWidth < 530 && setHover(true) }} onMouseLeave={() => { window.innerWidth < 530 && setFloatedOptions(false); window.innerWidth < 530 && setHover(false) }} className={` flex-col ${window.innerWidth < 520 && floatedOptions ? ' flex ' : ' hidden '} peer-hover:flex absolute 
             bg-inherit rounded-sm bottom-[105%] right-2 z-10 gap-y-2 sm:flex-row sm:static sm:flex [&_svg]:min-w-fit items-center sm:text-[3vw] sm:gap-x-1 md:gap-x-2 max-w-[30vw] `}>
                <ActiveDot render={nowPlayingView}>
                    <AiOutlinePlaySquare onClick={() => dispatch(setNowPlayingView(!nowPlayingView))} className={styles} />
                </ActiveDot>
                <ActiveDot render={pathname.startsWith('/lyrics/')}>
                    <PiMicrophoneStageBold onClick={() => nowPlaying && dispatch(pushRef(`/lyrics/${nowPlaying.id || nowPlaying.track?.id}`))} className={styles} />
                </ActiveDot>
                <ActiveDot>
                    <HiOutlineQueueList onClick={() => currentPlaylist && dispatch(pushRef('/' + currentPlaylist.type + '/' + currentPlaylist.id))} className={styles} />
                </ActiveDot>
                <TbDevices2 className={'hover:scale-105 '} />
                <button className={'w-[1.4rem] h-[1.4rem] [&>svg]:w-full [&>svg]:h-full hover:scale-105 min-w-fit '} onClick={() => volumeRef.current && volumeRef.current?.value === '0' ? volumeRef.current.value = '45' : volumeRef.current && (volumeRef.current.value = '0')} >
                    {Number(volumeRef.current?.value) === 0 ? <SlVolumeOff onClick={() => volumeRef.current && (volumeRef.current.value = '0')} className={''} /> : Number(volumeRef.current?.value) < 50 ? <SlVolume1 className={''} /> :
                        <SlVolume2 className={''} />}
                </button>
                <input type='range' defaultValue={50} onInput={() => {
                    progressBarIndicator(volumeRef.current);
                    handleVolumeChange();
                    volumeRef.current?.value === '0' && volumeChange !== 'mute' && setVolumeChange('mute');
                    Number(volumeRef.current?.value) >= 50 && volumeChange !== 'high' && setVolumeChange('high');
                    Number(volumeRef.current?.value) < 50 && volumeChange !== 'low' && setVolumeChange('low');
                }} onMouseEnter={() => progressBarIndicator(volumeRef.current, 'mouseEnter')} onMouseLeave={() => progressBarIndicator(volumeRef.current, 'mouseLeave')} className={'w-2/6 min-w-[2rem] '} ref={volumeRef} min={0} max={100} />
                <BsPip className={'hover:scale-105 '} />
            </div>
        </>
    )
}

export default Volume