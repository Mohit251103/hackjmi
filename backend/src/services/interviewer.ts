import express from "express";
import { PrismaClient } from "@prisma/client";
import io from "../utils/socketConf";

const router = express.Router();
const prisma = new PrismaClient();

let onlineInterviewers : {[key : string] : string} = {}
io.on("connection", (socket: any) => {

    socket.on("join_as_interviewer", async (userId: string) => {
        onlineInterviewers[userId] = socket.id;
        console.log(`Interviewer ${userId} connected`);
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const userId in onlineInterviewers) {
            if (onlineInterviewers[userId] === socket.id) {
                delete onlineInterviewers[userId];
                break;
            }
        }
    });

})

router.post("/accept-request", async (req, res) => {
    try {
        const { requestId, interviewerId } = req.body;
        const request = await prisma.interviewRequest.findUnique({
            where: {
                id: requestId
            }
        });

        if (!request || request.status === 'accepted') {
            res.status(400).json({ message: "Request already accepted" });
        }

        const updated = await prisma.interviewRequest.update({
            where: { id: requestId },
            data: { interviewerId, status: "accepted" }
        });

        io.emit("remove_interview_request", { requestId }); // to be done

        res.status(200).json({ success: true, message: "Interview accepted!" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

router.post("/add-skills", async (req, res) => {
    try {
        const { userId, skills } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
            return;
        }

        await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                interviewerInfo: {
                    update: {
                        skills: skills
                    }
                }
            }
        });

        res.status(200).json({ message: "Updated skills successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

export { onlineInterviewers }
export default router   
