export default function mobileReducer(state: boolean = false, action: {type: string, payload: boolean}) {
    

    switch (action.type){
        case 'setMobile': 
            return action.payload 
        
    }

}