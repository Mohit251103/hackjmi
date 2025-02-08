import { Button } from "@mui/material"
import NavbarComponent from "../SingleComponents/NavigationBar.tsx"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";



const hardcodedSkills = [
    "JavaScript", "React", "Node.js", "Python", "C++",
    "Java", "SQL", "MongoDB", "PostgreSQL", "Docker"
];

const SkillPopup = ({ user }: { user: any }) => {

    const [skills, setSkills] = useState<string[]>([]);
    const [dropdown, setDropdown] = useState<boolean>(false);

    const handleAddSkill = (skill: string) => {
        if (skills.includes(skill)) {
            return;
        }
        setSkills(prev => [...prev, skill]);
    }

    const deleteSkill = (idx: number) => {
        setSkills((prev) => {
            return prev.filter((_, i) => {
                return i != idx
            })
        })
    }

    const handleStart = async () => {
        const res = await axiosInstance.post("/candidate/start-interview", { userId: user.id, skills: skills });
        console.log(res);
    }

    return (
        <div className="absolute top-0 left-0 bg-black bg-opacity-70 h-full w-full flex justify-center items-center">
            <div className="h-[40%] w-[50%] p-4 bg-white">
                <div className="w-full flex flex-wrap gap-2">
                    {skills.map((skill, idx) => {
                        return (
                            <div key={idx} className="w-fit h-fit text-sm rounded-md p-2">
                                {skill + " "}
                                <span><button onClick={() => deleteSkill(idx)}>X</button></span>
                            </div>
                        )
                    })}
                </div>
                <div className="w-full flex-col justify-center items-center p-2">
                    <button className="w-fit text-md p-2 rounded-md border" onClick={() => setDropdown(prev => !prev)}>Select skills v</button>
                    {dropdown && <div className="w-full border flex-col gap-2 w-[30%] h-[25%] overflow-auto justify-center items-center absolute bg-white mt-1 z-40">
                        {hardcodedSkills.map((skill, idx) => {
                            return (
                                <button className="w-full border-b " key={idx} onClick={() => handleAddSkill(skill)}>{skill}</button>
                            )
                        })}
                    </div>}
                </div>
                <Button onClick={handleStart}>Start</Button>
            </div>
        </div>
    )
}

const Candidate = () => {
    const [user, setUser] = useState<any>({});
    const [openPopUp, setOpenPopUp] = useState<boolean>(false);
    const router = useNavigate();

    const checkAuth = async () => {
        try {
            const res = await axiosInstance.get("/user");
            setUser(res.data);
        } catch (error) {
            console.log(error);
            router('/');
        }
    }

    const handleClick = () => {
        setOpenPopUp(prev => !prev);
    }

    useEffect(() => {
        checkAuth();
    }, [])

    return (
        <div className="flex-col justify-center items-center">
            <NavbarComponent />
            {openPopUp &&
                <SkillPopup user={user} />
            }
            <Button variant="outlined" onClick={handleClick}>
                Ready to take interview
            </Button>
        </div>
    )
}

export default Candidate