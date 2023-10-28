import axios from 'axios';
import {CategoryPlaylist, Playlist, AudioBook} from './types'




export function getAccessToken(){
    return axios.get('http://localhost:3000/api/auth').then(
        res => res.data
    );
}

function search (type: string, access_token: string, offset: string, limit?: string){
    return axios.get(`https://api.spotify.com/v1/search?q=a%20e%20&type=${type}&market=US&limit=${limit||'6'}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }})
}

export function getNewAlbumReleases (access_token: string, offset:string){
    return axios.get(`https://api.spotify.com/v1/browse/new-releases?offset=${offset}&limit=6`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.ListOfNewReleasesResponse}) => data.albums.items.map((album) => ({
                image: album.images[0].url,
                name: album.name,
                id: album.id,
                release_date: album.release_date,
                artists: album.artists.map(artist => artist.name )
            }))
        ); 
}
export function getSeveralArtists (access_token: string, offset: string){
    return search('artist',access_token, offset).then(({data}:{data: SpotifyApi.ArtistSearchResponse}) => data.artists.items.map(artist => ({
        id: artist.id,
        image: artist.images[0].url,
        name: artist.name,

    })))
}
export function getAudioBooks(access_token: string, offset: string){
   return search('audiobook',access_token, offset).then(({data}) : AudioBook[] => data.audiobooks.items.map((audiobook) => ({
        id: audiobook.id,
        image: audiobook.images[0].url,
        name: audiobook.name,
        authors: audiobook.authors.map( author => author.name),
        description: audiobook.description,
        edition: audiobook.edition,
        publisher: audiobook.publisher,
        total_chapters: audiobook.total_chapters,
        
    })))

}
export function getSeveralEpisodes (access_token: string, offset: string){
   return  search('episode',access_token, offset).then(({data}:{data: SpotifyApi.EpisodeSearchResponse}) => data.episodes.items.map(episode => ({
        audio_preview_url: episode.audio_preview_url,
        description: episode.description,
        duration_ms: episode.duration_ms,
        id: episode.id,
        image: episode.images[0].url,
        release_date: episode.release_date,
        name: episode.name
    })))
}
export function getEpisode(access_token: string, id: string){
    return axios.get(`https://api.spotify.com/v1/episodes/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(
            ({data}:{data: SpotifyApi.EpisodeObject}) => ({publisher: data.show.publisher, total: data.show.total_episodes})
        )
}

export function getcategoryplaylist(access_token:string, category: string, offset: string) {
    return axios.get(`https://api.spotify.com/v1/browse/categories/${category}/playlists?offset=${offset}&limit=6`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}): CategoryPlaylist[] =>  data.playlists.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                image: playlist.images[0].url,
                owner: playlist.owner.display_name
            }))
        )
}

export function getSeveralAlbums(access_token: string, ids: string[]){
    return axios.get(`https://api.spotify.com/v1/albums?ids=${ids.join(',')}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}:{data: SpotifyApi.MultipleAlbumsResponse}) => data.albums.map(album => (
            {
                id: album.id,
                image: album.images[0].url,
                name: album.name,
                release_date: album.release_date,
                popularity: album.popularity,
                label: album.label,
                album_type: album.album_type,
                artists: album.artists.map(artist => artist.name),
                tracks: album.tracks.items.map((track) => ({
                  id: track.id,
                  name: track.name,
                  disc_number: track.disc_number,
                  duration_ms: track.duration_ms,
                  artist: track.artists.map(artist => artist.name)
                }))
            }
        )))
}


export function getFeaturedPlaylists(access_token: string, country: string, offset:string, limit:string){
   
        return  axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}:{data: SpotifyApi. ListOfFeaturedPlaylistsResponse}) => data.playlists.items.map((el)=> ({
            id: el.id,
            image: el.images[0].url,
            name: el.name,
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
                owner: data.owner.display_name,

                items: data.tracks.items.map((item) => ({
            added_at: item.added_at,
            id: item.id,
            image: item.images[0].url,
            name: item.track.name,
            popularity: item.popularity,
            artists: item.artists.map((artist) => ({name: artist.name, image: artist.images[0].url, followers: artist.followers.total, popularity: artist.popularity})),
            duration_ms: item.duration_ms,
            description: item.description,
            album: item.album.name,
            total: item.tracks.total
        }))}
    }
            )

}

export function getSeveralShows(access_token: string, offset: string, limit: string){

    return search('show', access_token, offset, limit).then(({data}: {data: SpotifyApi.ShowSearchResponse}) => {

            return data.shows.items.map((el) => ({
                src: el.images[0].url,
                title: el.name,
                author: el.publisher,
                id: el.id,
                description: el.description,
            }));
        })

}

export function getSeveralCategories(access_token:string, offset: string){
    
    return axios.get(`https://api.spotify.com/v1/browse/categories?country=US&offset=${offset}limit=6`, {
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

export function getTopGenres(access_token: string){

       return axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(
            ({data}:{data:SpotifyApi.AvailableGenreSeedsResponse}) => Promise.allSettled(
                data.genres.map((id: string) => {

                    return axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }).then(({data}:{data: SpotifyApi.SingleCategoryResponse}) => ({
                        ...data,
                        image: data.icons[0].url
                    }))
                })
                //@ts-ignore
            ).then((values) => values.filter(({status}) => status === 'fulfilled').map(({value}) => value)
        ))

}

