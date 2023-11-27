import {createSlice, PayloadAction} from '@reduxjs/toolkit'


export type ApiStatus = 'IDLE'|'PENDING'|'SUCCESS'|'ERROR';

export type State = {
    href: string,
    nowPlayingView: boolean,
    curr: number|null,
    history: string[],
    open: boolean,
    end: boolean | undefined,
    access_token: string| null,
}

const initialState: State = { 
    href: '/', 
    curr: null, 
    nowPlayingView: false,
    open: false,
    history: [],
    end: undefined,
    access_token: null,
}


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
        setNowPlayingView : (state, action:PayloadAction<boolean>)=> {
            return {
                ...state,
                nowPlayingView: action.payload
            }
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
        setAccessToken: (state, action: PayloadAction<string|null>) => {
            return {
                ...state,
                access_token: action.payload,
            }
        },
        setOpen: (state, action: PayloadAction<boolean>) => {
            return {
                ...state,
                open: action.payload
            }
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
    }

})

export const {goBack, goForward, pushRef, setHref, setOpen, setAccessToken,setNowPlayingView} = MainSlice.actions;

export default MainSlice.reducer

