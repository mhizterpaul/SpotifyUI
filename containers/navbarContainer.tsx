'use client'
import Nav from "@/components/nav/navbar";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, goForward, pushRef, setHref } from "@/store/reducers/main_slice";
import { useNavigate, useLocation } from 'react-router-dom'


type Props = {
  href: string,
  curr: number | null,
  end: boolean | undefined,
  dispatch: Dispatch,
}


function NavbarContainer({ href, end, curr, dispatch }: Props) {

  const routes = ['playlist', 'lyrics', 'library', 'search', 'episode', 'see-all']
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 666),
    [nav, setNav] = useState({ prev: true, next: false }),
    currUrl = window.location.href.split(process.env.NEXT_PUBLIC_BASE_URL + '/')[1],
    location = useLocation(),
    pathname = location.pathname,
    navigate = useNavigate(),

    route = (option?: 'previous' | 'next') => {

      if ((curr != null) && curr > 0) {
        setNav((state) => ({ ...state, prev: false }));
        if (!end) setNav((state) => ({ ...state, next: false }));
      }

      if ((curr == null) && (href !== '/') && !nav.next) setNav({ next: true, prev: false })

      if (((end === true) || (curr == null)) && (option === 'next')) {

        dispatch(pushRef('next'));
        setNav({ prev: false, next: true })
      }

      if (((curr === 0) || (curr == null)) && (option === 'previous')) {
        dispatch(pushRef('previous'));
        setNav({ next: false, prev: true })
      }


      if ((curr != null) && (curr >= 0) && (option != undefined)) {
        option === 'previous' ? dispatch(goBack()) :
          dispatch(goForward());

      }
    };

  useMemo(() => {

    if (currUrl.startsWith('?')) {
      if (!routes.some((el) => currUrl.split('?')[1].includes(el))) return window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}/404`;
      dispatch(setHref(`/${currUrl.slice(1)}`));
    }
  }, [])


  useEffect((): any => {

    route();

    if (href !== pathname) {
      navigate(href);
    }

  }, [href])

  useEffect(() => {

    const setMobile = () => {
      let isMob;
      setIsMobile((prev) => {
        isMob = prev;
        return isMob;
      })
      if ((window.innerWidth <= 775) && !isMob) {

        setIsMobile(true);
      }
      if (isMob && !(window.innerWidth <= 775)) {
        setIsMobile(false);
      }
    };

    if (typeof window !== 'undefined') {

      window.addEventListener('resize', setMobile);

    }

    if (typeof window !== 'undefined') return () => window.removeEventListener('resize', setMobile);
  }, []);

  return (
    <Nav next={nav.next} prev={nav.prev} route={route} isMobile={isMobile} search={pathname === '/search'} />
  )
}



const mapStateToProps = (state: RootState) => ({
  href: state.main.href,
  curr: state.main.curr,
  end: state.main.end,
});

export default connect(mapStateToProps)(NavbarContainer)

