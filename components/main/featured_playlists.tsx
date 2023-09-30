import React, { useEffect } from 'react'
import Image from 'next/image'
import Loader from '../network_request'
import { useAppSelector } from '@/store/hooks'
import { getFeaturedPlaylists } from '@/utils/api'
import useData from '../data_hook'
import { FeaturedPlaylist } from '@/utils/types'


const FeaturedPlaylists = () => {
  //get country info
  const selector = useAppSelector(state => state.main);
  const data = useData({
    callBack: () => getFeaturedPlaylists(selector.access_token || '', 'US')
  });

  useEffect(() => { }, [data]);

  //const data = useMemo(() => prefetchedData, [prefetchedData]);

  if (data.data == null) return < Loader status={data.status} meta='fetching Featured Playlist data' />


  return (
    <section className='flex flex-row'>
      {data.data.map((el: FeaturedPlaylist) =>
      (
        (<a key={el.id} href={`/playlist?id=${el.href}`}>
          <Image src={el.image} alt={el.name} height={100} width={100} />
          {el.name}
        </a>)
      ))
      }
    </section>
  )
}

export default FeaturedPlaylists