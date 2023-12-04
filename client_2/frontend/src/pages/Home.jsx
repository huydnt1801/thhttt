import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { thunkGetHomePost } from "../slices/Home";


export const Home = () => {

    const { me } = useSelector(state => state.account)

    return (
        <div className="Home w-full h-full flex flex-col items-center justify-center">
            <div className="font-semibold">
                {me ? "HELLO!" : "PLEASE LOGIN TO CONTINUE!"}
            </div>
        </div>
    )
}