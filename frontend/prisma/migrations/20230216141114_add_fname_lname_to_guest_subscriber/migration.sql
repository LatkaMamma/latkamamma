/*
  Warnings:

  - Added the required column `fname` to the `GuestSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GuestSubscriber" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "fname" TEXT NOT NULL,
ADD COLUMN     "lname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "removeAfter" TIMESTAMP(3) NOT NULL DEFAULT now() + interval '30 years';
