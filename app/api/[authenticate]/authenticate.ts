

import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';


export default async function GET(req: NextApiRequest, res: NextApiResponse) {
    const client = {
        id: process.env.SPOTIFY_CLIENT_ID,
        secret: process.env.SPOTIFY_CLIENT_SECRET,
        url: 'http://localhost:3000/api/authenticate'
    };


    if (req.query.code == null && req.query.error == null) return res.redirect(200, `https://accounts.spotify.com/authorize?response_type=code&
    client_id:${client.id}&redirect_url=${client.url}`);
    

    if(req.query.error) return res.status(400).json({error: req.query.error});

    if(req.query.refresh_token) {
        const refresh_token = await axios.post('https://accounts.spotify.com/api/token', {
            grant_type: 'refresh_token',
            refresh_token: req.query.refresh_token
        }, {
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(client.id + ':' + client.secret).toString('base64')),
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        return refresh_token.data.access_token ? res.status(200).json({access_token: refresh_token.data.access_token}) : res.status(400).json({...refresh_token});
    }


    const access_token = await axios.post('https://accounts.spotify.com/api/token', {
        grant_type: 'authorization_code',
        redirect_uri: client.url,
        code: req.query.code,

        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });

        access_token.data.access_token ? res.status(200).json({access_token: access_token.data.access_token, refresh_token: access_token.data.refresh_token}) : res.status(400).json({error: access_token});


    }