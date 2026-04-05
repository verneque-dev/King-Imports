# 👑 King Imports | Fullstack E-commerce

> **Status do Projeto:** Em produção 🚀  
> **Link do Projeto:** [kingimport.com.br](https://kingimport.com.br)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)

O **King Imports** é uma plataforma de e-commerce robusta desenvolvida com o que há de mais moderno no ecossistema JavaScript. O projeto foca em performance, segurança e uma experiência de gestão completa para o administrador através de um CRUD intuitivo e arquitetura escalável.

---

## 📸 Layout

<div align="center">
  <img width="100%" alt="King Imports Preview" src="https://github.com/user-attachments/assets/7e1d7e99-fb5e-4188-a2cc-9eb2591bfe3d" />
</div>

---

## 🚀 Funcionalidades

### 🛍️ Experiência do Cliente
- **Carrinho Dinâmico:** Adição, remoção e persistência de itens.
- **Sistema de Avaliações:** Feedback real de usuários com controle de aprovação pelo admin.
- **Busca e Filtros:** Localização rápida de produtos por categorias e paginação eficiente.
- **Finalização via WhatsApp:** Integração direta para fechar pedidos de forma rápida e dinâmica.

### 🔐 Painel Administrativo (Backoffice)
- **Gestão de Produtos:** CRUD completo (Criar, Ler, Atualizar e Deletar) com validação rigorosa via **Zod**.
- **Controle de Imagens:** Upload e exclusão de fotos consumindo a **Cloudinary API**.
- **Moderação de Conteúdo:** Interface para aprovar ou rejeitar avaliações pendentes.
- **Segurança:** Acesso protegido por autenticação **JWT** e criptografia de senhas com **Bcrypt**.

---

## 🛠️ Tecnologias Utilizadas

### **Core Stack**
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Route Handlers)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/) (Hospedado no **Supabase**)
- **ORM:** [Prisma](https://www.prisma.io/)

### **Ferramentas de Apoio**
- **Estilização:** Tailwind CSS
- **Validação:** Zod
- **Autenticação:** JWT (JSON Web Tokens)
- **Armazenamento de Mídia:** Cloudinary API
- **UI Components:** Sonner (Toasts) e Swiper.js (Carrosséis)

---

## 🏗️ Arquitetura

O projeto foi estruturado utilizando princípios de **Arquitetura Limpa (Clean Architecture)** e **Separation of Concerns**, dividindo responsabilidades entre:
- **Services:** Lógica de negócio e comunicação com o banco via Prisma.
- **Route Handlers:** API Endpoints para comunicação segura entre Front e Back.
- **Interfaces:** Tipagem rigorosa para garantir consistência de dados em toda a aplicação.

---

## 🔧 Como Executar o Projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/verneque-dev/kingimports.git

2. **Instale as dependências**
   ```
   npm install

3. **Configure as variáveis de ambiente:**
Crie um arquivo .env na raiz do projeto:

DATABASE_URL="sua_url_do_supabase"
JWT_SECRET="sua_chave_secreta"
CLOUDINARY_CLOUD_NAME="nome_do_cloud"
CLOUDINARY_API_KEY="sua_key"
CLOUDINARY_API_SECRET="seu_secret"

4. **Prepare o banco de dados:**
```bash
npx prisma migrate dev
```

5. Rode o servidor:
```bash
npm run dev
```

**👤 Autor**
Vitor Henrique Verneque Silva

LinkedIn: https://linkedin.com/in/vitor-verneque
