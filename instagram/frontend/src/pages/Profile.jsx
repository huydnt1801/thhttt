import { Button } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetAccount } from "../slices/Profile"
import Utils from "../Utill"
import { setMe } from "../slices/Account"


export const Profile = () => {

    return (
        <div className="Profile w-full flex flex-col items-center">
            <div className="w-full max-w-[900px] flex flex-col">
                <Head />
                <Posts />
            </div>
        </div>
    )
}

const Head = () => {

    const dispatch = useDispatch();
    const { username } = useParams();

    const { account } = useSelector(state => state.profile);
    const { me } = useSelector(state => state.account);
    const isMe = (() => {
        if (account) {
            if (me) {
                return account.username == me.username
            } else { return false }
        }
        else { return false }
    })();
    console.log(account, username);

    useEffect(() => {
        dispatch(thunkGetAccount(username));
    }, [username]);
    console.log(account);

    return (
        <div className="flex flex-row mt-8">
            <div className="pl-2 md:pl-10 md:pr-20">
                <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px]">
                    <img
                        className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] object-cover bg-no-repeat rounded-full"
                        src={account?.avatar} />
                </div>
            </div>
            <div className="flex-1 flex flex-col ml-8">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="mr-4">{account?.username}</div>
                    <div className="flex flex-row items-center mt-3 md:mt-0">
                        {isMe ? <>
                            <Button
                                size="small"
                                color="inherit"
                                variant="outlined"
                                sx={{ textTransform: "none", mr: 2 }}
                                onClick={() => Utils.showModalCreatePost()}>
                                Create Post
                            </Button>
                            <Button
                                size="small"
                                color="inherit"
                                variant="outlined"
                                sx={{ textTransform: "none", }}
                                onClick={() => {
                                    localStorage.removeItem("accessToken");
                                    localStorage.removeItem("refreshToken");
                                    dispatch(setMe(null));
                                }}>
                                Log Out
                            </Button>
                        </> : <>
                            <Button
                                size="small"
                                color="primary"
                                variant="outlined"
                                sx={{ textTransform: "none", mr: 2 }}>
                                Follow
                            </Button>
                            <Button
                                size="small"
                                color="inherit"
                                variant="outlined"
                                sx={{ textTransform: "none", }}>
                                Message
                            </Button>
                        </>}
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4">
                    <div className="flex flex-col items-center md:flex-row">
                        <div className="font-bold mr-1">0</div>
                        <div> posts</div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row ml-6">
                        <div className="font-bold mr-1">10</div>
                        <div> followers</div>
                    </div>
                    <div className="flex flex-col items-center md:flex-row ml-6">
                        <div className="font-bold mr-1">10</div>
                        <div> following</div>
                    </div>
                </div>
                <div className="mt-2 font-semibold">{account?.name}</div>
            </div>
        </div>
    )
}

const Posts = () => {

    const { listPost } = useSelector(state => state.profile);
    console.log(listPost);

    return (
        <div className="grid grid-cols-3 gap-1 mt-10">
            {listPost.map((item, index) => (
                <PostItem key={index} item={item} />
            ))}
        </div>
    )
}

const PostItem = ({ item }) => {

    return (
        <div className="aspect-square">
            <img
                className="w-full h-full bg-no-repeat object-cover"
                src={item.link} />
        </div>
    )
}

const img = "https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"