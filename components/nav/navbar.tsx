'use client';
import { useEffect, useState } from 'react';
import Sidebar from './sidebar';
import Profile from './profile';
import Search from './search';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import withProvider from '@/store/with_provider';

//refactor code to use useRouter from next instead
//of react router dom
const initState: {
    isOpen?: boolean,
    isMobile: boolean
} = {
    isOpen: undefined,
    isMobile: true
};




const Nav = () => {
    //setState if user is on mobile or not

    const pathname = usePathname();
    const [state, setState] = useState(initState);
    const dispatch = useDispatch();
    const selector = useSelector((state: any) => state.history);
    useEffect(() => {
        const setIsMobile = () => window.innerWidth < 555 ? state.isMobile ? null :
            setState((prev) => ({ ...prev, isMobile: true })) :
            !state.isMobile ? null :
                setState((prev) => ({ ...prev, isMobile: false }));
        setIsMobile();
        window.addEventListener('resize', setIsMobile);
        return () => removeEventListener('resize', setIsMobile);
    }, [state.isMobile])

    const toggleisOpen = () => {
        setState((prev) => ({
            ...prev, isOpen:
                prev.isOpen === undefined ? true : !prev.isOpen
        }));
    }

    const router = useRouter();
    const goBack = () => {
        if (pathname === '/') return;
        /*use pathname and history to implement history navigation*/
        router.back();
    }
    const goForward = () => {
        if (history.length) return dispatch({ type: 'SET_MAIN', href: '/search' });
        router.forward();
    }

    //history.dosomthing

    const btn = `bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZmZmZmYiIGQ9Im0xMy4zIDE3LjNsLTQuNi00LjZxLS4xNS0uMTUtLjIxMi0uMzI1VDguNDI1IDEycTAtLjIuMDYzLS4zNzVUOC43IDExLjNsNC42LTQuNnEuMjc1LS4yNzUuNy0uMjc1dC43LjI3NXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43TDEwLjggMTJsMy45IDMuOXEuMjc1LjI3NS4yNzUuN3QtLjI3NS43cS0uMjc1LjI3NS0uNy4yNzV0LS43LS4yNzVaIi8+PC9zdmc+")]
     bg-no-repeat bg-center bg-[length:70%] align-middle bg-[#181818] rounded-full h-8 w-8`
    return (
        <>
            <nav className='flex w-full flex-row nav items-center justify-between  py-2'>
                <div className=''>
                    <button className={`${btn} mr-4 ml-8`} onClick={goBack}>
                    </button>
                    <button className={`${btn} rotate-180`} onClick={goForward}>
                    </button>
                </div>
                {(pathname === '/search') && <Search />}
                <Profile />
                {
                    state.isMobile && !state.isOpen && <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" className='' onClick={() => toggleisOpen()} viewBox="0 0 72 72"><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" d="M16 26h40M16 36h40M16 46h40" /></svg>
                }
                {
                    //this component is positioned properly make it have more height and width and and use negative margin below only to make it fit
                    //with the other box
                    state.isMobile && state.isOpen && <div className='w-[3.75rem] h-[60px] overflow-hidden flex flex-col items-center justify-center text-black' onClick={toggleisOpen}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'rotate-45 translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={'-rotate-45 -translate-y-1/2 transitional'} viewBox="0 0 24 24"><path fill="currentColor" d="M2 12.75a.75.75 0 0 1 .75-.75h18.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" /></svg>
                    </div>
                }
            </nav>
            {state.isMobile || <Sidebar />}
            {state.isMobile && <Sidebar isOpen={state.isOpen} />}
        </>
    );
}

export default withProvider(Nav)