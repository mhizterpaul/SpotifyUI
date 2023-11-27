import axios from 'axios';
import { Playlist, AudioBook, Country, AudioBookCountry, Track} from './types'



function search (type: string, access_token: string, offset: string, country:Country|AudioBookCountry, limit?: string){
    return axios.get(`https://api.spotify.com/v1/search?q=a%20e%20&type=${type}&market=${country}&offset=${offset}&limit=${limit||'6'}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }})
}

export function getNewAlbumReleases (access_token: string, offset:string, country: Country){
    return axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${country}&offset=${offset}&limit=6`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.ListOfNewReleasesResponse}) => data.albums.items.map((album) => ({
                image: album.images[0].url,
                name: album.name,
                id: album.id,
                type: album.type,
                release_date: album.release_date,
                artists: album.artists.map(artist => artist.name )
            }))
        ); 
}
export function getSeveralArtists (access_token: string, offset: string, country: Country){
    return search('artist',access_token, offset, country).then(({data}:{data: SpotifyApi.ArtistSearchResponse}) => data.artists.items.map(artist => ({
        id: artist.id,
        image: !artist.images?.length ? null : artist.images[0].url,
        name: artist.name,
        popularity: artist.popularity,
        type: artist.type

    })))
}
export function getAudioBooks(access_token: string, offset: string, country: AudioBookCountry){
   return search('audiobook',access_token, offset, country).then(({data}) : AudioBook[] => data.audiobooks.items.map((audiobook) => ({
        id: audiobook.id,
        image: audiobook.images[0].url,
        name: audiobook.name,
        authors: audiobook.authors.map( (author) => author.name),
        description: audiobook.description,
        edition: audiobook.edition,
        type: audiobook.type,
        publisher: audiobook.publisher,
        total_chapters: audiobook.total_chapters,
        
    })))

}
export function getSeveralEpisodes (access_token: string, offset: string, country:Country){
   return  search('episode',access_token, offset, country).then(({data}:{data: SpotifyApi.EpisodeSearchResponse}) => data.episodes.items.map(episode => ({
        audio_preview_url: episode.audio_preview_url,
        description: episode.description,
        duration_ms: episode.duration_ms,
        id: episode.id,
        type: episode.type,
        image: episode.images[0].url,
        release_date: episode.release_date,
        name: episode.name
    })))
}
export function getEpisode(access_token: string, id: string, country: string){
    return axios.get(`https://api.spotify.com/v1/episodes/${id}?market=${country}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(
            ({data}:{data: SpotifyApi.EpisodeObject}) => ({
                audio_preview_url: data.audio_preview_url,
                description: data.html_description,
                duration_ms: data.duration_ms,
                id: data.id,
                type: data.type,
                image: data.images[0].url,
                release_date: data.release_date,
                name: data.name,
                show: {
                    description: data.show.description,
                    id: data.show.id,
                    image: data.show.images[0]?.url,
                    name: data.show.name,
                    publisher: data.show.publisher,
                    type: data.show.type,
                    total_episodes: data.show.total_episodes
                }
            })
        )
}


export function getAlbum(access_token: string, id:string){
    return axios.get(`https://api.spotify.com/v1/albums/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.SingleAlbumResponse}) => (
            {
                id: data.id,
                image: data.images[0].url,
                name: data.name,
                release_date: data.release_date,
                popularity: data.popularity,
                label: data.label,
                type: data.type,
                album_type: data.album_type,
                artists: data.artists.map(artist => artist.name),
                tracks: data.tracks.items.map((track) => ({
                  id: track.id,
                  name: track.name,
                  preview_url: track.preview_url,
                  track_number: track.track_number,
                  type: track.type,
                  duration_ms: track.duration_ms,
                  artists: track.artists.map(artist => artist.name)
                }

        ))}
        ))
}


export function getFeaturedPlaylists(access_token: string, country: string, offset:string, limit:string){
   
        return  axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}:{data: SpotifyApi. ListOfFeaturedPlaylistsResponse}) => data.playlists.items.map((el)=> ({
            id: el.id,
            image: el.images[0].url,
            description: el.description,
            owner: el.owner.display_name,
            name: el.name,
            type: el.type,
        })));
 
}

export function getPlaylist(access_token:string, id: string){
    
    return axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then (({data}) : Playlist => {
            return {
                name: data.name,
                image: data.images[0].url,
                id: data.id,
                followers: data.followers.total,
                description: data.description,
                total: data.tracks.total,
                type: data.type,
                owner: data.owner.display_name,
                items: data.tracks.items.filter((item)=> item.track.type === 'track' ).map(({added_at, track}) => ({
            added_at: added_at,
            track: {
                album:{
                    album_type: track.album.album_type,
                    total_tracks: track.album.total_tracks,
                    id: track.album.id,
                    image: track.album.images[0].url,
                    name: track.album.name,
                    type: track.album.type,
                    release_date: track.album.release_date,
                    artists: track.album.artists.map((artist: SpotifyApi.ArtistObjectSimplified) => artist.name)
                },
                artists: track.artists.map((artist: SpotifyApi.ArtistObjectFull)=> ({
                    id: artist.id,
                    image: artist.images ? artist.images[0].url : undefined,
                    name: artist.name,
                    type: artist.type,
                    popularity: artist.popularity,
        
                })),
                duration_ms: track.duration_ms,
                id: track.id,
                name: track.name,
                popularity: track.popularity,
                preview_url: track.preview_url,
                track_number: track.track_number,
                type: track.type
            }
        }))}
    })}


export function getSeveralShows(access_token: string, offset: string, limit: string, country: Country){

    return search('show', access_token, offset, country,String(Number(limit)+6)).then(({data}: {data: SpotifyApi.ShowSearchResponse}) => {

            return data.shows.items.filter(el => el).map((el) => ({
                src: el.images[0]?.url,
                title: el.name,
                author: el.publisher,
                id: el.id,
                type: el.type,
                description: el.description,
            }));
        })

}

export function getSeveralCategories(access_token:string,country: Country ,offset: string){
    
    return axios.get(`https://api.spotify.com/v1/browse/categories?country=${country}&offset=${offset}&limit=6`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}:{data: SpotifyApi.MultipleCategoriesResponse}) => {
            
            return data.categories.items.map((category) => ({
                ...category,
                image: category.icons[0].url,
            }))
        })
}

export function getCategoryPlaylist (access_token: string, id:string, country:Country){
    return  axios.get(`https://api.spotify.com/v1/search?q=a%20e%20genre:${id}&type=track&market=${country}&limit=25`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.TrackSearchResponse}) => data.tracks.items.map(track => ({
         album: {
            album_type: track.album.album_type,
            id: track.album.id,
            image: track.album.images[0].url,
            name: track.album.name,
            release_date: track.album.release_date,
            artists: track.album.artists.map(artist => artist.name),
            type: track.album.type
         },
         artists: track.artists.map(artist => ({
            id: artist.id,
            image: artist.images?.[0].url,
            name: artist.name,
            popularity: artist.popularity,
            type: artist.type,
         })),
         duration_ms: track.duration_ms,
         id: track.id,
         name: track.name,
         popularity: track.popularity,
         preview_url: track.preview_url,
         track_number: track.track_number,
         type: track.type,
     })))
 }
 export function getShow (access_token:string, id:string){
    return  axios.get(`https://api.spotify.com/v1/shows/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.ShowObjectFull})=> ({
            description: data.html_description,
            id: data.id,
            image: data.images[0].url,
            name: data.name,
            type: data.type,
            media_type: data.media_type,
            publisher: data.publisher,
            episodes: data.episodes.items.map(episode => ({
                audio_preview_url: episode.audio_preview_url,
                description: episode.html_description,
                duration_ms: episode.duration_ms,
                id: episode.id,
                type: episode.type,
                image: episode.images[0].url,
                release_date: episode.release_date,
                name: episode.name
            }))
        }))
 }

 