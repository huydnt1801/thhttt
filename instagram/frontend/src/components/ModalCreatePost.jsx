import { Button, Modal } from "@mui/material";
import { createRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Utils from "../Utill";
import Api from "../Api";
import { thunkGetAccount } from "../slices/Profile";
import { useParams } from "react-router-dom";
import { thunkGetHomePost } from "../slices/Home";
import { thunkGetMe } from "../slices/Account";

const modalCreatePostRef = createRef();

const ModalCreatePost = () => {

    const dispatch = useDispatch();
    const { me } = useSelector(state => state.account);
    const [open, setOpen] = useState(false);
    const [image, setImage] = useState(null);

    modalCreatePostRef.current = {
        isOpen: open,
        show: () => {
            setImage(null);
            setOpen(true);
        },
        hide: () => {
            setOpen(false);
        }
    }

    const handleCreatePost = async () => {
        if (!image) { return }
        const formData = new FormData();
        formData.append("image", image.file);
        Utils.showBackdrop();
        await Utils.wait(1000);
        Utils.hideBackdrop();
        const response = await Api.Post.createPost(formData);
        if (response.result == "SUCCESS") {
            dispatch(thunkGetMe());
            dispatch(thunkGetHomePost());
            setOpen(false);
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
                        CREATE NEW POST
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <div className="w-[160px] h-[160px]  mb-3">
                            {image && (
                                <img
                                    className="w-[160px] h-[160px] bg-no-repeat object-cover"
                                    src={image.link} />
                            )}
                        </div>
                        <Button component="label" variant="outlined">
                            Upload Image
                            <input
                                type="file"
                                className="w-0 h-0"
                                accept={"image/png, image/jpeg, image/jpg"}
                                onChange={e => {
                                    const file = e.target.files[0];
                                    setImage({
                                        link: URL.createObjectURL(file),
                                        file: file
                                    })
                                }} />
                        </Button>
                    </div>
                    <Button variant="outlined" className="!my-5" onClick={handleCreatePost}>
                        CREATE
                    </Button>
                    {/* <Divider>OR</Divider> */}
                </div>
            </div>
        </Modal>
    )
}

export { modalCreatePostRef, ModalCreatePost }

