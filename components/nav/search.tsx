import React from 'react'

type Props = {};

const Search = (props: Props) => {
  return (
    <input type="text" className='rounded-2xl' placeholder='&#xF002; Artists, songs or podcasts'></input>
  )
}

export default Search