
import { createContext } from 'react'
import { Playlist, Episode, Track } from '../../utils/types'

export type OwnPlaylist = {
    name: string,
    id: number | string,
    owner: string,
    followers: number,
    total: number,
    description: String,
    image: string | undefined,
    items: {
        added_at: string,
        track: Track[]
    }
}
type Media = Episode | Playlist | Track | OwnPlaylist;
type V = {
    Playlist: { [key: string]: Playlist } & { [key: string]: OwnPlaylist },
    Tracks: { [key: string]: Track },
    nowPlaying: Track | null,
    currentPlaylist: Playlist | null,
    Episodes: {
        [key: string]: Episode
    },
    BgColor: string,
    Cache: { [key: string]: Playlist } & { [key: string]: Episode },
    removeMedia: (type: string, id: string | number) => void,
    addMedia: (type: string, id: string | number, media: Media) => void,
    setProp: (type: string, value: String | Media) => void,
}

export let context: V = {
    Playlist: {

    },
    Tracks: {

    },
    BgColor: '',
    nowPlaying: null,
    currentPlaylist: null,
    Episodes: {

    },
    Cache: {

    },
    removeMedia: (type, id) => {
        context = {
            ...context,
            [type]: Object.fromEntries(Object.entries(context[type]).filter(media => media[0] === id))
        }

    },
    addMedia: (type, id, media) => {
        context = {
            ...context,
            [type]: {
                ...context[type],
                [id]: media
            }
        }
    },
    setProp: (type, value) => {
        context = {
            ...context,
            [type]: value
        }
    },

};

export const Context = createContext(context);


