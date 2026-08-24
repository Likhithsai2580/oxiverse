-- Migration: add CmsPage, Banner, RoadmapPhase content models
-- Purely additive: only CREATE TABLE for the three new models + their indexes/FK.
-- No DROP / no ALTER DROP / no data loss. Enums (Role, DisplayMode, ProjectStatus)
-- already exist from prior tables and are reused.

-- CreateTable
CREATE TABLE "CmsPage" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "excerpt" TEXT,
    "content" TEXT NOT NULL DEFAULT '',
    "published" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" TIMESTAMP(3),
    "order" INTEGER NOT NULL DEFAULT 0,
    "parentId" TEXT,
    "showInNav" BOOLEAN NOT NULL DEFAULT false,
    "navLabel" TEXT,
    "imageUrl" TEXT,
    "imageDisplay" "DisplayMode" NOT NULL DEFAULT 'cover',
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CmsPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Banner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT,
    "message" TEXT,
    "link" TEXT,
    "linkText" TEXT,
    "placement" TEXT NOT NULL DEFAULT 'announcement',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "startAt" TIMESTAMP(3),
    "endAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Banner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadmapPhase" (
    "id" TEXT NOT NULL,
    "phase" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'future',
    "isLocked" BOOLEAN NOT NULL DEFAULT false,
    "blurIntensity" INTEGER NOT NULL DEFAULT 0,
    "items" JSONB NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoadmapPhase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CmsPage_slug_key" ON "CmsPage"("slug");
-- CreateIndex
CREATE INDEX "CmsPage_slug_idx" ON "CmsPage"("slug");
-- CreateIndex
CREATE INDEX "CmsPage_parentId_idx" ON "CmsPage"("parentId");
-- CreateIndex
CREATE INDEX "CmsPage_order_idx" ON "CmsPage"("order");
-- CreateIndex
CREATE INDEX "CmsPage_published_idx" ON "CmsPage"("published");
-- CreateIndex
CREATE INDEX "Banner_active_idx" ON "Banner"("active");
-- CreateIndex
CREATE INDEX "Banner_placement_idx" ON "Banner"("placement");
-- CreateIndex
CREATE INDEX "Banner_order_idx" ON "Banner"("order");
-- CreateIndex
CREATE INDEX "RoadmapPhase_order_idx" ON "RoadmapPhase"("order");

-- AddForeignKey
ALTER TABLE "CmsPage" ADD CONSTRAINT "CmsPage_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "CmsPage"("id") ON DELETE SET NULL ON UPDATE CASCADE;
