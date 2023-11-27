'use client'
import { useState } from "react";
import { ApiStatus } from "@/store/reducers/main_slice";
import useSWR from 'swr/immutable'


const res : {data: any, status: ApiStatus} = {
  data: null,
  status: 'IDLE'
} 

function useData(params: { callBack : () => Promise<any> }) {

  const [data, setData] = useState(res);


  useSWR('useData', () => {


    const fetchData: any= async()=> {

      if(data.status === 'PENDING' || data.data) return;

      setData((prev) => ({...prev, status: 'PENDING'}));

      try {
        const data = await params.callBack();
        setData((prev) => ({...prev, data, status: 'SUCCESS'}));
        return data;
      }catch(e: any){

        setData((prev) => ({...prev, error: e, status: 'ERROR'}));
      }

    }

    fetchData();

  });

  return data;
}

export default useData
