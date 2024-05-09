/*
  Warnings:

  - The `area_codes` column on the `incedents` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "incedents" ADD COLUMN     "affected_customers" INTEGER,
DROP COLUMN "area_codes",
ADD COLUMN     "area_codes" INTEGER[];
