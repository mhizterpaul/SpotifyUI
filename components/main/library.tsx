import { useContext, useRef, useState } from 'react';
import withProvider, { Context } from './withProvider';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch } from '@/store/hooks';
import { useSearchParams } from 'react-router-dom';
import Image from 'next/image';
import { SlOptions } from 'react-icons/sl'
import { BiLike, BiSave } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { LiaTimesSolid } from 'react-icons/lia';
import { TbDots } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import { PiImageSquareFill } from 'react-icons/pi';

const Library = () => {
  //props.match.params.id or useParams
  const { Playlist, Tracks, ownPlaylist, Episodes } = useContext(Context);
  const [closeForm, setCloseForm] = useState(false);
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [seeAll, setSeeAll] = useState(false);
  const [inputSubMenu, setInputSubMenu] = useState(false);
  const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTIwIDN2MTRhNCA0IDAgMSAxLTItMy40NjVWNUg5djEyYTQgNCAwIDEgMS0yLTMuNDY1VjNoMTNaTTUgMTlhMiAyIDAgMSAwIDAtNGEyIDIgMCAwIDAgMCA0Wm0xMSAwYTIgMiAwIDEgMCAwLTRhMiAyIDAgMCAwIDAgNFoiLz48L3N2Zz4=';
  const editIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE3IDNhMi44NSAyLjgzIDAgMSAxIDQgNEw3LjUgMjAuNUwyIDIybDEuNS01LjVaIi8+PC9zdmc+';
  const save = () => { inputRef.current && ownPlaylist.push({ name: inputRef.current.value, image: imageRef.current?.value, description: descriptionRef.current?.value, items: [] }); dispatch(pushRef('playlist/me?' + String(ownPlaylist.length))) };
 
  //fill in the appropraite html for each section

  if ((searchParams.get('new') === '') && !closeForm) {
    return <form className='absolute  right-[50%] bottom-[50%] bg-[#282828] w-1/2 h-1/2 flex flex-col items-center p-4 gap-y-2 justify=center'>
      <h3 className='flex items-center justify-between mb-2'>Edit details <LiaTimesSolid className={'hover:bg-[#333] hover:rounded-full'} onClick={() => setCloseForm(true)} /></h3>
      <div className='flex gap-x-2 relative h-[40%]'>
        <input ref={imageRef} type='image' className={'bg-[#282828] shadow-md hover:before:content-[Choose Photo] hover:before:absolute hover:before:top-[50%] hover:before:right-[50%] hover:before:w-10 hover:before:font-bold' + (imageRef.current?.getAttribute('src') === defaultSrc ? '': 'hover:before:bg-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS13aWR0aD0iMiIgZD0iTTE3IDNhMi44NSAyLjgzIDAgMSAxIDQgNEw3LjUgMjAuNUwyIDIybDEuNS01LjVaIi8+PC9zdmc+)]')} width={100} height={100} alt={'Playlist Image'} onMouseEnter={() => setHover(true)} onBlur={() => { setHover(false); setInputSubMenu(false) }} onMouseLeave={() => setHover(false)} src={hover && imageRef.current?.getAttribute('src') !== defaultSrc? editIcon : defaultSrc} />
        <TbDots onClick={() => setInputSubMenu((state) => !state)} className={'absolute left-[20%] top-2 text-gray-700 bg-zinc-900 rounded-full hover:text-[whitesmoke] ' + (hover ? 'block' : 'hidden')} />
        <ul className={'list-none p-1 text-sm' + (inputSubMenu ? 'block':'hidden')}>
          <li className='hover:bg-stone-600 p-4 ' onClick={() => (imageRef.current && (imageRef.current.value = defaultSrc))}><AiOutlineDelete className={'mr-4 text-stone-700'}/>Remove photo</li>
        </ul>
        <div className='flex flex-col gap-y-4 justify-between'>
          <input ref={inputRef} className='rounded-md bg-[#333333] focus:before:content-[Name] top-0 right-[2%]' value={'My Playlist #' + (ownPlaylist.length)} type="text" />
          <input ref={descriptionRef} className = 'bg-[#333333] rounded-sm placeholder:text-gray-600' placeholder='Add an optional description'/>
        </div>
      </div>
      <button type={'submit'} className={'font-bold bg-white text-black float-right hover:scale-130 active:bg-gray-600 rounded-lg p-6'} onClick={save}>save</button>
      <div className='clear-right text-sm'> By proceeding you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
    </form>
  }

  if (!(Playlist.length + ownPlaylist.length + Tracks.length + Episodes.length)) return <div className='w-full h-full'><div className='w-5/6 text-center mx-auto pt-8'>you do not have any playlist, liked songs or episodes</div></div>

  return <>
    {
      (Playlist.length + ownPlaylist.length && (window.location.href.split('library').length === 1 || searchParams.get('playlists') === '')) && <section>
        <h2 className='flex justify-between items-center'>Playlists <span className={`mr-2 ${!seeAll || (Playlist.length < 6 && ownPlaylist.length < 6) ? ' hidden ' : ' inline-block '}`} onClick={() => setSeeAll(false)}>See all</span><LiaTimesSolid className={`mr-2 ${seeAll ? 'inline-block' : 'hidden'}`} onClick={() => setSeeAll(true)} /></h2>
        {Playlist.length && (seeAll ? Playlist : Playlist.slice(0, 6)).map((playlist) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={playlist.image} className={'rounded-xl'} alt={playlist.name} height={100} width={100} />
          {playlist.description}
          <span className='font-bold text-sm text-gray-600'>
            {playlist.total} &bull; {playlist.follower}
          </span>
        </p>)
        }
        {ownPlaylist.length && (seeAll ? ownPlaylist : ownPlaylist.slice(0, 6)).map((playlist) => <p className='flex gap-x-4 justify-start items-center h-14'>
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

      <span className='text-2xl hover:scale-[130] font-bold bg-blue-900'><BiLike /><RxDividerVertical className={'mx-2'} />{Tracks.length}</span> <span className={'text-zinc-600'} >See all <SlOptions /></span>
    </div>}
    {
      (Episodes.length && window.location.href.split('library').length === 1) && <section>
        <h2 className='flex justify-between items-center'>Episodes <span className={`mr-2w`} onClick={() => dispatch(pushRef('/episodes'))}>See all</span></h2>
        {Episodes.length && Episodes[id].slice(0, 6).map((episode) => <p className='flex gap-x-4 justify-start items-center h-14'>
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
      (!(Playlist.length + ownPlaylist.length) && searchParams.get('playlists') === '') && <div className='w-full h-full'><div className='w-5/6 text-center mx-auto pt-8'>you do not have any playlist </div></div>
    }
  </>



}

export default withProvider(Library)