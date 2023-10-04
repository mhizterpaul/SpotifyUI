import React from 'react'
import Image from 'next/image'
import { Recommendation } from '@/utils/types'
import image from '@/static/images/test.jpeg'

const style = {
  width: '14.4375rem',
  height: '17.5625rem',
  flexShrink: '0',
  background: '#181818',

}

const imgStyle = {
  width: '11.9375rem',
  height: '11.9375rem',
  flexShrink: '0',
  borderRadius: '0.875rem',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.23) 26.44%), lightgray 50% / cover no-repeat',
}

const card = (props: { type: string } & Recommendation) => {
  if (props.type === 'recommendations') return (
    <div className='flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap' style={style}>
      <Image src={image || props.src} alt={`image illustrating ${props.title}`} height={100} width={100} style = {imgStyle}/>
      <h3>{props.title}</h3>
      <p>{props.author}</p>
    </div>
  )
}

export default card