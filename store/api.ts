import axios, { AxiosError, AxiosResponse } from 'axios'
import {Payload} from './types/data.d'


export async function getAccessToken(){
        const payload = await axios.get('http://localhost:3000/api/authenticate');
        return { access_token: payload.data?.access_token || null,
             refresh_token: payload.data?.refresh_token || null,
             error: payload.data ? null : payload
            }
    
}

export async function refreshAccessToken(refresh_token: string){
        const payload = await axios.get(`http://localhost:3000/api/authenticate?refresh_token=${refresh_token}`);
        return payload.data?.access_token || payload;
}

export async function getFeaturedPlaylists(access_token: string, country: string){
    const payload = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=5`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });

    return payload.data?.items.map((item: Payload) => 
        {
            name: item.name
            id: item.id
            image: item.images[0].url
            href: item.href
            total: item.tracks.total 
    }) || payload;
 
}

export async function getPlaylist(access_token:string, id: string){
    const payload = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });

    return payload.data?.tracks.items.map((item: Payload) => {
        added_at: item.added_at
        href: item.href
        images: item.images[0].url
        name: item.track.name
        popularity: item.popularity
        artists: item.artists.map((artist: Payload) => artist.name)
        duration_ms: item.duration_ms
        description: item.description
        album: item.album.name

    }) || payload;
}

export async  function getSeveralShows(access_token: string){
    const payload = await axios.get(`https://api.spotify.com/v1/browse/categories/show`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });

        return payload.data ? {
            href: payload.data.href,
            image: payload.data.icons[0].url
        } : payload

}

export async function getCategories(access_token:string, country: string){
    const categories = ['podcast','madeforyou', 'charts', 'newreleases', 'discover', 'concerts'],
     data = []; 
    for(const category of categories){
       const payload = await axios.get(`https://api.spotify.com/v1/browse/categories/${category}?country=${country}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        payload.data ? 
        data.push({
            href: payload.data.href,
            image: payload.data.icons[0].url
        }) : data.push(payload);
    }

    return data;
}

export async function getTopGenres(access_token: string){
    const payload = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });

    return payload?.data.genres || payload
}
