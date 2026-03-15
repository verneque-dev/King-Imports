-- DropForeignKey
ALTER TABLE "carrinho_itens" DROP CONSTRAINT "carrinho_itens_id_produto_fkey";

-- AddForeignKey
ALTER TABLE "carrinho_itens" ADD CONSTRAINT "carrinho_itens_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produtos") ON DELETE CASCADE ON UPDATE CASCADE;
