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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const server_1 = __importDefault(require("../server"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
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
router.post("/accept-request", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { requestId, interviewerId } = req.body;
        const request = yield prisma.interviewRequest.findUnique({
            where: {
                id: requestId
            }
        });
        if (!request || request.status === 'accepted') {
            res.status(400).json({ message: "Request already accepted" });
        }
        const updated = yield prisma.interviewRequest.update({
            where: { id: requestId },
            data: { interviewerId, status: "accepted" }
        });
        server_1.default.emit("remove_request", { requestId }); // to be done
        res.status(200).json({ success: true, message: "Interview accepted!" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
router.post("/add-skills", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, skills } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
            return;
        }
        yield prisma.user.update({
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
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
