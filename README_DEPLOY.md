# 🚨 IMPORTANTE - README PARA DEPLOY

## 📋 **O QUE VOCÊ PRECISA FAZER**

### 1️⃣ **BAIXAR OS ARQUIVOS**
Todos os arquivos do projeto já estão criados. Baixe o projeto completo.

### 2️⃣ **SUBIR PARA GITHUB**
```bash
# Crie um repositório no GitHub
# Suba os arquivos do projeto
git init
git add .
git commit -m "Plataforma de cursos completa"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
git push -u origin main
```

### 3️⃣ **CONFIGURAR VERCEL**
1. Acesse **vercel.com**
2. Conecte seu GitHub
3. Selecione o repositório
4. Configure as variáveis de ambiente (abaixo)

### 4️⃣ **VARIÁVEIS DE AMBIENTE OBRIGATÓRIAS**

Na Vercel (Settings > Environment Variables):

```env
# 1. Banco de Dados (Neon)
DATABASE_URL="postgresql://user:pass@host/db"

# 2. NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="https://seu-site.vercel.app"

# 3. Admin
ADMIN_EMAIL="admin@seusite.com"
ADMIN_PASSWORD="senha123"
```

### 5️⃣ **COMO OBTER O DATABASE_URL**

1. Acesse **neon.tech** (grátis)
2. Crie conta e projeto
3. Copie a **Connection String**
4. Cole em `DATABASE_URL`

### 6️⃣ **COMO GERAR NEXTAUTH_SECRET**

Acesse: **https://generate-secret.vercel.app/**

## 🎯 **ESTRUTURA DO PROJETO**

```
projeto/
├── src/app/              # Páginas Next.js
├── src/components/       # Componentes React
├── src/lib/            # Configurações
├── prisma/             # Schema do banco
├── .env.example        # Template de variáveis
└── README.md           # Documentação
```

## ⚠️ **NÃO ESQUEÇA**

- **NÃO** envie o `.env.local` para o GitHub
- **USE** o Neon para banco de dados em produção
- **GERE** um NEXTAUTH_SECRET único
- **CONFIGURE** as variáveis na Vercel **ANTES** do deploy

## 🚀 **APÓS DEPLOY**

Seu site estará disponível em:
- **Site:** `https://seu-projeto.vercel.app`
- **Admin:** `https://seu-projeto.vercel.app/admin/login`

## 📞 **SUPORTE**

Se tiver problemas:
1. Verifique as variáveis de ambiente
2. Veja os logs de build na Vercel
3. Confirme o DATABASE_URL do Neon

---

**PRONTO PARA DEPLOY!** 🎉