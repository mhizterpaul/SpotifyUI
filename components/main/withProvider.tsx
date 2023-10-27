
import { createContext } from 'react'



type T = {
    added_at: string,
    href: string,
    image: string,
    name: string,
    popularity: string,
    artists: any[],
    duration_ms: number,
    description: string,
    album: string,
    total: number

} | {}

type V = {
    Playlist: Object,
    Tracks: Object,
    nowPlaying: T,
    currentPlaylist: T[],
    ownPlaylist: any[],
    Episodes: Object[],
    Cache: Object, 
    setCurrPlaylist : (playlist: T[])=>void,
    setNowPlaying: (track:T)=>void,
}

const value: V = {
    Playlist:{

    },
    Tracks: {

    },
    nowPlaying: {

    },
    currentPlaylist: [],
    ownPlaylist: [],
    Episodes: {

    },
    Cache: {

    },
    setCurrPlaylist: (playlist: T[])=> {
        value.currentPlaylist = playlist;
    },
    setNowPlaying: (track: T)=> {
        value.nowPlaying = track;
    }

};

export const Context = createContext(value);

const withProvider = (Component : React.FC) => {
    return function EnhancedComponent(){
        return (
        <Context.Provider value = {value}>
            <Component />
        </Context.Provider>
        )
    }
  }

  export default withProvider;