
import { createContext } from 'react'
import {Playlist, Episode, Track} from '../../utils/types'
 
export type OwnPlaylist = {
    name: string,
    id: number, 
    description: String,
    image: string|undefined,
    items: Track[]
}
type V = {
    Playlist: {[key: string]: Playlist}&{[key:string]: OwnPlaylist},
    Tracks: {[key: string]: Track },
    nowPlaying: Track|null,
    currentPlaylist: Playlist|null,
    Episodes: Episode[],
    Cache: {[key:string]: Playlist}&{[key:string]: Episode}, 
    setCurrPlaylist : (playlist: Playlist)=>void,
    removeMedia: (type: string, id: string) => void,
    setNowPlaying: (track: Track)=>void,
}

const value: V = {
    Playlist:{

    },
    Tracks: {

    },
    nowPlaying: null,
    currentPlaylist: null,
    Episodes: [],
    Cache: {

    },
    removeMedia: (type, id) => {
        value[type] = Object.fromEntries(Object.entries(value[type]).filter(media => media[0] === id));

    },
    setCurrPlaylist: (playlist)=> {
        value.currentPlaylist = playlist;
    },
    setNowPlaying: (track)=> {
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