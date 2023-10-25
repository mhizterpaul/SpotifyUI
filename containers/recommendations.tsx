import useData from "@/components/data_hook"
import { getSeveralShows, test } from "@/utils/api"
import Recommendations from "@/components/main/recommendation"
import { useEffect } from "react"
import { connect } from "react-redux"
import { RootState} from "@/store"


//get props directly from redux
const RecommendationsContainer = ({ access_token }: {access_token: string | null}) => {
  const data = useData({callBack: () => getSeveralShows(access_token || '', '0', '20')})
  useEffect(()=>{}, [data]);
  
  return data.data === null ? <Loader status={data.status} meta={'recommendataions'}/> :  (
    <Recommendations recommendations = { data.data }/>
  );
}
const mapStateToProps = (state: RootState) => ({
  access_token: state.main.access_token,
});


export default connect(mapStateToProps)(RecommendationsContainer)