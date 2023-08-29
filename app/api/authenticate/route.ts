import { store } from '@/store';
import { setAccessToken } from '@/store/reducers/access_token_slice';
import {NextResponse} from 'next/server';
import qs from 'query-string';

export async function GET(req: Request) {
    const uri= 'http://localhost:3000/api/authenticate', params = new URL(req.url).searchParams;


    if (params.get('code') == null && params.get('error') == null) {
        
        return NextResponse.redirect(`https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.SPOTIFY_CLIENT_ID}&redirect_uri=${uri}&show_dialog=false`);
    }
    

    if(params.get('error')) return NextResponse.json({error: params.get('error')}, {status: 502});

    if(params.get('refresh_token')) {

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: qs.stringify({
                refresh_token: params.get('refresh_token'),
                grant_type: 'refresh_token'
                }) 
          });

          const response = await res.json();
          if(res.ok) {
            return NextResponse.json({access_token: response.access_token});
          }
          return NextResponse.json({error: response}, {status: 502});

    }

        const res = await fetch('https://accounts.spotify.com/api/token', {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "same-origin", 
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer", 
            body: qs.stringify({
                code: params.get('code'),
                redirect_uri: uri,
                grant_type: 'authorization_code'
                }) 
          });

          const response = await res.json();
          
          if(res.ok) {
            store.dispatch(setAccessToken({access_token: response.access_token, refresh_token: response.refresh_token}));
            return NextResponse.json('access token dispatched');
          }

          return NextResponse.json({error: response}, {status: 502});

    }