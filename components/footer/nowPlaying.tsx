import { BsPlayCircle } from 'react-icons/bs'
import { LiaTimesSolid } from 'react-icons/lia'
import { LuMusic3 } from 'react-icons/lu'

const NowPlaying = () => {
    return (
        <section>
            <h3>
                <span>
                    {album}
                </span>
                <LiaTimesSolid />
            </h3>
            <section>
                <Image />
                <div>
                    <span>
                        {track}
                        {artist}
                    </span>
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={(() => (setFavorite(prev => !prev)))} viewBox="0 0 24 24"><path fill={favorite ? "#1db954" : 'none'} d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                        <SlOptions />
                    </span>
                </div>
            </section>
            <section>
                <Image className='relative' />
                <span className='absolute top-0 left-0'>
                    About the Artist
                </span>
                <p>
                    <h4>
                        <span className='block'>{artist}</span>
                        <span className='flex'>
                            {followers}
                            monthly listeners
                            <button>
                                Follow
                            </button>
                        </span>
                    </h4>
                    <p>
                        {artistBio}
                    </p>
                </p>
            </section>
            <section>
                <h3 className='flex'>
                    Next in queue
                    <span className='self-end'>
                        open queue
                    </span>
                </h3>
                <div className='group'>
                    <LuMusic3 className='group-hover:hidden' />
                    <BsPlayCircle />
                    <Image />
                    <span>
                        {artist}
                        <span>
                            {track}
                            </span>
                    </span>
                </div>
            </section>

        </section>
    )
}
export default NowPlaying