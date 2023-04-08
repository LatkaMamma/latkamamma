/*
  Warnings:

  - Made the column `fname` on table `EmailConsent` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lname` on table `EmailConsent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "EmailConsent" ALTER COLUMN "fname" SET NOT NULL,
ALTER COLUMN "lname" SET NOT NULL;
