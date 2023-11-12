import { useState, useRef, useContext } from "react";
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { IoPlaySkipForwardOutline, IoPlaySkipBackOutline } from 'react-icons/io5'
import { RxShuffle } from 'react-icons/rx'
import { BiRepeat } from 'react-icons/bi'
import Volume from './volume'
import { Context, V } from "@/app/rootProvider";
import { shuffle } from "@/utils";


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
        setIsPlaying(!isPlaying);
    };

    const handlePrevious = () => {
        if (!shuffledQueue || !nowPlaying) return;
        if (shuffledQueue[shuffledQueue.indexOf(nowPlaying)] === 0 && repeat) {
            if (shuffledQueue.shuffle) setShuffledQueue(state => ({ ...state, queue: shuffle(state.queue) }));
            setProp('nowPlaying', shuffledQueue[shuffledQueue?.[length - 1]]);
        }
        if (shuffledQueue[shuffledQueue?.indexOf(nowPlaying)] === 0 && !repeat) setProp('nowPlaying', null);
        setProp('nowPlaying', shuffledQueue[shuffledQueue.indexOf(nowPlaying) - 1]);
    };

    const handleNext = () => {
        if (!shuffledQueue || !nowPlaying) return;
        if (shuffledQueue[shuffledQueue.indexOf(nowPlaying)] === shuffledQueue?.[length - 1] && repeat) {
            if (shuffledQueue.shuffle) setShuffledQueue(state => ({ ...state, queue: shuffle(state.queue) }))
            setProp('nowPlaying', shuffledQueue[shuffledQueue?.[0]]);
        }
        if (shuffledQueue[shuffledQueue.indexOf(nowPlaying)] === shuffledQueue?.[length - 1] && !repeat) setProp('nowPlaying', null);
        setProp('nowPlaying', shuffledQueue[shuffledQueue.indexOf(nowPlaying) + 1]);

    };
    const seek = () => {
        if (sliderRef.current && audioRef.current) audioRef.current.currentTime = Number(sliderRef.current.value);
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    return (
        <>
            <div className={`w-[50vw] min-w-[150px] max-w-[350px]`}>
                <audio
                    ref={audioRef}
                    src={nowPlaying?.preview_url || nowPlaying?.track?.preview_url || nowPlaying?.audio_preview_url}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                />
                <section className='player flex flex-col items-center '>
                    <div className='flex w-4/6 pb-1 flex-nowrap pt-2 justify-between items-center'>
                        <RxShuffle onClick={() => setShuffledQueue(state => ({ shuffle: !shuffle, queue: !state.shuffle ? shuffle(state.queue) : currentPlaylist?.tracks || currentPlaylist?.items || currentPlaylist?.episodes }))} />

                        <IoPlaySkipBackOutline onClick={handlePrevious} />
                        {isPlaying ? <BsPauseCircle className={'play'} onClick={() => { setIsPlaying(false); togglePlay() }} /> : <BsPlayCircle className={'play'} onClick={() => { setIsPlaying(true); togglePlay() }} />}

                        <IoPlaySkipForwardOutline onClick={handleNext} />
                        <BiRepeat onClick={() => setRepeat(state => !state)} />
                    </div>
                    <div className='w-full flex justify-center gap-x-2 items-center'><span id="current-time" className="pr-2 text-xs">{currentTime / 60 || '-' + ' : ' + (currentTime % 60 || '- -')}</span>
                        <input type='range' className={'w-5/6 slider'} ref={sliderRef} min={0} max={nowPlaying?.duration_ms} onChange={(seek)} />
                        <span id="duration" className="pl-2 text-xs">{(nowPlaying ? nowPlaying.duration_ms / 60 : '-') + ' : ' + (nowPlaying ? nowPlaying.duration_ms % 60 : '- -')}</span></div>
                </section>
            </div>
            <Volume audio={audioRef} />
        </>
    );
};

export default Player


