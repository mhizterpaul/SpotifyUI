'use client'
import { BrowserRouter } from 'react-router-dom'
import { createContext, useState } from 'react'
import { Playlist, Episode, Track, Album, Show, CategoryPlaylist, EpisodeFull } from '../utils/types'

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
        track: Track
    }[]
}

type T = string | number;

type Media = Album | Episode | CategoryPlaylist | EpisodeFull | Track | OwnPlaylist | Playlist;

interface U {
    Playlist: { [key: string]: Playlist } & { [key: string]: OwnPlaylist },
    Tracks: { [key: string]: Track },//for liked songs
    nowPlaying: Episode | Track | null,
    currentPlaylist: Show | Album | { [key: string]: Episode } | OwnPlaylist | Playlist | null,
    Episodes: {
        [key: string]: Episode
    },
    BgColor: string
}
export interface V extends U {
    setProp: (type: keyof U, value: string | { [key: string]: any }) => void,
    addMedia: (type: T, id: T, media: Media) => void,
    removeMedia: (type: T, id: T) => void
}

const context = {
    Playlist: {

    },
    Tracks: {

    },
    BgColor: '',
    nowPlaying: null,
    currentPlaylist: null,
    Episodes: {

    },

} as V;
export const Context = createContext(context);

function RootRouter({ children }: { children: React.ReactNode }) {

    const [state, setState] = useState(context)
    const removeMedia = (type: T, id: T) => {
        setState(prev => ({
            ...prev,
            [type]: Object.fromEntries(Object.entries(prev[type]).filter(media => media[0] === id))
        }))
    }

    const addMedia = (type: T, id: T, media: Media) => {
        setState(prev => ({
            ...prev,
            [type]: {
                ...prev[type],
                [id]: media
            }
        }))
    }
    const setProp = (type: T, value: string | Episode | Album | Show | CategoryPlaylist | OwnPlaylist | Playlist | Track | { [key: string]: Episode }) => {
        setState(prev => ({
            ...prev,
            [type]: value
        }))
    }


    return (
        <BrowserRouter>
            <Context.Provider value={{ ...state, setProp, addMedia, removeMedia }}>
                {children}
            </Context.Provider>
        </BrowserRouter>
    )
}

export default RootRouter

