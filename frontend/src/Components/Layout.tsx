import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './NavigationBar'

const Layout: React.FC = () => {
    return (

        <div className={`h-screen w-full flex items-center flex-col pl-20 pr-20`}>

            <NavbarComponent />
            <div className="flex-1">
            <Outlet />
            </div>
        </div>



    )
}
export default Layout