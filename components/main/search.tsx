import { SeeAll } from './see-all'
import { getSeveralCategories } from '@/utils/api';
import { Category, Countries } from '@/utils/types';
import Image from 'next/image'
import { store } from '../../store/index'
import { random } from '@/utils';
import TopGenres from './top_genres';
import { useState, useMemo, memo } from 'react';




const Search = () => {

    const data: Category[][] = [], loaded: boolean[] = [];
    let itemCount = 8;

    const loadMoreItems = (startIndex: number, stopIndex: number) => {
        const access_token = store.getState().main.access_token;
        if (!access_token) return;
        const countries: Countries = ['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH'];
        for (let index = startIndex; index <= stopIndex; index++) {
            if (index === 0 || index === 1) {
                loaded[index] = true;
                continue;
            }
            if ((loaded[index] === false) || loaded[index]) continue;
            loaded[index] = false;
            if (access_token == null) return;
            getSeveralCategories(access_token, random(countries), String(index))
                .then(
                    (res) => { data[index] = res; loaded[index] = true }
                )
        }


    },
        calcItemSize = (index: number) => !index ? 27.1875 * 16 / 1.5 : (index === 1 ? 7 : 17.4375) * 16 / 1.5,
        isItemLoaded = (index: number) => loaded[index];

    const Row = ({ style, index }: { style: React.CSSProperties, index: number }) => {
        const [loadedState, setLoadedState] = useState(loaded[index]);
        if (loaded[itemCount]) itemCount = 15;
        const init = useMemo(() => {
            const setLoadedInterval = setInterval(() => loaded[index] && (() => { setLoadedState(true); clearInterval(setLoadedInterval) })(), 1000)
        }, []);
        const ImgContainerstyle: React.CSSProperties = {
            width: 14.4375 / 1.5 + 'rem',
            height: 14.4375 / 1.5 + 'rem',
            flexShrink: '0',
            borderRadius: '0.625rem',
            position: 'relative'
        }

        const imgStyle: React.CSSProperties = {
            width: 7 / 1.5 + 'rem',
            height: 7 / 1.5 + 'rem',
            flexShrink: '0',
            borderRadius: '0.6875rem 0rem 0.625rem 0rem',
            background: 'lightgray 50% / cover no-repeat',
            mixBlendMode: 'luminosity',
            position: 'absolute',
            bottom: '0',
            right: '0'
        }

        const ImageRow = () => (
            <div className={' flex justify-between items-center flex-wrap w-full gap-y-12 overflow-hidden '} style={style}>
                {data[index] && data[index].map((cateogry: Category) => {
                    return (() => useMemo(() => {
                        const bgColors = random(['#27856A', '#8D67AB', '#1E3264', '#E8115B']);
                        const myStyle = { ...ImgContainerstyle, backgroundColor: bgColors }
                        return (<figure key={cateogry.id} className={''} style={myStyle}><Image src={cateogry.image} width={100} height={100} fill={false} alt={cateogry.name} style={imgStyle} />
                            <figcaption className='top-4 left-4 absolute text-lg font-black'>{cateogry.name}</figcaption></figure>)
                    }, []))()
                })}
            </div>
        )



        if (!loadedState && !!index) return <div style={style} className={`h-[14.44rem] text-center my-auto italic`}>...loading</div>

        if (!index) return (() => useMemo(() => <TopGenres listStyle={style} />, []))()

        if (index === 1) return <h3 style={style} className={`h-4 mb-8`}>Browse all</h3>

        return <ImageRow />
    }


    return <SeeAll Row={Row} loadMoreItems={loadMoreItems} calcItemSize={calcItemSize} isItemLoaded={isItemLoaded} itemCount={itemCount} />
}

export default Search