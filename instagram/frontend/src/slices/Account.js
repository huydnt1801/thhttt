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
                    sub: payload.account.sub,
                    preferred_username: payload.account.preferred_username,
                    name: payload.account.name,
                    given_name: payload.account.given_name,
                    family_name: payload.account.family_name,
                    posts: payload.account.posts.map(i => ({
                        ...i,
                        link: import.meta.env.VITE_API_URL + i.image
                    })),
                    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png",
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