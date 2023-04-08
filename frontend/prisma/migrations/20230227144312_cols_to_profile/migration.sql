-- AlterTable
ALTER TABLE "GuestSubscriber" ALTER COLUMN "removeAfter" SET DEFAULT now() + interval '30 years';
