import {useState } from 'react'
import Image from 'next/image'

const Profile = () => {

    const [state, setState] = useState({ isOpen: 'rotate-180', display: 'hidden' }),
        handleClick = () => setState(curr => ({
            isOpen: curr.isOpen === 'rotate-180' ? '' : 'rotate-180',
            display: curr.display === 'hidden' ? 'visible' : 'hidden'
        }));
    return (
        <>
            <button className={'w-36 h-10 relative flex flex-row items-center justify-between bg-black rounded-2xl sm:mr-0 mr-16'}
                onClick={handleClick}>
                <Image src='/avatar.jpg' width ={65} height={65} alt="profile picture" style={
                    {
                        objectFit: "contain",
                        aspectRatio: '1.5',
                        clipPath: 'circle(35%)',
                        marginLeft: '-0.9rem'
                    }
                }/>
                <span className={`-translate-x-5`}>Angel</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={state.isOpen} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.425 14q-.675 0-.938-.613T8.7 12.3l2.6-2.6q.15-.15.325-.225T12 9.4q.2 0 .375.075t.325.225l2.6 2.6q.475.475.212 1.088t-.937.612h-5.15Z" />
                </svg>
                <ul className={'absolute bg-gray-900 top-10 w-36 rounded-b-xl z-10' + ' ' + state.display} onClick={handleClick}>
                    <li className='pt-1 pb-2'>Account <svg xmlns="http://www.w3.org/2000/svg" className='-rotate-180 inline' width="18" height="18" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M.5 6V1.5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8m-4 0H.5V10m0 3.5L7 7" /></svg> </li>
                    <li className='pb-2'>Profile</li>
                    <li className='pb-2'>Log out</li>
                </ul>
            </button>
        </>
    )
}

export default Profile