'use client'
import avatar from '@/public/avatar.jpg'
import { useEffect, useState } from 'react';
import Search from './search';
import Sidebar from './sidebar';



const Nav = () => {
    //setState if user is on mobile or not
    const [state, setState] = useState({
        isOpen: false,
        isMobile: false
    });
    let isOpen = false;

    useEffect(() =>
        window.addEventListener('resize', () => {
            window.innerWidth < 555 ? setState((prev) => ({ ...prev, isMobile: true })) :
                setState((prev) => ({ ...prev, isMobile: false }));
        }));

    const toggleisOpen = (delay?: number) => {
        isOpen = !isOpen;
        delay ? setTimeout(() => setState((prev) => ({ ...prev, isOpen: !prev.isOpen })), delay) :

            setState((prev) => ({ ...prev, isOpen: !prev.isOpen }));
    }

    const btn = `bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xMy4zIDE3LjNsLTQuNi00LjZxLS4xNS0uMTUtLjIxMi0uMzI1VDguNDI1IDEycTAtLjIuMDYzLS4zNzVUOC43IDExLjNsNC42LTQuNnEuMjc1LS4yNzUuNy0uMjc1dC43LjI3NXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43TDEwLjggMTJsMy45IDMuOXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43cS0uMjc1LjI3NS0uNy4yNzV0LS43LS4yNzVaIi8+PC9zdmc+")]
     bg-no-repeat bg-center bg-[length:70%] align-middle bg-[#181818] rounded-full h-8 w-8`
    return (
        <>
            <nav className='flex w-full flex-row nav items-center justify-between  py-2'>
                <div className=''>
                    <button className={`${btn} mr-4 ml-8`}>
                    </button>
                    <button className={`${btn} rotate-180`}>
                    </button>
                </div>
                <Search />
                <Profile width={'w-36'} height={'h-10'} />
                {
                    state.isMobile && !state.isOpen && <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" onClick={() => toggleisOpen()} viewBox="0 0 72 72"><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2" d="M16 26h40M16 36h40M16 46h40" /></svg>
                }
                {
                    state.isMobile && state.isOpen && <div onClick={() => toggleisOpen(400)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={(isOpen ? 'rotate-45' : '-rotate-45') + 'animate'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={(isOpen ? '-rotate-45' : 'rotate-45') + 'animate'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                    </div>
                }
            </nav >
            {state.isMobile ?? <Sidebar />}
            {state.isMobile && <Sidebar isOpen={state.isOpen} />}
        </>
    );
}

const Profile = (props: { width: string, height: string }) => {

    const [state, setState] = useState({ isOpen: 'rotate-180', display: 'hidden' }),
        handleClick = () => setState(curr => ({
            isOpen: curr.isOpen === 'rotate-180' ? '' : 'rotate-180',
            display: curr.display === 'hidden' ? 'visible' : 'hidden'
        }));
    return (
        <>
            <button className={props.width + ' ' + props.height + ' ' + ' relative flex flex-row items-center justify-between bg-black rounded-2xl mr-6'}
                onClick={handleClick}>
                <img src={avatar} alt="profile picture" className='avatar w-16 ml-[-0.9rem]' />
                <span className={`-translate-x-5`}>Angel</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={state.isOpen} width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M9.425 14q-.675 0-.938-.613T8.7 12.3l2.6-2.6q.15-.15.325-.225T12 9.4q.2 0 .375.075t.325.225l2.6 2.6q.475.475.212 1.088t-.937.612h-5.15Z" />
                </svg>
                <ul className={'absolute top-10' + ' ' + props.width + ' ' + state.display} onClick={handleClick}>
                    <li >Account <svg xmlns="http://www.w3.org/2000/svg" className='-rotate-180 inline' width="18" height="18" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M.5 6V1.5a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8m-4 0H.5V10m0 3.5L7 7" /></svg> </li>
                    <li >Profile</li>
                    <li >Log out</li>
                </ul>
            </button>
        </>
    )
}


export default Nav 