import React from 'react'
import Image from 'next/image'
import {Category} from '@/utils/types'
import image from '@/static/images/test.jpeg'
import { Data } from './home'

const style = {
  width: 14.4375/1.5 + 'rem',
  height: 17.5625/1.5 + 'rem',
  flexShrink: '0',
  background: '#181818',

}

const imgStyle = {
  width: 11.9375/1.5 +'rem',
  height: 11.9375/1.5 +'rem',
  flexShrink: '0',
  borderRadius: '0.875rem',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.23) 26.44%), lightgray 50% / cover no-repeat',
}



const card = (props: { type?: string } & Data) => {
  return  (
    <div className='img-container flex flex-col items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap' style={style}>
      <Image src={props.src||props.image} alt={`image illustrating ${props.title||props.name}`} height={100} width={100} loading={'lazy'} style = {props.type === 'recommendations' ? imgStyle : {}}/>
      <h4>{props.title||props.name}</h4>
      <p>{props.author||props.artists?.join(', ')||props.authors?.join(', ')||props.publisher}</p>
    </div>
  )
}

export default card