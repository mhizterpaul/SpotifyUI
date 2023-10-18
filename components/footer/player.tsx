import { useState, useRef, useContext } from "react";
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { IoPlaySkipForwardOutline, IoPlaySkipBackOutline } from 'react-icons/io5'
import { RxShuffle } from 'react-icons/rx'
import { BiRepeat } from 'react-icons/bi'

import Audios from '../../static/audio/index'
import {random} from '../../utils/'
import { Context } from "../main/withProvider";

interface PlayerProps {
    src: string;
}

const Player: React.FC<PlayerProps> = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const {nowPlaying} = useContext(Context)
    const [audio, setAudio] = useState(nowPlaying.name? random(Audios.items): null)
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
        if (audioRef.current) audioRef.current.currentTime -= 10;
    };

    const handleNext = () => {
        if (audioRef.current) audioRef.current.currentTime += 10;
    };
    const seek = () => {
        if(sliderRef.current && audioRef.current) audioRef.current.currentTime = Number(sliderRef.current.value);
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    return (
        <div className='max-w-[25vw]'>
            <audio
                ref={audioRef}
                src={audio.src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <section className='flex flex-col items-center '>
                <div className='flex flex-nowrap p-4'>
                    <RxShuffle />
                    <button onClick={handlePrevious}>
                        <IoPlaySkipBackOutline />
                    </button>
                    <button onClick={togglePlay}>
                        {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
                    </button>
                    <button onClick={handleNext}>
                        <IoPlaySkipForwardOutline />
                    </button>
                    <BiRepeat />
                </div>
                <div className='flex items-center pb-2 gap-x-2'><span id="current-time" className="time">{currentTime}</span>
                    <input type='range' ref={sliderRef} min={0} max={audio.duration} onChange={(seek)}/>
                    <span id="duration" className="time">{audio.duration}</span></div>
            </section>
        </div>

    );
};

export default Player;


