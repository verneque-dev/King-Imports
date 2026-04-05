# King Imports E-commerce
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/verneque-dev/produtos-catalogo/blob/main/LICENSE) 

# Sobre o projeto

https://kingimport.com.br

Um E-commerce de produtos com CRUD completo, sistema de avaliações, carrinho e paginação, painel administrativo completo e autenticação via JWT para acesso às rotas privadas, validação de dados com zod e criptografia de senhas. Uso da api do cloudinary para armaenamento de imagens dos produtos.
O back-end foi construído em NextJS + Node.js e TypeScript (Route Handler), padrão de arquietetura limpa, realizando operações via prisma a um banco PostgreSQL.
O front-end é construido Com NextJS com paginas tanto server side quanto client side reativas e dinamicas.

## Layout web
<img width="1365" height="634" alt="image" src="https://github.com/user-attachments/assets/7e1d7e99-fb5e-4188-a2cc-9eb2591bfe3d" />

# Tecnologias utilizadas
## Back end
- NextJS
- Node.js
- TypeScript
- Prisma
- Zod
- JWT

## Front end
- NextJS
- React
- Tailwind
- Sonner
- Swipper
  
## Implantação em produção
- Back end + Front end: Vercel
- Banco de dados: Supabase (PostgreSQL)
  
# Rotas Principais

## Produtos
- GET api/produtos listar produtos
- POST api/produtos criar produto
- PUT api/produtos editar produto
- DELETE api/produtos/:id excluir produto
  ## Imagens
  - GET api/produtos/imagens listar
  - POST api/produtos/imagens salvar url no banco
  - DELETE api/produtos/imagens/:id excluir url do banco
  ## Avaliacoes
  - GET api/produtos/imagens listar avaliações
  - POST api/produtos/imagens criar avaliação
  - PATCH api/produtos/imagens aprovar ou reprovar avaliação
  - DELETE api/produtos/imagens/:id deletar avaliação

## Categorias
- GET api/categorias listar categorias
- POST api/categorias criar categoria
- PUT api/categorias editar categoria
- DELETE api/categorias/:id deletar categoria

## Carrinho
- GET api/carrinho listar carrinhos
- POST api/carrinho adicionar ao carrinho
- DELETE api/carrinho/:id deletar carrinho
  ## Finalizar
  - POST api/carrinho/finlizar finalizar pedido e gerar url WhatsApp

## Upload
- POST api/upload salva imagem usando api externa no banco do cloudinary
- DELETE api/upload deleta imagem do banco da cloudinary usando api externa

## Login
 - POST /login (retorna token JWT)

# Autor

Vitor Henrique Verneque Silva

https://www.linkedin.com/in/vitor-verneque
