import React, { useMemo, useState } from 'react';
import {VariableSizeList as List} from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader';
import Card from './card';

type CallBack = (param: string) => Promise<any>;
let data:any[]&{ items: any[]};

//please remember to render images once they are loaded

const Row  = ({title, style, index}: {style: React.CSSProperties, index: number, title: string}) => {
  const [loadedState, setLoadedState] = useState(loaded[index]);

  const init = useMemo(()=> {
    const setLoadedInterval = setInterval(()=> loaded[index]&&(()=>{setLoadedState(true);clearInterval(setLoadedInterval)})() , 1000)
  },[]);
    const Title = () => (
        <h3>{title}</h3>
    );
    const ImageRow = ()  => (
        <div className='flex gap-x-2 flex-wrap items-center overflow-hidden h-48' style={style}>
          {
            (typeof (data[index]) === 'object' ? data[index].items : data[index]).map((el) => <Card {...el} type='recommendations' key={el.id} />)
          }
        </div>
      )

      if(!data[index] && !!index) return <div className='italic text-center align-center h-[calc(18.5625rem/1.5)]'>loading...</div>
      if(index === 0) return <Title />
      return <ImageRow />
}
const loaded: any = []

const calcItemSize = (index: number) => (index===0? 16: 18.5625*16/1.5)

const loadMoreItems = (startIndex:number, stopIndex: number, callBack: CallBack)=> {
  
    for(let index=startIndex; index<= stopIndex; index++){
      if(loaded[index] === false || loaded[index]) continue;
      loaded[index] = false;
        callBack(String(index)).then(
            (res) => {data[index]=res; loaded[index]=true}
        )
    }
};

const isItemLoaded = (index: number) => (loaded[index]);

export const SeeAll = ({isItemLoaded, calcItemSize, loadMoreItems, Row}) => {

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

export default ({callBack, title}: {callBack: CallBack, title: string}) => <SeeAll isItemLoaded={isItemLoaded} calcItemSize={calcItemSize} loadMoreItems={(startIndex:number, stopIndex:number)=>loadMoreItems(startIndex, stopIndex, callBack)} Row={({style , index}: {style: React.CSSProperties, index: number})=> <Row style={style} index={index} title={title}/>}/>