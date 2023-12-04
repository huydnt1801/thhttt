import axios from "axios";
import Utils from "./Util";

const base = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/v1`,
    headers: {
        Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined
    }
});

base.interceptors.request.use(async (config) => {
    // debug call api
    console.log(
        `[Axios send request]\n\t- [URL] ${config.baseURL}${config.url},\n\t- [Method]: ${config.method.toUpperCase()},\n\t- [Payload]: ${config.method === "post" || config.method === "put"
            ? JSON.stringify(config.data)
            : JSON.stringify(config.params)
        }`
    );
    return config;
});

base.interceptors.response.use(
    (response) => {
        console.log(response);
        // console.log(JSON.stringify(response));
        return response.data;
    },
    async (error) => {
        if (!error.response) {
            return null
        }
        if (error.response) return error.response.data;
        // return new Promise(error)
    }
);

/**@type {import("./types/api").register} */
const register = (data) => {
    const url = `/auth/register`;
    return base.post(url, data);
}
/**@type {import("./types/api").login} */
const login = (data) => {
    const url = `/auth/login`;
    return base.post(url, data);
}
/**@type {import("./types/api").me} */
const getMe = () => {
    const url = `/auth/me`;
    return base.get(url, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}
/**@type {import("./types/api").getAccount} */
const getAccount = (username) => {
    const url = `/account/${username}`;
    return base.get(url);
}

/**@type {import("./types/api").getListPost} */
const getListPost = (data) => {
    const url = `/post`;
    return base.get(url, { params: data });
}

const createPost = (data) => {
    const url = `/post/create`;
    return base.post(url, data);
}

const createConversation = (data) => {
    const url = `/conversation/create`;
    return base.post(url, data, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}

const getListConversation = (data) => {
    const url = `/conversation`;
    return base.get(url, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}

const joinConversation = (conversationId) => {
    const url = `/conversation/${conversationId}/join`;
    return base.post(url, undefined, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}

const getListMessage = (conversationId) => {
    const url = `/conversation/${conversationId}/message`;
    return base.get(url, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}

const createMessage = (conversationId, content) => {
    const url = `/conversation/${conversationId}/message/create`;
    return base.post(url, { content }, {
        headers: { Authorization: Utils.global.accessToken ? `Bearer ${Utils.global.accessToken}` : undefined }
    });
}

const Api = {
    Auth: { register, login, getMe },
    Post: { getListPost, createPost },
    Account: { getAccount, },
    Conversation: { createConversation, getListConversation, joinConversation, getListMessage, createMessage }
}

export default Api