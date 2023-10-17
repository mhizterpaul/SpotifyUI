
'use client'
import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendations from '@/containers/recommendations';
import { lazy, useEffect, useRef, useState } from 'react';
import withProvider from '@/store/with_provider';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Loader from '@/components/network_request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import Scrollbars from '@/components/scrollbars/'
import NowPlaying from '@/components/footer/nowPlaying';


const Library = lazy(() => import('../components/main/library'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));

function Home() {

  const main = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');

  useEffect(() => {

    if (main.fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }

    setStatus(main.fetchAccessTokenStatus);

  }, [dispatch, main.fetchAccessTokenStatus])

  if (main.startNavTransition) return <Loader status='PENDING' meta='NAVIGATION' />
  return (

    <main className={`main ${nowPlaying ? 'main-children' : ''} xl:pr-4 sm:col-start-2 ${main.open ? 'col-start-2' : 'col-start-1'} w-full row-start-2 row-end-4 col-end-4 h-[50vh] min-h-[444px] max-h-[620px]`}>
      <div className='main-firstChild'>
        <Scrollbars>
          {/*accessToken.access_token == null ? <Loader status={status} meta='Access Token' /> :*/}
          <Routes>
            <Route path='/search' element={
              <>
                <TopGenres />
                <BrowseAll />
              </>
            }
            />
            <Route path={'/playlist?new=:id'} element={<Playlist />} />
            <Route path={'/playlist/:id'} element={<Playlist />} />
            <Route path='/library?list=:id' element={<Library />} />
            <Route path='/library' element={<Library />} />

            <Route path='/' element={
              <>
                <FeaturedPlaylists />
                <Recommendations />
              </>
            }
            />
          </Routes>
        </Scrollbars>
      </div>
      {nowPlaying ? <div className='main-lastChild'>
        <Scrollbars>
          <NowPlaying />
        </Scrollbars>
      </div> : null}
    </main >
  )
}





export default withProvider(Home);