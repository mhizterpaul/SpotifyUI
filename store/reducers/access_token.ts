import {getAccessToken, refreshAccessToken} from '../api'


type Payload  = {
    [key: string]: any
}

export default function ACCESS_TOKEN_REDUCER (state: Payload = {}, action: {type: string, payload?: any}) {
    
    const err = (error: any) => {
        state.error = error;
    };
    switch (action.type){
        case 'getAccessToken': 
            const data: Payload = {}
            getAccessToken().then(res => {
                data.access_token = res.access_token;
                data.refresh_token = res.refresh_token;
            }).catch(err);
            return {
                ...state,
                ...data
            };

        case 'refreshAccessToken':
            let access_token;
            refreshAccessToken(action.payload).then(res => {
                access_token = res.access_token;
            }).catch(err);
            return {
                ...state,
                access_token
            };

        default: return state;

            
        
    }

}