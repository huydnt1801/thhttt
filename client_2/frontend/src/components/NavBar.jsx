import { Avatar, Button, IconButton } from "@mui/material";
import { HomeOutlined, LoginOutlined, MessageOutlined, SearchOutlined } from "@mui/icons-material";
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Utils from "../Util";
import { useEffect } from "react";
import { thunkGetConversation } from "../slices/Account";

export const NavBar = () => {

    const dispatch = useDispatch()

    return (
        <div className="NavBar h-full w-[280px] border-r flex flex-col px-1">
            <div className="flex flex-row mt-2 justify-end">
                <Button
                    variant="outlined"
                    size="small"
                    className="!mr-2"
                    onClick={() => Utils.showModalJoin()}>
                    Join
                </Button>
                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => Utils.showModalCreatePost()}>
                    CREATE
                </Button>
            </div>
            <ListConversation />
        </div>
    )
}

const ListConversation = () => {

    const { listConversation } = useSelector(state => state.account);
    const dispatch = useDispatch()

    useEffect(() => {
        if (Utils.global.accessToken) {
            dispatch(thunkGetConversation())
        }
    }, [Utils.global.accessToken]);

    return (
        <div className="flex flex-col">
            {listConversation.map((item, index) => (
                <ItemConversation
                    key={index}
                    item={item} />
            ))}
        </div>
    )
}

const ItemConversation = ({ item }) => {

    return (
        <Link
            className="flex flex-row mt-3 px-1 py-2 hover:bg-gray-300 cursor-pointer text-sm rounded"
            to={`/${item.conversationId}`}>
            <div className="w-10 h-10">
                <img
                    className="w-10 h-10 rounded-full"
                    src={item.avatar} />
            </div>
            <div className="flex-1 flex flex-col ml-2">
                <div className="font-semibold">{item.name}</div>
                {/* <div className="flex flex-row">
                    <div className="font-semibold">Phu</div>
                    :
                    <div>Cin chaof</div>
                </div> */}
            </div>
        </Link>
    )
}


const cx = {
    row: "flex flex-row items-center xl:hover:bg-gray-200 md:py-2 rounded cursor-pointer transition-all duration-300"
}