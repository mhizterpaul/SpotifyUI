import axios from 'axios'
import {Recommendation, FeaturedPlaylist} from '@/store/types'

type Payload = {
    [key:string] : any
}

export function getAccessToken(){
    return axios.get('http://localhost:3000/api/auth').then(
        res => res.data
    );
}


export function getFeaturedPlaylists(access_token: string, country: string){
   
        return  axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=5`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) : FeaturedPlaylist[] => data.playlists.items.map((el : Payload)=> ({
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
        }).then (({data}) => data.tracks.items.map((item: Payload) => ({
            added_at: item.added_at,
            href: item.href,
            images: item.images[0].url,
            name: item.track.name,
            popularity: item.popularity,
            artists: item.artists.map((artist: Payload) => artist.name),
            duration_ms: item.duration_ms,
            description: item.description,
            album: item.album.name,
            total: item.tracks.total
        }))
            )

}

export function getSeveralShows(access_token: string){

    return axios.get(`https://api.spotify.com/v1/search?q=a%20e%20&type=show&market=US&limit=30`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }}).then(({data}) : Recommendation[] => {

            return data.shows.items.map((el: Payload) => ({
                src: el.images[0].url,
                title: el.name,
                author: el.publisher,
                url: el.external_urls.spotify,
                description: el.description,
            }));
        })

}

export function getSeveralCategories(access_token:string, categories: string[]){
    
    return axios.get(`https://api.spotify.com/v1/browse/shows/ids=${categories}?country=${country}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) => {
            return {
            href: data.href,
            image: data.icons[0].url,
            name: data.name
        }})
}

export function getTopGenres(access_token: string){

       return axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(
            ({data}) => data.genres
        )

}
