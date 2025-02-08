import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import CandidateHandler from "./services/candidate"
import InterviewerHandler from "./services/interviewer"
import http from 'http'
import "./utils/socketConf"
import { Server } from "socket.io";
import passport_conf from "./utils/authConf"

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = 3000;
const prisma = new PrismaClient();
let onlineInterviewers: { [key: string]: string } = {}

const io = new Server(server, {
    cors: {
        origin: process.env.VITE_API_URL, 
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.use(cookieParser());
app.use(cors({ origin: process.env.VITE_API_URL, credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: process.env.SECRET as string,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
    })
);
app.use(passport.initialize());
app.use(passport.session());

passport_conf(); // configuring google passport strategy

app.get(
    "/auth/google",
    (req, res, next) => {
        const isInterviewer = req.query.isInterviewer === "true";

        res.cookie("isInterviewer", isInterviewer, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production", 
            maxAge: 5 * 60 * 1000,
            sameSite: "lax",
        });
        next();
    },
    passport.authenticate("google", {
        scope: [
            "profile",
            "email",
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/calendar.events.owned"
            ]
    })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: process.env.VITE_API_URL }),
    async (req, res) => {
        const body = req.body;
        const req_user: any = req.user;
        const isInterviewer = req.cookies.isInterviewer === "true";
        const user = await prisma.user.findUnique({
            where: {
                id: req_user.id
            }
        })
        if (!user) {
            const res_user = await prisma.user.create({
                data: {
                    id: req_user.id,
                    name: req_user.displayName,
                    email: req_user._json.email,
                    image: req_user._json.picture,
                    isInterviewer: isInterviewer
                }
            })

            if (isInterviewer) {
                let skill = [];
                if (body.skills) {
                    skill = body.skills;
                }
                await prisma.interviewerMeta.create({
                    data: {
                        skills: skill,
                        userId: res_user.id
                    }
                })
            }
        }

        if (isInterviewer) {
            res.redirect(`${process.env.VITE_API_URL}/home/2`);
        }
        else {
            res.redirect(`${process.env.VITE_API_URL}/home`);
        }
    }
);

app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect(process.env.VITE_API_URL as string);
    });
});

app.get("/user", async (req, res) => {
    if (req.isAuthenticated()) {
        const user: any = req.user;
        const data = await prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                interviewerInfo: true
            }
        })
        res.json({
            id: user.id,
            name: user.displayName,
            image: user._json.picture,
            email: user._json.email,
            isInterviewer: !!data?.isInterviewer,
            skills: data?.interviewerInfo?.skills,
            interviewCount: data?.interviewerInfo?.count
        });
    }
    else {
        res.status(401).send("Not authorized");
    }
})

app.use("/candidate", CandidateHandler)
app.use("/interviewer", InterviewerHandler)

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);

    socket.on("join_as_interviewer", async (userId: string) => {
        onlineInterviewers[userId] = socket.id;
        console.log(`Interviewer ${userId} connected`);
    });

    socket.on("join_room", () => {
        socket.join(socket.id);
        console.log(`${socket.id} joined ${socket.id}`);
        io.to(socket.id).emit('joined_room', `${socket.id} joined ${socket.id}`);
    })

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        for (const userId in onlineInterviewers) {
            if (onlineInterviewers[userId] === socket.id) {
                delete onlineInterviewers[userId];
                break;
            }
        }
    });
});

export {onlineInterviewers}
export default io;
