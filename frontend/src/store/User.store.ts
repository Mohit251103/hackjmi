import { create } from 'zustand';

interface UserDetails {
    id:string
    name:string
    email:string
    image:string
    isInterviewer:boolean
    isAuth: boolean
}
interface UserState{
    user:UserDetails|null
    setUser: (newUser: UserDetails) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({

        user:null,
        setUser: (newUser) => set({ user: newUser }),
        clearUser: () => set({ user: null }),


}));