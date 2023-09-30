'use client'
import Nav from "@/components/nav/navbar";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import withProvider from "@/store/with_provider";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, goForward, pushRef } from "@/store/reducers/main_slice";
import {useNavigate, useLocation} from 'react-router-dom'

type Props = {href: string,
   curr: number | null,
   end: boolean | undefined,
   dispatch: Dispatch,
  }

function NavbarContainer({href, end, curr, dispatch} : Props) {
  //useRouter
  //check store for any routes
  const [isMobile, setIsMobile] = useState( window.innerWidth <= 555),
  [nav, setNav] = useState({prev: true, next: false}),
  location = useLocation(),
  pathname = location.pathname,
  navigate = useNavigate(),
  route = (option: 'previous'|'next') => {

    if(curr == null){
      if(option === 'next') {

        setNav({prev: false, next: true})
        dispatch(pushRef('next'));
        return
      }
      
      setNav({prev: true, next: false})
      dispatch(pushRef('previous'));
      return
    }

    if(option === 'previous'){

      if(end && pathname === '/search') return navigate(href);

      dispatch(goBack());
      return curr === 1 ? setNav(prv => ({...prv, prev: true}))
        : setNav(prv => ({...prv, prev: false}));
    }

    if((end !== undefined && end)){
      navigate('/search');
      return setNav(prv => ({...prv, next: true}))
    }

    dispatch(goForward());

    return setNav(prv => ({...prv, prev: false}));

  }
  
  useEffect(() => {
    const setMobile = () => {
        window.innerWidth <= 555 ? !isMobile && setIsMobile(true)
         : isMobile && setIsMobile(false);
    },
    currUrl = window.location.href.split('3000/')[1];

    window.addEventListener('resize', setMobile);
  
    if(href !== pathname) navigate(href);
    if(currUrl.startsWith('?')) navigate(`/${currUrl.slice(1)}`);
  
    return () => removeEventListener('resize', setMobile);
  }, [href])

  return (
    <Nav next = {nav.next} prev = {nav.prev} route = {route} isMobile = {isMobile} search = {pathname === '/search'}/>
  )
}


const mapStateToProps = (state: RootState) => ({
  href: state.main.href,
  curr: state.main.curr,
  end: state.main.end
});


export default withProvider(connect(mapStateToProps)(NavbarContainer))