import React from 'react'

import { NavLink } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

const NavbarComponent:React.FC = () => {
    return (
        <div className="flex justify-between items-center w-full min-h-12 text-zinc-900 pl-2 pr-2">

            <img className="w-12" src="/logo.svg" alt="error"/>

            <div className="flex justify-center items-center flex-wrap gap-6">
                <NavLink to="/home"
                         className="text-black flex gap-2 items-center justify-center rounded-lg hover:text-sky-400 ">
                    <HomeOutlinedIcon fontSize="small" />
                    <span className="btm-nav-label text-xs sm:text-lg md:text-sm">Home  </span>
                </NavLink>
                <NavLink to="/interview" className="flex gap-2 items-center justify-center hover:text-sky-400">
                   <ChecklistOutlinedIcon fontSize="small"/>
                    <span className="btm-nav-label text-xs sm:text-lg md:text-sm">My Interviews </span>
                </NavLink>
                <NavLink to="/" className="flex gap-2 items-center justify-center hover:text-sky-400">
                    < ModelTrainingIcon fontSize="small"/>
                    <span className="btm-nav-label text-xs sm:text-lg md:text-sm">Progress </span>
                </NavLink>
                 <NotificationsOutlinedIcon/>
                <button className="bg-sky-400 text-white p-2 rounded-lg">Profile</button>
            </div>

        </div>
    )
}

export default NavbarComponent