import axios from 'axios'
import {Payload} from './reducers/access_token'


export async function getAccessToken(){
    try{
        const {data} = await axios.get('http://localhost:3000/api/authenticate');
        return data
    }catch(err){
        return err
        }
    
}

export async function refreshAccessToken(refresh_token: string){
   try{     
        const {data} = await axios.get(`http://localhost:3000/api/authenticate?refresh_token=${refresh_token}`);
        return data.access_token;
    }catch(e){
        return e
    } 
}

export async function getFeaturedPlaylists(access_token: string, country: string){
    try {
        const { data } = await axios.get(`https://api.spotify.com/v1/browse/featured-playlists?country=${country}&limit=5`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return data.items.map((item: Payload) => {

            name: item.name
            id: item.id
            image: item.images[0].url
            href: item.href
            total: item.tracks.total 
        }) 
    }catch(e){
        return e
    }
 
}

export async function getPlaylist(access_token:string, id: string){
    try{
        const { data } = await axios.get(`https://api.spotify.com/v1/playlists/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
        return data.tracks.items.map((item: Payload) => {
            added_at: item.added_at
            href: item.href
            images: item.images[0].url
            name: item.track.name
            popularity: item.popularity
            artists: item.artists.map((artist: Payload) => artist.name)
            duration_ms: item.duration_ms
            description: item.description
            album: item.album.name
    
        })
    }catch(e){
        return e
    }
}

export async  function getSeveralShows(access_token: string){
    try{
        const {data} = await axios.get(`https://api.spotify.com/v1/browse/categories/show`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return {
            href: data.href,
            image: data.icons[0].url
        }
    }catch(e){
        return e
    }

}

export async function getCategories(access_token:string, country: string){
    const categories = ['podcast','madeforyou', 'charts', 'newreleases', 'discover', 'concerts'],
     payload = []; 
    for(const category of categories){
       try{
        const {data} = await axios.get(`https://api.spotify.com/v1/browse/categories/${category}?country=${country}`, {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        payload.push({
            href: data.href,
            image: data.icons[0].url
        }) 
       }catch(e){
            payload.push(e)
       }
    }

    return payload;
}

export async function getTopGenres(access_token: string){
    try{
        const {data} = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });
        return data.genres;
    }catch(e){
        return e
    }
}
