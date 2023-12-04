import Service from "./service.js"

/**@type {import("./type").handler} */
const register = async (req, res) => {
    const { code, ...data } = Service.Auth.register(req.body, req.file);
    return res.status(code).json({
        ...data
    });
}
/**@type {import("./type").handler} */
const login = async (req, res) => {
    const { code, ...data } = Service.Auth.login(req.body);
    return res.status(code).json({
        ...data
    });
}
/**@type {import("./type").handler} */
const getMe = async (req, res) => {
    const { code, ...data } = Service.Auth.getMe(req.payload);
    return res.status(code).json({
        ...data
    });
}



/**@type {import("./type").handler} */
const createPost = async (req, res) => {
    if (!req.file || req.file.fieldname != "image") {
        return res.status(400).json({
            result: "FAIL",
            message: "image is required"
        });
    }
    const { code, ...data } = Service.Post.createPost(req.payload, req.body, req.file);
    return res.status(code).json({
        ...data
    });
}
/**@type {import("./type").handler} */
const getListPost = async (req, res) => {
    const { code, ...data } = Service.Post.getListPost(req.query);
    return res.status(code).json({
        ...data
    });
}

/**@type {import("./type").handler} */
const getOneAccount = async (req, res) => {
    const { code, ...data } = Service.Account.getOneAccount(req.params);
    return res.status(code).json({
        ...data
    });
}

/**@type {import("./type").handler} */
const getJoinedConversation = async (req, res) => {
    const { code, ...data } = Service.Conversation.getJoinedConversation(req.payload);
    return res.status(code).json({
        ...data
    });
}

/**@type {import("./type").handler} */
const createConversation = async (req, res) => {
    const { code, ...data } = Service.Conversation.createConversation(req.payload, req.body, req.file);
    return res.status(code).json({
        ...data
    });
}
/**@type {import("./type").handler} */
const getOneConversation = async (req, res) => {

    return res.status(200).json({ data: "ok" })
}
/**@type {import("./type").handler} */
const getMessageInConversation = (req, res) => {
    const { code, ...data } = Service.Conversation.getMessageInConversation(req.params);
    return res.status(code).json({
        ...data
    });
}

/**@type {import("./type").handler} */
const createMessage = (req, res) => {
    return res.status(200).json({ data: "ok" })
}
/**@type {import("./type").handler} */
const createMessageInConversation = (req, res) => {
    const { code, ...data } = Service.Conversation.createMessageInConversation(req.body, req.params, req.payload);
    return res.status(code).json({
        ...data
    });
}

const joinConversation = async (req, res) => {
    const { code, ...data } = Service.Conversation.joinConversation(req.payload, req.params);
    return res.status(code).json({
        ...data
    });
}





const Controller = {
    Auth: {
        register, login, getMe
    },
    Post: {
        createPost, getListPost
    },
    Account: {
        getOneAccount
    },
    Conversation: {
        createConversation, getMessageInConversation, createMessageInConversation, getOneConversation, getJoinedConversation, joinConversation
    }
}



export default Controller