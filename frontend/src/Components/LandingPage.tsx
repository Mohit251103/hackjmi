import React, {useEffect} from 'react';
import {useUserStore} from '../store/User.store';
import {Button} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';


const LandingPage: React.FC = () => {

    // const setUser= useUserStore(state=>state.setUser);
    const user = useUserStore(state=>state.user);

    useEffect(()=>{
        console.log(user)
    },[])


    const handleGoogleLogin = (logger?: string) => {
        if (logger == 'interviewer') {
            window.location.href = "http://localhost:3000/auth/google?isInterviewer=true";
        }
        else window.location.href = "http://localhost:3000/auth/google";
    };

    return (
        <div
            className={`h-screen w-screen flex justify-center items-center bg-sky-100 flex-col gap-5`}>
            <div className='flex gap-5 justify-center items-center'>
                <img className="w-40" src="/logo.svg" alt="error"/>
                <div
                    className='text-black inline text-5xl sm:text-8xl font-poppins font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-sky-500  to-green-600'> Mockmate
                </div>

            </div>

            <div className='text-sm sm:text-3xl font-poppins font-extrabold text-center'> Elevate Your
                Experience With Senior Mock Interviews
            </div>


            <Button onClick={() => { handleGoogleLogin('interviewer') }}
                    startIcon={<GoogleIcon/>}
                    className={`font-bold `}>Start as Interviewer</Button>
            <Button onClick={() => { handleGoogleLogin() }}
                    startIcon={<GoogleIcon/>}
                    className={`font-bold `}>Start as Interviewee</Button>


        </div>

    )
}

export default LandingPage;