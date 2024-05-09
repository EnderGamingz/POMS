/*
  Warnings:

  - You are about to drop the `incedents` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "incedents" DROP CONSTRAINT "incedents_serviceId_fkey";

-- DropTable
DROP TABLE "incedents";

-- CreateTable
CREATE TABLE "incidents" (
    "id" SERIAL NOT NULL,
    "location" TEXT[],
    "area_codes" INTEGER[],
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3),
    "planned" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "additional_information" TEXT,
    "affected_customers" INTEGER,
    "serviceId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incidents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "incidents_id_idx" ON "incidents"("id");

-- AddForeignKey
ALTER TABLE "incidents" ADD CONSTRAINT "incidents_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
