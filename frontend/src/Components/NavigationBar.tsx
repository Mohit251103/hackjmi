import React from 'react'

import { NavLink } from 'react-router-dom';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

const NavbarComponent:React.FC = () => {
    return (
        <div className="flex justify-around items-center flex-wrap gap-5 w-full min-h-12 text-zinc-900">

            <img className="w-12" src="/logo.svg" alt="error"/>

            <div className="flex justify-center items-center flex-wrap gap-6">
            <NavLink to="/" className="text-black flex gap-2 items-center justify-center rounded-lg hover:text-sky-400 ">
                <OtherHousesIcon />
                <span className="btm-nav-label text-xs sm:text-lg md:text-sm">Home  </span>
            </NavLink>
            <NavLink to="/" className="flex gap-2 items-center justify-center hover:text-sky-400">
                <IntegrationInstructionsIcon/>
                <span className="btm-nav-label text-xs sm:text-lg md:text-sm">My Interviews </span>
            </NavLink>
            <NavLink to="/" className="flex gap-2 items-center justify-center hover:text-sky-400">
                < ModelTrainingIcon/>
                <span className="btm-nav-label text-xs sm:text-lg md:text-sm">Progress </span>
            </NavLink>
      </div>

            <div>

                <button className="bg-sky-400 text-white p-2 rounded-lg">Profile </button>

            </div>

        </div>
    )
}

export default NavbarComponent