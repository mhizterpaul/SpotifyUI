'use client';
import Sidebar from './sidebar';
import Profile from './profile';
import Search from './search';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setOpen } from '@/store/reducers/main_slice';


type Props = {
    search: boolean, 
    isMobile: boolean, 
    route: (arg : 'previous'|'next') => any,
    next: boolean,
    prev: boolean
}

export const btn = `bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xMy4zIDE3LjNsLTQuNi00LjZxLS4xNS0uMTUtLjIxMi0uMzI1VDguNDI1IDEycTAtLjIuMDYzLS4zNzVUOC43IDExLjNsNC42LTQuNnEuMjc1LS4yNzUuNy0uMjc1dC43LjI3NXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43TDEwLjggMTJsMy45IDMuOXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43cS0uMjc1LjI3NS0uNy4yNzV0LS43LS4yNzVaIi8+PC9zdmc+")]
bg-no-repeat bg-center bg-[length:70%] align-middle bg-[#181818] rounded-full focus:ring h-8 w-8`

const Nav = ({search, isMobile, route, next, prev} : Props) => {

     const [isOpen, setIsOpen] = useState(false);
     const dispatch = useAppDispatch();
    return (
        <>
            <nav className={`flex relative sm:col-start-2 ${isOpen? 'col-start-2' : 'col-start-1'} col-end-4 w-full row-start-1 row-end-2 pl-4 sm:pl-0 flex-row nav items-center justify-between py-2`}>
                <div className='whitespace-nowrap'>
                    <button className={`${btn} mr-4 sm:ml-8`} onClick={() => route('previous')} disabled={prev}>
                    </button>
                    <button className={`${btn} rotate-180`} onClick={() => route('next')} disabled={next}>
                    </button>
                </div>
                {search && <Search className={`${isOpen && isMobile ? 'hidden ': ' '}`}/>}
                <Profile  className={`${isOpen && isMobile ? 'hidden ': ' '}`}/>
                
                {!isOpen && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" className='sm:hidden absolute right-0 text-gray-600' onClick={() => {setIsOpen(true); dispatch(setOpen(true))}} viewBox="0 0 72 72"><path fill="none" stroke="#ccc" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M16 26h40M16 36h40M16 46h40" /></svg>}
                {
                    //this component is positioned properly make it have more height and width and and use negative margin below only to make it fit
                    //with the other box
                   isOpen && <div className='sm:hidden w-[3.75rem] h-[60px] overflow-hidden flex flex-col items-center justify-center text-gray-600 absolute right-0' onClick={() => {setIsOpen(false); dispatch(setOpen(false))}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'rotate-45 translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'-rotate-45 -translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                    </div>}
            </nav>
            {!isMobile ? <Sidebar /> : 
            <Sidebar isOpen = {isOpen} />
                }
        </>
    );
}

export default Nav