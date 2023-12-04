import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Api from "../Api";

const thunkGetMe = createAsyncThunk(
    "thunkGetMe",
    () => Api.Auth.getMe()
)

const thunkGetConversation = createAsyncThunk(
    "thunkGetConversation",
    () => Api.Conversation.getListConversation()
)

const thunkListMessage = createAsyncThunk(
    "thunkListMessage",
    (a) => Api.Conversation.getListMessage(a)
)

const initialState = {
    me: null,
    listConversation: [],
    listMessage: []
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
            if (payload.result == "SUCCESS") {
                const account = {
                    sub: payload.account.sub,
                    preferred_username: payload.account.preferred_username,
                    name: payload.account.name,
                    given_name: payload.account.given_name,
                    family_name: payload.account.family_name,
                    avatar: "https://static-00.iconduck.com/assets.00/avatar-default-symbolic-icon-2048x1949-pq9uiebg.png",
                }
                state.me = account;
            }
        }).addCase(thunkGetConversation.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (payload.result == "SUCCESS") {
                state.listConversation = payload.conversations.map(item => ({
                    ...item,
                    avatar: import.meta.env.VITE_API_URL + item.avatar
                }))
            }
        }).addCase(thunkListMessage.fulfilled, (state, { payload }) => {
            console.log(payload);
            if (payload.result == "SUCCESS") {
                state.listMessage = payload.messages
            }
        })
    }
});

const { reducer: accountReducer, actions } = accountSlice;
export default accountReducer
export const { setMe } = actions;
export { thunkGetMe, thunkGetConversation, thunkListMessage }