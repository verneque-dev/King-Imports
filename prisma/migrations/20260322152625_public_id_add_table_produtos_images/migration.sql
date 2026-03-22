/*
  Warnings:

  - Added the required column `public_id` to the `produtos_images` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "produtos_images" DROP CONSTRAINT "produtos_images_id_produto_fkey";

-- AlterTable
ALTER TABLE "produtos_images" ADD COLUMN     "public_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "produtos_images" ADD CONSTRAINT "produtos_images_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produtos") ON DELETE CASCADE ON UPDATE NO ACTION;
