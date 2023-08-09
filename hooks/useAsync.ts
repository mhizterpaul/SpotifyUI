import axios, { AxiosResponse } from "axios"
import credentials from '../utilities/apiKeys'
import {useState, useEffect} from 'react'



const data = async (subroute: string, accessToken? : string | AxiosResponse) =>  await axios.get(`https://api.spotify.com/v1/${subroute}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }), 
     useAsync =  (subroute: string) => {
  const [state, setState] = useState({}),
   getAccessToken = async () => {
    const { client_id, client_secret } = JSON.parse(credentials),
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
    
    return await axios(options);

  }, handleErr =  err => setState({data: null, error: err});

  useEffect(
    () => {
    getAccessToken().then(
      (res) => data(subroute, res.access_token).then(
        res => setState({data: res, error: null})
      ).catch(
       handleErr
      )
    ).catch(
      handleErr
    )}, [])

  return state;
}

export default useAsync;


