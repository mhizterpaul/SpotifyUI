
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from 'react-window-infinite-loader';
import React, { useContext, useMemo, useState } from 'react'
import { pushRef } from "@/store/reducers/main_slice";
import { greet, random } from "@/utils";
import Card from "./card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Image from "next/image";
import { getAudioBooks, getFeaturedPlaylists, getNewAlbumReleases, getSeveralArtists, getSeveralEpisodes, getSeveralShows } from "@/utils/api";
import { Context } from "./withProvider";
import { Countries, AudioBookCountries } from "@/utils/types";



 interface BasicData {
  id: string;
  title?:string;
  name?:string;
  description?: string,
  author?:string;
  duration_ms?:string
  artists?:string[];
  authors?: string[];
  publisher?: string;
  type: string,
  release_date?: string,
  release_description?: string,
};

interface BasicDataWithImage extends BasicData{
  src?: never;
  image: string;
}

interface BasicDataWithSrc extends BasicData{
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


const loaded: boolean[] = [], data: Data[][]= []; 
const countries: Countries = ['US','NG','GB','ZA', 'JM', 'CA', 'GH']
const audioBookCountries:AudioBookCountries = ['US','GB','IE','NZ','AU'];
let access_token: string|null;
const calcItemSize = (index: number) => {
  if (index === 0) return 210;
  if (index % 3 === 1) return 16;
  return 18.5625 * 16 / 1.5;

}



//any clicked media that need to be fetched again 
//at destination should be cached
//dont forget to change countries for loadmore function

const isItemLoaded = (index: number) => loaded[index];
const loadMoreItems = (startIndex: number, stopIndex: number) => {
  if (!access_token) return
  for (let index = startIndex; index <= stopIndex; index++) {
    if(loaded[index] === false || loaded[index]) continue;
    loaded[index]= false;
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
        case (3*6) - 1: 
        case (3*6): {
          getAudioBooks(access_token, String(index), random(audioBookCountries))
          .then(res => { data[index] = res; loaded[index] = true; })
        }
      }

    }

  }
}

const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {

  //please load initial data on Load
  const dispatch = useAppDispatch();
  const {Cache} = useContext(Context);
  const [loadedState, setLoadedState] = useState(loaded[index]);
  access_token = useAppSelector(state => state.main.access_token);

  const init = useMemo(()=> {
    const setLoadedInterval = setInterval(()=> loaded[index]&&(()=>{setLoadedState(true);clearInterval(setLoadedInterval)})() , 1000)
  },[]);

  const FirstRow = () => (
    <>
      <section className={`flex flex-col gap-y-4 h-1/2 max-h-[210px] overflow-hidden mt-4 `} style={style}>
        <h3>{greet()}</h3>
        <div className='flex flex-row w-full items-center justify-between gap-x-8 gap-y-4 flex-wrap'>
          {data[index].map((el, id: number) =>
          (
            (<div key={el.id} className={'img-container ' + [(id === 4 && 'md:mr-[36%]')].join(' ')} style={styles} onClick={() => {Cache[el.id] = el ; dispatch(pushRef('/playlist/'+el.id))}}>
              <Image src={el.image||''} alt={el.name||''} height={100} width={100} style={imgStyle} />
              <span className='inline-block absolute top-[30%] right-[40%] text-white'>{el.name}</span>
            </div>)
          ))
          }
        </div>
      </section>
    </>
  );

  const TitleRow = ({ title }: { title: string }) => {
    return (
      <>
        <h3 className='flex flex-row justify-between items-center' style={style}>
          {title}
          <span className='uppercase inline-block text-xs' >see all</span>
        </h3>
      </>
      
    )
  };

  const ImageRow = () => (
    <div className='flex gap-x-2 flex-wrap items-center overflow-hidden h-48' style={style}>
      {
        data[index].map((el) => <Card {...el} key={el.id} />)
      }
    </div>
  )


  if (!loaded[index]) return (
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
      case 1 + (3*5): {
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
          className=""
          height={0.72 * window.innerHeight}
          itemCount={19}
          itemSize={calcItemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={'100%'}
        >
          {React.memo(Row)}
        </List>
      )}
    </InfiniteLoader>
  )
}

export default React.memo(Home)