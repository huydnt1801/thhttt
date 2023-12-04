import { Avatar, Button } from "@mui/material"
import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import Utils from "../Util";
import { useSelector } from "react-redux";


export const Header = () => {

    const { keycloak } = useKeycloak();
    Utils.global.accessToken = keycloak.token;
    const { me } = useSelector(state => state.account);

    return (
        <div className="w-full h-14 border-b flex flex-row justify-between px-5 items-center">
            <Link to="/" className="text-2xl font-bold">CHAT</Link>
            <div>

                {me ? (
                    <div className="flex flex-row items-end">
                        <Button size="small"
                            color="inherit"
                            variant="outlined"
                            sx={{ textTransform: "none", mr: 2 }}
                            onClick={() => {
                                keycloak.logout({ redirectUri: "http://localhost:6400" })
                            }}>
                            Log Out
                        </Button>
                        <Avatar
                            sx={{ width: 30, height: 30 }}
                            src={me.avatar} />
                        <div className="ml-3 font-semibold">{me.name}</div>
                    </div>
                ) : (<Button variant="outlined" onClick={keycloak?.login}>LOGIN</Button>)}
            </div>
        </div>
    )
}