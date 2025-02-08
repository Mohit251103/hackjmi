import React, {useEffect, useState} from 'react';
import {
    Typography,
    Box,
} from '@mui/material';
import BottomActionsCard from "../SingleComponents/Card.tsx";
import socket from "../../utils/socket.ts";
import MeetingLinkDialog from "../dialog/meetDialog.tsx";

export interface Interview {
    id: number;
    name: string;
    photo: string;
    status: "Online" | "Offline";
    meetLink: string;
}

const InterviewRoute:React.FC = ( ) => {
    const [link, setLink] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const interviews:Interview[]=[];

    useEffect(() => {
        socket.on("meet_link", ({ link }) => {
            setLink(link);
            setOpen(true);
        })
    }, [])
    return (
        <>
        <Box sx={{ p: 4,width:'100%' }}>
            <Typography variant="h4" gutterBottom>
                Available Interviews
            </Typography>
            <Box height={6} bgcolor='primary.main'  marginBottom={4} />
            <Box  className="flex flex-wrap gap-5">
                {interviews.length!=0?interviews.map((interview) => {
                    return <BottomActionsCard key={interview.id} data={interview}/>
                }):(
                    <Box className="flex flex-col justify-center items-center">
                        <img
                            src="https://res.cloudinary.com/dmrtl2bh1/image/upload/v1739028055/MockMate.png"
                            alt="404"
                            className="w-64 h-auto"
                        />
                        <Typography variant="h4" className="text-gray-700 text-center mb-8">
                            Not Available Interviews
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
            <MeetingLinkDialog link={link} dialogState={open} setDialogState={setOpen} />
        </>
    );
};

export default InterviewRoute;