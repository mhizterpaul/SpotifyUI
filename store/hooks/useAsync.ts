import axios, { AxiosError, AxiosResponse } from "axios"
import {useState} from 'react'



  const useAsync =  (subroute: string) => {

    const [state, setState] = useState({}),
   fetchData = async () => {

    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID, 
    client_secret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
    options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(client_id + ':' + client_secret)}`
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };
    
 
    try{

      const accessToken =  await axios(options),
      res = await axios.get(`https://api.spotify.com/v1/${subroute}`, {
            headers: {
              Authorization: `Bearer ${accessToken.data.access_token}`
            }
          });

      setState({data: res.data, error: null});

    }catch{

      //set return type
      (err:AxiosError) => setState({data: null, error: err?.message || err});
    }

  }

  fetchData();

  return state;
}

const countryCode = new Intl.DisplayNames(['en'], { type: 'region' });
console.log(/*useAsync*/(
  `browse/featured-playlists?country=${countryCode}&locale=en_IN&limit=5`
)) ;

export default useAsync;


