/*
  Warnings:

  - You are about to drop the column `bio` on the `Profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GuestSubscriber" ALTER COLUMN "removeAfter" SET DEFAULT now() + interval '30 years';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "bio";