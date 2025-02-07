-- DropForeignKey
ALTER TABLE "InterviewRequest" DROP CONSTRAINT "InterviewRequest_interviewerId_fkey";

-- DropForeignKey
ALTER TABLE "InterviewRequest" DROP CONSTRAINT "InterviewRequest_userId_fkey";

-- AddForeignKey
ALTER TABLE "InterviewRequest" ADD CONSTRAINT "InterviewRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewRequest" ADD CONSTRAINT "InterviewRequest_interviewerId_fkey" FOREIGN KEY ("interviewerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
