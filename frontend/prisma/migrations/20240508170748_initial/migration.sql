-- CreateTable
CREATE TABLE "incedents" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "area_codes" JSONB NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "planned" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "additional_information" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "incedents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "incedents_id_idx" ON "incedents"("id");
