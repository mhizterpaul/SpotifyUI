import { NextResponse } from "next/server";
import qs from "query-string";


export async function GET(){

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
                grant_type: 'client_credentials'
                }) 
          });
          const data = await res.json();
          return res.ok ? NextResponse.json(data) : NextResponse.json(data, {status: 502});

}