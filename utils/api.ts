import axios from 'axios'
import {Recommendation, FeaturedPlaylist} from '@/utils/types'
import { Category } from '@/utils/types';
import { GenericPayload } from '@/utils/types';

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
        }}).then(({data}) => ({
            href: data.albums.href,
            items: data.albums.items.map((album) => ({
                href: album.href,
                image: album.images[0].url,
                name: album.name,
                id: album.id,
                release_date: album.release_date,
                artists: album.artists.map(artist => ({ name: artist.name}) )
            }))
        }));
}
export function getSeveralArtists (access_token: string, offset: string){
    return search('artist',access_token, offset).then(({data}) => data.artists.items.map(artist => ({
        id: artist.id,
        image: artist.images[0].url,
        name: artist.name,

    })))
}
export function getAudioBooks(access_token: string, offset: string){
   return search('artist',access_token, offset).then(({data}) => data.audiobooks.items.map(audiobook => ({
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
   return  search('artist',access_token, offset).then(({data}) => data.episodes.items.map(episode => ({
        audio_preview_url: episode.audio_preview_url,
        description: episode.description,
        duration_ms: episode.duration_ms,
        id: episode.id,
        image: episode.image[0].url,
        release_date: episode.release_date,
        name: episode.name
    })))
}
export function getEpisode(access_token: string, id: string){
    return axios.get(`https://api.spotify.com/v1/episodes/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(
            ({data}) => ({publisher: data.show.publisher, total: data.show.total_episodes})
        )
}

export function getcategoryplaylist(access_token:string, category: string, offset: string){
    return axios.get(`https://api.spotify.com/v1/browse/categories/${category}/playlists?offset=${offset}&limit=6`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}) => ({
            name: category,
            items: data.playlists.map(playlist => ({
                id: playlist.id,
                name: playlist.name,
                image: playlist.images[0].url,
            }))
        }))
}

export function getSeveralAlbums(access_token: string, ids: string[]){
    return axios.get(`https://api.spotify.com/v1/albums?${ids.join('%')}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}) => ({
              href: data.href,
              id: data.id,
              image: data.images[0].url,
              name: data.name,
              release_date: data.release_date,
              artists: data.artists.map(artist => artist.name),
              tracks: data.tracks.items.map((track) => ({
                id: track.id,
                name: track.name,
                disc_number: track.disc_number,
                duration_ms: track.duration_ms,
                artist: track.artist.map(artist => artist.name)
              }))
        }))
}
//TO DO
//implement next for each api get return data

export function getFeaturedPlaylists(access_token: string, country: string, offset:string, limit:string){
   
        return  axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&offset=${offset}&limit=${limit}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) : FeaturedPlaylist[] => data.playlists.items.map((el : GenericPayload)=> ({
            id: el.id,
            image: el.images[0].url,
            name: el.name,
            href: el.tracks.href
        })));
 
}

export function getPlaylist(access_token:string, id: string){
    
    return axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then (({data}) => {
            
            return {
                name: data.name,
                image: data.images[0].url,
                href: data.href,
                followers: data.followers.total,
                description: data.description,
                total: data.tracks.total,

                items: data.tracks.items.map((item: GenericPayload) => ({
            added_at: item.added_at,
            href: item.href,
            image: item.images[0].url,
            name: item.track.name,
            popularity: item.popularity,
            artists: item.artists.map((artist: GenericPayload) => ({name: artist.name, image: artist.images[0].url, followers: artist.followers.total, popularity: artist.popularity})),
            duration_ms: item.duration_ms,
            description: item.description,
            album: item.album.name,
            total: item.tracks.total
        }))}
    }
            )

}

export function getSeveralShows(access_token: string, offset: string, limit: string){

    return search('show', access_token, offset, limit).then(({data}) : Recommendation[] => {

            return data.shows.items.map((el: GenericPayload) => ({
                src: el.images[0].url,
                title: el.name,
                author: el.publisher,
                url: el.external_urls.spotify,
                description: el.description,
            }));
        })

}

export function getSeveralCategories(access_token:string, offset: string){
    
    return axios.get(`https://api.spotify.com/v1/browse/categories?country=US&offset=${offset}limit=6`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) : Category[] => {
            
            return data.categories.items.map((category : GenericPayload) => ({
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
            ({data}) => Promise.allSettled(
                data.genres.map((id: string) => {

                    return axios.get(`https://api.spotify.com/v1/browse/categories/${id}`, {
                        headers: {
                            'Authorization': 'Bearer ' + access_token
                        }
                    }).then(({data}) => ({
                        ...data,
                        image: data.icons[0].url
                    }))
                })
            ).then((values) => values.filter((value) => value.status === 'fulfilled').map(({value}) => value))
        )

}


 export const test : (Category & Recommendation & FeaturedPlaylist)[] = [...new Array(20)].map(el => ({
    id: 'test',
    name: 'test',
    image: 'http://localhost:3000/static/images/test.jpeg',
    src: 'http://localhost:3000/static/images/test.jpeg',
    href: 'google.com',
    title: 'test',
    author: 'test',
    description: 'test',
    url: 'google.com',
}));