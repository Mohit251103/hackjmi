import { Button } from "@mui/material"
import NavbarComponent from "../NavigationBar"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";


const Candidate = () => {
    const [user, setUser] = useState<any>();
    const router = useNavigate();

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/user");
            console.log(res);
            setUser(res.data);
        } catch (error) {
            console.log(error);
            router('/');
        }
    }

    const handleClick = () => {
        
    }

    useEffect(() => {
        checkAuth();
    }, [])
    
    return (
        <div className="flex justify-center items-center">
            <NavbarComponent />
            <Button variant="outlined" onClick={handleClick}>
                Ready to take interview
            </Button>
        </div>
    )
}

export default Candidate