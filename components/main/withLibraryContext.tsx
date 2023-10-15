
import { createContext } from 'react'



const value = {
    playlist:[

    ],
    likedSongs: [

    ],
    addMedia: (media, id) => {
        value[media].push(id);
    },
    removeMedia: (media, id) => {
        value[media] = value.[media].filter(el => el !== id)
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