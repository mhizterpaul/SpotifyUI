
'use client'
import { ReactElement, lazy, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '@/components/networkRequest';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import HomePage from '../components/main/home'
import SeeAll from '@/components/main/seeAll';
import Layout from '@/components/rootLayout'


const Library = lazy(() => import('../components/main/library'));
const Search = lazy(() => import('../components/main/search'));
const NowPlaying = lazy(() => import('../components/footer/nowPlaying'))
const PageNotFound = lazy(() => import('./404'))
const Episodes = lazy(() => import('../components/main/episodes'))
const Lyrics = lazy(() => import('../components/main/lyrics'))

function Home() {

  const { fetchAccessTokenStatus, href, open, nowPlayingView } = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');
  const pathname = useLocation().pathname;


  useEffect(() => {

    if (fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }

    setStatus(fetchAccessTokenStatus);

  }, [dispatch, fetchAccessTokenStatus])

  if ((pathname !== href) && (pathname !== href.split('?')[0])) return <Loader status='PENDING' meta='NAVIGATION' />

  return (

    <main className={`main ${nowPlayingView ? ' main-child ' : ''} xl:pr-2 md:col-start-2 ${open ? 'col-start-2 [&>*:first-child]:ml-2 md:[&>*:first-child]:ml-0 ' : ' col-start-1 '} min-w-[280px] w-screen [&>*:first-child]:min-w-[280px] [&>*:first-child]:max-w-[calc(100vw-0.25rem)] md:w-[calc(100vw-15.6rem)] overflow-visible md:ml-[1.1rem] ml-1 row-start-2 row-end-4 col-end-3  min-h-[31rem] md:pl-0 max-h-[914px] `}>
      {/*accessToken.access_token == null ? <Loader status={status} meta='Access Token' /> :*/}

      <Routes>
        <Route path='/search' element={<Search />} />
        <Route path={'/playlist/:id'} element={<Playlist />} />
        <Route path={'/playlist'} element={<Playlist />} />
        <Route path='/library/playlist' element={<Library />} />
        <Route path='/library' element={<Library />} />
        <Route path='/episodes' element={<Episodes />} />
        <Route path='/episode' element={<Episodes />} />
        <Route path='/lyrics/:id' element={<Lyrics />} />
        <Route path='/episode/:id' element={<Episodes />} />
        <Route path='/see-all/:id' element={<SeeAll />} />
        <Route path='/' element={
          <HomePage />
        }
        />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      {nowPlayingView ? <NowPlaying /> : null}
    </main >
  )
}


Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}


export default Home;

