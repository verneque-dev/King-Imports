/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `produtos_avaliacoes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `produtos_avaliacoes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "produtos_avaliacoes" ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "produtos_avaliacoes_token_key" ON "produtos_avaliacoes"("token");
