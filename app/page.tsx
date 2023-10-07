
'use client'
import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendations from '@/containers/recommendations';
import { lazy, useEffect, useState } from 'react';
import withProvider from '@/store/with_provider';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Loader from '@/components/network_request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import Scrollbars from '@/components/scrollbar/';

const Library = lazy(() => import('../components/main/library'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));

function Home() {
  const navigate = useNavigate();
  const accessToken = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');

  useEffect(() => {

    if (accessToken.fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }

    setStatus(accessToken.fetchAccessTokenStatus);

  }, [dispatch, accessToken.fetchAccessTokenStatus])



  return (
    <main className={`main xl:pr-4 sm:col-start-2 ${accessToken.open ? 'col-start-2' : 'col-start-1'} col-end-4 w-full overflow-y-scroll overflow-x-hidden  h-[50vh] min-h-[444px] max-h-[620px] sm:ml-8`}>
       {/*accessToken.access_token == null ? <Loader status={status} meta='Access Token' /> :*/}

        <Routes>
          <Route path='/search' element={
            <>
              <TopGenres />
              <BrowseAll />
            </>}
          />
          <Route path={'/playlist?new=:id'} element={<Playlist />} />
          <Route path={'/playlist/'} element={<Playlist />} />
          <Route path='/library?list=:id' element={<Library />} />
          <Route path='/library' element={<Library />} />

          <Route path='/' element={
            <>
              <FeaturedPlaylists />
              <Scrollbars style={{height: 500}}>
              <Recommendations />
              </Scrollbars>
            </>}
          />
        </Routes>
    </main>
  )
}





export default withProvider(Home);