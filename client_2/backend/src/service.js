import jwt from "jsonwebtoken";
import Joi from "joi";
import database from "./database.js";
import { RESULT } from "./const.js";

const invalidParams = (error) => {
    return {
        code: 400,
        result: RESULT.FAIL,
        message: error.details.map(i => i.message)
    }
}

const existedError = (...field) => {
    return {
        code: 400,
        result: RESULT.FAIL,
        message: field.map(i => i + " is existed")
    }
}

const NotExistedError = (...value) => {
    return {
        code: 404,
        result: RESULT.FAIL,
        message: value.map(i => i + " is not existed")
    }
}

const success = (data) => {
    return {
        code: 200,
        result: RESULT.SUCCESS,
        ...data
    }
}

const ServerError = () => {
    return {
        code: 500,
        result: "FAIL",
        message: ["Error from server"]
    }
}

const WrongPasswordError = () => {
    return {
        code: 401,
        result: RESULT.FAIL,
        message: ["Wrong password"]
    }
}

const register_ = Joi.object({
    username: Joi.string().min(5).max(15).pattern(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(6).max(15).pattern(/^[a-zA-Z0-9_!@#$%^&*()_+-=]+$/).required(),
    name: Joi.string().required()
});

const login_ = Joi.object({
    username: Joi.string().min(5).max(15).pattern(/^[a-zA-Z0-9_]+$/).required(),
    password: Joi.string().min(6).max(15).pattern(/^[a-zA-Z0-9_!@#$%^&*()_+-=]+$/).required(),
});

/**@type {import("./type.js").service} */
const register = (body, file) => {
    try {
        const { error, value } = register_.validate(body, { abortEarly: false });
        if (error) {
            return invalidParams(error);
        }
        const data = database.load();
        const exist = data.AccountTable.data.filter(i => i.username == value.username)[0];
        if (exist) {
            return existedError("username");
        }
        const id = data.AccountTable.index + 1;
        const account = {
            accountId: id,
            ...value,
            avatar: file ? file.link : null
        }
        data.AccountTable.data.push(account);
        data.AccountTable.index += 1;
        database.save(data);
        account.accessToken = generateAccessToken({ accountId: id });
        account.refreshToken = generateRefreshToken({ accountId: id });
        account.password = undefined;
        return success({ account })
    } catch (e) { return ServerError() }
}

/**@type {import("./type.js").service} */
const login = (body) => {
    try {
        const { error, value } = login_.validate(body, { abortEarly: false });
        if (error) {
            return invalidParams(error);
        }
        const data = database.load();
        const account = data.AccountTable.data.filter(i => i.username == value.username)[0];
        if (!account) {
            return NotExistedError("Account");
        }
        if (account.password !== value.password) {
            return WrongPasswordError();
        }
        account.accessToken = generateAccessToken({ accountId: account.accountId });
        account.refreshToken = generateRefreshToken({ accountId: account.accountId });
        account.password = undefined;
        return success({ account })
    } catch (e) { return ServerError() }
}

const createPost = (payload, body, file) => {
    const data = database.load();
    const postId = data.PostTable.index + 1;
    const post = {
        postId: postId,
        accountId: payload.accountId,
        image: file.link,
        createdAt: Number(new Date())
    }
    data.PostTable.data.push(post);
    data.PostTable.index += 1;
    database.save(data);
    return success({ post })
}

const getListPost_ = Joi.object({
    limit: Joi.number().min(1).max(100).default(10),
    page: Joi.number().min(0).default(0)
});

const _getAccount = (data = database.load(), accountId) => {
    const account = data.AccountTable.data.filter(i => i.accountId == accountId)[0];
    return {
        ...account,
        password: undefined
    }
}

const getListPost = (query) => {
    const { error, value } = getListPost_.validate(query, { abortEarly: false });
    if (error) {
        return invalidParams(error);
    }
    const data = database.load();
    const { limit, page } = value;
    const total = data.PostTable.data.length;
    const posts_ = data.PostTable.data.reverse().slice(page * limit, page * limit + limit);
    const posts = posts_.map(i => ({
        ...i,
        account: _getAccount(data, i.accountId),
        accountId: undefined
    }))
    return success({ total, page, limit, posts })
}

const getOneAccount = (params) => {
    const { error, value } = Joi.object({
        username: Joi.string().min(5).max(15).pattern(/^[a-zA-Z0-9_]+$/).required()
    }).validate(params, { abortEarly: false });
    if (error) {
        return invalidParams(error);
    }
    const data = database.load();
    const account = data.AccountTable.data.filter(i => i.username == value.username)[0];
    if (!account) { return NotExistedError("Account") }
    account.password = undefined;
    const posts = data.PostTable.data.reverse().filter(i => i.accountId == account.accountId).slice(0, 15);
    account.posts = posts;
    return success({ account });
}

const getMe = (payload) => {
    const data = database.load();
    const account = {
        sub: payload.sub,
        name: payload.name,
        preferred_username: payload.preferred_username,
        given_name: payload.given_name,
        email: payload.email,
    }
    return success({ account })
}

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoVoq+G3T1gHwt+YIOvz1
9giGnUy4shOSm1a1Dsu4kZ5EBTNqQbWVI3+dN2RNlOlE0YdB3BroCfRFDeltJJZC
ekFTw6HqEiCaw+UOToAByGXB7NMzGpoe8pp/EF/2EDEEc174wMT0nfJqEcE5r2R0
LTsigDZ00JvcEGEfsApf+KJq7vzKzRQ327Zdkv9VpOCVlB1MxBhRtb/EKWG7cahR
2yYIqw8GeRrInB8k4xVKkkLTYwwSpkT451tW5tJTHoIaWM8DyEfz3Ps84o/sYKju
3l/tfGIX1fMQKOoW4pcaJvJdPEIDOSfqtyrFsT9PN05RI5uUMczV6fZdIqDacy2O
6QIDAQAB
-----END PUBLIC KEY-----`;
const generateAccessToken = (data) => {
    return jwt.sign(data, "123456", { expiresIn: "30d" });
}
const verifyAccessToken = (token) => {
    try {
        const data = jwt.verify(token, publicKey, { algorithms: "RS256" });
        return { data: data };
    } catch (error) {
        return { error: { name: error.name, message: error.message } };
    }
};
const generateRefreshToken = (data) => {
    return jwt.sign(data, "123456", { expiresIn: "30d" });
}
const verifyRefreshToken = (token) => {
    try {
        const data = jwt.verify(token, "123456");
        return { data: data };
    } catch (error) {
        return { error: { name: error.name, message: error.message } }
    }
}

const createConversation_ = Joi.object({
    name: Joi.string().required()
})
const createConversation = (payload, body, file) => {
    const { error, value } = createConversation_.validate(body);
    if (error) {
        return invalidParams(error);
    }
    const data = database.load();
    const conversationId = data.ConversationTable.index + 1;
    const conversation = {
        conversationId: conversationId,
        accountId: payload.sub,
        avatar: file ? file.link : null,
        name: value.name
    }
    data.ConversationTable.data.push(conversation);
    data.ConversationTable.index += 1;
    const memberId = data.MemberTable.index + 1;
    const member = {
        memberId: memberId,
        accountId: payload.sub,
        conversationId: conversationId
    }
    data.MemberTable.data.push(member);
    data.MemberTable.index += 1;
    database.save(data);
    return success({ conversation })
}

const conversationId_ = Joi.object({
    conversationId: Joi.number().required()
});
const message_ = Joi.object({
    content: Joi.string().required()
})
const createMessageInConversation = (body, params, payload) => {
    const { error: errorParams, value: valueParams } = conversationId_.validate(params);
    if (errorParams) {
        return invalidParams(errorParams);
    }
    const { error: errorBody, value: valueBody } = message_.validate(body);
    if (errorBody) {
        return invalidParams(errorBody);
    }
    const data = database.load();
    const conversation = data.ConversationTable.data.filter(i => i.conversationId == valueParams.conversationId)[0];
    if (!conversation) {
        return NotExistedError("Conversation");
    }
    const messageId = data.MessageTable.index + 1;
    const message = {
        messageId: messageId,
        conversationId: conversation.conversationId,
        accountId: payload.sub,
        content: valueBody.content,
        createdAt: Number(new Date())
    }
    data.MessageTable.data.push(message);
    data.MessageTable.index += 1;
    database.save(data);
    return success({ message })
}

const getMessageInConversation = (params) => {
    const { error, value } = conversationId_.validate(params);
    if (error) {
        return invalidParams(error);
    }
    const data = database.load();
    const conversation = data.ConversationTable.data.filter(i => i.conversationId == value.conversationId)[0];
    if (!conversation) {
        return NotExistedError("Conversation");
    }
    const messages = data.MessageTable.data.filter(i => i.conversationId == value.conversationId).reverse().slice(0, 50);
    return success({ messages });
}

const getJoinedConversation = (payload) => {
    const data = database.load();
    const joinedIds = data.MemberTable.data.filter(i => i.accountId == payload.sub).map(i => i.conversationId);
    const conversations = data.ConversationTable.data.filter(i => joinedIds.includes(i.conversationId));
    return success({ conversations })
}

const joinConversation = (payload, params) => {
    const data = database.load();
    const conversation = data.ConversationTable.data.filter(i => i.conversationId == params.conversationId)[0];
    if (!conversation) {
        return NotExistedError("Conversation");
    }
    const member = data.MemberTable.data.filter(i => (i.accountId == payload.sub && i.conversationId == conversation.conversationId))[0];
    if (!member) {
        const memberId = data.MemberTable.index + 1;
        const newMember = {
            memberId: memberId,
            accountId: payload.sub,
            conversationId: conversation.conversationId
        }
        data.MemberTable.data.push(newMember);
        data.MemberTable.index += 1;
        database.save(data);
        return success({ member: newMember })
    }
    return success({ member: member })
}


const Service = {
    Auth: {
        register, login, getMe
    },
    JWT: {
        generateAccessToken,
        verifyAccessToken,
        generateRefreshToken,
        verifyRefreshToken
    },
    Post: {
        createPost, getListPost
    },
    Account: {
        getOneAccount
    },
    Conversation: {
        createConversation, createMessageInConversation, getMessageInConversation, getJoinedConversation, joinConversation
    }
}

export default Service