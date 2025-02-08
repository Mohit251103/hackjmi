import express from "express";
import { PrismaClient } from "@prisma/client";
import io from "../server";
import { google } from "googleapis"

const router = express.Router();
const prisma = new PrismaClient();

// io.on("connection", (socket: any) => {

//     socket.on("join_as_interviewer", async (userId: string) => {
//         onlineInterviewers[userId] = socket.id;
//         console.log(`Interviewer ${userId} connected`);
//     });

//     socket.on("disconnect", () => {
//         console.log(`User disconnected: ${socket.id}`);
//         for (const userId in onlineInterviewers) {
//             if (onlineInterviewers[userId] === socket.id) {
//                 delete onlineInterviewers[userId];
//                 break;
//             }
//         }
//     });

// })

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
            return;
        }

        const updated = await prisma.interviewRequest.update({
            where: { id: requestId },
            data: { interviewerId, status: "accepted" }
        });

        io.emit("remove_request", { requestId }); // to be done

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

router.get("/generate-meet", async (req, res) => {
    if (!req.isAuthenticated()) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    const user: any = req.user;
    const accessToken = user.accessToken; // Get user's access token

    if (!accessToken) {
        res.status(401).json({ message: "Google authentication required" });
        return;
    }

    try {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });

        const calendar = google.calendar({ version: "v3", auth });

        const event = {
            summary: "Google Meet Meeting",
            start: {
                dateTime: new Date().toISOString(),
                timeZone: "Asia/Kolkata",
            },
            end: {
                dateTime: new Date(new Date().getTime() + 30 * 60 * 1000).toISOString(),
                timeZone: "Asia/Kolkata",
            },
            conferenceData: {
                createRequest: {
                    requestId: `meet-${Date.now()}`,
                    conferenceSolutionKey: { type: "hangoutsMeet" },
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: "primary",
            requestBody: event,
            conferenceDataVersion: 1,
        });

        console.log("Meet Link:", response.data.hangoutLink);
        const link = response.data.hangoutLink;
        io.emit("meet_link", { link });
        res.status(200).json({ link });
        
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
})

export default router   
