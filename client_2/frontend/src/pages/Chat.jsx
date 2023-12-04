import { Button, IconButton, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { thunkGetAccount } from "../slices/Profile"
import Utils from "../Util"
import { setMe, thunkListMessage } from "../slices/Account"
import { Send } from "@mui/icons-material"
import { twMerge } from "tailwind-merge"
import Api from "../Api"
import { io } from "socket.io-client"

const socket = io(`${import.meta.env.VITE_API_URL}`);

export const Chat = () => {

    const { conversationId } = useParams();
    return (
        <div className="Chat w-full h-full text-sm flex flex-col">
            <div className="flex flex-row items-center justify-between py-1 px-2 h-12 border-b">
                <div className="font-semibold">Chat</div>
            </div>
            <ListMessage />
            <Tool />
        </div>
    )
}

const ListMessage = () => {

    const { conversationId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (Utils.global.accessToken) {
            dispatch(thunkListMessage(conversationId))
        }
    }, [conversationId, Utils.global.accessToken]);
    const { listMessage } = useSelector(state => state.account);
    const ref = useRef();
    const [height, setHeight] = useState("100%")

    useEffect(() => {
        const handler = (data) => {
            if (data.conversationId == Number(conversationId)) {
                dispatch(thunkListMessage(conversationId));
            }
        }
        socket.on("receive-message", handler);
        return () => {
            socket.off('receive-message', handler);
        }
    }, []);
    useEffect(() => {
        console.log(ref.current?.clientHeight);
        if (ref.current?.clientHeight) setHeight(ref.current?.clientHeight)
    }, [])

    return (
        <div
            className="flex w-full flex-col-reverse px-1 py-2 border-b overflow-y-scroll"
            style={{ height: height }}
            ref={ref}>
            {listMessage.map((item, index) => (
                <ItemMessage
                    key={index}
                    item={item} />
            ))}
        </div>
    )
}

const ItemMessage = ({ item }) => {

    const { me } = useSelector(state => state.account);

    const isMe = me ? me.sub == item.accountId : false;

    return (
        <div className={twMerge(
            "flex flex-row mt-1",
            isMe && "justify-end"
        )}>
            <div className={twMerge(
                "bg-gray-200 border rounded p-2"
            )}>
                {item.content}
            </div>
        </div>
    )
}

const Tool = () => {

    const [message, setMessage] = useState("");
    const { conversationId } = useParams();
    const dispatch = useDispatch();
    // useEffect(() => {
    //     if (Utils.global.accessToken) {
    //         dispatch(thunkListMessage(conversationId))
    //     }
    // }, [conversationId, Utils.global.accessToken]);
    const handleSend = async () => {
        if (!message) return;
        const response = await Api.Conversation.createMessage(conversationId, message);
        if (response.result == "SUCCESS") {
            socket.emit("sent-message", { conversationId: Number(conversationId) })
            dispatch(thunkListMessage(conversationId));
            setMessage("");
        }
    }

    return (
        <div className="flex flex-row p-1">
            <TextField
                fullWidth
                multiline
                size="small"
                placeholder="Aa"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <IconButton onClick={handleSend}>
                <Send />
            </IconButton>
        </div>
    )
}