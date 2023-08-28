'use client';

import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendation from '@/components/main/recommendation';
import { lazy, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import withProvider from '@/store/with_provider';
import { fetchAccessToken } from '@/store/reducers/access_token_slice';
import Loader from '@/components/network_request';

const Library = lazy(() => import('../components/main/library'));
const CreatePlaylist = lazy(() => import('../components/main/create_playlist'));
const Card = lazy(() => import('../components/main/card'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));
//subscribe to store when event fires from sidebar 
//render appropraite child
//lazy import components need to render sidebar components

export function Home(props: {
  children: React.ReactNode
}) {
  const accessToken = useAppSelector(state => state.access_token);
  const dispatch = useAppDispatch();
  useEffect(()=> {
    async function getToken() {
      dispatch(fetchAccessToken);
    }
    getToken();
  }, [dispatch])

  if(accessToken.access_token == null) return <Loader status={accessToken.fetchAccessTokenStatus} meta = 'Access Token' />
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