import express from "express";
import { PrismaClient } from "@prisma/client";
import io from "../utils/socketConf";
import {onlineInterviewers} from "./interviewer"

const router = express.Router();
const prisma = new PrismaClient();

router.post("/start-interview", async (req, res) => {
    try {
        const { userId, skills } = req.body;
        const request = await prisma.interviewRequest.create({
            data: {
                userId: userId,
                skill: skills
            }
        })

        console.log(userId, skills)
        const interviewers = await prisma.user.findMany({
            where: {
                isInterviewer: true,
                interviewerInfo: {
                    skills: {
                        hasEvery: skills
                    }
                }
            }
        });
        
        if (interviewers.length === 0) {
            res.status(404).json({ message: "Interviewers not available" });
            return;
        }

        let present = false;
        for (let interviewer of interviewers){
            if (onlineInterviewers[interviewer.id]) {
                present = true;
                io.to(onlineInterviewers[interviewer.id]).emit('interview-request', request);
            }
        }
        if (!present) {
            res.status(404).json({ message: "Interviewers not available" });
            return;
        }

        res.status(200).json({ message: "Requests sent" });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router;


