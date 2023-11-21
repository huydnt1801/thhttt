import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, Divider, IconButton, Modal, TextField } from "@mui/material";
import { createRef, useState } from "react";
import Api from "../Api";
import { useDispatch } from "react-redux";
import { setMe } from "../slices/Account";
import { backdropRef } from "./Backdrop";
import { modalRegisterRef } from "./ModalRegister";
import { useKeycloak } from "@react-keycloak/web";

const modalLoginRef = createRef({
  open: null,
  show: () => 1,
  hide: () => 1,
});

const ModalLogin = () => {
  const { keycloak } = useKeycloak();

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    const wait = (ms) => new Promise((e) => setTimeout(e, ms));
    backdropRef.current.show();
    await wait(1000);
    backdropRef.current.hide();
    const response = await Api.Auth.login({
      username,
      password,
    });
    const img =
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnhanam.vn%2Fdoan-cam-thi&psig=AOvVaw129UVH30vI7fRxLTSENbSz&ust=1700636375343000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCNijrKrC1IIDFQAAAAAdAAAAABAF";
    console.log(response);
    if (response.result == "SUCCESS") {
      localStorage.setItem("accessToken", response.account.accessToken);
      localStorage.setItem("refreshToken", response.account.refreshToken);
      const account = {
        accountId: response.account.accountId,
        username: response.account.username,
        name: response.account.name,
        avatar: response.account.avatar
          ? (import.meta.env.VITE_API_URL ?? "") + response.account.avatar
          : img,
      };
      dispatch(setMe(account));
      setOpen(false);
    } else {
    }
  };

  const handleRegister = () => {
    setOpen(false);
    modalRegisterRef.current.show();
  };

  modalLoginRef.current = {
    isOpen: open,
    show: () => {
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  };

  return (
    <Modal open={open} disableAutoFocus>
      <div className="absolute top-1/2 left-1/2 w-full max-w-md bg-white -translate-x-1/2 -translate-y-1/2 border-none flex flex-col px-3 shadow">
        <div className="flex flex-col px-3 py-3 w-full bg-white">
          <div className="text-center py-4 font-bold border-b">LOGIN</div>
          <TextField
            fullWidth
            size="small"
            className="!mt-4"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            size="small"
            className="!mt-4"
            label="Password"
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Button variant="outlined" className="!my-5" onClick={handleLogin}>
            LOGIN
          </Button>
          <Divider>OR</Divider>
          <Button onClick={keycloak.login} variant="outlined" className="!my-5">
            LOGIN BY SSO
          </Button>
          <button className={cx.blue}>Forgot Password</button>
          <div className="flex items-center justify-center mt-3">
            Don't have account?&nbsp;
            <button className={cx.blue} onClick={keycloak.logout}>
              Register
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const cx = {
  blue: "font-semibold text-sm text-blue-500 hover:underline",
};

export { ModalLogin, modalLoginRef };
