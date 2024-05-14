/*
  Warnings:

  - You are about to drop the column `lastSuccessfullLogin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "lastSuccessfullLogin",
ADD COLUMN     "lastSuccessfulLogin" TIMESTAMP(3);
