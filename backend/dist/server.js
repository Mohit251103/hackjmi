"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineInterviewers = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const candidate_1 = __importDefault(require("./services/candidate"));
const interviewer_1 = __importDefault(require("./services/interviewer"));
const http_1 = __importDefault(require("http"));
require("./utils/socketConf");
const socket_io_1 = require("socket.io");
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = 3000;
const prisma = new client_1.PrismaClient();
let onlineInterviewers = {};
exports.onlineInterviewers = onlineInterviewers;
// socket io
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:5173", // Change to your frontend URL
        methods: ["GET", "POST"],
        credentials: true // Allow cookies & authentication
    }
});
// Middleware
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({ origin: "http://localhost:5173", credentials: true }));
app.use(express_1.default.json());
app.use((0, express_session_1.default)({
    secret: "hackjmi",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Google OAuth Strategy
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}));
// Serialize and Deserialize User
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
// Google Auth Routes
app.get("/auth/google", (req, res, next) => {
    const isInterviewer = req.query.isInterviewer === "true";
    // Set an HTTP-only cookie to store isInterviewer
    res.cookie("isInterviewer", isInterviewer, {
        httpOnly: true, // Prevent frontend access
        secure: process.env.NODE_ENV === "production", // Enable secure in production
        maxAge: 5 * 60 * 1000,
        sameSite: "lax",
    });
    next();
}, passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "http://localhost:5173" }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const req_user = req.user;
    const isInterviewer = req.cookies.isInterviewer === "true";
    const user = yield prisma.user.findUnique({
        where: {
            id: req_user.id
        }
    });
    if (!user) {
        const res_user = yield prisma.user.create({
            data: {
                id: req_user.id,
                name: req_user.displayName,
                email: req_user._json.email,
                image: req_user._json.picture,
                isInterviewer: isInterviewer
            }
        });
        if (isInterviewer) {
            let skill = [];
            if (body.skills) {
                skill = body.skills;
            }
            yield prisma.interviewerMeta.create({
                data: {
                    skills: skill,
                    userId: res_user.id
                }
            });
        }
    }
    if (isInterviewer) {
        res.redirect("http://localhost:5173/home/2");
    }
    else {
        res.redirect("http://localhost:5173/home");
    }
}));
// Logout Route
app.get("/logout", (req, res) => {
    req.logout(() => {
        res.redirect("http://localhost:5173");
    });
});
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (req.isAuthenticated()) {
        const user = req.user;
        const data = yield prisma.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                interviewerInfo: true
            }
        });
        res.json({
            id: user.id,
            name: user.displayName,
            image: user._json.picture,
            email: user._json.email,
            isInterviewer: !!(data === null || data === void 0 ? void 0 : data.isInterviewer),
            skills: (_a = data === null || data === void 0 ? void 0 : data.interviewerInfo) === null || _a === void 0 ? void 0 : _a.skills,
            interviewCount: (_b = data === null || data === void 0 ? void 0 : data.interviewerInfo) === null || _b === void 0 ? void 0 : _b.count
        });
    }
    else {
        res.status(401).send("Not authorized");
    }
}));
app.use("/candidate", candidate_1.default);
app.use("/interviewer", interviewer_1.default);
// Start Server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
io.on('connection', (socket) => {
    console.log(`Socket ${socket.id} connected`);
    socket.on("join_as_interviewer", (userId) => __awaiter(void 0, void 0, void 0, function* () {
        onlineInterviewers[userId] = socket.id;
        console.log(`Interviewer ${userId} connected`);
    }));
    socket.on("join_room", () => {
        socket.join(socket.id);
        console.log(`${socket.id} joined ${socket.id}`);
        io.to(socket.id).emit('joined_room', `${socket.id} joined ${socket.id}`);
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
});
exports.default = io;
