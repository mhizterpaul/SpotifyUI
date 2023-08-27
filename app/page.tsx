'use client';

import Playlist from '@/components/main/playlist';
import Recommendation from '@/components/main/recommendation';
import { lazy } from 'react';
import { useSelector } from 'react-redux';
import withProvider from '@/store/with_provider';

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

  return (
    <main className='main m-0'>
      {props.children}
    </main>
  )
}

function Mainpage() {

  const selector = useSelector((state: any) => state.SET_MAIN.href);

  return (
    <Home>
      {selector === '/' && <>
      <Playlist />
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