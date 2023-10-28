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
        disc_number: number,
        duration_ms: number,
        artist: string[]
    }[]
 }//checked

 export type Playlist = {
        name: string,
        image: string,
        followers: number,
        description: string,
        id: string,
        total: number,
        owner: string,
        items: {
            added_at: string,
            id: string,
            image: string,
            name: string,
            popularity: number,
            artists: {
                name: string,
                image: string,
                followers: number,
                popularity: number
            }[],
            duration_ms: number,
            description: string,
            album: string,
            total: number
        }[]
 }//checked

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


