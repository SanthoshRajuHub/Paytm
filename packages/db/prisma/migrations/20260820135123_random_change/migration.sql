/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_userId_key" ON "OnRampTransaction"("userId");
