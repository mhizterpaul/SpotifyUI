
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
    Playlist: {[key: string]:any, items:T[]}[],
    Tracks: T[],
    nowPlaying: T,
    currentPlaylist: T[],
    ownPlaylist: any[],
    Episodes: Object,
    setCurrPlaylist : (playlist: T[])=>void,
    setNowPlaying: (track:T)=>void,
}

const value: V = {
    Playlist:[

    ],
    Tracks: [

    ],
    nowPlaying: {

    },
    currentPlaylist: [],
    ownPlaylist: [],
    Episodes: {},
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