import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";

const thunkGetMe = createAsyncThunk(
    "thunkGetMe",
    () => Api.Auth.getMe()
)

const initialState = {
    me: null
}

const accountSlice = createSlice({
    name: "accountSlice",
    initialState: initialState,
    reducers: {
        setMe: (state, { payload }) => {
            state.me = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkGetMe.fulfilled, (state, { payload }) => {
            const img = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnhanam.vn%2Fdoan-cam-thi&psig=AOvVaw129UVH30vI7fRxLTSENbSz&ust=1700636375343000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNijrKrC1IIDFQAAAAAdAAAAABAF";
            if (payload.result == "SUCCESS") {
                const account = {
                    accountId: payload.account.accountId,
                    username: payload.account.username,
                    name: payload.account.name,
                    avatar: payload.account.avatar ? ((import.meta.env.VITE_API_URL ?? "") + payload.account.avatar) : img,
                }
                state.me = account;
            }
        })
    }
});

const { reducer: accountReducer, actions } = accountSlice;
export default accountReducer
export const { setMe } = actions;
export { thunkGetMe }