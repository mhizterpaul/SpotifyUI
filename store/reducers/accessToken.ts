import {getAccessToken} from '../api'

export default function accessTokenReducer(state = {}, action: {type: string, payload?: any}) {

    switch (action.type){
        case 'getAccessToken': 
            const payload: {[key: string] : any}= {
                isloading: true
            }
            getAccessToken().then(res => {
                payload.isloading = false;
                payload.access_token = res.access_token ||
                null;
                payload.refresh_token = res.refresh_token || null;
                payload.error = res.error  || null;
            })
            return {
                ...state,
                ...payload
            }

            default: return state;

            
        
    }

}