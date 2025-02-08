import { Button, Snackbar } from "@mui/material"
import NavbarComponent from "../SingleComponents/NavigationBar.tsx"
import React, { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";
import socket from "../../utils/socket.ts";
import { Copy, LoaderCircle, X } from "lucide-react";



const hardcodedSkills = [
    "JavaScript", "React", "Node.js", "Python", "C++",
    "Java", "SQL", "MongoDB", "PostgreSQL", "Docker"
];

const Toast = ({ message, open, setMessage, setOpen }:
    {
        message: string,
        open: boolean,
        setMessage: React.Dispatch<React.SetStateAction<string>>,
        setOpen: React.Dispatch<React.SetStateAction<boolean>>
    }) => {
    return <Snackbar
        open={open}
        autoHideDuration={5000}
        message={message}
        onClose={() => { setMessage("");  setOpen(false)}}
    />
}

const SkillPopup = ({ user, setPopup, setLoading }:
    {
        user: any,
        setPopup: React.Dispatch<React.SetStateAction<boolean>>,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>
    }) => {

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
        setPopup(false);
        setLoading(true);
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
    const [message, setMessage] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [showMeet, setShowMeet] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

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

    const handleCopy = () => {
        navigator.clipboard.writeText(link).then(() => {
            setMessage("Copied !!")
            setOpen(true);
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }

    useEffect(() => {
        checkAuth();
        socket.on("meet_link", ({ link }) => {
            setLink(link);
            setMessage("Found Interviewer");
            setOpen(true);
            setLoading(false);
            setShowMeet(true);
        })
    }, [])

    return (
        <div className="flex-col justify-center items-center">
            <Toast message={message} open={open} setMessage={setMessage} setOpen={setOpen} />
            {loading && 
                <div className="z-50 absolute top-0 left-0 h-[100vh] w-[100vw] bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
                    <LoaderCircle className="animate-spin h-5 w-5"/>
                </div>
            }
            {showMeet && 
                <div className="absolute top-0 right-0 h-[100vh] w-[100vw] bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center">
                    <div className="absolute top-0 right-2"><X color="white" onClick={()=> setShowMeet(false)}/></div>
                    <div className="w-[40%] h-[30%] p-3 rounded-md flex flex-col items-center justify-center">
                        <input type="text" value={link} />
                        <Button onClick={handleCopy}><Copy />{" "}Copy</Button>
                    </div>
                </div>
            }
            <NavbarComponent />
            {openPopUp &&
                <SkillPopup user={user} setPopup={setOpenPopUp} setLoading={setLoading} />
            }
            <Button variant="outlined" onClick={handleClick}>
                Ready to take interview
            </Button>
        </div>
    )
}

export default Candidate