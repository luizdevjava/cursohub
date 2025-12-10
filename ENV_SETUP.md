# 🔐 Configuração de Ambiente

Este guia explica como configurar as variáveis de ambiente para a plataforma de cursos.

## 📋 Arquivos de Ambiente

### `.env.example` - Template
Copie este arquivo para criar seu ambiente local:
```bash
cp .env.example .env.local
```

### `.env.local` - Ambiente Local
Nunca commitar este arquivo. Adicione ao `.gitignore`.

## 🔧 Variáveis Necessárias

### 1. Database
```env
DATABASE_URL="file:./dev.db"
```
- **Desenvolvimento**: SQLite (padrão)
- **Produção**: PostgreSQL (Neon, Supabase, etc.)

### 2. NextAuth
```env
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"
```

#### Gerar NEXTAUTH_SECRET
```bash
# OpenSSL
openssl rand -base64 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Online
https://generate-secret.vercel.app/
```

### 3. Credenciais Admin
```env
ADMIN_EMAIL="admin@exemplo.com"
ADMIN_PASSWORD="senha123"
```

## 🚀 Configuração por Ambiente

### Desenvolvimento (Local)
```env
# .env.local
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="segredo-desenvolvimento"
NEXTAUTH_URL="http://localhost:3000"
ADMIN_EMAIL="admin@localhost"
ADMIN_PASSWORD="admin123"
```

### Staging
```env
DATABASE_URL="postgresql://user:pass@staging-host/db"
NEXTAUTH_SECRET="segredo-staging"
NEXTAUTH_URL="https://staging.seusite.com"
ADMIN_EMAIL="admin@staging.seusite.com"
ADMIN_PASSWORD="staging123"
```

### Produção (Vercel)
Configure no painel da Vercel:
```
DATABASE_URL="postgresql://user:pass@prod-host/db"
NEXTAUTH_SECRET="segredo-producao-muito-seguro"
NEXTAUTH_URL="https://seusite.com"
ADMIN_EMAIL="admin@seusite.com"
ADMIN_PASSWORD="senha-segura-123"
```

## 🗄️ Configuração de Banco de Dados

### SQLite (Desenvolvimento)
```env
DATABASE_URL="file:./dev.db"
```

### PostgreSQL (Produção)
```env
# Neon
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/dbname?sslmode=require"

# Supabase
DATABASE_URL="postgresql://postgres:[password]@db.[project].supabase.co:5432/postgres"

# Railway
DATABASE_URL="postgresql://postgres:[password]@containers-us-west-xxx.railway.app:7913/railway"
```

## 🔐 Segurança

### Senhas Forttes
- Mínimo 12 caracteres
- Letras maiúsculas e minúsculas
- Números e caracteres especiais
- Não usar informações pessoais

### NEXTAUTH_SECRET
- Use valores diferentes por ambiente
- Gere novos segredos regularmente
- Armazene de forma segura

### Variáveis Sensíveis
- Nunca commitar `.env.local`
- Usar gerenciador de senhas
- Rotacionar credenciais regularmente

## 🛠️ Comandos Úteis

### Verificar Variáveis
```bash
# Verificar se variáveis estão carregadas
npm run dev

# Debug (adicionar ao código)
console.log(process.env.DATABASE_URL)
```

### Testar Conexão
```bash
# Testar banco de dados
npm run db:push

# Testar NextAuth
npm run dev
# Acessar /api/auth/session
```

## 🚨 Problemas Comuns

### 1. NEXTAUTH_URL Incorreto
**Erro**: `NEXTAUTH_URL_INTERNAL` errors
**Solução**: Verifique se a URL está correta para o ambiente

### 2. Database Connection Failed
**Erro**: `Can't reach database server`
**Solução**: Verifique `DATABASE_URL` e conectividade

### 3. Invalid Secret
**Erro**: `Invalid NEXTAUTH_SECRET`
**Solução**: Gere um novo segredo válido

## 📱 Configuração Mobile

### React Native/Expo
```env
EXPO_PUBLIC_API_URL="http://localhost:3000/api"
```

### PWA
```env
NEXT_PUBLIC_PWA_NAME="Sua Plataforma"
NEXT_PUBLIC_PWA_SHORT_NAME="Cursos"
```

## 🔧 Variáveis Opcionais

### Google Analytics
```env
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

### Email (para notificações)
```env
EMAIL_FROM="noreply@seusite.com"
SMTP_HOST="smtp.seusite.com"
SMTP_PORT="587"
SMTP_USER="email@seusite.com"
SMTP_PASS="senha-email"
```

### Upload de Arquivos
```env
AWS_ACCESS_KEY_ID="sua-key"
AWS_SECRET_ACCESS_KEY="seu-secret"
AWS_REGION="us-east-1"
AWS_S3_BUCKET="seu-bucket"
```

## 🚀 Deploy Automatizado

### GitHub Secrets
Configure secrets no GitHub:
- `NEXTAUTH_SECRET`
- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

### Vercel Environment
Configure na Vercel:
- Production Environment
- Preview Environment  
- Development Environment

## 📚 Recursos

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)
- [Prisma Database URLs](https://www.prisma.io/docs/reference/database-reference/connection-urls)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

Para dúvidas, consulte a documentação ou abra uma issue no repositório.