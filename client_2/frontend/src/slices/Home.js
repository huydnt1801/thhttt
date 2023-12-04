import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../Api";
import Utils from "../Util";

const thunkGetHomePost = createAsyncThunk(
    "thunkGetHomePost",
    /**@param {import("../types/api").getListPost_} data */
    data => Api.Post.getListPost(data)
)

const initialState = {
    listPost: [],
}

const homeSlice = createSlice({
    name: "homeSlice",
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(thunkGetHomePost.fulfilled, (state, { payload }) => {
            if (payload.result == "SUCCESS") {
                state.listPost = payload.posts.map(i => ({ ...i, link: Utils.apiHost + i.image }))
            }
        })
    }
});

const { reducer: homeReducer, actions } = homeSlice;
export default homeReducer
export const { } = actions
export { thunkGetHomePost }