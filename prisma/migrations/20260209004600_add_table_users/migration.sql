/*
  Warnings:

  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "admin";

-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "email_user" TEXT NOT NULL,
    "senha_hash_user" TEXT NOT NULL,
    "tipo_users" TEXT NOT NULL DEFAULT 'cliente',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_user_key" ON "users"("email_user");
