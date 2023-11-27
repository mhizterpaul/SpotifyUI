
'use client'
import { ReactElement, useMemo } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '@/components/networkRequest';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import HomePage from '../components/main/home'
import SeeAll from '@/components/main/seeAll';
import Layout from '@/components/rootLayout'
import Library from '../components/main/library';
import Search from '../components/main/search';
import NowPlaying from '../components/footer/nowPlaying';
import Episodes from '../components/main/episodes'
import Lyrics from '../components/main/lyrics'
import PageNotFound from './404';
import qs from "query-string";
import { ErrorProps } from 'next/error';


export const getServerSideProps = async () => {
  try {
    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: qs.stringify({
        grant_type: 'client_credentials'
      })
    });
    const data = await res.json()

    return { props: { access_token: data.access_token } }
  } catch (e) {
    const data = JSON.stringify(e);
    return { props: { error: data } }
  }
}

function Home({ access_token, error }: { access_token: string, error: ErrorProps }) {

  const { href, open, nowPlayingView } = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const pathname = useLocation().pathname;

  const init = useMemo(() => {

    if (access_token) dispatch(setAccessToken(access_token));

  }, [])


  if (error) return (<div className={` ${open ? ' col-start-2 ' : ''} col-start-1 md:col-start-2 row-start-2 row-end-4 col-end-4 flex items-center justify-center  text-center h-full py-auto`}>
    something went wrong
  </div>)

  if (!access_token || pathname !== href) return (<div className={` ${open ? ' col-start-2 ' : ''} col-start-1 md:col-start-2 row-start-2 row-end-4 col-end-4 flex items-center justify-center  text-center h-full py-auto`}>
    <Loader meta={'Home'} status={'PENDING'} />
  </div>)





  return (

    <main className={`main ${nowPlayingView ? ' main-child ' : ''} xl:pr-2 md:col-start-2 ${open ? 'col-start-2 [&>*:first-child]:ml-2 md:[&>*:first-child]:ml-0 ' : ' col-start-1 '} min-w-[280px] w-screen [&>*:first-child]:min-w-[280px] [&>*:first-child]:max-w-[calc(100vw-0.25rem)] md:w-[calc(100vw-15.6rem)] overflow-visible md:ml-[1.1rem] ml-1 row-start-2 row-end-4 col-end-4  min-h-[31rem] md:pl-0 max-h-[914px] `}>
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

