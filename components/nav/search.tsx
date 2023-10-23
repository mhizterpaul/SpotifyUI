import React from 'react'

type Props = {
  className: string,
};

const Search = ({className}: Props) => {
  return (
      <label className={className + " relative -mr-4"}>
      <span className="sr-only">Search</span>
        <span className="absolute inset-y-2 left-0 flex items-center pl-2">
          <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" className="h-5 w-5 text-black" viewBox="0 0 256 256"><path fill="currentColor" d="m229.66 218.34l-50.07-50.06a88.11 88.11 0 1 0-11.31 11.31l50.06 50.07a8 8 0 0 0 11.32-11.32ZM40 112a72 72 0 1 1 72 72a72.08 72.08 0 0 1-72-72Z" /></svg>
        </span>
        <input className="placeholder:italic placeholder:text-slate-400 text-black bg-white w-[80%] sm:w-4/6 md:w-5/6 border border-slate-300 rounded-2xl sm:rounded-xl py-1 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" placeholder='Artists, songs or podcasts' type="text" name="search" />
      </label>
  )
}

export default Search

/*

<input type="text" className='rounded-2xl h-8 w-[25%] search text-xs' placeholder='Artists, songs or podcasts'></input>
        
*/