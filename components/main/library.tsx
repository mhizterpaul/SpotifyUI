import { useContext } from 'react'
import withProvider, { Context } from './withProvider'
import FeaturedPlaylists from './featured_playlists';
import { likedStyles } from '../nav/sidebar';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch } from '@/store/hooks';
import { useParams } from 'react-router-dom';

const Library = () => {
  //props.match.params.id or useParams
  const { playlist, tracks, playlistsInLibrary } = useContext(Context);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  if(id === 'playlist?new=true') return <div>add form for new playlist and add object to created Playlist array default image for playlist</div>;


  return playlistsInLibrary ? <>
      <FeaturedPlaylists defaultData={playlistsInLibrary}/> 
      <div>
      <div onClick={()=> dispatch(pushRef('/playlist/likedSongs'))} className='inline-block mr-4' style={likedStyles}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                </div>
                liked songs<div>playlist &bull; ${tracks.length}</div></div> 
    </>: <div>else return you do not have any playlist liked songs of episodes</div>;
}

export default withProvider(Library)