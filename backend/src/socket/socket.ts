import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { google } from "googleapis";

interface OnlineUsers {
  [email: string]: string; // { email: socketId }
}

interface CandidateSelectedSkillPayload {
  skill: string;
  candidateEmail: string;
}

interface InterviewerClickedNotificationPayload {
  interviewerEmail: string;
  candidateEmail: string;
}

const onlineInterviewers: OnlineUsers = {};
const onlineCandidates: OnlineUsers = {};

// --------------------- Google Meet Setup ---------------------
const SCOPES = ["https://www.googleapis.com/auth/calendar.events"];
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json", // Google API credentials file
  scopes: SCOPES,
});
const calendar = google.calendar({ version: "v3", auth });

const createGoogleMeet = async (
  interviewerEmail: string,
  candidateEmail: string
): Promise<string> => {
  try {
    const event = {
      summary: "Interview Meeting",
      description: "Interview session",
      start: {
        dateTime: new Date(new Date().getTime() + 5 * 60 * 1000).toISOString(),
        timeZone: "UTC",
      },
      end: {
        dateTime: new Date(new Date().getTime() + 35 * 60 * 1000).toISOString(),
        timeZone: "UTC",
      },
      attendees: [{ email: interviewerEmail }, { email: candidateEmail }],
      conferenceData: {
        createRequest: {
          requestId: `${Date.now()}`,
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
      conferenceDataVersion: 1,
    });

    return response.data.hangoutLink || "";
  } catch (error) {
    console.error("Error creating Google Meet link:", error);
    throw new Error("Failed to create Google Meet link");
  }
};

// --------------------- Initialize WebSocket ---------------------
export const initializeSocket = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"], // Allow frontend connection
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);

    const userEmail = socket.handshake.query.email as string;
    const isInterviewer = socket.handshake.query.isInterviewer === "true";

    if (userEmail) {
      if (isInterviewer) {
        onlineInterviewers[userEmail] = socket.id;
      } else {
        onlineCandidates[userEmail] = socket.id;
      }
    }

    console.log("Online Interviewers:", onlineInterviewers);
    console.log("Online Candidates:", onlineCandidates);

    // Candidate selects skill
    socket.on(
      "candidateSelectedSkill",
      ({ skill, candidateEmail }: CandidateSelectedSkillPayload) => {
        console.log(`Candidate ${candidateEmail} selected skill: ${skill}`);

        Object.keys(onlineInterviewers).forEach((interviewerEmail) => {
          io.to(onlineInterviewers[interviewerEmail]).emit(
            "newInterviewRequest",
            {
              skill,
              candidateEmail,
            }
          );
        });
      }
    );

    // Interviewer clicks notification
    socket.on(
      "interviewerClickedNotification",
      async ({
        interviewerEmail,
        candidateEmail,
      }: InterviewerClickedNotificationPayload) => {
        try {
          const meetLink = await createGoogleMeet(
            interviewerEmail,
            candidateEmail
          );

          const interviewerSocketId = onlineInterviewers[interviewerEmail];
          const candidateSocketId = onlineCandidates[candidateEmail];

          if (interviewerSocketId) {
            io.to(interviewerSocketId).emit("meetLink", { meetLink });
          }

          if (candidateSocketId) {
            io.to(candidateSocketId).emit("meetLink", { meetLink });
          }

          console.log("Meeting Link Sent:", meetLink);
        } catch (error) {
          console.error("Error creating Meet link:", error);
        }
      }
    );

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      Object.keys(onlineInterviewers).forEach((email) => {
        if (onlineInterviewers[email] === socket.id) {
          delete onlineInterviewers[email];
        }
      });

      Object.keys(onlineCandidates).forEach((email) => {
        if (onlineCandidates[email] === socket.id) {
          delete onlineCandidates[email];
        }
      });

      console.log("Updated Online Interviewers:", onlineInterviewers);
      console.log("Updated Online Candidates:", onlineCandidates);
    });
  });
};
