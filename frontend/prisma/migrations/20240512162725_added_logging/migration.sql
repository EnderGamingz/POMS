-- CreateTable
CREATE TABLE "logType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "logType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "log" (
    "id" SERIAL NOT NULL,
    "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "info" TEXT NOT NULL,
    "logTypeId" INTEGER NOT NULL,

    CONSTRAINT "log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "log" ADD CONSTRAINT "log_logTypeId_fkey" FOREIGN KEY ("logTypeId") REFERENCES "logType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
