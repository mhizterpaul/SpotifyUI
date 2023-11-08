
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from 'react-window-infinite-loader';
import React, { useMemo, useState } from 'react'
import { pushRef } from "@/store/reducers/main_slice";
import { greet, random } from "@/utils";
import Card from "./card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { getAudioBooks, getFeaturedPlaylists, getNewAlbumReleases, getSeveralArtists, getSeveralEpisodes, getSeveralShows } from "@/utils/api";
import { Countries, AudioBookCountries } from "@/utils/types";
import { store } from '../../store/index'
import PlayIcon from '../common/play'
import style from './main.list.module.css'

interface BasicData {
  id: string;
  title?: string;
  name?: string;
  description?: string | null,
  author?: string;
  duration_ms?: number,
  artists?: string[];
  authors?: string[];
  publisher?: string;
  type: string,
  onClick?: () => any,
  release_date?: string,
  release_description?: string,
};

interface BasicDataWithImage extends BasicData {
  src?: never;
  image: string | null;
}

interface BasicDataWithSrc extends BasicData {
  src: string;
  image?: never;
}

export type Data = BasicDataWithImage | BasicDataWithSrc;



const styles: React.CSSProperties = {
  width: 22.56269 / 1.5 + 'rem',
  height: 6.25 / 1.5 + 'rem',
  flexShrink: '0',
  borderRadius: '0.25rem',
  background: '#303030',
  color: '#303030',
  position: 'relative'
}
const imgStyle = {
  width: 6.25 / 1.5 + 'rem',
  height: 6.25 / 1.5 + 'rem',
  flexShrink: '0',
  borderRadius: '0.25rem 0rem 0rem 0.25rem'
}


const loaded: boolean[] = [], data: Data[][] = [];
const countries: Countries = ['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']
const audioBookCountries: AudioBookCountries = ['US', 'GB', 'IE', 'NZ', 'AU'];
const calcItemSize = (index: number) => {
  if (index === 0) return 234;
  if (index % 3 === 1) return 120;
  return 22.5625 * 16 / 1.5;

}




//images wont load invalid access token on first loaditem

const isItemLoaded = (index: number) => loaded[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
  const access_token = store.getState().main.access_token;
  if (!access_token) return;
  for (let index = startIndex; index <= stopIndex; index++) {
    if (loaded[index] === false || loaded[index]) continue;
    loaded[index] = false;
    if (index === 0) {
      getFeaturedPlaylists(access_token, random(countries), String(index), '5')
        .then(res => { data[index] = res; loaded[index] = true; })
    }
    if (index % 3 === 1) {
      loaded[index] = true;
    }
    if ((index % 3 === 2 || ((index % 3 === 0) && index !== 0)) && access_token) {
      switch (index) {
        case 2:
        case 3: {
          getFeaturedPlaylists(access_token, random(countries), String(index), '6')
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case 3 * 2 - 1:
        case 3 * 2: {
          getSeveralEpisodes(access_token, String(index), random(countries))
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case (3 * 3) - 1:
        case (3 * 3): {
          getNewAlbumReleases(access_token, String(index), random(countries))
            .then(res => { data[index] = res; loaded[index] = true; })
          break
        }
        case (3 * 4) - 1:
        case (3 * 4): {
          getSeveralShows(access_token, String(index), '6', random(countries))
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case (3 * 5) - 1:
        case (3 * 5): {
          getSeveralArtists(access_token, String(index), random(countries))
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case (3 * 6) - 1:
        case (3 * 6): {
          getAudioBooks(access_token, String(index), random(audioBookCountries))
            .then(res => { data[index] = res; loaded[index] = true; })
        }
      }

    }

  }
}

const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {

  const dispatch = useAppDispatch();
  const [loadedState, setLoadedState] = useState(loaded[index]);
  const access_token = useAppSelector(store => store.main.access_token);
  const init = useMemo(() => {
    if (!access_token) return;
    loadMoreItems(0, 19);
    const setLoadedInterval = setInterval(() => loaded[index] && (() => { setLoadedState(true); clearInterval(setLoadedInterval) })(), 1000)
  }, [access_token]);

  const FirstRow = useMemo(() => () => (

    <section className={`flex flex-col content-start gap-y-4 h-1/2 max-h-[210px] overflow-hidden mt-4 `} style={style}>
      <h3 className=" text-3xl ">{greet()}</h3>
      <div className='flex flex-row w-full items-center justify-start content-start gap-x-8 gap-y-6 flex-wrap'>
        {data[index].map((el, id: number) =>
        (
          (<div key={el.id} style={styles} className=' group ' onClick={() => dispatch(pushRef('/playlist/' + el.id))} >
            <Image src={el.image || ''} alt={el.name || ''} height={100} width={100} style={imgStyle} />
            <span className='inline-block absolute top-[40%] left-[85px] text-white w-[calc((22.56269rem-6.25rem)/1.5)] truncate '>{el.name}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" className={`hidden h-1/3 w-auto text-[#1ed760] z-10 absolute bottom-[2%] right-[5%] group-hover:block shadow rounded-full 
             bg-gradient-to-r from-white to-white bg-no-repeat bg-center `} style={{ backgroundSize: '40% 40%' }} viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zM9.5 16.5v-9l7 4.5l-7 4.5z" /></svg>
          </div>)
        ))
        }
      </div>
    </section>
  ), [loaded[index]]);

  const TitleRow = ({ title }: { title: string }) => {
    return (
      <>
        <h3 className='flex flex-row justify-between mt-12 items-start mb-auto' style={style}>
          {title}
          <span className='inline-block text-gray-600 font-semibold text-xs hover:underline' >Show all</span>
        </h3>
      </>

    )
  };


  const ImageRow = useMemo(() => () => (
    <div className='flex justify-between gap-8 flex-wrap items-center overflow-hidden h-[14rem] ' style={style}>
      {
        data[index].map((el) => {
          return el.type === 'episode' ||
            el.type === 'show' ||
            el.type === 'album' ||
            el.type === 'playlist' ?
            {
              ...el, onClick: () => {
                if(el.type === 'episode' || el.type === 'playlist') dispatch(pushRef('/' + el.type + '/' + el.id));
                if(el.type === 'album') dispatch(pushRef('/playlist?album='+ el.id ));
                if(el.type === 'show') dispatch(pushRef('/episode?show=' + el.id));
              }
            } : el
        }).map((el) => <Card {...el} key={el.id} />)
      }
    </div>
  ), [loaded[index]])

  if (!loadedState) return (
    <div className='italic text-center align-center h-[calc(18.5625rem/1.5)] my-auto'>...loading</div>
  )


  if (index === 0) {
    return <FirstRow />;
  }
  if (index % 3 === 1) {

    switch (index) {
      case 1: {
        return <TitleRow title={'Today\'s biggest hits'} />
      }
      case 4: {
        return <TitleRow title={'Episodes for you'} />
      }
      case 1 + (3 * 2): {
        return <TitleRow title={'Popular new releases'} />
      }
      case 1 + (3 * 3): {
        return <TitleRow title={'Shows to try'} />
      }
      case 1 + (3 * 4): {
        return <TitleRow title={'Popular artists'} />
      }
      case 1 + (3 * 5): {
        return <TitleRow title={'Audiobooks for you'} />
      }
    }
  }


  if (index % 3 === 2 || index % 3 === 0) return <ImageRow />

  return (<div className='text-center h-[18.5625rem/1.5] py-auto'>
    something went wrong
  </div>)
}

const Home = () => {

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={19}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (

        <List
          className={style.list}
          height={0.72 * window.innerHeight}
          itemCount={19}
          itemSize={calcItemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={'100%'}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  )
}

export default Home