import { ReactNode, FC } from 'react';
import  {useUserStore} from '../store/User.store.ts'

interface Props {
    children: ReactNode;
}

const ProtectiveComponent:FC<Props>=({children})=>{

    const user = useUserStore(state=>state.user);


        if(!user){
            return <div>Not Authorized</div>
        }

        return children;



}

export default ProtectiveComponent;