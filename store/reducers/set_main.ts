

export default function SET_MAIN(state = {href: '/', history: []}, action: {type: string}) {
    if(action.type) return {
        href: action.type,
        history: [...state.history, action.type]
    }
    return state;

}