import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { getAccessToken } from '../../utils/api';

export type ApiStatus = 'IDLE'|'PENDING'|'SUCCESS'|'ERROR';

export type State = {
    href: string,
    curr: number|null,
    history: string[],
    end: boolean | undefined,
    access_token: string| null,
    fetchAccessTokenStatus: ApiStatus
}

const initialState: State = { 
    href: '/', 
    curr: null, 
    history: [],
    end: undefined,
    access_token: null,
    fetchAccessTokenStatus: 'IDLE'
}

export const fetchAccessToken = createAsyncThunk('access_token/fetchAccessToken', getAccessToken);

export const MainSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
        goBack: (state) => {
            const {curr, history,href, end} = state;
            if((curr != null) && (curr === history.length -1 ) && (history.length >= 2) && (href !== history[history.length - 1])) return {
                ...state,
                href: history[history.length -1]
            }
            
            if((curr != null) && (curr > 0) && (history.length >= 2)) return {
                ...state,
                href: history[curr-1],
                curr: curr-1,
                end: false
            }
 

            return state;
        },
        goForward: (state) => {
            const {curr, href, history } = state;

            if((curr !== null) && (curr === 0) && (href !== history[0])) return {
                ...state,
                href: history[0]
            }

            if((curr !== null) && (curr === history.length - 2))return {
                ...state,
                href: history[curr+1],
                curr: curr+1,
                end: true
            }

            if((curr !== null) && (curr < history.length-2)) return {
                ...state,
                href: history[curr+1],
                curr: curr + 1,
                end: false
            }

            return state;
        }, 
        setHref: (state, action: PayloadAction<string>) => {
            if(action.payload.startsWith('/')) return {...state, href: action.payload}
            return state
        },
        pushRef: (state, action: PayloadAction<string>) => {
            const {curr, history, end, href} = state;

            if((action.payload === 'next') || (action.payload === 'previous')) return {
                ...state,
                href: action.payload === 'next' ? '/search' : '/'
            } 

            if(action.payload.startsWith('/')){
                if((curr == null) && (action.payload !== href)) return {
                    ...state,
                    history: [action.payload],
                    curr: 0,
                    end: true,
                    href: action.payload
                }
                if((curr !== null) && history.includes(action.payload)){
                    if((end === false) && (curr !==  history.length-1)){
                        return {
                            ...state,
                            history: [...history].splice( curr, 0, action.payload),
                            curr: curr + 1,
                            href: action.payload
                        }
                    }
                    return{
                        ...state,
                        curr: history.lastIndexOf(action.payload),
                        href: action.payload
                    }
                }
                if((end === true) && (curr !== (history.length-1))) return {
                    ...state,
                    history: [...history, action.payload],
                    curr: history.length-1,
                    href: action.payload
                }
                if((curr != null) && (curr === (history.length-1))) return {
                    ...state,
                    history: [...history, action.payload],
                    curr: curr + 1,
                    href: action.payload
                }

                if((curr != null) && (curr > 0) && (curr < (history.length -1))) return {
                    ...state,
                    history: [...history].splice( curr, 0, action.payload),
                    curr: curr + 1,
                    href: action.payload
                }
            }

            return state;

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

export const {goBack, goForward, pushRef, setHref} = MainSlice.actions;

export default MainSlice.reducer

