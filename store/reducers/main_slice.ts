import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getAccessToken } from '../api';


export type ApiStatus = 'IDLE'|'PENDING'|'SUCCESS'|'ERROR';

export type State = {
    href: string,
    curr: number|null,
    history: string[],
    access_token: string| null,
    fetchAccessTokenStatus: ApiStatus
}

const initialState: State = { 
    href: '/', 
    curr: null, 
    history: [],
    access_token: null,
    fetchAccessTokenStatus: 'IDLE'
}

export const fetchAccessToken = createAsyncThunk('access_token/fetchAccessToken', getAccessToken);

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        goBack: (state) => {
            if(state.curr && state.curr !== 0) return {
                ...state,
                href: state.history[state.curr-1],
                curr: state.curr-1,
            }
        },
        goForward: (state) => {
            if(state.curr && state.curr !== state.history.length) return {
                ...state,
                href: state.history[state.curr+1],
                curr: state.curr+1,
            }
        }, 
        pushRef: (state, action: PayloadAction<string>) => {
            if(action.payload.startsWith('/') && state.history[state.curr || 0] !== action.payload){
                if(state.curr !== 0 && state.curr !== (state.history.length)){
                    const history = state.history.slice(state.curr || state.history.length);
                    return  {
                        ...state,
                        href: action.payload,
                        history: [...history, action.payload],
                        curr: (state.curr || 0) + 1
                    }
                }
                  return {
                    ...state,
                    href: action.payload,
                    history: [...state.history, action.payload],
                    curr: (state.curr || 0) + 1
                }
            }

        }
    }, 
    extraReducers: (builder) => {

        builder.addCase(fetchAccessToken.pending, (state, action) => {
            state.fetchAccessTokenStatus = 'PENDING';
        })
        builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
            state.fetchAccessTokenStatus = 'SUCCESS'
            state.access_token = action.payload.access_token;
            ;
        })
        builder.addCase(fetchAccessToken.rejected, (state, action) => {
            state.fetchAccessTokenStatus = 'ERROR'
        })

    }

})

export const {goBack, goForward, pushRef} = MainSlice.actions;

export default MainSlice.reducer

