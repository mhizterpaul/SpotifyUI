import { configureStore } from '@reduxjs/toolkit'
import accessTokenReducer from './reducers/access_token_slice'
import mainReducer from './reducers/main_slice'

export const store = configureStore({
    reducer: {
        access_token: accessTokenReducer,
        main: mainReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
