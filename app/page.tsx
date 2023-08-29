'use client';

import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendation from '@/components/main/recommendation';
import { lazy, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import withProvider from '@/store/with_provider';
import Loader from '@/components/network_request';
import { fetchAccessToken } from '@/store/reducers/main_slice';




const Library = lazy(() => import('../components/main/library'));
const CreatePlaylist = lazy(() => import('../components/main/create_playlist'));
const Card = lazy(() => import('../components/main/card'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));
//subscribe to store when event fires from sidebar 
//render appropraite child
//lazy import components need to render sidebar components


//check route for access_token
export function Home(props: {
  children: React.ReactNode
}) {
  const accessToken = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');

  useEffect (() => {

    if(accessToken.fetchAccessTokenStatus === 'IDLE'){
      dispatch(fetchAccessToken());
    }
    setStatus(accessToken.fetchAccessTokenStatus);

  }, [dispatch, accessToken.fetchAccessTokenStatus, accessToken.access_token])
   
  

  if(accessToken.access_token == null){

    return (
      <main className = 'main m-0'>
        <Loader status = {status} meta = 'Access Token' />
      </main>
    )
  }

  return (
    <main className='main m-0'>
      {props.children}
    </main>
  )
}

function Mainpage() {
  const selector = useAppSelector((state: any) => state.main.href);

  return (
    <Home>
      {selector === '/' && <>
      <FeaturedPlaylists />
      <Recommendation />
      </>}
      {
        selector === '/search' &&  <>
         <TopGenres />
         <BrowseAll />
         </>
      }
      {
        selector === '/library' && <Library />
      }
      {
        selector === '/create_playlist' && <CreatePlaylist />
      }
      {
        selector === '/liked_songs' && <Card type= 'liked_songs'/>
      }
      {
        selector === '/episodes' && <Card type= 'episodes'/>
      }
    </Home>
  )
}

export default withProvider(Mainpage);