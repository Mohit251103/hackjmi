import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarComponent from './NavigationBar'

const Layout: React.FC = () => {
    return (

        <div className={`h-screen w-screen sm:flex-row flex justify-center items-center bg-transparent flex-col relative`}>

            <NavbarComponent />
            <Outlet />
        </div>



    )
}
export default Layout