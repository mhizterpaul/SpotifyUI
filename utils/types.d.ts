import { countries } from "."

export type NewAlbumRelease = {
 
        image: string,
        name: string,
        id: string,
        release_date: string,
        type: string,
        artists: string[]
    } //checked

export type Artist = {
        id: string,
        image: string,
        name: string,
        popularity: number,
        type: string,
    }//checked

export type AudioBook = {
        id: string,
        image: string,
        name: string,
        authors: string[],
        type: string,
        description: string,
        edition: string,
        publisher: string,
        total_chapters: number,
    }//checked


export type Episode =  {
        audio_preview_url: string,
        description: string,
        duration_ms: number,
        id: string,
        type: string,
        image: string,
        release_date: string,
        name: string,
        publisher: string,
    total: number
    } //checked

export type CategoryPlaylist ={
        id: string,
        name: string,
        type: string,
        image: string,
        owner: string
    }//checked

 export type Album = {
    id: string,
    image: string,
    name: string,
    popularity: number,
    label: string,
    album_type: string,
    release_date: string,
    type: string,
    artists: string[],
    tracks: {
        id: string,
        name: string,
        track_number: number,
        preview_url: string,
        type: string,
        duration_ms: number,
        artist: string[]
    }[]
 }//checked

 export type Playlist = {
    name: string,
    image: string,
    id: string,
    followers: number,
    description: string,
    total: number,
    type: string,
    owner: string,
    items: {
added_at: string,
track: Track[] | EpisodeFull[],
type: string,
    }
 }//checked

 export type EpisodeFull = {
    audio_preview_url: string,
    description: string,
    duration_ms: number,
    id: string,
    image: string,
    name: string,
    release_date: string,
    type: string,
    show: {
        description: string,
        id: string,
        image: string,
        name: string,
        publisher: string,
        type: string,
        total_episodes: number
    }
}

export type Track = {
    album:{
        album_type: string,
        total_tracks: number,
        id: string,
        image: string,
        type: string,
        name: string,
        release_date: string,
        artists: string[],
    },
    artists: {
        id: string,
        image: string,
        name: string,
        popularity: number,
        type: string,

    }[],
    duration_ms: number,
    id: string,
    name: string,
    popularity: number,
    preview_url: string,
    track_number: number,
    type: string
}
 export type Show = {
    id: string,
    src: string,
    title: string,
    author: string,
    description: string,
    type: string,
} //checked

 export type FeaturedPlaylist = {

    name: string,
    id: string,
    image: string,
    type: string,
    
}//checked

 export type Category = {
    image: string,
    href: string,
    id: string,
    icons: SpotifyApi.ImageObject[]
    name: string,
}//checked

const countries = ['US','NG','GB','ZA', 'JM', 'CA', 'GH'] as const
export type Country = typeof countries[number];

export type AudioBookCountry = 'US'|'GB'|'IE'|'NZ'|'AU';

export type AudioBookCountries = ['US','GB','IE','NZ','AU'];

export type Countries = ['US','NG','GB','ZA', 'JM', 'CA', 'GH'];