import { Outlet } from "react-router-dom";

import Sidebars from "./components/general/Sidebars";

const RootLayout = () => {
    return (
        <>
            <div className="flex w-screen h-screen bg-main-bg">
                <div className="relative w-auto">
                <Sidebars />
                </div>
                <main className="flex ">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default RootLayout