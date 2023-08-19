import axios, { AxiosResponse } from 'axios'

export async function getAccessToken(){
        const payload = await axios.get('http://localhost:3000/api/authenticate');
        return payload.data.access_token ? 
        {access_token: payload.data.access_token,
             refresh_token: payload.data.refresh_token}  : 
        {error : payload.data.error};
    
}

export async function refreshAccessToken(refresh_token: string){
        const payload = await axios.get(`http://localhost:3000/api/authenticate?refresh_token=${refresh_token}`);
        return payload.data.access_token || payload.data.error;
}

export async function getFeaturedPlaylists(access_token: string){
    const payload = await axios.get('https://api.spotify.com/v1/browse/featured-playlists', {
        headers: {
            'Authorization': 'Bearer ' + access_token
        }
    });
    //reduce payload to media type
    return payload.data;
}
