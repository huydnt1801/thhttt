import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";
import Utils from "../Utill";

const thunkGetAccount = createAsyncThunk(
    "thunkGetAccount",
    (username) => Api.Account.getAccount(username)
)

const initialState = {
    account: null,
    listPost: []
}

const profileSlice = createSlice({
    name: "profileSlice",
    initialState: initialState,
    reducers: {
        setMe: (state, { payload }) => {
            state.account = payload
        }
    },
    extraReducers: builder => {
        builder.addCase(thunkGetAccount.fulfilled, (state, { payload }) => {
            const img = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnhanam.vn%2Fdoan-cam-thi&psig=AOvVaw129UVH30vI7fRxLTSENbSz&ust=1700636375343000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNijrKrC1IIDFQAAAAAdAAAAABAF";
            if (payload.result == "SUCCESS") {
                const account = {
                    accountId: payload.account.accountId,
                    username: payload.account.username,
                    name: payload.account.name,
                    avatar: payload.account.avatar ? ((import.meta.env.VITE_API_URL ?? "") + payload.account.avatar) : img,
                }
                state.account = account;
                state.listPost = payload.account.posts ? payload.account.posts.map(i => ({ ...i, link: Utils.apiHost + i.image })) : [];
            }
        })
    }
});

const { reducer: profileReducer, actions } = profileSlice;
export default profileReducer
export const { } = actions;
export { thunkGetAccount }