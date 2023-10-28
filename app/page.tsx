
'use client'
import { lazy, useEffect, useState } from 'react';
import withProvider from '@/store/with_provider';
import { Route, Routes, useLocation } from 'react-router-dom';
import Loader from '@/components/network_request';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchAccessToken } from '@/store/reducers/main_slice';
import Playlist from '@/components/main/playlist';
import Scrollbars from '@/components/scrollbars/'
import HomePage from '../components/main/home'


const Library = lazy(() => import('../components/main/library'));
const Search = lazy(() => import('../components/main/search'));
const NowPlaying = lazy(()=> import('../components/footer/nowPlaying'))
const PageNotFound = lazy(()=> import('./404/page'))
const Episodes = lazy(()=> import('../components/main/episodes'))

function Home() {

  const {fetchAccessTokenStatus, href, open, nowPlayingView} = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState('IDLE');
  const location = useLocation(),
  pathname = location.pathname;
  const renderThumb = ({ style, ...props }:{style:React.CSSProperties}) => {
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

    if (fetchAccessTokenStatus === 'IDLE') {
      dispatch(fetchAccessToken());
    }

    setStatus(fetchAccessTokenStatus);

  }, [dispatch, fetchAccessTokenStatus])

  if ((pathname !== href)&&(pathname !== href.split('?')[0]) ) return <Loader status='PENDING' meta='NAVIGATION' />
  
  return (

    <main className={`main ${nowPlayingView ? 'main-children' : ''} xl:pr-2 sm:col-start-2 ${open ? 'col-start-2' : 'col-start-1'} w-full row-start-2 row-end-4 col-end-4  min-h-[31rem] pl-2 sm:pl-0 max-h-[914px]`}>
      <Scrollbars thumbSize={100} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
      <div className='main-firstChild w-full'>
        {/*accessToken.access_token == null ? <Loader status={status} meta='Access Token' /> :*/}

        <Routes>
          <Route path='/search' element={<Search /> }/>
          <Route path={'/playlist/:id'} element={<Playlist />} />
          <Route path='/library/playlist' element={<Library />} />
          <Route path='/library' element={<Library />} />
          <Route path='/episodes' element={<Episodes />} />
          <Route path='/episode/:id' element={<Episodes />} />
          <Route path='/' element={
            <HomePage />
          }
          />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </div>
      </Scrollbars>
      {nowPlayingView ? <div className='main-lastChild'>
        <Scrollbars thumbSize={100} renderThumbHorizontal={renderThumb} renderThumbVertical={renderThumb}>
          <NowPlaying />
        </Scrollbars>
      </div> : null}
    </main >
  )
}





export default withProvider(Home);