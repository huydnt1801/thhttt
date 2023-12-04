import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Backdrop, Layout, ModalCreatePost, ModalJoin, ModalLogin, ModalRegister } from "./components";
import { Chat, Home } from "./pages";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { thunkGetHomePost } from "./slices/Home";
import Utils from "./Util";
import { thunkGetMe } from "./slices/Account";
import { useKeycloak } from "@react-keycloak/web";

const App = () => {

    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    console.log(keycloak);
    Utils.global.accessToken = keycloak.token;
    console.log("accessToken", Utils.global.accessToken);

    const theme_ = useMemo(() => {
        const muiTheme = createTheme({
            palette: { mode: "light" }
        });
        return muiTheme;
    }, []);

    return (
        <ThemeProvider theme={theme_}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Layout>
                                <Home />
                            </Layout>
                        } />
                    <Route
                        path="/:conversationId"
                        element={
                            <Layout>
                                <Chat />
                            </Layout>
                        } />
                </Routes>
            </BrowserRouter>
            <ModalLogin />
            <ModalRegister />
            <ModalCreatePost />
            <ModalJoin />
            <Backdrop />
            <CallWhenAppStart />
        </ThemeProvider>
    )
}

const CallWhenAppStart = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetMe())
    }, [Utils.global.accessToken]);
    return <></>
}

export default App
