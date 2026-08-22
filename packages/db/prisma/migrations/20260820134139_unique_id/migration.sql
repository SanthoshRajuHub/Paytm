/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `OnRampTransaction` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_id_key" ON "OnRampTransaction"("id");
