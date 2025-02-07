import express from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

// Middleware
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(
    session({
        secret: "hackjmi",
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false
        }
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
    (req, res, next) => {
        const isInterviewer = req.query.isInterviewer === "true";

        // Set an HTTP-only cookie to store isInterviewer
        res.cookie("isInterviewer", isInterviewer, {
            httpOnly: true, // Prevent frontend access
            secure: process.env.NODE_ENV === "production", // Enable secure in production
            maxAge: 5 * 60 * 1000,
            sameSite: "lax",
        });
        next();
    },
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:5173" }),
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
        
        res.redirect("http://localhost:5173/home");
    }
);

// Logout Route
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:3000");
    });
});

app.get("/user", async (req, res) => {
    if (req.isAuthenticated()) {
        const user: any = req.user;
        const data = await prisma.user.findUnique({
            where: {
                id: user.id
            }
        })
        res.json({
            id: user.id,
            name: user.displayName,
            image: user._json.picture,
            email: user._json.email,
            isInterviewer: !!data?.isInterviewer
        });
    }
    else {
        res.status(401).send("Not authorized");
    }
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
