import {getAccessToken, refreshAccessToken} from '../api'
import {Payload} from '../types/data'

export default function accessTokenReducer(state: Payload = {}, action: {type: string, payload?: any}) {
    
    const err = (error: any) => {
        state.loading = false;
        state.error = error;
    };
    switch (action.type){
        case 'getAccessToken': 
            state.loading = true;
            getAccessToken().then(res => {
                state.isloading = false;
                state.access_token = res.access_token;
                state.refresh_token = res.refresh_token;
            }).catch(err);
            return state;

        case 'refreshAccessToken':
            state.loading = true;
            refreshAccessToken(action.payload).then(res => {
                state.loading = false;
                state.access_token = res.access_token;
            }).catch(err);
            return state;

        default: return state;

            
        
    }

}