import { useState, useRef } from "react";
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { IoPlaySkipForwardOutline, IoPlaySkipBackOutline } from 'react-icons/io5'
import { RxShuffle } from 'react-icons/rx'
import { BiRepeat } from 'react-icons/bi'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

interface PlayerProps {
    src: string;
}

const Player: React.FC<PlayerProps> = ({src}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [audio, setAudio] = useState({})

    const audioRef = useRef<HTMLAudioElement>(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleRewind = () => {
        console.log('hello');
        if (audioRef.current) audioRef.current.currentTime -= 10;
    };

    const handleForward = () => {
        if (audioRef.current) audioRef.current.currentTime += 10;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    return (
        <div className='max-w-[25vw]'>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <section className='flex flex-col items-center '>
                <div className='flex flex-nowrap p-4'>
                    <RxShuffle />
                    <button onClick={handleRewind}>
                        <IoPlaySkipBackOutline />
                    </button>
                    <button onClick={togglePlay}>
                        {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
                    </button>
                    <button onClick={handleForward}>
                        <IoPlaySkipForwardOutline />
                    </button>
                    <BiRepeat />
                </div>
                <div className='flex items-center pb-2 gap-x-2'><span id="current-time" className="time">{currentTime}</span>
                    <Slider />
                    <span id="duration" className="time">0:00</span></div>
            </section>
        </div>

    );
};

export default Player;


