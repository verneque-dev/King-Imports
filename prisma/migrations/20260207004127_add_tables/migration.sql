-- CreateTable
CREATE TABLE "categorias" (
    "id_categorias" SERIAL NOT NULL,
    "nome_categorias" VARCHAR(50) NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id_categorias")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id_produtos" SERIAL NOT NULL,
    "nome_produtos" VARCHAR(100) NOT NULL,
    "desc_produtos" TEXT,
    "preco_produtos" DECIMAL(10,2),
    "id_categoria" INTEGER NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id_produtos")
);

-- CreateTable
CREATE TABLE "produtos_images" (
    "id_images" SERIAL NOT NULL,
    "images_url" TEXT NOT NULL,
    "principal" BOOLEAN NOT NULL DEFAULT false,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "produtos_images_pkey" PRIMARY KEY ("id_images")
);

-- CreateTable
CREATE TABLE "produtos_avaliacoes" (
    "id_avaliacao" SERIAL NOT NULL,
    "nome_user" VARCHAR(50) NOT NULL,
    "nota_avaliacao" INTEGER NOT NULL,
    "comentario_avaliacao" VARCHAR(100),
    "aprovado" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "produtos_avaliacoes_pkey" PRIMARY KEY ("id_avaliacao")
);

-- CreateTable
CREATE TABLE "carrinho" (
    "id_carrinho" SERIAL NOT NULL,
    "token" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "carrinho_pkey" PRIMARY KEY ("id_carrinho")
);

-- CreateTable
CREATE TABLE "carrinho_itens" (
    "id_itens" SERIAL NOT NULL,
    "quantidade_itens" INTEGER NOT NULL,
    "id_carrinho" INTEGER NOT NULL,
    "id_produto" INTEGER NOT NULL,

    CONSTRAINT "carrinho_itens_pkey" PRIMARY KEY ("id_itens")
);

-- CreateTable
CREATE TABLE "admin" (
    "id_admin" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha_hash" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id_admin")
);

-- CreateIndex
CREATE UNIQUE INDEX "nome_categorias_unique" ON "categorias"("nome_categorias");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categorias"("id_categorias") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos_images" ADD CONSTRAINT "produtos_images_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produtos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "produtos_avaliacoes" ADD CONSTRAINT "produtos_avaliacoes_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produtos") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_itens" ADD CONSTRAINT "carrinho_itens_id_carrinho_fkey" FOREIGN KEY ("id_carrinho") REFERENCES "carrinho"("id_carrinho") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "carrinho_itens" ADD CONSTRAINT "carrinho_itens_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "produtos"("id_produtos") ON DELETE RESTRICT ON UPDATE CASCADE;
