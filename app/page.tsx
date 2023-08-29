'use client';

import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendation from '@/components/main/recommendation';
import { lazy, useEffect, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import withProvider from '@/store/with_provider';
import Loader from '@/components/network_request';
import { usePathname, useRouter } from 'next/navigation';




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
  const accessToken = useAppSelector(state => state.access_token);
  const href = useAppSelector(state => state.main.href);
  const pathname = usePathname();
  const [status, setStatus] = useState('IDLE');
  const router = useRouter();

  useEffect (() => {
    if(accessToken.access_token == null){
      setStatus('PENDING');
      router.push('/api/authenticate');
    }

    if(accessToken.access_token) setStatus('SUCCESS');

    if(href !== pathname) router.push(href);
    
  }, [router, accessToken.access_token, href, pathname])
   
  

  if(accessToken.access_token == null){

    return (
      <main className = 'main m-0'>
        <Loader status = {status} meta = 'Access Token' />
      </main>
    )
  }

  return (
    <main className='main m-0'>
      {accessToken.access_token}
    </main>
  )

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