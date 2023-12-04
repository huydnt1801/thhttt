import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, IconButton, Modal, TextField } from "@mui/material";
import { createRef, useState } from "react";
import { modalLoginRef } from "./ModalLogin";
import Utils from "../Util";
import Api from "../Api";
import { useDispatch } from "react-redux";
import { setMe } from "../slices/Account";

const modalRegisterRef = createRef({
    open: null,
    show: () => 1,
    hide: () => 1
});

const ModalRegister = () => {

    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async () => {
        const wait = (ms) => new Promise(e => setTimeout(e, ms));
        const formData = new FormData();
        formData.append("name", name);
        formData.append("username", username);
        formData.append("password", password);
        if (image) {
            formData.append("avatar", image.file);
        }
        Utils.showBackdrop();
        await wait(1000);
        Utils.hideBackdrop();
        const response = await Api.Auth.register(formData);
        const img = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnhanam.vn%2Fdoan-cam-thi&psig=AOvVaw129UVH30vI7fRxLTSENbSz&ust=1700636375343000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNijrKrC1IIDFQAAAAAdAAAAABAF";
        if (response.result == "SUCCESS") {
            localStorage.setItem("accessToken", response.account.accessToken);
            localStorage.setItem("refreshToken", response.account.refreshToken);
            const account = {
                accountId: response.account.accountId,
                username: response.account.username,
                name: response.account.name,
                avatar: response.account.avatar ? ((import.meta.env.VITE_API_URL ?? "") + response.account.avatar) : img,
            }
            dispatch(setMe(account));
            setOpen(false);
        }
        else {

        }
    }

    const handleLogin = () => {
        setOpen(false);
        Utils.showModalLogin();
    }

    modalRegisterRef.current = {
        open: open,
        show: () => {
            setOpen(true);
        },
        hide: () => {
            setOpen(false);
        }
    }

    return (
        <Modal
            open={open}
            disableAutoFocus>
            <div className="absolute top-1/2 left-1/2 w-full max-w-md bg-white -translate-x-1/2 -translate-y-1/2 border-none flex flex-col px-3 shadow">
                <div className="flex flex-col px-3 py-3 w-full bg-white rounded">
                    <div className="text-center py-4 font-bold border-b">
                        REGISTER
                    </div>
                    <TextField
                        fullWidth size="small" className="!mt-4"
                        label="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth size="small" className="!mt-4"
                        label="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        fullWidth size="small" className="!mt-4"
                        label="Password"
                        value={password}
                        type={showPassword ? "text" : "password"}
                        onChange={e => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: <IconButton size="small" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        }}
                    />
                    <div className="flex flex-col items-center mt-4">
                        {image && (
                            <img
                                className="w-[100px] h-[100px] bg-no-repeat object-cover rounded-full mb-3"
                                src={image.link} />
                        )}
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
                    <Button variant="outlined" className="!my-5" onClick={handleRegister}>
                        REGISTER
                    </Button>
                    <Divider>OR</Divider>
                    <Button variant="outlined" className="!my-5">
                        REGISTER BY SSO
                    </Button>
                    {/* <button className={cx.blue}>Forgot Password</button> */}
                    <div className="flex items-center justify-center mt-3">
                        Have account?&nbsp;
                        <button className={cx.blue} onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

const cx = {
    blue: 'font-semibold text-sm text-blue-500 hover:underline'
}

export { ModalRegister, modalRegisterRef }