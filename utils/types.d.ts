export type NewAlbumRelease = {
 
        image: string,
        name: string,
        id: string,
        release_date: string,
        artists: string[]
    } //checked

export type Artist = {
        id: string,
        image: string,
        name: string,
    }//checked

export type AudioBook = {
        id: string,
        image: string,
        name: string,
        authors: string[],
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
        image: string,
        release_date: string,
        name: string,
        publisher: string,
    total: number
    } //checked

export type CategoryPlaylist ={
        id: string,
        name: string,
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
    artists: string[],
    tracks: {
        id: string,
        name: string,
        track_number: number,
        preview_url: string,
        duration_ms: number,
        artist: string[]
    }[]
 }//checked

 export type Playlist = {
    name: string,
    image: string,
    id: string,
    followers: integer,
    description: string,
    total: integer,
    owner: string,
    items: {
added_at: string,
track: Track | EpisodeFull 
    }
 }//checked

 export type EpisodeFull = {
    audio_preview_url: string,
    description: string,
    duration_ms: integer,
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
        total_episodes: integer
    }
}

export type Track = {
    album:{
        album_type: string,
        total_tracks: integer,
        id: string,
        image: string,
        name: string,
        release_date: string,
        artists: string[],
    },
    artists: {
        id: string,
        image: string,
        name: string,
        popularity: integer,

    }[],
    duration_ms: integer,
    id: string,
    name: string,
    popularity: integer,
    preview_url: string,
    track_number: integer,
    type: string
}
 export type Show = {
    id: string,
    src: string,
    title: string,
    author: string,
    description: string,
} //checked

 export type FeaturedPlaylist = {

    name: string,
    id: string,
    image: string,
    
}//checked

 export type Category = {
    image: string,
    href: string,
    id: string,
    icons: SpotifyApi.ImageObject[]
    name: string
}//checked


