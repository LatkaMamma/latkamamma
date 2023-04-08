-- AlterTable
ALTER TABLE "GuestSubscriber" ALTER COLUMN "removeAfter" SET DEFAULT now() + interval '30 years';

-- CreateTable
CREATE TABLE "RichText" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "body" JSONB NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "RichText_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RichText_slug_key" ON "RichText"("slug");
