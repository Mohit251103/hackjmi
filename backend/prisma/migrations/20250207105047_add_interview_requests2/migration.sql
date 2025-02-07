/*
  Warnings:

  - The `skill` column on the `InterviewRequest` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "InterviewRequest" DROP COLUMN "skill",
ADD COLUMN     "skill" TEXT[];
