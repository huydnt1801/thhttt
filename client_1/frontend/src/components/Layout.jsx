import { NavBar } from "./NavBar"


export const Layout = ({ children }) => {

    return (
        <div className="w-full min-h-screen flex flex-col">
            <div className="flex-1 md:ml-[102px] xl:ml-[240px]">
                {children}
            </div>
            <div className="fixed bottom-0 left-0 right-0 h-12 border-t md:hidden bg-white">
                <NavBar />
            </div>
            <div className="fixed bottom-0 left-0 top-0 w-[102px] xl:w-[240px] hidden md:block border-r bg-white">
                <NavBar />
            </div>
        </div>
    )
}