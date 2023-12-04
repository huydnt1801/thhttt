import { Avatar, Button, IconButton } from "@mui/material";
import { HomeOutlined, LoginOutlined, MessageOutlined, SearchOutlined } from "@mui/icons-material";
import { twMerge } from "tailwind-merge"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Utils from "../Utill";
import { useKeycloak } from "@react-keycloak/web";

export const NavBar = () => {

    return (
        <div className="NavBar flex flex-row items-center h-full w-full justify-between px-4 md:flex-col md:justify-start md:px-4">
            <div className="hidden md:block py-6">Instagram</div>
            <Link
                to="/"
                className={cx.row}>
                <IconButton>
                    <HomeOutlined />
                </IconButton>
                <h2 className="hidden xl:block min-w-[180px]">Home</h2>
            </Link>
            <div className={cx.row}>
                <IconButton>
                    <SearchOutlined />
                </IconButton>
                <h2 className="hidden xl:block min-w-[180px]">Search</h2>
            </div>
            <div className={cx.row}>
                <IconButton>
                    <MessageOutlined />
                </IconButton>
                <h2 className="hidden xl:block min-w-[180px]">Message</h2>
            </div>
            <ProfileButton />
        </div>
    )
}

const ProfileButton = () => {
    const { me } = useSelector(state => state.account);
    const { keycloak } = useKeycloak();

    if (me) {
        return (
            <Link
                className={twMerge(cx.row, "md:py-4")}
                to={`/@me`}>
                <Avatar
                    alt="Remy Sharp"
                    className="xl:!ml-1"
                    sx={{ width: 28, height: 28 }}
                    src={me.avatar} />
                <h2 className="hidden xl:block min-w-[180px] ml-[4px]">Profile</h2>
            </Link>
        )
    }
    return (
        <div className={cx.row} onClick={keycloak.login}>
            <IconButton>
                <LoginOutlined />
            </IconButton>
            <h2 className="hidden xl:block min-w-[180px]">Login</h2>
        </div>
    )
}

const cx = {
    row: "flex flex-row items-center xl:hover:bg-gray-200 md:py-2 rounded cursor-pointer transition-all duration-300"
}