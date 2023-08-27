//think about the structure of each data you will be needing
//fetch data from api and initialize store 
//create store and other necessary action/reducers etc
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers';
import { getAccessToken } from './api';
import { ThunkAction } from 'redux-thunk';
import { UnknownAsyncThunkAction } from '@reduxjs/toolkit/dist/matchers';




export const store = configureStore({ reducer:  rootReducer })


type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export const setAccessToken = (dispatch : AppDispatch, getState:RootState) => {
    async()=> {
            const res = await getAccessToken();
            if(res.access_token){
                dispatch({type: 'SET_ACCESS_TOKEN', payload: res})
            }
            dispatch({type: 'SET_ACCESS_TOKEN', payload: {
                error: res
            }})
    }
    }
//use async thunk to dispatch action to set access tokenY