'use client';
import Sidebar from './sidebar';
import Profile from './profile';
import Search from './search';
import { useContext, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setOpen } from '@/store/reducers/main_slice';
import { useLocation } from 'react-router-dom';
import { Context } from '@/containers/rootProvider';
import { hexToHSL } from '@/utils';


type Props = {
    search: boolean,
    isMobile: boolean,
    route: (arg: 'previous' | 'next') => any,
    next: boolean,
    prev: boolean
}

export const btn = `bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xMy4zIDE3LjNsLTQuNi00LjZxLS4xNS0uMTUtLjIxMi0uMzI1VDguNDI1IDEycTAtLjIuMDYzLS4zNzVUOC43IDExLjNsNC42LTQuNnEuMjc1LS4yNzUuNy0uMjc1dC43LjI3NXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43TDEwLjggMTJsMy45IDMuOXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43cS0uMjc1LjI3NS0uNy4yNzV0LS43LS4yNzVaIi8+PC9zdmc+")]
bg-no-repeat bg-center bg-[length:70%] align-middle  bg-[#282828b4] hover:scale-105 hover:bg-[#282828] active:bg-[#282828] rounded-full focus:ring h-8 w-8`

const Nav = ({ search, isMobile, route, next, prev }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useAppDispatch();
    const nowPlayingView = useAppSelector((store) => store.main.nowPlayingView)
    const pathname = useLocation().pathname;
    const { BgColor } = useContext(Context)


    return (
        <>
            <nav className={` nav flex relative md:col-start-2 ${isOpen ? 'col-start-2' : 'col-start-1'} ${isOpen && isMobile ? ' w-[calc(100vw-15rem)] ' : nowPlayingView ? ' w-7/12 ' : ' w-[98vw] '} col-end-3 row-start-1 ${nowPlayingView ? ' md:w-7/12 ' : ' md:w-[98%] '} row-end-2 pl-4 gap-x-4 md:pl-0 flex-row items-center bg-transparent justify-between z-10 py-2 `} >
                <div className={`whitespace-nowrap ${window.innerWidth < 380 && isOpen ? ' hidden ' : ''}`}>
                    <button className={`${btn} mr-4 md:ml-8`} onClick={() => route('previous')} disabled={prev}>
                    </button>
                    <button className={`${btn} rotate-180`} onClick={() => route('next')} disabled={next}>
                    </button>
                </div>
                {search && window.innerWidth > 300 && <Search style={{}} className={`${isOpen && isMobile ? 'hidden ' : ' '}`} />}
                <Profile className={`${isOpen && isMobile ? 'hidden ' : ' '}`} />

                {!isOpen && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" className='md:hidden absolute right-0 text-gray-600' onClick={() => { setIsOpen(true); dispatch(setOpen(true)) }} viewBox="0 0 72 72"><path fill="none" stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M16 26h40M16 36h40M16 46h40" /></svg>}
                {
                    //this component is positioned properly make it have more height and width and and use negative margin below only to make it fit
                    //with the other box
                    isOpen && <div className='md:hidden w-[3.75rem] h-[60px] overflow-hidden flex flex-col items-center justify-center text-gray-600 absolute right-0' onClick={() => { setIsOpen(false); dispatch(setOpen(false)) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'rotate-45 translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'-rotate-45 -translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                    </div>}
            </nav>
            {!isMobile ? <Sidebar /> :
                <Sidebar isOpen={isOpen} />
            }
        </>
    );
}

export default Nav