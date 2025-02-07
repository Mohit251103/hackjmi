import "express-session";

declare module "express-session" {
    interface SessionData {
        isInterviewer?: boolean;
        skills?: string[];
    }
}
