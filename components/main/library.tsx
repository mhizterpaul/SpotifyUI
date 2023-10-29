import { useContext, useRef, useState } from 'react';
import withProvider, { Context, OwnPlaylist } from './withProvider';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import Image from 'next/image';
import { SlOptions } from 'react-icons/sl'
import { BiLike, BiSave } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { LiaTimesSolid } from 'react-icons/lia';
import { TbDots } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import SeeAll from './see-all';
import { getSeveralShows } from '@/utils/api';
import { Playlist } from '@/utils/types';
import { random } from '@/utils';


const Library = () => {
  //props.match.params.id or useParams
  const { Playlist, Tracks, Episodes } = useContext(Context);
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);
  const [searchParams] = useSearchParams();
  const access_token = useAppSelector(state => state.main.access_token);
  const [closeForm, setCloseForm] = useState(searchParams.get('new') === 'true' ? false : true);
  const ownPlaylist: OwnPlaylist[] = Object(Playlist).values.filter(value => typeof (value.id) === 'number')
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [seeAll, setSeeAll] = useState(false);
  const [inputSubMenu, setInputSubMenu] = useState(false);
  const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDN2MTRhNCA0IDAgMSAxLTItMy40NjVWNUg5djEyYTQgNCAwIDEgMS0yLTMuNDY1VjNoMTNaTTUgMTlhMiAyIDAgMSAwIDAtNGEyIDIgMCAwIDAgMCA0Wm0xMSAwYTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNFoiLz48L3N2Zz4=';
  const editIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE3IDNhMi44NSAyLjgzIDAgMSAxIDQgNEw3LjUgMjAuNUwyIDIybDEuNS01LjVaIi8+PC9zdmc+';
  const save = () => {
    if (inputRef.current) Playlist[ownPlaylist.length] = {
      name: inputRef.current.value,
      id: ownPlaylist.length,
      image: imageRef.current?.value,
      description: descriptionRef.current?.value,
      items: []
    }

    dispatch(pushRef('playlist/me?' + String(ownPlaylist.length)))
  };



  if ((searchParams.get('new') === 'true') && !closeForm) {
    return <form className='absolute  right-[50%] bottom-[50%] bg-[#282828] w-1/2 h-1/2 flex flex-col items-center p-4 gap-y-2 justify=center'>
      <h3 className='flex items-center justify-between mb-2'>Edit details <LiaTimesSolid className={'hover:bg-[#333] hover:rounded-full'} onClick={() => setCloseForm(true)} /></h3>
      <div className='flex gap-x-2 relative h-[40%]'>
        <input ref={imageRef} type='image' className={'bg-[#282828] shadow-md hover:before:content-[Choose Photo] hover:before:absolute hover:before:top-[50%] hover:before:right-[50%] hover:before:w-10 hover:before:font-bold' + (imageRef.current?.getAttribute('src') === defaultSrc ? '' : 'hover:before:bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE3IDNhMi44NSAyLjgzIDAgMSAxIDQgNEw3LjUgMjAuNUwyIDIybDEuNS01LjVaIi8+PC9zdmc+)]')} width={100} height={100} alt={'Playlist Image'} onMouseEnter={() => setHover(true)} onBlur={() => { setHover(false); setInputSubMenu(false) }} onMouseLeave={() => setHover(false)} src={hover && imageRef.current?.getAttribute('src') !== defaultSrc ? editIcon : defaultSrc} />
        <TbDots onClick={() => setInputSubMenu((state) => !state)} className={'absolute left-[20%] top-2 text-gray-700 bg-zinc-900 rounded-full hover:text-[whitesmoke] ' + (hover ? 'block' : 'hidden')} />
        <ul className={'list-none p-1 text-sm' + (inputSubMenu ? 'block' : 'hidden')}>
          <li className='hover:bg-stone-600 p-4 ' onClick={() => (imageRef.current && (imageRef.current.value = defaultSrc))}><AiOutlineDelete className={'mr-4 text-stone-700'} />Remove photo</li>
        </ul>
        <div className='flex flex-col gap-y-4 justify-between'>
          <input ref={inputRef} className='rounded-md bg-[#333333] focus:before:content-[Name] top-0 right-[2%]' value={'My Playlist #' + (ownPlaylist.length)} type="text" />
          <input ref={descriptionRef} className='bg-[#333333] rounded-sm placeholder:text-gray-600' placeholder='Add an optional description' />
        </div>
      </div>
      <button type={'submit'} className={'font-bold bg-white text-black float-right hover:scale-125 active:bg-gray-600 rounded-lg p-6'} onClick={save}>save</button>
      <div className='clear-right text-sm'> By proceeding you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
    </form>
  }

  if (!(Object.keys(Playlist).length + Object(Tracks).keys.length + Episodes.length)) return (
    <section className='w-full h-full'>
      <div className='text-sm flex flex-col items-start justify-center gap-y-8'>
      <h3 className='text-base font-bold'>Create your first playlist</h3>
        it's easy we'll help you
        <button onClick={() => setCloseForm(false)} className='rounded-3xl bg-white text-black p-6 font-bold hover:scale-125 '>Create playlist</button>
      </div>
      <div className='text=sm flex flex-col items-start justify-center gap-y-8'>
        <h3 className='text-base font-bold'>let's find you some podcasts to follow</h3>
        We'll keep you updated on new Episodes
        <button onClick={() => (
          <SeeAll title={'Shows'} callBack={(index) => getSeveralShows(access_token || '', index, '6', random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']))} />
        )} className='rounded-3xl bg-white text-black p-6 font-bold hover:scale-125'>Browse podcasts</button>
      </div>
    </section>
  )





  return <>
    {
      (Object(Playlist).values.length && (window.location.href.split('library').length === 1 || searchParams.get('new') === 'true')) && <section>
        <h2 className='flex justify-between items-center'>Playlists <span className={`mr-2 ${!seeAll || (Object(Playlist).values.length < 6) ? ' hidden ' : ' inline-block '}`} onClick={() => setSeeAll(false)}>See all</span><LiaTimesSolid className={`mr-2 ${seeAll ? 'inline-block' : 'hidden'}`} onClick={() => setSeeAll(true)} /></h2>
        {Playlist.length && (seeAll ? Object(Playlist).values : Object(Playlist).values.slice(0, 6)).map((playlist: Playlist) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={playlist.image} className={'rounded-xl'} alt={playlist.name} height={100} width={100} />
          {playlist.description}
          <span className='font-bold text-sm text-gray-600'>
            {playlist.total} &bull; {playlist.followers}
          </span>
        </p>)
        }
        {Playlist && (seeAll ? Object(Playlist).values : Object(Playlist).values.slice(0, 6)).map((playlist: Playlist) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={playlist.image} className={'rounded-xl'} alt={playlist.name} height={100} width={100} />
          {playlist.description}
          <span className='font-bold text-sm text-gray-600'>
            {playlist.total} &bull; {playlist.owner}
          </span>
        </p>)
        }
      </section>
    }
    {(Tracks.length && window.location.href.split('library').length === 1) && <div onClick={() => dispatch(pushRef('/playlist/songs'))} className='text-2xl mr-4'>

      <span className='text-2xl hover:scale-[130] font-bold bg-blue-900'><BiLike /><RxDividerVertical className={'mx-2'} />{Object(Tracks).keys.length}</span> <span className={'text-zinc-600'} >See all <SlOptions /></span>
    </div>}
    {
      (Episodes.length && window.location.href.split('library').length === 1) && <section>
        <h2 className='flex justify-between items-center'>Episodes <span className={`mr-2w`} onClick={() => dispatch(pushRef('/episodes'))}>See all</span></h2>
        {Episodes.length && Episodes.slice(0, 6).map((episode) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={episode.image} className={'rounded-xl'} alt={episode.name} height={100} width={100} />
          {episode.description}
          <span className='font-bold text-sm text-gray-600'>
            {episode.publisher} &bull; {episode.total}
          </span>
        </p>)
        }
      </section>
    }
    {
      (!(Object(Playlist).values.length) && searchParams.get('playlists') === '') && <div className='w-full h-full'><div className='w-5/6 text-center mx-auto pt-8'>you do not have any playlist </div></div>
    }
  </>



}

export default withProvider(Library)