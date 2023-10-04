import React, { useEffect } from 'react'
import Image from 'next/image'
import Loader from '../network_request'
import { useAppSelector } from '@/store/hooks'
import { getFeaturedPlaylists, test } from '@/utils/api'
import useData from '../data_hook'
import { FeaturedPlaylist } from '@/utils/types'
import image from '@/static/images/test.jpeg'


const styles = {
  width: '22.56269rem',
  height: '6.25rem',
  flexShrink: '0',
  borderRadius: '0.25rem',
  background: '#303030',
  color: '#303030'
}
const imgStyle = {
  width: '6.25rem',
height: '6.25rem',
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
    <section >
      <h3>Good morning</h3>
      <div className='flex flex-row'>
        {data.data.map((el: FeaturedPlaylist) =>
        (
          (<div key={el.id} style={styles}>
            <Image src={image || el.image} alt={el.name} height={100} width={100} style={imgStyle}/>
            {el.name}
          </div>)
        ))
        }
      </div>
    </section>
  )
}

export default FeaturedPlaylists