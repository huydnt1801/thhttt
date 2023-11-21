import { Account, Post } from "./index"

type register_ = {
    username: String,
    password: String
}
type _register_ = {
    result: "SUCCESS" | "FAIL",
    account: Account
}
export type register = (data: register_) => Promise<_register_>
export type me = () => Promise<_register_>
export type getAccount = (username: String) => _register_

type loginP = {
    username: String,
    password: String
}
type loginR = {
    result: "SUCCESS" | "FAIL",
    account: Account
}
export type login = (data: loginP) => Promise<loginR>

type _getListPost_ = {
    result: "SUCCESS" | "FAIL",
    posts: Post[]
}
type getListPost_ = {
    page: String,
    limit: String
}
export type getListPost = (data?: getListPost_) => _getListPost_