import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Backdrop, Layout, ModalCreatePost, ModalLogin, ModalRegister } from "./components";
import { Home, Profile } from "./pages";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { thunkGetHomePost } from "./slices/Home";
import Utils from "./Utill";
import { thunkGetMe } from "./slices/Account";

const App = () => {

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
                        path="/:username"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        } />
                    <Route
                        path="/profile"
                        element={
                            <Layout>
                                <Profile />
                            </Layout>
                        } />
                </Routes>
            </BrowserRouter>
            <ModalLogin />
            <ModalRegister />
            <ModalCreatePost />
            <Backdrop />
            <CallWhenAppStart />
        </ThemeProvider>
    )
}

const CallWhenAppStart = () => {

    const dispatch = useDispatch();
    Utils.global.accessToken = localStorage.getItem("accessToken");

    useEffect(() => {
        dispatch(thunkGetHomePost());
        dispatch(thunkGetMe());
    }, []);
    return <></>
}

export default App
