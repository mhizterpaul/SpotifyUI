import { NextPage } from 'next';
import { AppProps } from 'next/app';
import '../components/globals.css'
import { ReactElement, useEffect, useState } from 'react';


type Page<P = {}> = NextPage<P> & {
    getLayout?: (page: ReactElement) => ReactElement;
};

type Props = AppProps & {
    Component: Page;
};

function App({ Component, pageProps }: Props) {

    const getLayout = Component.getLayout || ((page: ReactElement) => page);
    const [render, setRender] = useState(false);

    useEffect(() => setRender(true), []);
    return render ?
        getLayout(<Component {...pageProps} />)
        : null;
}
export default App;