import { Header } from "./Header"
import { NavBar } from "./NavBar"


export const Layout = ({ children }) => {

    return (
        <div className="w-full h-screen flex flex-col">
            <Header />
            <div className="flex flex-row flex-1">
                <NavBar />
                <div className="flex-1">
                    {children}
                </div>
            </div>
        </div>
    )
}