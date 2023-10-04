'use client'
import Nav from "@/components/nav/navbar";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import withProvider from "@/store/with_provider";
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
  //useRouter
  //check store for any routes
  const routes = ['playlist', 'library', 'search']
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 555),
    [nav, setNav] = useState({ prev: true, next: false }),
    currUrl = window.location.href.split('3000/')[1],
    location = useLocation(),
    pathname = location.pathname,
    navigate = useNavigate(),
    route = (option?: 'previous' | 'next') => {
      //wrap every set state in a conditional 
      //invoke function in this component
      //buttons should be enabled if there are items
      //in the history arr
      //the corresponding button should be closed when the user reaches the end of the arr
      if( (curr != null) && curr > 0) {
        setNav((state) => ({...state, prev: false}));
        if(!end) setNav((state) => ({...state, next: false}));
      }

      if((curr == null) && (href !== '/') && !nav.next) setNav({next: true, prev: false})

      if (((end === true)|| (curr == null)) && (option === 'next')) {
        
        dispatch(pushRef('next'));
        setNav({ prev: false, next: true })
      }

      if (((curr === 0) || (curr == null)) && (option === 'previous')) {
        dispatch(pushRef('previous'));
        setNav({ next: false, prev: true })
      }


      if ((curr != null) && (curr >= 0) && (option != undefined)){
        option === 'previous' ? dispatch(goBack()) :
          dispatch(goForward());

      }
    };


  useEffect((): any => {

    route();


    if (currUrl.startsWith('?')) {
      if (!routes.includes(currUrl.split('?')[1])) return window.location.href = 'http://localhost:3000/404';
      navigate(`/${currUrl.slice(1)}`);
      dispatch(setHref(`/${currUrl.slice(1)}`))
      return
    }


    const setMobile = () => {
      window.innerWidth <= 555 ? !isMobile && setIsMobile(true)
        : isMobile && setIsMobile(false);
    };

    window.addEventListener('resize', setMobile);


    if (href !== pathname) navigate(href);


    return () => removeEventListener('resize', setMobile);
  }, [href])

  return (
    <Nav next={nav.next} prev={nav.prev} route={route} isMobile={isMobile} search={pathname === '/search'} />
  )
}



const mapStateToProps = (state: RootState) => ({
  href: state.main.href,
  curr: state.main.curr,
  end: state.main.end
});

export default withProvider(connect(mapStateToProps)(NavbarContainer))

