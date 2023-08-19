import { Payload } from "../types/data";
import { getFeaturedPlaylists } from "../api";
import { Media } from "../types/data";


const initialState = {};

const playlistReducer = (state: Payload = initialState, action: Payload) => {
    const err = (error: any) => {
        state.loading = false;
        state.error = error;
    };
    
    switch(action.type){
        case 'getFeaturedPlaylists': 
            state.loading = true;
            getFeaturedPlaylists(action.payload.access_token, action.payload.country).then((res) => {
                state.loading = false;
                state.playlists = res.playlists;
            }).catch(err);
            return state
    }
}