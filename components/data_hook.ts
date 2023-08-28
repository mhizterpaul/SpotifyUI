import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { refreshAccessToken } from '@/store/reducers/access_token_slice'

function useData(params: { callBack : () => any }) {

  const [data, setData] = useState({data: null, status: 'IDLE'});
  const selector = useAppSelector(state => state.access_token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(selector.fetchAccessTokenStatus === 'ERROR') return;

    const fetchData: any= async()=> {
      setData((prev) => ({...prev, status: 'PENDING'}));
      try {
        const data = await params.callBack();
        setData((prev) => ({...prev, children: data, status: 'SUCCESS'}));

      }catch(e: any){
        if(e.message.error.includes('expired')){
          await dispatch(refreshAccessToken(selector.access_token||''));
          if(selector.refreshAccessTokenStatus === 'SUCCESS') return await fetchData();
        }
        setData((prev) => ({...prev, error: e, status: 'ERROR'}));
      }

    }
    fetchData();
  }, []);

  return data;
}

export default useData
