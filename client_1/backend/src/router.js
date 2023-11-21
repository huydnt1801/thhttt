import { Router as Router_ } from "express";
import Controller from "./controller.js";
import { authentication, uploadFile } from "./middleware.js";

const Router = Router_();

Router.post("/auth/register", uploadFile.single("avatar"), Controller.Auth.register);
Router.post("/auth/login", Controller.Auth.login);
Router.get("/auth/me", authentication, Controller.Auth.getMe);

Router.get("/account/:username", Controller.Account.getOneAccount);

Router.get("/post", Controller.Post.getListPost);
Router.post("/post/create", authentication, uploadFile.single("image"), Controller.Post.createPost);
Router.patch("/post/update", Controller.Auth.login);
Router.delete("/post/delete", Controller.Auth.login);

export default Router