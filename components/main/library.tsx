import { useContext, useRef, useState } from 'react'
import withProvider, { Context } from './withProvider'
import { likedStyles } from '../nav/sidebar';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import {RiMusic2Line} from 'react-icons/ri'

const Library = () => {
  //props.match.params.id or useParams
  const { Playlist, Tracks, ownPlaylist, playlistsInLibrary } = useContext(Context);
  const [closeForm, setCloseForm] = useState(null);
  const dispatch = useAppDispatch();
  const [searchParams]  = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);


//render list of playlist available
//render list of likedSongs available
//render list of episodes available

  return  <section className=' '>
  {(searchParams.get('new') === '') && (closeForm === null) ? <form className='w-full flex flex-col items-center mt-16 justify=center'><input ref={inputRef} className="placeholder:italic placeholder-slate-400 mt-1 px-3 py-2 bg-[whitesmoke]  border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block text-black rounded-md sm:text-sm focus:ring-1" placeholder="... enter name" type="text"/>
  <button type={'submit'} className={'mt-4 bg-green-800 hover:bg-gray-600 active:bg-gray-600 rounded-lg p-2'} onClick={()=> {inputRef.current && ownPlaylist.push({name: inputRef.current.value, image: <RiMusic2Line/>, items: [] }); setCloseForm(true) }}>submit</button></form>

    : playlistsInLibrary.length || ownPlaylist.length ?  <>
       defaultData={[...playlistsInLibrary, ...ownPlaylist]}
      <div>
      <div onClick={()=> dispatch(pushRef('/playlist/likedSongs'))} className='inline-block mr-4' style={likedStyles}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125Z" /></svg>
                </div>
                liked songs<div>playlist &bull; {Tracks.length}</div></div> 
    </>: <div className='w-full h-full'><div className='w-5/6 text-center mx-auto pt-8'>you do not have any playlist, liked songs or episodes</div></div>
  }
  </section>
}

export default withProvider(Library)