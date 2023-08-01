import axios from "axios"
import credentials from './apiKeys';



const onComplete = (subroute: string | ErrorEvent, accessToken? : string, setfeaturedPlaylist) => {

  const  setData = (callback)  => setfeaturedPlaylist(callback);

  if (typeof subroute === 'object' ) return setData((curr)=> ({...curr, error: subroute}));

  const url = `https://api.spotify.com/v1/${subroute}`;

  if(!accessToken) return;

    axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(
      (res) => setData((curr) => ({success: res,...curr}))
    ).catch((err) => setData((curr) => ({error: err,...curr}))
    );

};



const AsyncHelper = async (subroute: string, setfeaturedPlaylist) => {

  if (!subroute)  throw new Error('missing arguments');

  
  const { client_id, client_secret } = JSON.parse(credentials);

    let options = {
      url: 'https://accounts.spotify.com/api/token',
      method: 'POST',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(client_id + ':' + client_secret)}`
      },
      params: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    axios(options)
    .then((resp) => {
      onSuccess(subroute, resp.access_token, setfeaturedPlaylist)
    })
    .catch((err) => {
      onSuccess(err);
    })
    
}

export default AsyncHelper;


