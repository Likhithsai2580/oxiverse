-- CreateTable
CREATE TABLE "SlugRedirect" (
    "id" TEXT NOT NULL,
    "oldPath" TEXT NOT NULL,
    "newPath" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'blog',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SlugRedirect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SlugRedirect_oldPath_key" ON "SlugRedirect"("oldPath");

-- CreateIndex
CREATE INDEX "SlugRedirect_oldPath_idx" ON "SlugRedirect"("oldPath");
