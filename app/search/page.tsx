import React from 'react'
import { Home } from '@/app/page'
import BrowseAll from '@/components/main/browseAll';
import TopGenres from '@/components/main/topGenres';


function Search() {
  return (
    <Home>
      <TopGenres />
      <BrowseAll />
    </Home>
  )
}

export default Search;


