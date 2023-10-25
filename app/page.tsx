
'use client'
import FeaturedPlaylists from '@/components/main/featured_playlists';
import Recommendations from '@/containers/recommendations';
import { lazy, useEffect, useState } from 'react';
import withProvider from '@/store/with_provider';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '@/components/network_request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import Scrollbars from '@/components/scrollbars/'
import NowPlaying from '@/components/footer/nowPlaying';
import HomeWithInfiniteScroll from '../components/main/home'


const Library = lazy(() => import('../components/main/library'));
const TopGenres = lazy(() => import('../components/main/top_genres'));
const BrowseAll = lazy(() => import('../components/main/browse_all'));

function Home() {

  const main = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');
  const location = useLocation(),
  pathname = location.pathname;
  const renderThumb = ({ style, ...props }) => {
    const thumbStyle = {
        backgroundColor: `#797d7d`,
        borderRadius: '0.25rem',
    };
    return (
        <div
            style={{ ...style, ...thumbStyle }}
            {...props}/>
    );

    };
   
 
  useEffect(() => {

    if (main.fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }

    setStatus(main.fetchAccessTokenStatus);

  }, [dispatch, main.fetchAccessTokenStatus])

  if ((pathname !== main.href)&&(pathname !== main.href.split('?')[0]) ) return <Loader status='PENDING' meta='NAVIGATION' />
  
  return (

    <main className={`main ${main.nowPlayingView ? 'main-children' : ''} xl:pr-2 sm:col-start-2 ${main.open ? 'col-start-2' : 'col-start-1'} w-full row-start-2 row-end-4 col-end-4  min-h-[31rem] pl-2 sm:pl-0 max-h-[914px]`}>
      <Scrollbars thumbSize={100} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
      <div className='main-firstChild w-full'>
        {/*accessToken.access_token == null ? <Loader status={status} meta='Access Token' /> :*/}

        <Routes>
          <Route path='/search' element={
            <>
              <TopGenres />
              <BrowseAll />
            </>
          }
          />
          <Route path={'/playlist/:id'} element={<Playlist />} />
          <Route path='/library/playlist/' element={<Library />} />
          <Route path='/library' element={<Library />} />

          <Route path='/' element={
            <HomeWithInfiniteScroll />
          }
          />
        </Routes>
      </div>
      </Scrollbars>
      {main.nowPlayingView ? <div className='main-lastChild'>
        <Scrollbars thumbSize={100} renderTrackVertical={renderTrack} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
          <NowPlaying />
        </Scrollbars>
      </div> : null}
    </main >
  )
}





export default withProvider(Home);