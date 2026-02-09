/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `carrinho` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "carrinho_token_key" ON "carrinho"("token");
