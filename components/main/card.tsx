import React from 'react'
import Image from 'next/image'
import { RxDotFilled } from 'react-icons/rx'
import { Data } from './home'
import PlayIcon from '../common/play'


const style = {
  width: 14.4375 / 1.5 + 'rem',
  height: 19.5625 / 1.5 + 'rem',
  flexShrink: '0',
  background: '#181818',

}

const imgStyle = {
  width: 11.9375 / 1.5 + 'rem',
  height: 11.9375 / 1.5 + 'rem',
  flexShrink: '0',
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.23) 26.44%), lightgray 50% / cover no-repeat',
}



const Card = (props: Data) => {
  return ((props.image || props.src) ?
    <div className={` flex flex-col 
     bg-gray-500 items-start justify-start gap-y-2 overflow-hidden p-4 rounded-[0.9rem] [&_small]:text-gray-500 [&_small]:text-xs [&_small]:h-[0.75rem] [&_small]:align-top [&_small]:w-[calc(11.9375rem/1.5)] [&_small]:truncate [&_small]:inline-block `}
      onClick={props.onClick}
      style={style}>
      {props.type === 'episode' || props.type === 'show' ?
        <Image className={' rounded-xl '} src={props.src || props.image || ''} alt={props.title || props.name || ''} height={100} width={100} loading={'lazy'} style={imgStyle} />
        : <PlayIcon>
          <Image className={' pb-2 ' + (props.type === 'artist' ? ' rounded-full ' : ' rounded-xl ')} src={props.src || props.image || ''} alt={props.title || props.name || ''} height={100} width={100} loading={'lazy'} style={imgStyle} />
        </PlayIcon>
      }
      <h4 className=' font-sans text-sm font-bold text-white h-[20px] align-top w-[calc(11.9375rem/1.5)] truncate '>{props.type === 'episode' ? <RxDotFilled className='text-[#2E77D0] w-[20px] h-[20px] inline-block' /> : null}{props.title || props.name}</h4>
      {
        props.type === 'episode' && <small>{props.release_date} <span className='px-2 inline-block'>&bull;</span> {props.duration_ms}</small>
      }
      {
        (props.type === 'playlist' || props.type === 'show')
        && <small>{props.description}</small>
      }
      {
        props.type === 'album' && <small>{props.artists?.join(', ')}</small>
      }
      {
        props.type === 'artist' && <small className='capitalize'>artist</small>
      }
      {
        props.type === 'audiobook' && <small>{props.authors?.join(', ')}</small>
      }
    </div> : null
  )
}

export default Card