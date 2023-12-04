import { Button, Modal, TextField } from "@mui/material";
import { createRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Utils from "../Util";
import Api from "../Api";
import { thunkGetAccount } from "../slices/Profile";
import { useParams } from "react-router-dom";
import { thunkGetHomePost } from "../slices/Home";
import { thunkGetConversation } from "../slices/Account";

const modalJoinRef = createRef();

const ModalJoin = () => {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [conversationId, setConversationId] = useState("");

    modalJoinRef.current = {
        isOpen: open,
        show: () => {
            setOpen(true);
        },
        hide: () => {
            setOpen(false);
        }
    }

    const handleJoin = async () => {
        if (!conversationId) { return }
        Utils.showBackdrop();
        await Utils.wait(1000);
        Utils.hideBackdrop();
        const response = await Api.Conversation.joinConversation(conversationId);
        console.log(response);
        if (response.result == "SUCCESS") {
            dispatch(thunkGetConversation());
            setOpen(false);
            setConversationId("");
        }
    }

    return (
        <Modal
            open={open}
            disableAutoFocus
            onClose={(e, r) => {
                if (r && r == "backdropClick") {
                    setOpen(false);
                }
            }}>
            <div className="absolute top-1/2 left-1/2 w-full max-w-md bg-white -translate-x-1/2 -translate-y-1/2 border-none flex flex-col shadow px-3">
                <div className="flex flex-col px-3 py-3 w-full bg-white">
                    <div className="text-center py-4 font-bold border-b">
                        JOIN A CONVERSION
                    </div>
                    <TextField
                        fullWidth size="small"
                        label="Conversation"
                        value={conversationId}
                        onChange={e => setConversationId(e.target.value)}
                    />
                    <Button variant="outlined" className="!my-5" onClick={handleJoin}>
                        JOIN
                    </Button>
                    {/* <Divider>OR</Divider> */}
                </div>
            </div>
        </Modal>
    )
}

export { ModalJoin, modalJoinRef }

