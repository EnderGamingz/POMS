/*
  Warnings:

  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "log" DROP CONSTRAINT "log_logTypeId_fkey";

-- DropTable
DROP TABLE "log";

-- DropTable
DROP TABLE "logType";

-- CreateTable
CREATE TABLE "outageCollectionLog" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT NOT NULL,

    CONSTRAINT "outageCollectionLog_pkey" PRIMARY KEY ("id")
);
