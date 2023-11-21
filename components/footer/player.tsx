import { useState, useRef, useContext, useEffect, useMemo } from "react";
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { RxShuffle } from 'react-icons/rx'
import { BiRepeat } from 'react-icons/bi'
import Volume from './volume'
import { Context, V } from "@/app/rootProvider";
import { shuffle } from "@/utils";
import { ActiveDot } from './volume'
import style from './footer.module.css'
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";


const Player: React.FC<{}> = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const { nowPlaying, currentPlaylist, setProp } = useContext(Context)
    const [repeat, setRepeat] = useState(false)
    const [shuffledQueue, setShuffledQueue] = useState({ shuffle: false, queue: currentPlaylist?.tracks || currentPlaylist?.items || currentPlaylist?.episodes })
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const sliderRef = useRef<HTMLInputElement>(null);
    const togglePlay = () => {

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(state => !state);
    };
    useMemo(() => currentPlaylist && setShuffledQueue(state => ({ ...state, queue: currentPlaylist.tracks || currentPlaylist.items || currentPlaylist.episodes?.toReversed() })), [currentPlaylist])

    useEffect(() => { nowPlaying && togglePlay() }, [nowPlaying])
    useEffect(() => { sliderRef.current && progressBarIndicator(sliderRef.current, 'mouseLeave') }, [])
    const handlePrevious = () => {
        if (!shuffledQueue.queue || !nowPlaying) return;
        const indexArr = shuffledQueue.queue?.map((item) => item.name);
        if ((indexArr.indexOf(nowPlaying.name) === 0) && repeat) {
            if (shuffledQueue.shuffle) setShuffledQueue(state => ({ ...state, queue: shuffle(state.queue) }));
            setProp('nowPlaying', shuffledQueue.queue[shuffledQueue.queue.length - 1]);
            return
        }
        if ((indexArr.indexOf(nowPlaying.name) === 0) && !repeat) return setProp('nowPlaying', null);
        setProp('nowPlaying', shuffledQueue.queue[indexArr.indexOf(nowPlaying.name) - 1]);
    };

    const handleNext = () => {
        if (!shuffledQueue.queue || !nowPlaying) return;
        const indexArr = shuffledQueue.queue?.map((item) => item.name);
        if ((indexArr.indexOf(nowPlaying.name) === shuffledQueue.queue.length - 1) && repeat) {
            if (shuffledQueue.shuffle) setShuffledQueue(state => ({ ...state, queue: shuffle(state.queue) }))
            setProp('nowPlaying', shuffledQueue.queue[0]);
            return
        }
        if ((indexArr.indexOf(nowPlaying) === shuffledQueue.queue.length - 1) && !repeat) return setProp('nowPlaying', null);
        setProp('nowPlaying', shuffledQueue.queue[indexArr.indexOf(nowPlaying.name) + 1]);

    };
    const seek = () => {
        if (sliderRef.current && audioRef.current) audioRef.current.currentTime = Number(sliderRef.current.value) * (audioRef.current.duration / 100);
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const progressBarIndicator = (target: HTMLInputElement | null, eventName?: 'mouseLeave' | 'mouseEnter') => {
        if (!target) return;
        if (eventName === 'mouseLeave') {
            target.style.background = `linear-gradient(to right, #ffff ${target.value}%, #4D4D4D ${target.value}%)`;
            return
        }

        if (eventName === 'mouseEnter') {
            target.style.background = `linear-gradient(to right, #1DB954 ${target.value}%, #4D4D4D ${target.value}%)`;
            return
        }

        target.style.background = `linear-gradient(to right, #1DB954 ${target.value}%, #4D4D4D ${target.value}%)`;
    }


    return (
        <>
            <div className={`w-[50vw] min-w-[150px] max-w-[350px]`}>
                <audio
                    ref={audioRef}
                    src={nowPlaying?.preview_url || nowPlaying?.track?.preview_url || nowPlaying?.audio_preview_url}
                    onTimeUpdate={() => { handleTimeUpdate(); progressBarIndicator(sliderRef.current) }}
                    onEnded={() => { handleNext(); togglePlay() }}
                />
                <section className='player flex flex-col items-center '>
                    <div className='flex w-4/6 flex-nowrap mb-2 text-[#B3B3B3] justify-between [&_svg:hover]:scale-105 [&_svg:hover]:text-white items-center'>
                        <ActiveDot>
                            <RxShuffle className={' hover:scale-105 '} onClick={() => setShuffledQueue(state => ({ shuffle: !state.shuffle, queue: !state.shuffle ? shuffle(state.queue) : currentPlaylist?.tracks || currentPlaylist?.items || currentPlaylist?.episodes?.toReversed() }))} />
                        </ActiveDot>
                        <MdSkipPrevious className={' hover:text-white' + style.twinkle} onClick={handlePrevious} />
                        {isPlaying ? <BsPauseCircle className={'play text-white ' + style.button} onClick={togglePlay} /> : <BsPlayCircle className={'play text-white ' + style.button} onClick={togglePlay} />}

                        <MdSkipNext className={style.twinkle} onClick={handleNext} />
                        <ActiveDot>
                            <BiRepeat className={' hover:scale-105 '} onClick={() => setRepeat(state => !state)} />
                        </ActiveDot>
                    </div>

                    <div className='w-full flex justify-center gap-x-2 items-center'><span id="current-time" className="pr-2 text-xs">{(nowPlaying ? Math.trunc(currentTime / 60) : '-') + ' : ' + (nowPlaying ? Math.round(currentTime % 60) : '- -')}</span>
                        <input type='range'
                            className={'w-5/6 slider'} ref={sliderRef}
                            value={nowPlaying && audioRef.current?.duration ? currentTime * (100 / audioRef.current.duration) : 0}
                            step={nowPlaying && audioRef.current ? 100 / audioRef.current.duration : 1}
                            onInput={() => { progressBarIndicator(sliderRef.current); seek() }} onMouseEnter={() => progressBarIndicator(sliderRef.current, 'mouseEnter')} onMouseLeave={() => progressBarIndicator(sliderRef.current, 'mouseLeave')} min={0} max={nowPlaying && audioRef.current ? audioRef.current.duration * (100 / audioRef.current.duration) : 100} />
                        <span id="duration" className="pl-2 text-xs">{(nowPlaying && audioRef.current?.duration ? Math.trunc(audioRef.current.duration / 60) : '-') + ' : ' + (nowPlaying && audioRef.current?.duration ? Math.round(audioRef.current.duration % 60) : '- -')}</span></div>
                </section>
            </div>
            <Volume audio={audioRef} progressBarIndicator={progressBarIndicator} />
        </>
    );
};

export default Player


