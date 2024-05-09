/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `service` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "incedents" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "service_token_key" ON "service"("token");
