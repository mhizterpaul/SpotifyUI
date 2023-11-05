import React, { use, useMemo, useState } from 'react';
import { VariableSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader';
import Card from './card';
import style from './main.list.module.css'
import { Data } from './home';
import { random } from '@/utils';
import { getSeveralEpisodes, getEpisode, getSeveralShows } from '@/utils/api';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';

type CallBack = (param: string) => Promise<any>;
let data: Data[][] = [];
let access_token: string | null;

//please remember to render images once they are loaded

export const SeeAll = ({ isItemLoaded, calcItemSize, loadMoreItems, Row, itemCount }) => {


  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
    >
      {({ onItemsRendered, ref }) => (

        <List
          className={style.list}
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

const params: { [key: string]: any } = {
  episodes: {
    title: 'Episodes',
    callBack: (index: string) => getSeveralEpisodes(access_token || '', index, random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']))
  },
  shows: {
    title: 'Shows',
    callBack: (index: string) => getSeveralShows(access_token || '', index, '6', random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']))
  }

}



export default () => {
  access_token = useAppSelector(state => state.main.access_token);
  const { id } = useParams();
  const { title, callBack } = params[id || Object.keys(params).length];

  const Row = ({ style, index }: { style: React.CSSProperties, index: number }) => {
    const [loadedState, setLoadedState] = useState(loaded[index]);
    if (loaded[itemCount]) itemCount = 15;
    const init = useMemo(() => {
      const setLoadedInterval = setInterval(() => loaded[index] && (() => { setLoadedState(true); clearInterval(setLoadedInterval) })(), 1000)
    }, []);


    const Title = () => (
      <h3>{title}</h3>
    );
    const ImageRow = () => (
      <div className='flex gap-x-2 gap-y-4 flex-wrap items-center overflow-hidden mb-4 h-52' style={style}>
        {
          data[index].map((el) => (() => useMemo(() => <Card {...el} type='recommendations' key={el.id} />, []))())
        }
      </div>
    )

    if (!data[index] && !!index) return <div className='italic text-center align-center h-[calc(18.5625rem/1.5)]'>loading...</div>
    if (index === 0) return <Title />
    return <ImageRow />
  }

  const loaded: any = []
  let itemCount = 8;
  const calcItemSize = (index: number) => (index === 0 ? 16 : 21.5625 * 16 / 1.5)

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      if (loaded[index] === false || loaded[index]) continue;
      loaded[index] = false;
      callBack(String(index)).then(
        (res) => { data[index] = res; loaded[index] = true }
      )
    }
  };

  const isItemLoaded = (index: number) => (loaded[index]);

  return <SeeAll isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems} calcItemSize={calcItemSize} Row={Row} itemCount={itemCount} />
}