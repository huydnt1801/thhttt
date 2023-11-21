import { Request as Request_, Response as Response_ } from "express"

export type Post = {
    postId: Number,
    accountId: Number,
    image: String,
    createdAt: Number
}

export type Account = {
    accountId: Number,
    username: String,
    password: String,
    name: String,
    avatar: String
}

type Follow = {
    followId: Number,
    sourceId: Number,
    targetId: Number
}

type Like = {
    likeId: Number,
    accountId: Number,
    postId: Number
}

type PostTable = {
    index: Number,
    data: Post[]
}
type AccountTable = {
    index: Number,
    data: Account[]
}
type FollowTable = {
    index: Number,
    data: Follow[]
}
type LikeTable = {
    index: Number,
    data: Like[]
}

type Database = {
    PostTable: PostTable,
    AccountTable: AccountTable
    FollowTable: FollowTable,
    LikeTable: LikeTable
}

type Payload = {
    accountId?: Number
}
type ServiceResult = {
    code: Number,
    message: String[],
    result: "SUCCESS" | "FAIL",
    data: any
}
export type Request = Request_ & { payload?: Payload }

export type handler = (req: Request, res: Response_, next?: any) => any
export type service = (body: any, params: any) => ServiceResult

export type loadDatabase = () => Database