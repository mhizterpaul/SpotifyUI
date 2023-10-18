
import { createContext } from 'react'



const value = {
    playlist:[

    ],
    tracks: [

    ],
    nowPlaying: {

    },
    setNowPlaying: (track)=> {
        value.nowPlaying = track;
    },
   setMedia: (medias: Object) => {
    for(const media in medias){
        for(const item in media){
            if(media[item] === true && !value[media].contains(media[item])){
                media === 'playlist' ? value.playlist.push(item) : value.likedSongs.push(item);
            }
        }
    }
   }

}
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