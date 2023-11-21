export type Post = {
    postId: Number,
    image: String,
    link?: String,
    accountId?: Number,
    account?: Account,
}

export type Account = {
    accountId: Number,
    username: String,
    name: String,
    posts?: Post[],
    accessToken?: String,
    refreshToken?: String,
}