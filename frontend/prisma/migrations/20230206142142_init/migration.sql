-- CreateTable
CREATE TABLE "EmailConsent" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "privacyConsent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailConsent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailConsent_email_key" ON "EmailConsent"("email");
