import { useContext, useEffect, useRef, useState } from 'react';
import { Context, OwnPlaylist } from '../../app/rootProvider';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Image from 'next/image';
import { SlOptions } from 'react-icons/sl'
import { BiLike, BiSave } from 'react-icons/bi';
import { RxDividerVertical } from 'react-icons/rx';
import { LiaTimesSolid } from 'react-icons/lia';
import { TbDots } from 'react-icons/tb';
import { AiOutlineDelete } from 'react-icons/ai';
import { Playlist } from '@/utils/types';
import { useParams } from 'next/navigation';


const Library = () => {
  //props.match.params.id or useParams
  const dispatch = useAppDispatch();
  const [hover, setHover] = useState(false);
  const [searchParams] = useSearchParams();
  const access_token = useAppSelector(state => state.main.access_token);
  const { Playlist, Tracks, Episodes, addMedia } = useContext(Context)
  const ownPlaylist: OwnPlaylist[] = Object.values(Playlist).filter(value => typeof (value.id) === 'number')
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const search = useLocation().search;
  const { id } = useParams();
  const [seeAll, setSeeAll] = useState(false);
  const [activeInput, setActiveInput] = useState(false);
  const [closeForm, setCloseForm] = useState(searchParams.get('new') === 'true' ? false : true);
  const [inputSubMenu, setInputSubMenu] = useState(false);
  const defaultSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiM3ZjdmN2YiIGQ9Ik0yMiAuODQ3VjE3YTQgNCAwIDEgMS0yLTMuNDY1VjMuMTUzTDggNC44NjdWMTlhNCA0IDAgMSAxLTItMy40NjVWMy4xMzNMMjIgLjg0N1pNNiAxOWEyIDIgMCAxIDAtNCAwYTIgMiAwIDAgMCA0IDBabTE0LTJhMiAyIDAgMSAwLTQgMGEyIDIgMCAwIDAgNCAwWiIvPjwvc3ZnPg==';
  const editIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U2ZTZlNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2Utd2lkdGg9IjIiIGQ9Ik0xNyAzYTIuODUgMi44MyAwIDEgMSA0IDRMNy41IDIwLjVMMiAyMmwxLjUtNS41WiIvPjwvc3ZnPg=='
  const res = {
    name: '',
    owner: '',
    followers: 0,
    total: 0,
    id: ownPlaylist.length,
    release_date: '',
    image: defaultSrc,
    type: 'playlist',
    description: '',
    items: []
  }
  const save = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !descriptionRef.current) return;
    res.name = inputRef.current.value;
    res.description = descriptionRef.current.value;
    res.release_date = (() => { const date = new Date; return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() })();
    addMedia('Playlist', String(Object.keys(ownPlaylist).length), res);
    setCloseForm(true)

    dispatch(pushRef('/playlist/' + Object.keys(ownPlaylist).length))

  };

  useEffect(() => {

  }, [search])



  const handleFile = () => {

    if (!fileRef.current?.files?.length) return;

    const file = fileRef.current.files[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e?.target?.result;

      //@ts-ignore
      res.image = src;
      if (imageRef.current) imageRef.current.style.backgroundImage = `url(${src})`;
    };
    reader.readAsDataURL(file);
  }


  //fix button and button link
  //create playlist click does nothing
  if ((searchParams.get('new') === 'true') || (search === '?new=true') && !closeForm) {
    return (
      <section className='w-full relative -mt-[2rem] h-full flex items-center justify-center '>


        <form onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => save(e)} className=' bg-[#333] flex rounded-md flex-col items-center p-4 gap-y-2 justify-center min-w-[28rem] max-w-lg max-h-fit'>
          <h3 className='flex items-center w-full justify-between mb-2'><span className='inline-block text-2xl font-extrabold'>Edit details</span> <LiaTimesSolid className={'hover:bg-[#949292] w-8 h-8 hover:rounded-full p-1 '} onClick={() => { setCloseForm(true); dispatch(pushRef('/library')) }} /></h3>
          <div className='relative flex w-full justify-between items-center gap-x-2 h-[50%]'>

            <input ref={fileRef} type='file' size={1028 * 1000 * 6} onInput={handleFile} accept={'image/*'} style={{
              position: 'absolute',
              height: '1px',
              width: '1px',
              overflow: 'hidden',
              clip: 'rect(1px, 1px, 1px, 1px)'
            }} />
            <div className={(activeInput ?
              ' hover:after:absolute hover:after:pointer-events-none hover:after:text-lg hover:after:content-["Choose_photo"] hover:after:font-bold hover:after:bottom-12 hover:after:left-8 hover:after:z-10 '
              : '') + ' relative w-[180] mx-auto my-auto h-full '} onMouseEnter={() => setHover(true)}>

              <input ref={imageRef} id='image' type='image' className={'bg-[rgb(40,40,40)] bg-contain bg-no-repeat bg-center p-16 relative shadow-lg'} width={175} height={175} alt={'Playlist Image'} src={activeInput ? editIcon : defaultSrc} onMouseEnter={() => setActiveInput(true)} onMouseLeave={() => setActiveInput(false)} onClick={(e) => { e.preventDefault(); fileRef?.current?.click() }} />
              <TbDots className={'absolute  text-3xl right-2 top-2 text-[whitesmoke] bg-zinc-900 rounded-full p-1 hover:text-white ' + (hover ? ' block ' : ' hidden ')} onClick={() => setInputSubMenu(state => !state)} />
              <ul className={'absolute -right-24 top-12 rounded-md bg-[#282828] list-none p-2 text-xs shadow-lg z-10 ' + (inputSubMenu ? ' ' : ' hidden ')}>
                <li className='hover:bg-stone-600 p-2 ' onClick={() => { setInputSubMenu(false); res.image = defaultSrc; if (imageRef.current) imageRef.current.style.backgroundImage = '' }}><AiOutlineDelete className={'mr-1 text-[#A7A7A7] font-bold text-xl inline-block align-middle '} />Remove photo</li>
              </ul>
            </div>

            <div className='flex relative flex-col gap-y-4 justify-between items-center h-full w-1/2 '>
              <label htmlFor='name' className='relative max-w-fit mb-2'>
                <input ref={inputRef} id='name' name='name' className='rounded-md peer bg-[#3E3E3E] focus:bg-[#333333] p-2 focus-visible:outline-none focus:ring-2 focus:ring-gray-500 w-[222px] ' defaultValue={'My Playlist #' + (ownPlaylist.length)} type='text' />
                <span className='hidden absolute peer-hover:inline-block peer-focus:inline-block z-10 text-sm -top-[0.75rem] left-2 '>Name</span>
              </label>

              <label htmlFor='description' className='relative max-w-fit'>
                <textarea ref={descriptionRef} id='description' name='description' cols={27} rows={6} className='bg-[#3E3E3E] focus:bg-[#333333] resize-none focus-visible:outline-none p-2 w-full focus:ring-2 focus:ring-gray-500 peer h-full rounded-md  placeholder:text-[#757575] placeholder:p-4 ' placeholder='Add an optional description' />
                <span className='hidden absolute peer-hover:inline-block z-10 peer-focus:inline-block text-sm -top-[0.75rem] left-2 '>
                  Description
                </span>
              </label>
            </div>
          </div>
          <button type={'submit'} className={'font-bold bg-white text-black mb-2 self-end w-24 hover:scale-110 active:bg-gray-600 rounded-3xl py-3 px-[0.35rem] mr-2 '}>Save</button>
          <div className=' text-sm whitespace-pre-line '> By proceeding you agree to give Spotify access to the image you choose to upload. Please make sure you have the right to upload the image.</div>
        </form>
      </section>
    )
  }




  if (!(Object.keys(Playlist).length + Object.keys(Tracks).length + Object.keys(Episodes).length)) return (
    <section className='flex items-center -mt-[3.6rem] flex-col w-full h-full justify-center '>
      <div className='min-w-fit flex flex-col items-start justify-center'>
        <div className='text-sm mb-12 flex flex-col items-start justify-center gap-y-4'>
          <h3 className='font-extrabold '>Create your first playlist</h3>
          it's easy we'll help you
          <button onClick={() => { setCloseForm(true); dispatch(pushRef('/library/playlist?new=true')) }} className='rounded-3xl bg-white text-black text-lg p-4 font-bold hover:scale-110 '>Create playlist</button>
        </div>
        <div className='text-sm flex flex-col items-start justify-center gap-y-4'>
          <h3 className='font-extrabold '>let's find you some podcasts to follow</h3>
          We'll keep you updated on new Episodes
          <button onClick={() => dispatch(pushRef('/see-all/shows'))} className='rounded-3xl text-lg bg-white text-black p-4 font-bold hover:scale-110'>Browse podcasts</button>
        </div>
      </div>
    </section>
  )





  return <>
    {
      (Object.keys(Playlist).length && !id) && <section>
        <h2 className='flex justify-between items-center'>Playlists <span className={`mr-2 ${!seeAll || (Object.values(Playlist).length < 6) ? ' hidden ' : ' inline-block '}`} onClick={() => setSeeAll(false)}>See all</span><LiaTimesSolid className={`mr-2 ${seeAll ? 'inline-block' : 'hidden'}`} onClick={() => setSeeAll(true)} /></h2>
        {(seeAll ? Object.values(Playlist) : Object.values(Playlist).slice(0, 6)).map((playlist: Playlist) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={playlist.image} className={'rounded-xl'} alt={playlist.name} height={100} width={100} />
          <p dangerouslySetInnerHTML={{ __html: playlist.description }} />
          <span className='font-bold text-sm text-gray-600'>
            {playlist.total} items on this playlist &bull; {playlist.followers} followers
          </span>
        </p>)
        }
      </section>
    }

    {(Object.keys(Tracks).length && !id) ? <div onClick={() => dispatch(pushRef('/playlist/songs'))} className='text-2xl mr-4'>

      <span className='text-2xl hover:scale-[130] font-bold bg-blue-900'><BiLike /><RxDividerVertical className={'mx-2'} />{Object.keys(Tracks).length} liked Songs</span> <span className={'text-zinc-600'} >See all <SlOptions /></span>
    </div> : null}

    {
      (Object.keys(Episodes).length && !id) ? <section>
        <h2 className='flex justify-between items-center'>Episodes <span className={`mr-2w`} onClick={() => dispatch(pushRef('/episodes'))}>See all</span></h2>
        {Object.keys(Episodes).length && Object.values(Episodes).slice(0, 6).map((episode) => <p className='flex gap-x-4 justify-start items-center h-14'>
          <Image src={episode.image} className={'rounded-xl'} alt={episode.name} height={100} width={100} />
          {episode.description}
          <span className='font-bold text-sm text-gray-600'>
            {episode.publisher} &bull; {episode.total}
          </span>
        </p>)
        }
      </section> : null}
  </>

}

export default Library



