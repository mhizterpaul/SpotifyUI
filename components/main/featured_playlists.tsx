import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Loader from '../network_request'
import { useAppSelector } from '@/store/hooks'
import { getFeaturedPlaylists } from '@/store/api'
import useData from '../data_hook'


const FeaturedPlaylists = () => {
  //get country info
  const selector = useAppSelector(state => state.main);
  const prefetchedData = useData({
    callBack: () => getFeaturedPlaylists(selector.access_token||'', 'US')
  });

  const data = useMemo(() => prefetchedData, [prefetchedData]);
  
  if(data.data == null) return < Loader status = {data.status} meta='fetching Featured Playlist data'/>

  console.log(data.data);
  return (
    <section className='flex flex-row'>
      { data.data.map((el)=>{
        
        return (<a key={el.id} href={`/playlist?id=${el.href}`}>
          <Image src={el.image} alt ={el.name} height = {100} width = {100} />
          {el.name}
        </a>)

      })  
    }
    </section>
  )
}

export default FeaturedPlaylists