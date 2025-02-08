import { Bell, PlusCircle, Users2, X } from "lucide-react";
import { useUserStore } from "../store/User.store";
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import { Box, Button, Chip, Paper, Snackbar } from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import socket from "../utils/socket";

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));
interface ChipsArrayProps {
    chipData: string[];
    setChipData: React.Dispatch<React.SetStateAction<string[]>>;
}

interface InterviewRequest{
    interviewerId: string | null;
    id: string;
    userId: string;
    skill: string[];
    status: string;
    createdAt: Date;
    name: string;
    image: string;
    date: string
}

const rawskills = [
    { key: 0, label: 'Angular' },
    { key: 1, label: 'jQuery' },
    { key: 2, label: 'Polymer' },
    { key: 3, label: 'React' },
    { key: 4, label: 'Vue.js' },
    { key: 5, label: 'Svelte' },
    { key: 6, label: 'Next.js' },
    { key: 7, label: 'Nuxt.js' },
    { key: 8, label: 'Redux' },
    { key: 9, label: 'Zustand' },
    { key: 10, label: 'TypeScript' },
    { key: 11, label: 'Node.js' },
    { key: 12, label: 'Express.js' },
    { key: 13, label: 'NestJS' },
    { key: 14, label: 'GraphQL' },
    { key: 15, label: 'REST API' },
    { key: 16, label: 'MongoDB' },
    { key: 17, label: 'PostgreSQL' },
    { key: 18, label: 'Firebase' },
    { key: 19, label: 'Supabase' },
    { key: 20, label: 'Tailwind CSS' },
    { key: 21, label: 'Bootstrap' },
    { key: 22, label: 'Material UI' },
    { key: 23, label: 'Chakra UI' },
    { key: 24, label: 'Three.js' },
    { key: 25, label: 'WebRTC' },
    { key: 26, label: 'Socket.io' },
    { key: 27, label: 'D3.js' },
    { key: 28, label: 'Electron.js' },
    { key: 29, label: 'Docker' },
    { key: 30, label: 'Kubernetes' },
    { key: 31, label: 'Terraform' },
    { key: 32, label: 'AWS' },
    { key: 33, label: 'Azure' },
    { key: 34, label: 'Google Cloud' },
    { key: 35, label: 'Python' },
    { key: 36, label: 'Django' },
    { key: 37, label: 'Flask' },
    { key: 38, label: 'FastAPI' },
    { key: 39, label: 'Machine Learning' },
    { key: 40, label: 'AI/Deep Learning' },
    { key: 41, label: 'Blockchain' },
    { key: 42, label: 'Web3.js' },
    { key: 43, label: 'Solidity' },
    { key: 44, label: 'Cybersecurity' },
    { key: 45, label: 'CI/CD' },
    { key: 46, label: 'Jenkins' },
    { key: 47, label: 'GitHub Actions' },
    { key: 48, label: 'Redux Toolkit' },
    { key: 49, label: 'Vite' }
];

const ChipsArray: React.FC<ChipsArrayProps> = ({ chipData, setChipData }) => {


    const handleDelete = (key: number) => () => {
        setChipData((chips) => chips.filter((_, idx) => {
            return key !== idx
        }));
    };

    return (
        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                listStyle: 'none',
                p: 0.5,
                m: 0,
            }}
            component="ul"
        >
            {chipData.map((data, idx) => {

                return (
                    <ListItem key={idx}>
                        <Chip
                            label={data}
                            onDelete={handleDelete(idx)}
                        />
                    </ListItem>
                );
            })}
        </Paper>
    );
}

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

const TeacherDashboard = () => {
    const user = useUserStore().user;
    const [dropdown, setDropDown] = useState<boolean>(false);
    const [skills, setSkills] = useState<string[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [requests, setRequests] = useState<InterviewRequest[]>([]);

    const interviewer = {
        name: "Dr. John Smith",
        role: "Senior Technical Interviewer",
        skills: [
            "JavaScript",
            "React",
            "Node.js",
            "System Design",
            "Data Structures",
        ],
        interviews_conducted: 142,
        rating: 4.9,
    };

    const addNewSkill = () => {
        setDropDown(prev => !prev);
    }

    const handleServerAdd = async () => {
        try {
            const res = await axiosInstance.post("/interviewer/add-skills", { userId:user?.id, skills });
            console.log(res);
            setMessage(res.data.message);
            setOpen(true);
        } catch (error: any) {
            setMessage(error.response.data.message);
            setOpen(true);
        }
    }

    const handleAcceptInterview = async (requestId: string) => {
        try {
            const res = await axiosInstance.post("/interviewer/accept-request", { requestId, userId: user?.id })
            setMessage(res.data.message);
            setOpen(true);
            const meet_res = await axiosInstance.get("/interviewer/generate-meet");
            console.log(meet_res.data.link);
        } catch (error : any) {
            setMessage(error.response.data.message)
        }
    }

    useEffect(() => {

        socket.emit("join_as_interviewer", user?.id);
        socket.emit("join_room")

        socket.on('joined_room', (mssg) => {
            console.log(mssg);
        })

        socket.on("interview_request", (request: InterviewRequest) => { 
            setRequests((prev) => [...prev, request]);
        });

        socket.on("remove_request", ({requestId}) => {
            setRequests((prev) => prev.filter((r) => r.id !== requestId));
        });

        return () => {
            socket.off("join_room")
            socket.off('joined_room')
            socket.off("interview_request");
            socket.off("remove_request");
        };

    }, [user?.id, user?.skills])

    return (
        <div className="mt-12 flex overflow-hidden flex-wrap justify-center gap-4">
            {open && <Toast message={message} open={open} setMessage={setMessage} setOpen={setOpen}/>}
            {/* dropdown to select skills */}
            {dropdown &&
                <div className="h-full w-full bg-black bg-opacity-70 backdrop-blur-sm flex flex-col justify-center items-center absolute top-0 left-0">
                    <div className="absolute top-0 right-1 hover:bg-opacity-70 bg-opacity-90 rounded-full p-2" onClick={()=>{setDropDown(false)}}><X color="white"/></div>
                    <Box sx={{ width: '50%' }} className={'flex flex-col'}>
                        <ChipsArray chipData={skills} setChipData={setSkills}/>
                        <Paper
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                mt: 1,
                            }}
                            component="div"
                        >
                            {rawskills.map((data) => {

                                return (
                                    <ListItem key={data.key}>
                                        <Chip
                                            label={data.label}
                                            onClick={() => {
                                                if (skills.includes(data.label)) return;
                                                setSkills((chips) => chips.concat(data.label));
                                            }}
                                        />
                                    </ListItem>
                                );
                            })}

                        </Paper>
                        <Button variant="contained" onClick={handleServerAdd}>Add</Button>
                    </Box>
                </div>
            }

            <div className="min-h-screen w-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Interviewer Dashboard
                        </h1>
                        <div className="flex items-center space-x-4">
                            <Bell className="w-6 h-6 text-gray-600" />
                            <div
                                className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                <img src={`${user?.image}`} alt="User profile" className="rounded-full" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
                    {/* Left Section - 70% */}
                    <div className="w-[70%] bg-white rounded-xl shadow-sm p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {user?.name}
                                </h2>
                                <p className="text-gray-600 mt-1">{interviewer.role}</p>

                                <div className="mt-6 flex items-center space-x-6 text-gray-600">
                                    <div className="flex items-center">
                                        <Users2 className="w-5 h-5 mr-2" />
                                        <span>{user?.interviewCount} Interviews</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">★</span>
                                        <span className="ml-1">{interviewer.rating} Rating</span>
                                    </div>
                                </div>
                            </div>

                            {/* <button
                                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                                <Video className="w-5 h-5 mr-2" />
                                Join Interview
                            </button> */}
                        </div>

                        <div className="mt-8">
                            <h3 className="text-lg font-semibold mb-4">Skills & Expertise</h3>
                            <div className="flex flex-wrap gap-2">
                                {user?.skills?.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                <button className="h-fit w-fit" onClick={addNewSkill}><PlusCircle /></button>
                            </div>
                        </div>

                        {/* <div className="mt-12"> 
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000"
                                alt="Interview illustration"
                                className="w-full h-[300px] object-cover rounded-xl"
                            />
                        </div> */}
                    </div>

                    {/* Right Section - 30% */}
                    <div className="w-[30%] h-[60%] bg-white rounded-xl shadow-sm p-6 overflow-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">Interview Requests</h3>
                            {requests.length!==0 && <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                                {requests.length} New
                            </span>}
                        </div>

                        <div className="space-y-4">
                            {requests.map((request) => (
                                <div
                                    key={request.id}
                                    className="p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium text-gray-900">
                                                {request.name}
                                            </h4>
                                            {request.status === 'pending' ?
                                                <p className="text-xs text-red-500 mt-1">
                                                    Pending
                                                </p> :
                                                <p className="text-xs text-green-500 mt-1">
                                                    Accepted
                                                </p>
                                            }
                                        </div>
                                        <button className="text-blue-600 hover:text-blue-700" onClick={() => handleAcceptInterview(request.id)}>
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default TeacherDashboard;