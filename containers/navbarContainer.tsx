import Nav from "@/components/nav/navbar";
import { RootState } from "@/store";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import withProvider from "@/store/with_provider";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, goForward } from "@/store/reducers/main_slice";
import {useNavigate} from 'react-router-dom'

type Props = {href: string,
   curr: number | null,
   end: boolean | undefined
   dispatch: Dispatch
  }

function NavbarContainer({href, end, curr, dispatch} : Props) {
  //useRouter
  //check store for any routes
  const [isMobile, setIsMobile] = useState( window.innerWidth <= 555),
  pathname = '/' + location.href.split('/')[3],
  navigate = useNavigate(),
  route = (option: 'previous'|'next') => {

    if(option === 'previous'){
      if(curr === 0){
        if(href !== '/') navigate('/');
        return true;
      };
      dispatch(goBack());

      return curr === 1 ? true : false;
    }
    if((end !== undefined && end) || curr == null){
      navigate('/search');
      return true;
    }

    dispatch(goForward());

    return false;

  }
  
  useEffect(() => {
    const setMobile = () => {
        window.innerWidth <= 555 ? !isMobile && setIsMobile(true)
         : isMobile && setIsMobile(false);
    }
    window.addEventListener('resize', setMobile);
    return () => removeEventListener('resize', setMobile);
  }, [])

  if(href !== pathname) navigate(pathname);

  return (
    <Nav route = {route} isMobile = {isMobile} search = {pathname === '/search'}/>
  )
}


const mapStateToProps = (state: RootState) => ({
  href: state.main.href,
  curr: state.main.curr,
  end: state.main.end
});


export default withProvider(connect(mapStateToProps)(NavbarContainer))