/*
  Warnings:

  - The `location` column on the `incedents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "incedents" DROP COLUMN "location",
ADD COLUMN     "location" TEXT[],
ALTER COLUMN "end_time" DROP NOT NULL;
