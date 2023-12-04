import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
    Backdrop,
    Layout,
    ModalCreatePost,
    ModalLogin,
    ModalRegister,
} from "./components";
import { Home, Profile } from "./pages";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetHomePost } from "./slices/Home";
import Utils from "./Utill";
import { thunkGetMe } from "./slices/Account";
import { useKeycloak } from "@react-keycloak/web";

const App = () => {
    const dispatch = useDispatch();
    const { keycloak } = useKeycloak();
    Utils.global.accessToken = keycloak.token;
    useEffect(() => {
        if (keycloak) {
            if (!keycloak.authenticated) keycloak?.login;
        }
    }, [keycloak]);

    useEffect(() => {
        if (Utils.global.accessToken) {
            console.log(Utils.global.accessToken);
            dispatch(thunkGetMe())
        }
    }, [Utils.global.accessToken]);

    const theme_ = useMemo(() => {
        const muiTheme = createTheme({
            palette: { mode: "light" },
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
                        }
                    />
                    <Route
                        path="/@me"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                    <Route
                        path="/:username"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        }
                    />
                </Routes>
            </BrowserRouter>
            <ModalLogin />
            <ModalRegister />
            <ModalCreatePost />
            <Backdrop />
            <CallWhenAppStart />
        </ThemeProvider>
    );
};

const CallWhenAppStart = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(thunkGetHomePost());
    }, []);
    return <></>;
};

export default App;
