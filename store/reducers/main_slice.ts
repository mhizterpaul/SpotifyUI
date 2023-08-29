import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export type State = {
    href: string,
    curr: number|null,
    history: string[]
}

const initialState: State = { 
    href: '/', 
    curr: null, 
    history: []
}

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
                    return state =  {
                        href: action.payload,
                        history: [...history, action.payload],
                        curr: (state.curr || 0) + 1
                    }
                }
                  state =  {
                    href: action.payload,
                    history: [...state.history, action.payload],
                    curr: (state.curr || 0) + 1
                }
            }

        }
    }

})

export const {goBack, goForward, pushRef} = MainSlice.actions;

export default MainSlice.reducer

