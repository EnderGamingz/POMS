/*
  Warnings:

  - You are about to drop the `outageCollectionLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "outageCollectionLog";

-- CreateTable
CREATE TABLE "outageDataCollectionLog" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "outageDataCollectionLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "outageDataCollectionLog" ADD CONSTRAINT "outageDataCollectionLog_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
