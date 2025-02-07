import { ReactNode, FC,useEffect } from 'react';
import  {useUserStore} from '../../store/User.store.ts'
import Loading from './LoadingPage.tsx';
import axiosInstance from "../../utils/axiosInstance.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    children: ReactNode;
}

const ProtectiveComponent:FC<Props>=({children})=>{

    const user = useUserStore(state=>state.user);
    const setUser=useUserStore(state=>state.setUser);
    const navigate=useNavigate();

    useEffect(() => {

        const call=async()=> {
            try {
                const response = await axiosInstance.get('/user');  // ✅ Wait for the response
                console.log(response.data);
                setUser(response.data)
                // ✅ Correct way to access response data
            } catch (error) {
                navigate('/')
                console.error("Error fetching user:", error);

            }
        }
        call();

    },[])


        if(!user){
            return <Loading/>
        }

        return <>
       {children}
        </>



}

export default ProtectiveComponent;