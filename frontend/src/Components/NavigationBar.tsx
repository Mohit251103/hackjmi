import React from "react";

import { NavLink } from "react-router-dom";
import OtherHousesIcon from "@mui/icons-material/OtherHouses";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

const NavbarComponent: React.FC = () => {
  return (
    <div className="flex justify-around items-center flex-wrap gap-5 absolute top-0 bg-rose-200 w-full min-h-12">
      <img className="w-12" src="/Logo.svg" alt="error" />

      <div className="flex justify-center items-center flex-wrap gap-5">
        <NavLink
          to="/"
          className=" flex items-center justify-center rounded-lg"
        >
          <OtherHousesIcon />
          <span className="btm-nav-label text-xs sm:text-lg md:text-md">
            Home{" "}
          </span>
        </NavLink>
        <NavLink to="/" className="flex items-center justify-center ">
          <IntegrationInstructionsIcon />
          <span className="btm-nav-label text-xs sm:text-lg md:text-md">
            My Interviews{" "}
          </span>
        </NavLink>
        <NavLink to="/" className="flex items-center justify-center">
          <ModelTrainingIcon />
          <span className="btm-nav-label text-xs sm:text-lg md:text-md">
            Progress{" "}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default NavbarComponent;
