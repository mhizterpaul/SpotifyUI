import { SeeAll } from './seeAll'
import { getSeveralCategories } from '@/utils/api';
import { Category, Countries } from '@/utils/types';
import Image from 'next/image'
import { store } from '../../store/index'
import { random } from '@/utils';
import TopGenres from './topGenres';
import { useState, useMemo, useContext } from 'react';
import { pushRef } from '@/store/reducers/main_slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Context } from '@/containers/rootProvider';
import Loader from '../networkRequest';




const Search = () => {

    const dispatch = useAppDispatch()
    const data: Category[][] = [], loaded: boolean[] = [];
    const { setProp } = useContext(Context);
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
            getSeveralCategories(access_token, random(countries), String(index))
                .then(
                    (res) => { data[index] = res; loaded[index] = true }
                )
        }
        return new Promise<void>((resolve) => {
            const timeOut = setInterval(() => {
                if (loaded.slice(startIndex, stopIndex).every((item) => item)) {
                    clearInterval(timeOut);
                    resolve();
                }
            }, 1000)
        });

    },
        calcItemSize = (index: number) => !index ? 27.1875 * 16 / 1.5 : (index === 1 ? 7 : 17.4375) * 16 / 1.5,
        isItemLoaded = (index: number) => loaded[index];

    const Row = ({ style, index }: { style: React.CSSProperties, index: number }) => {
        const [loadedState, setLoadedState] = useState(loaded[index]);
        const access_token = useAppSelector(store => store.main.access_token)
        const init = useMemo(() => {
            if (!access_token) return;
            loadMoreItems(0, 13);
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

        const ImageRow = useMemo(() => () => (
            <div className={' flex justify-around gap-x-8 items-center flex-wrap w-full gap-y-12 overflow-hidden '} style={style}>
                {data[index] && data[index].map((category: Category) => {

                    const bgColors = useMemo(() => random(['#27856A', '#8D67AB', '#1E3264', '#E8115B']), []);
                    const myStyle = { ...ImgContainerstyle, backgroundColor: bgColors }
                    const onClick = () => {
                        setProp('currentPlaylist', category);
                        dispatch(pushRef('/playlist?category=' + category.name));
                    }
                    return (<figure key={category.id} onClick={onClick} className={''} style={myStyle}><Image src={category.image} width={100} height={100} fill={false} alt={category.name} style={imgStyle} />
                        <figcaption className='top-4 left-4 absolute text-lg font-black w-[calc((14.5rem/1.5)-1rem)] truncate'>{category.name}</figcaption></figure>)
                })}
            </div>
        ), []);



        if (!loadedState && index === 1) return <Loader status={'PENDING'} meta={'Home'} style={{ position: 'absolute', top: '45%' }} />

        if (!loadedState && !!index) return null

        if (!index) return (() => useMemo(() => <TopGenres listStyle={style} />, []))()

        if (index === 1) return <h3 style={style} className={`h-4 mb-8`}>Browse all</h3>

        return <ImageRow />
    }


    return <SeeAll Row={Row} loadMoreItems={loadMoreItems} calcItemSize={calcItemSize} isItemLoaded={isItemLoaded} itemCount={13} />
}

export default Search