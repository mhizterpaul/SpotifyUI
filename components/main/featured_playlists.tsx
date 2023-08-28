import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Loader from '../network_request'
import { useAppSelector } from '@/store/hooks'
import { getFeaturedPlaylists } from '@/store/api'
import useData from '../data_hook'

const FeaturedPlaylists = () => {
  //get country info
  const selector = useAppSelector(state => state.access_token) 
  const state = useData({
    callBack: () => getFeaturedPlaylists(selector.access_token||'', 'US')
  });
  
  
  return (
    <section className='flex flex-row'>
      {state.status === 'SUCCESS' && state.data.map((el)=>{
        return (<a key={el.id} href={`/playlist?id=${el.href}`}>
          <Image src={el.image} alt ={el.name} height = {100} width = {100} />
          {el.name}
        </a>)
      })
      }
      {
        (state.status !== 'IDLE') && < Loader status = {state.status}/>
      }
      {
        (selector.fetchAccessTokenStatus === 'ERROR') && <Loader status={selector.fetchAccessTokenStatus} meta = 'Access Token' /> 
      }
    </section>
  )
}

export default FeaturedPlaylists