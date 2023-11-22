import React, { useMemo, useState } from 'react';
import { VariableSizeList as List } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader';
import Card from './card';
import style from './main.list.module.css'
import { Data } from './home';
import { random } from '@/utils';
import { getSeveralEpisodes, getSeveralShows } from '@/utils/api';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { pushRef } from '@/store/reducers/main_slice';
import Loader from '../networkRequest';

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
          height={0.75 * window.innerHeight}
          itemCount={itemCount}
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
    callBack: (index: string) => getSeveralEpisodes(access_token, index, random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']))
  },
  shows: {
    title: 'Shows',
    callBack: (index: string) => getSeveralShows(access_token, index, '6', random(['US', 'NG', 'GB', 'ZA', 'JM', 'CA', 'GH']))
  }

}



export default () => {

  access_token = useAppSelector(state => state.main.access_token);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  if (!id) {
    dispatch(pushRef('/search'));
    return null;
  }

  const { title, callBack } = params[id];
  const loaded: boolean[] = []
  const calcItemSize = (index: number) => (index === 0 ? 40 : 21.5625 * 16 / 1.5)

  const loadMoreItems = (startIndex: number, stopIndex: number) => {
    if (!access_token) return;
    for (let index = startIndex; index <= stopIndex; index++) {
      if (loaded[index] === false || loaded[index]) continue;
      loaded[index] = false;
      callBack(String(index)).then(
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
  };

  const isItemLoaded = (index: number) => (loaded[index]);
  const Row = ({ style, index }: { style: React.CSSProperties, index: number }) => {
    const [loadedState, setLoadedState] = useState(loaded[index]);
    const init = useMemo(() => {
      if (!access_token) return;
      loadMoreItems(0, 13);
      const setLoadedInterval = setInterval(() => loaded[index] && (() => { setLoadedState(true); clearInterval(setLoadedInterval) })(), 1000)
    }, []);


    const Title = () => (
      <h3>{title}</h3>
    );
    const ImageRow = useMemo(() => () => (
      <div className='flex gap-x-4 gap-y-8 justify-between flex-wrap items-center overflow-hidden mb-4 h-52' style={style}>
        {
          data[index].map((el) => {
            const dispatch = useAppDispatch();
            return el.type === 'episode' ||
              el.type === 'show' ||
              el.type === 'album' ||
              el.type === 'playlist' ?
              {
                ...el, onClick: () => {
                  if (el.type === 'episode' || el.type === 'playlist') dispatch(pushRef('/' + el.type + '/' + el.id));
                  if (el.type === 'album') dispatch(pushRef('/playlist?album=' + el.id));
                  if (el.type === 'show') dispatch(pushRef('/episode?show=' + el.id));
                }
              } : el
          }).map((el) => <Card {...el} key={el.id} />)
        }
      </div>
    ), [data[index]])

    if (!loadedState && index === 1) return <Loader status={'PENDING'} meta={'Home'} style={{ position: 'absolute', top: '45%' }} />

    if (!loadedState && !!index) return null
    if (index === 0) return <Title />
    return <ImageRow />
  }

  return <SeeAll isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems} calcItemSize={calcItemSize} Row={Row} itemCount={13} />
}