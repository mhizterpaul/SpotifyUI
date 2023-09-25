import React from 'react'
import Image from 'next/image'
import { Recommendation } from '@/store/types'

const card = (props : {type: string} & Recommendation) => {
  if(props.type === 'recommendations') return (
    <div className = 'flex-col items-start overflow-hidden text-ellipsis whitespace-nowrap'>
    <Image src={props.src} alt={`image illustrating ${props.title}`} height = {100} width={100}/>
    <h3>{props.title}</h3>
    <p>{props.author}</p>
    </div>
  )
}

export default card