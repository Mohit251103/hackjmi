import {PlusCircle, Users2} from "lucide-react";
import {useUserStore} from "../store/User.store";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
import axiosInstance from "../utils/axiosInstance";
import socket from "../utils/socket";
import SelectSkills from "../Components/dialog/selecteSkills.tsx";
import MeetingLinkDialog from "../Components/dialog/meetDialog.tsx";
import Loading from "../Components/SingleComponents/LoadingPage.tsx";

interface InterviewRequest {
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

const TeacherDashboard = () => {
    const user = useUserStore().user;
    const [open, setOpen] = useState<boolean>(false);
    const [openMeet, setOpenMeet] = useState<boolean>(false);
    const [requests, setRequests] = useState<InterviewRequest[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [link, setLink] = useState<string>("");

    const interviewer = {
        name: "Dr. John Smith",
        role: "Senior Full Stack Dev ",
        skills: [],
        interviews_conducted: 142,
        rating: 4.9,
    };

    const addNewSkill = () => {
        setOpen(prev => !prev);
    }


    const handleAcceptInterview = async (requestId: string) => {
        setLoading(true);
        try {
            const res = await axiosInstance.post("/interviewer/accept-request", {requestId, userId: user?.id})
            console.log(res.data.message)
            const meet_res = await axiosInstance.get("/interviewer/generate-meet");
            setOpenMeet(true);
            console.log(meet_res.data.link);
            setLink(meet_res.data.link);
        } catch (error) {
            console.log(error);
            setOpen(true);
        } finally {
            setLoading(false);
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

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="mt-12 flex overflow-hidden flex-wrap justify-center gap-4">

            <div className="w-screen pl-2 pr-2 overflow-hidden bg-gray-50">
                <Box sx={{p: 1, width: '100%'}}>
                    <Typography variant="h4" gutterBottom>
                        Are you Ready To Take Juniors Interviews
                    </Typography>
                    <Box height={6} bgcolor='primary.main'/>
                </Box>
                <div className="max-w-7xl mx-auto px-4 py-8 flex gap-8">
                    <div className="w-[70%] bg-white rounded-xl shadow-sm p-8">
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900">
                                    {user?.name}
                                </h2>
                                <p className="text-gray-600 mt-1">{interviewer.role}</p>

                                <div className="mt-6 flex items-center space-x-6 text-gray-600">
                                    <div className="flex items-center">
                                        <Users2 className="w-5 h-5 mr-2"/>
                                        <span>{user?.interviewCount} Interviews</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-yellow-500">★</span>
                                        <span className="ml-1">{interviewer.rating} Rating</span>
                                    </div>
                                </div>
                            </div>
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
                                <button className="h-fit w-fit" onClick={addNewSkill}><PlusCircle/></button>
                            </div>
                        </div>
                    </div>

                    <div className="w-[30%] h-[60%] bg-white rounded-xl shadow-sm p-6 overflow-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold">Interview Requests</h3>
                            {requests.length !== 0 &&
                                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
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
                                        <button className="text-blue-600 hover:text-blue-700"
                                                onClick={() => handleAcceptInterview(request.id)}>
                                            Accept
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <SelectSkills dialogState={open} setDialogState={setOpen} isInterviewer={true}/>
            <MeetingLinkDialog link={link} dialogState={openMeet} setDialogState={setOpenMeet}/>
        </div>
    )
}

export default TeacherDashboard;