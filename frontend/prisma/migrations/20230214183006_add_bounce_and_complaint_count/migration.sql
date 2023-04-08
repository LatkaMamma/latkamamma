-- AlterTable
ALTER TABLE "GuestSubscriber" ADD COLUMN     "bounces" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "complaints" INTEGER NOT NULL DEFAULT 0;
