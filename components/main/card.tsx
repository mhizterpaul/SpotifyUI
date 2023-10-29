import React from 'react'
import Image from 'next/image'
import { RxDotFilled } from 'react-icons/rx'
import {Data} from './home'
import styles from './style.module.css'

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
  return  ( (props.image||props.src) &&
    <div className={`img-container flex flex-col 
     hover:after:content-[url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxZW0iIGhlaWdodD0iMWVtIiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9ImN1cnJlbnRDb2xvciIgZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyczQuNDggMTAgMTAgMTBzMTAtNC40OCAxMC0xMFMxNy41MiAyIDEyIDJ6TTkuNSAxNC42N1Y5LjMzYzAtLjc5Ljg4LTEuMjcgMS41NC0uODRsNC4xNSAyLjY3YTEgMSAwIDAgMSAwIDEuNjhsLTQuMTUgMi42N2MtLjY2LjQzLTEuNTQtLjA1LTEuNTQtLjg0eiIvPjwvc3ZnPg==)]
      hover:after:aboslute hover:after:top:50%  hover:after:right-4 hover:after:text-4xl hover:after:h-16 hover:after:w-16 hover:after:rounded-full hover:after:text-green-500 hover:after:shadow-md hover:after 
     bg-gray-500 items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap p-6 rounded-3xl media-hover`} style={{...styles, ...style}}>
      <Image className={props.type==='artist'? 'rounded-full': ' rounded-2xl '} src={props.src||props.image} alt={`image illustrating ${props.title||props.name}`} height={100} width={100} loading={'lazy'} style = {props.type === 'recommendations' ? imgStyle : {}}/>
      <h4 className=' font-sans p-2 text-sm text-[#181818] overflow-ellipsis'>{props.type === 'episode' && <RxDotFilled className='text-[#2E77D0] px-4'/>}{props.title||props.name}</h4>
      {
        props.type === 'episode' && <small>{props.release_date} <span className='px-2 inline-block'>&bull;</span> {props.duration_ms}</small>
      }
      {
        (props.type === 'playlist' || props.type === 'show')
        && <small className='overflow-ellipsis '>{props.description}</small>
      }
      {
        props.type === 'album' && <small>{props.artists?.join(', ')}</small>
      }
      {
        props.type === 'artist' && <small className = 'capitalize'>artist</small>
      }
    </div>
  )
}

export default card