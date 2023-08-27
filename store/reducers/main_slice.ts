import {RootState} from '@/store'
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
            if(!state.curr) return;

            state.curr == null ?
            {
                href: state.history[state.history.length-1],
                curr: state.history.length - 1,
                ...state.history
            } : {
                href: state.history[state.curr-1],
                curr: state.curr-1,
                ...state.history
            }
        },
        goForward: (state) => {
            if(state.curr === state.history.length) return;

            state.curr == null ?
            {
                href: state.history[state.history.length-1],
                curr: state.history.length +1,
                ...state.history
            } : {
                href: state.history[state.curr-1],
                curr: state.curr+1,
                ...state.history
            }
        }, 
        pushRef: (state, action) => {
            if(action.type.startsWith('/')){
                if(state.curr !== 0 && state.curr !== (state.history.length - 1)){
                    const history = state.history.slice(state.curr || state.history.length);
                    return state =  {
                        href: action.type,
                        history: [...history, action.type],
                        curr: state.curr
                    }
                }
                  state =  {
                    href: action.type,
                    history: [...state.history, action.type],
                    curr: state.curr
                }
            }

        }
    }

})

export const {goBack, goForward, pushRef} = MainSlice.actions;

export default MainSlice.reducer

