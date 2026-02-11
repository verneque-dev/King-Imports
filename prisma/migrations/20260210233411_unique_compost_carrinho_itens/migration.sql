/*
  Warnings:

  - A unique constraint covering the columns `[id_carrinho,id_produto]` on the table `carrinho_itens` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "carrinho_itens_id_carrinho_id_produto_key" ON "carrinho_itens"("id_carrinho", "id_produto");
