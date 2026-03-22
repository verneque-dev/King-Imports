-- DropForeignKey
ALTER TABLE "produtos" DROP CONSTRAINT "produtos_id_categoria_fkey";

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categorias") ON DELETE CASCADE ON UPDATE NO ACTION;
