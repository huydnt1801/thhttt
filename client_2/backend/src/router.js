import { Router as Router_ } from "express";
import Controller from "./controller.js";
import { authentication, uploadFile } from "./middleware.js";

const Router = Router_();

Router.post("/auth/register", uploadFile.single("avatar"), Controller.Auth.register);
Router.post("/auth/login", Controller.Auth.login);
Router.get("/auth/me", authentication, Controller.Auth.getMe);

Router.get("/account/:username", Controller.Account.getOneAccount);
Router.get("/account/:accountId", Controller.Auth.login);
Router.get("/account/:accountId/conversation", Controller.Auth.login);

Router.get("/post", Controller.Post.getListPost);
Router.post("/post/create", authentication, uploadFile.single("image"), Controller.Post.createPost);
Router.patch("/post/update", Controller.Auth.login);
Router.delete("/post/delete", Controller.Auth.login);

Router.get("/conversation", authentication, Controller.Conversation.getJoinedConversation);
Router.post("/conversation/create", authentication, uploadFile.single("avatar"), Controller.Conversation.createConversation);
Router.patch("/conversation/update", Controller.Auth.login);
Router.delete("/conversation/delete", Controller.Auth.login);
Router.get("/conversation/:conversationId", Controller.Conversation.getOneConversation);
Router.post("/conversation/:conversationId/join", authentication, Controller.Conversation.joinConversation);
Router.get("/conversation/:conversationId/message", Controller.Conversation.getMessageInConversation);
Router.post("/conversation/:conversationId/message/create", authentication, Controller.Conversation.createMessageInConversation);
Router.get("/conversation/:conversationId/member", Controller.Conversation.getMessageInConversation);

Router.post("/message/create", authentication, Controller.Auth.login);

export default Router