import axios, { AxiosResponse } from 'axios'

export async function getAccessToken(){
        const payload = await axios.get('http://localhost:3000/api/authenticate');
        return payload.data.access_token ? 
        {access_token: payload.data.access_token,
             refresh_token: payload.data.refresh_token}  : 
        {error : payload.data.error};
    
}