import { store } from '@/store';
import Home from '.'
import Layout from '../components/rootLayout'
import { ReactElement } from 'react';
import qs from "query-string";
import { ErrorProps } from 'next/error';

export const getServerSideProps = async () => {
    try {
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
        const data = await res.json()

        return { props: { access_token: data.access_token } }
    } catch (e) {
        const data = JSON.stringify(e);

        return { props: { error: data } }
    }
}

export default function DynamicRoute({ access_token, error }: { access_token: string, error: ErrorProps }) {

    Home.getLayout = page => page;
    return <Home access_token={access_token} error={error} />

}

DynamicRoute.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}