
'use client'
import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendations from '@/containers/recommendations';
import { lazy, useEffect, useState } from 'react';
import withProvider from '@/store/with_provider';
import { Route, Routes } from 'react-router-dom';
import Loader from '@/components/network_request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';


const Library = lazy(() => import('../components/main/library'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));

export function Home(props: {
  children: React.ReactNode
}) {
  const accessToken = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');

  useEffect(() => {

    if (accessToken.fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }
    setStatus(accessToken.fetchAccessTokenStatus);

  }, [dispatch, accessToken.fetchAccessTokenStatus, accessToken.access_token])



  if (accessToken.access_token == null) {

    return (
      <main className='main m-0'>
        <Loader status={status} meta='Access Token' />
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


  return (

    <Home>
      <Routes>
        <Route path='/search' element={
          <>
            <TopGenres />
            <BrowseAll />
          </>}
        />

        <Route path='/library?list=:id' element={<Library />} />
        <Route path='/' element={
          <>
            <FeaturedPlaylists />
            <Recommendations />
          </>}
        />
      </Routes>
    </Home>

  )
}



export default withProvider(Mainpage);