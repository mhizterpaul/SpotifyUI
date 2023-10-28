import { SeeAll } from './see-all'
import { getSeveralCategories } from '@/utils/api';
import { Categories } from '@/utils/types';
import Image from 'next/image'
import { store } from '../../store/index'
import { random } from '@/utils';
import TopGenres from './top_genres';



const data: Categories[] = [], loaded: boolean[] = [];


//any clicked media that need to be fetched again 
//at destination should be cached

const Search = () => {


    const loadMoreItems = (startIndex: number, stopIndex: number) => {
        const access_token = store.getState().main.access_token;
        for (let index = startIndex; index <= stopIndex; index++) {
            if(index === 0 || index === 1){
                loaded[index] = true;
                continue;
            }
            loaded[index] = false;
            if (access_token == null) return;
            getSeveralCategories(access_token, String(index))
                .then(
                    (res) => { data.push(res); loaded[index] = true }
                )
        }


    },
        calcItemSize = (index: number) => !index ? 16 : (index === 1 ? 18.1875: 14.4375) * 16 / 1.5,
        isItemLoaded = (index: number) => loaded[index];

    const Row = ({ style, index }: { style: React.CSSProperties, index: number }) => {

        const bgColors = ['#27856A', '#8D67AB', '#1E3264', '#E8115B']

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

        const titleRow = <h3 style={style} className={`h-4 `}>Browse all</h3>

        const imageRow = (
            <div>
                {data[index].map((cateogry) => {
                    const myStyle = { ...style, ImgContainerstyle, background: random(bgColors) };

                    return (<figure key={cateogry.id} className={'img-container '} style={myStyle}><Image src={cateogry.image} width={100} height={100} fill={false} alt={cateogry.name} style={imgStyle} />
                        <figcaption className='top-4 left-4 absolute text-lg font-black'>{cateogry.name}</figcaption></figure>)
                })}
            </div>
        )

        if (!data[index].length && !!index) return <div style={style} className={`h-[14.44rem] text-center my-auto italic`}>...loading</div>

        if (!index) return { TopGenres }
        if(index === 1) return {titleRow}

        return { imageRow }
    }

    return <SeeAll Row={Row} loadMoreItems={loadMoreItems} calcItemSize={calcItemSize} isItemLoaded={isItemLoaded} />
}

export default Search