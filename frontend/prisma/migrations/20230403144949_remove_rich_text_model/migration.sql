/*
  Warnings:

  - You are about to drop the `RichText` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "GuestSubscriber" ALTER COLUMN "removeAfter" SET DEFAULT now() + interval '30 years';

-- DropTable
DROP TABLE "RichText";
