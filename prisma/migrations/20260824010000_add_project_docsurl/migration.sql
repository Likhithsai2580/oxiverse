-- Migration: add docsUrl column to Project
-- Purely additive: a nullable column. No DROP / no data loss.
-- When set, the public ecosystem card shows a Documentation button linking
-- to this URL; when NULL the button is hidden.

ALTER TABLE "Project" ADD COLUMN "docsUrl" TEXT;
