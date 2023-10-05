import { useState, useRef } from "react";
import { FaBackward, FaForward } from "react-icons/fa";
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs'
import { IoPlaySkipForwardOutline } from 'react-icons/io5'
import { RxShuffle } from 'react-icons/rx'
import { BiRepeat } from 'react-icons/bi'

interface PlayerProps {
    src: string;
}

const Player: React.FC<PlayerProps> = ({ src }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

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
        if (audioRef.current) audioRef.current.currentTime -= 10;
    };

    const handleForward = () => {
        if (audioRef.current) audioRef.current.currentTime += 10;
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    return (
        <div>
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onEnded={() => setIsPlaying(false)}
            />
            <div>
                <RxShuffle />
                <button onClick={handleRewind}>
                    <FaBackward />
                </button>
                <button onClick={togglePlay}>
                    {isPlaying ? <BsPauseCircle /> : <BsPlayCircle />}
                </button>
                <button onClick={handleForward}>
                    <FaForward />
                </button>
                <BiRepeat />
            </div>
            <div><span id="current-time" className="time">{currentTime}</span>
                <input type="range" id="seek-slider" max="100" value="0"/>
                    <span id="duration" className="time">0:00</span></div>
        </div>
    );
};

export default Player;


/*
const Player = () => {
    return (
        <div>
            <div className='flex flex-row align-center justify-between'>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M24 0v24H0V0h24ZM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019 0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018Zm.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01l-.184-.092Z" /><path fill="currentColor" d="M6.301 5.5a4.5 4.5 0 0 1 3.732 1.985l.127.2l4.252 7.087a1.5 1.5 0 0 0 1.13.72l.157.008h.741l.02-.312l.011-.14c.056-.719.749-1.17 1.331-.865l.314.168l.368.209a20.468 20.468 0 0 1 1.564 1.005l.385.28l.323.245l.137.107c.489.39.47 1.195-.05 1.606l-.136.107l-.32.242l-.38.275l-.438.301a21.82 21.82 0 0 1-.714.457l-.426.255l-.375.211l-.316.17c-.577.3-1.207-.085-1.261-.756l-.04-.565H15.7a4.5 4.5 0 0 1-3.732-1.985l-.127-.2l-4.252-7.087a1.5 1.5 0 0 0-1.13-.72L6.301 8.5H4a1.5 1.5 0 0 1-.144-2.993L4 5.5h2.301Zm1.007 9.612L7.42 15a1.5 1.5 0 1 1 2.237 2a4.5 4.5 0 0 1-3.113 1.494l-.242.006H4a1.5 1.5 0 0 1-.144-2.993L4 15.5h2.301a1.5 1.5 0 0 0 1.007-.388Zm10.494-10.93l.314.17l.368.208c.132.076.27.159.417.248l.459.29c.25.163.48.32.688.467l.385.28l.323.245l.137.107c.489.39.47 1.195-.05 1.606l-.136.107l-.32.242l-.38.275l-.438.301a21.846 21.846 0 0 1-.714.457l-.426.255l-.375.211l-.316.17c-.577.3-1.207-.085-1.261-.756l-.04-.565H15.7a1.5 1.5 0 0 0-1.007.388L14.58 9a1.5 1.5 0 1 1-2.237-2a4.5 4.5 0 0 1 3.113-1.494l.242-.006h.741l.031-.452c.056-.719.749-1.17 1.331-.865Z" /></g></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 18V6h2v12h-2Zm13 0l-9-6l9-6v12Z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className='rotate-180' viewBox="0 0 24 24"><path fill="currentColor" d="M5.5 18V6h2v12h-2Zm13 0l-9-6l9-6v12Z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><path fill="currentColor" d="M12.893 5.238a4 4 0 0 1-2.694 6.757L10 12l-3.293-.001l1.148 1.149a.5.5 0 0 1 .058.638l-.058.069a.5.5 0 0 1-.638.058l-.069-.058l-2.002-2.002a.5.5 0 0 1-.057-.638l.057-.069l2.002-2.002a.5.5 0 0 1 .765.638l-.058.07l-1.148 1.147H10a3 3 0 0 0 2.995-2.823L13 8a2.99 2.99 0 0 0-.866-2.109a.5.5 0 0 1 .688-.725l.072.072ZM8.784 2.087l.07.057l2.001 2.002l.058.07a.5.5 0 0 1 0 .568l-.058.07l-2.001 2.001l-.07.058a.5.5 0 0 1-.568 0l-.07-.058l-.057-.07a.5.5 0 0 1 0-.568l.057-.07L9.294 5H6a3 3 0 0 0-2.995 2.824L3 8c0 .82.329 1.562.861 2.104a.5.5 0 0 1-.714.698A4 4 0 0 1 5.8 4.005L6 4l3.294-.001l-1.148-1.147l-.057-.07a.5.5 0 0 1 .695-.695Z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className = 'hidden' viewBox="0 0 24 24"><path fill="currentColor" d="M9 16h2V8H9v8Zm4 0h2V8h-2v8Zm-1 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z" /></svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className = 'hidden' viewBox="0 0 24 24"><path fill="currentColor" d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l3.704 3.705A8.814 8.814 0 0 0 3 6.5a1 1 0 0 0 0 2c2.475 0 4.185 1.18 5.886 2.799c.218-.22.44-.447.67-.683l.707.708C8.045 13.604 6.137 15.5 3 15.5a1 1 0 1 0 0 2c4.05 0 6.503-2.525 8.632-4.715l.045-.047l.707.707l-.097.1c-.186.192-.377.389-.574.588c1.182 1.13 2.516 2.195 4.173 2.814l1.684 1.684a1 1 0 0 0 1.299 1.299l1.85 1.85a.75.75 0 0 0 1.061-1.06L3.28 2.22Zm14.304 12.182l3.464 3.464l.66-.659a1 1 0 0 0 0-1.414l-2.5-2.5a1 1 0 0 0-1.624 1.11ZM12.41 9.228l1.42 1.42c1.377-1.188 2.829-2.028 4.744-2.136l-.781.78a1 1 0 0 0 1.414 1.415l2.5-2.5a1 1 0 0 0 0-1.414l-2.5-2.5a1 1 0 1 0-1.414 1.414l.801.802c-2.624.111-4.56 1.299-6.184 2.719Z" /></svg>
            </div>
            <input type="range" id="cowbell" name="cowbell"
                min="0" max="100" defaultValue='50' value="90" step="10">
            </input>
            <label htmlFor="cowbell">Cowbell</label>
        </div>
    )
}
*/