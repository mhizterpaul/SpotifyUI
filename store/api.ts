import axios from 'axios'
import Error from 'next/error';
import qs from 'query-string';

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
        }).then(({data}) => data.playlists.items.map((el)=> ({
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

    return axios.get(`https://api.spotify.com/v1/browse/categories/show`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) => {
            return {
                href: data.href,
                image: data.icons[0].url
            }
        })
}

export function getCategories(access_token:string,category:string, country: string){
    
    return axios.get(`https://api.spotify.com/v1/browse/categories/${category}?country=${country}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then(({data}) => {
            return {
            href: data.href,
            image: data.icons[0].url
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
