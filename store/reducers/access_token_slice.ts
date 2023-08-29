import { RefreshAccessToken } from "../api";
import {createSlice,
PayloadAction, createAsyncThunk, Slice } from '@reduxjs/toolkit';
import { pushRef } from "./main_slice";



export type ApiStatus = 'IDLE'|'PENDING'|'SUCCESS'|'ERROR';

export type Data = {
    access_token: string| null,
    refresh_token: string| null,
    refreshAccessTokenStatus: ApiStatus
}

const initialState: Data = {
    access_token: null,
    refresh_token: null,
    refreshAccessTokenStatus: 'IDLE'
}

export const refreshAccessToken = createAsyncThunk('access_token/refreshAccessToken', RefreshAccessToken);

export const accessTokenSlice = createSlice({
    name: 'access_token',
    initialState,
    reducers: {
    setAccessToken: (state, action: PayloadAction<{access_token: string, refresh_token: string}>) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            dispatch(pushRef('/'));
        },
    setRefreshToken: (state, action: PayloadAction<{access_token: string}>) => {
        state.access_token = action.payload.access_token;
    }
    },
        extraReducers: (builder) => {

            builder.addCase(refreshAccessToken.pending, (state, action) => {
                state.refreshAccessTokenStatus = 'PENDING'
            })
            builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.refreshAccessTokenStatus = 'SUCCESS'
                state.access_token = action.payload.access_token
            })
            builder.addCase(refreshAccessToken.rejected, (state, action) => {
                state.refreshAccessTokenStatus = 'ERROR'
            })

        }
})

export const {setAccessToken, setRefreshToken} = accessTokenSlice.actions;

export default accessTokenSlice.reducer;


function dispatch(arg0: { payload: any; type: "main/pushRef"; }) {
    throw new Error("Function not implemented.");
}
/*

await dispatch(
    addUser({
        id: createId(),
        ...form,
    })
)

isAddingUser = useAppSelector(
    (state) => state.users.addUserStatus === 'PENDING'
)

*/