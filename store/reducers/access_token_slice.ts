import { getAccessToken, RefreshAccessToken } from "../api";
import {createSlice,
PayloadAction, createAsyncThunk, Slice } from '@reduxjs/toolkit';



export type ApiStatus = 'IDLE'|'PENDING'|'SUCCESS'|'ERROR';

export type Data = {
    access_token: string| null,
    refresh_token: string| null,
    fetchAccessTokenStatus: ApiStatus,
    refreshAccessTokenStatus: ApiStatus
}

const initialState: Data = {
    access_token: null,
    refresh_token: null,
    fetchAccessTokenStatus: 'IDLE',
    refreshAccessTokenStatus: 'IDLE'
}

export const fetchAccessToken = createAsyncThunk('access_token/getAccessToken', getAccessToken);

export const refreshAccessToken = createAsyncThunk('access_token/refreshAccessToken', RefreshAccessToken);

export const accessTokenSlice = createSlice({
    name: 'access_token',
    initialState,
    reducers: {
    setAccessToken: (state, action: PayloadAction<{access_token: string, refresh_token: string}>) => {
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
        },
    setRefreshToken: (state, action: PayloadAction<{access_token: string}>) => {
        state.access_token = action.payload.access_token;
    }
    },
        extraReducers: (builder) => {
            builder.addCase(fetchAccessToken.pending, (state, action) => {
                state.fetchAccessTokenStatus = 'PENDING'
            })
            builder.addCase(fetchAccessToken.fulfilled, (state, action) => {
                state.fetchAccessTokenStatus = 'SUCCESS'
                state.access_token = action.payload.access_token;
                state.refresh_token = action.payload.refresh_token;
            })
            builder.addCase(fetchAccessToken.rejected, (state, action) => {
                state.fetchAccessTokenStatus = 'ERROR'
            })
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