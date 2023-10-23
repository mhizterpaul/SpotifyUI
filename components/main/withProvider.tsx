
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
    playlistsInLibrary: {[key: string]: any, items:T[]}[],
    addPlaylistToLibrary: (playlist: {[key: string]: any, items:T[]})=> void,
    setCurrPlaylist : (playlist: T[])=>void,
    setNowPlaying: (track:T)=>void,
    setMedia: (medias: {dTracks:{[key: string]: boolean}, dPlaylist: {[key:string]: boolean}})=>void
}

const value: V = {
    Playlist:[

    ],
    Tracks: [

    ],
    nowPlaying: {

    },
    currentPlaylist: [

    ],
    ownPlaylist: [],
    playlistsInLibrary: [],
    addPlaylistToLibrary:(playlist: {[key: string]: any, items:T[]})=>{
        value.playlistsInLibrary.push(playlist);
    },
    setCurrPlaylist: (playlist: T[])=> {
        value.currentPlaylist = playlist;
    },
    setNowPlaying: (track: T)=> {
        value.nowPlaying = track;
    },
   setMedia: (medias: {dTracks:{[key: string]: boolean}, dPlaylist: {[key:string]: boolean}}) => {
    for(const media in medias){
        for(const item in media){
            if( !value[media?.substring(1)]?.contains(media[item])){
                media === 'dPlaylist' ? value.Playlist.push(item) : value.Tracks.push(item);
            }
        }
    }
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