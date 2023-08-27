import { AxiosError } from 'axios';
import {getAccessToken, refreshAccessToken} from '../api'


export type Data  = {
    access_token?: string,
    refresh_token?: string,
    error?: AxiosError
}

export default function ACCESS_TOKEN (state: Data = {}, action: {type: string, payload?: Data}) {
    

    switch (action.type){
        case 'SET_ACCESS_TOKEN': 
            return {
                ...action.payload
            }

        default: return state;

            
        
    }

}