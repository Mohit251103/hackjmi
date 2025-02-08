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
const server_2 = require("../server");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.post("/start-interview", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, skills } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        const request = yield prisma.interviewRequest.create({
            data: {
                userId: userId,
                skill: skills
            }
        });
        const interviewers = yield prisma.user.findMany({
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
        // console.log(JSON.stringify(skills))
        let present = false;
        for (let interviewer of interviewers) {
            if (server_2.onlineInterviewers[interviewer.id]) {
                present = true;
                server_1.default.to(server_2.onlineInterviewers[interviewer.id]).emit('interview_request', Object.assign(Object.assign({}, request), { name: user === null || user === void 0 ? void 0 : user.name, image: user === null || user === void 0 ? void 0 : user.image }));
            }
        }
        if (!present) {
            res.status(404).json({ message: "Interviewers not available" });
            return;
        }
        res.status(200).json({ message: "Requests sent" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
