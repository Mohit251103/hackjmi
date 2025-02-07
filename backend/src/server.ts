import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: "hackjmi",
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

// Google OAuth Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

// Serialize and Deserialize User
passport.serializeUser((user: Express.User, done) => {
    done(null, user);
});

passport.deserializeUser((obj : any, done) => {
    done(null, obj);
});

// Google Auth Routes
app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
    async (req, res) => {
        const body = req.body;
        const req_user:any = req.user;
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
                    isInterviewer: body.isInterviewer
                }
            })

            if (body.isInterviewer) {
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
        
        res.redirect("http://localhost:5000/dashboard");
    }
);

// Logout Route
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:3000");
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
