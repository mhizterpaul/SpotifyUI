import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAccessToken } from "@/store/api";

function useData(params: { callBack : () => any }) {

  const [data, setData] = useState({data: null, status: 'IDLE'});
  const selector = useAppSelector(state => state.main);
  const dispatch = useAppDispatch();

  useEffect(() => {


    const fetchData: any= async()=> {

      if(data.status === 'PENDING' || data.data) return;

      setData((prev) => ({...prev, status: 'PENDING'}));

      try {
        const data = await params.callBack();
        setData((prev) => ({...prev, data, status: 'SUCCESS'}));
      }catch(e: any){

        if(e.message.error.includes('expired')){
          await dispatch(getAccessToken);
          if(selector.fetchAccessTokenStatus === 'SUCCESS') fetchData();
        }

        setData((prev) => ({...prev, error: e, status: 'ERROR'}));
      }

    }

    fetchData();

  }, [data, dispatch, params, selector.fetchAccessTokenStatus]);

  return data;
}

export default useData
