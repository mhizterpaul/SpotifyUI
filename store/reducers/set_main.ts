

export default function SET_MAIN(state = {href: '/', curr: undefined, history: []}, action: {type: string}) {
    if(action.type === 'goBack'){
        if(state.curr === 0) return state;
        return state.curr === undefined ?
        {
            href: state.history[state.history.length-1],
            curr: state.history.length - 1,
            ...state.history
        } : {
            href: state.history[state.curr-1],
            curr: state.curr-1,
            ...state.history
        }
    }

    if(action.type === 'goForward'){
        if(state.curr === state.history.length) return state;
        return state.curr === undefined ?
        {
            href: state.history[state.history.length+1],
            curr: state.history.length + 1,
            ...state.history
        } : {
            href: state.history[state.curr+1],
            curr: state.curr+1,
            ...state.history
        }
    }
    if(action.type.startsWith('/')){
        if(state.curr !== 0 && state.curr !== (state.history.length - 1)){
            const history = state.history.slice(state.curr);
            return  {
                href: action.type,
                history: [...history, action.type]
            }
        }
        return   {
            href: action.type,
            history: [...state.history, action.type]
        }
    }
    return state;

}