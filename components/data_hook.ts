'use client'
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAccessToken } from "@/utils/api";
import { ApiStatus } from "@/store/reducers/main_slice";
import useSWR from 'swr/immutable'


const res : {data: any, status: ApiStatus} = {
  data: null,
  status: 'IDLE'
} 

function useData(params: { callBack : () => any }) {

  const [data, setData] = useState(res);
  
  const selector = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();

  useSWR('useData', () => {


    const fetchData: any= async()=> {

      if(data.status === 'PENDING' || data.data) return;

      setData((prev) => ({...prev, status: 'PENDING'}));

      try {
        const data = await params.callBack();
        setData((prev) => ({...prev, data, status: 'SUCCESS'}));
        return data;
      }catch(e: any){

        if(e.data.error.message.includes('expired')){
          await dispatch(getAccessToken);
          if(selector.fetchAccessTokenStatus === 'SUCCESS') fetchData();
        }

        setData((prev) => ({...prev, error: e, status: 'ERROR'}));
      }

    }

    fetchData();

  });

  return data;
}

export default useData
