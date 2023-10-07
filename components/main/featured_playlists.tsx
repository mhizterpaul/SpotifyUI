import React, { useEffect } from 'react'
import Image from 'next/image'
import Loader from '../network_request'
import { useAppSelector } from '@/store/hooks'
import { getFeaturedPlaylists, test } from '@/utils/api'
import useData from '../data_hook'
import { FeaturedPlaylist } from '@/utils/types'
import image from '@/static/images/test.jpeg'
import {greet} from '@/utils/'

const styles : React.CSSProperties = {
  width: 22.56269/1.5 + 'rem',
  height: 6.25/1.5 + 'rem',
  flexShrink: '0',
  borderRadius: '0.25rem',
  background: '#303030',
  color: '#303030',
  position: 'relative'
}
const imgStyle = {
  width: 6.25/1.5 + 'rem',
height: 6.25/1.5 + 'rem',
flexShrink: '0',
borderRadius: '0.25rem 0rem 0rem 0.25rem'
}


const FeaturedPlaylists = () => {
  //get country info
  const selector = useAppSelector(state => state.main);
  const data = useData({
    callBack: () => getFeaturedPlaylists(selector.access_token || '', 'US')
  });

  useEffect(() => { }, [data]);


  if (data.data == null) data.data = test;//return < Loader status={data.status} meta='fetching Featured Playlist data' />


  return (
    <section className = 'flex flex-col gap-y-4 h-1/2 max-h-[210px] mt-4 overflow-hidden'>
      <h3>{greet()}</h3>
      <div className='flex flex-row w-full items-center justify-between gap-x-8 gap-y-4 flex-wrap'>
        {data.data.slice(0,5).map((el: FeaturedPlaylist, id: number) =>
        (
          (<div key={el.id} className = {[(id === 4 && 'md:mr-[36%]')].join(' ')} style={styles}>
            <Image src={image || el.image} alt={el.name} height={100} width={100} style={imgStyle}/>
            <span className='inline-block absolute top-[30%] right-[40%] text-white'>{el.name}</span>
          </div>)
        ))
        }
      </div>
    </section>
  )
}

export default FeaturedPlaylists