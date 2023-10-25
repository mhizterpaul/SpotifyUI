
import { VariableSizeList as List } from "react-window";
import InfiniteLoader from 'react-window-infinite-loader';
import React from 'react'
import { pushRef } from "@/store/reducers/main_slice";
import { greet } from "@/utils";
import Card from "./card";
import { store } from '../../store/index'
import { useAppDispatch } from "@/store/hooks";
import Image from "next/image";
import { getFeaturedPlaylists, getNewAlbumReleases, getSeveralArtists, getSeveralEpisodes, getSeveralShows } from "@/utils/api";



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

let sectionEnd: boolean; 
const loaded: boolean[] = [], data: { [key: string]: any }[] & { [key: string]: any }[][] = [];

const calcItemSize = (index: number) => {
  if (index === 0) return 210;
  if (index === 1 && sectionEnd) return 16;
  return 17.5625 * 16 / 1.5;

}

const isItemLoaded = (index: number) => loaded[index];

const loadMoreItems = (startIndex, stopIndex) => {

  const access_token = store.getState().main.access_token;

  for (let index = startIndex; index <= stopIndex; index++) {
    loaded.push(false);
    if (index === 0 && access_token) {
      getFeaturedPlaylists(access_token, 'US', String(index), '5')
        .then(res => { data[index] = res; loaded[index] = true; });
    }
    if (index % 3 === 1) {
      loaded[index] = true;
    }
    if ((index % 3 === 2 || ((index % 3 === 0) && index !== 0)) && access_token) {
      switch (index) {
        case 2:
        case 3: {
          getFeaturedPlaylists(access_token, 'US', String(index), '6')
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case 3 * 2 - 1:
        case 3 * 2: {
          getSeveralEpisodes(access_token, String(index))
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case (3 * 3) - 1:
        case (3 * 3): {
          getNewAlbumReleases(access_token, String(index))
          //@ts-ignore
            .then(res => { data[index] = res; loaded[index] = true; })
          break
        }
        case (3 * 4) - 1:
        case (3 * 4): {
          getSeveralShows(access_token, String(index), '6')
            .then(res => { data[index] = res; loaded[index] = true; })
          break;
        }
        case (3 * 5) - 1:
        case (3 * 5): {
          getSeveralArtists(access_token, String(index))
            .then(res => { data[index] = res; loaded[index] = true; })
        }
      }

    }

  }
}

const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {

  const dispatch = useAppDispatch();

  const FirstRow = () => (
    <>
      <section className={`flex flex-col gap-y-4 h-1/2 max-h-[210px] overflow-hidden mt-4 `} style={style}>
        <h3>{greet()}</h3>
        <div className='flex flex-row w-full items-center justify-between gap-x-8 gap-y-4 flex-wrap'>
          {data[index].map((el: any, id: number) =>
          (
            (<div key={el.id} className={'img-container ' + [(id === 4 && 'md:mr-[36%]')].join(' ')} style={styles} onClick={() => dispatch(pushRef(el.href))}>
              <Image src={el.image} alt={el.name} height={100} width={100} style={imgStyle} />
              <span className='inline-block absolute top-[30%] right-[40%] text-white'>{el.name}</span>
            </div>)
          ))
          }
        </div>
      </section>
      {sectionEnd = true}
    </>
  );

  const TitleRow = ({ title }: { title: string }) => {
    return (
      <>
        <h3 className='flex flex-row justify-between items-center' style={style}>
          {title}
          <span className='uppercase inline-block text-xs' >see all</span>
        </h3>
        {sectionEnd = false}
      </>
    )
  };

  const ImageRow = () => (
    <div className='flex gap-x-2 flex-wrap items-center overflow-hidden h-48' style={style}>
      {
        (typeof (data) === 'object' ? data.items : data).map((el) => <Card {...el} type='recommendations' key={el.id} />)
      }
    </div>
  )


  if (!data.length) return (
    <div className='italic text-center align-center my-auto'>...loading</div>
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
        return <TitleRow title={'Shows you might like'} />
      }
      case 1 + (3 * 4): {
        return <TitleRow title={'Popular artists'} />
      }
    }
  }

  if (index % 3 === 2 || ((index % 3 === 0) && index !== 0)) {
    index % 3 === 0 && (sectionEnd = true);
    return <ImageRow />
  }

  return (<div className='text-center py-auto'>
    something went wrong
  </div>)
}

const Home = () => {

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={15}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (

        <List
          className=""
          height={0.72 * window.innerHeight}
          itemCount={15}
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