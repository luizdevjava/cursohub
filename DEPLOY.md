# 🚀 Guia de Deploy - Vercel

Este guia explica como fazer o deploy da plataforma de cursos na Vercel.

## 📋 Pré-requisitos

- Conta na Vercel
- Repositório GitHub/GitLab/Bitbucket
- Variáveis de ambiente configuradas

## 🔧 Configuração de Variáveis de Ambiente

Na Vercel, vá para `Settings > Environment Variables` e adicione:

```env
# Database (use Neon PostgreSQL para produção)
DATABASE_URL="postgresql://user:password@host:port/database"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-muito-segura"
NEXTAUTH_URL="https://seu-dominio.vercel.app"

# Admin Credentials
ADMIN_EMAIL="admin@seusite.com"
ADMIN_PASSWORD="senha-segura-123"
```

## 🗄️ Configuração do Banco de Dados

### Opção 1: Neon (Recomendado)
1. Crie uma conta em [Neon](https://neon.tech)
2. Crie um novo projeto PostgreSQL
3. Copie a connection string
4. Adicione ao `DATABASE_URL` na Vercel

### Opção 2: Outros provedores PostgreSQL
- Supabase
- Railway
- PlanetScale
- AWS RDS

## 🚀 Processo de Deploy

### 1. Conectar Repositório
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório Git
4. Selecione o projeto

### 2. Configurar Build
O Next.js será detectado automaticamente. Configure:

```bash
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

### 3. Variáveis de Ambiente
Adicione todas as variáveis listadas acima.

### 4. Deploy
Clique em "Deploy". O processo levará alguns minutos.

## 🔧 Configuração Pós-Deploy

### 1. Atualizar URLs
No `.env.local` atualize:
```env
NEXTAUTH_URL="https://seu-dominio.vercel.app"
```

### 2. Configurar Domínio (Opcional)
1. Vá para `Settings > Domains`
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

### 3. Migrar Banco de Dados
Se usando Neon, o schema será criado automaticamente no primeiro deploy.

## 📊 Monitoramento

### Vercel Analytics
- Ative em `Analytics`
- Monitore performance e tráfego

### Logs
- Verifique `Function Logs` para erros
- Monitore `Build Logs` para problemas de deploy

## 🔒 Segurança

### 1. HTTPS
A Vercel fornece HTTPS automaticamente.

### 2. Variáveis de Ambiente
- Nunca commitar `.env.local`
- Usar senhas fortes
- Rotacionar chaves regularmente

### 3. Rate Limiting
Considere implementar rate limiting para APIs.

## 🚨 Troubleshooting

### Build Falha
```bash
# Verificar dependências
npm install

# Verificar TypeScript
npm run lint

# Build local
npm run build
```

### Erros de Banco de Dados
- Verificar `DATABASE_URL`
- Confirmar que schema foi migrado
- Testar conexão localmente

### Problemas de Autenticação
- Verificar `NEXTAUTH_SECRET`
- Confirmar `NEXTAUTH_URL`
- Limpar cookies do navegador

## 📈 Performance

### 1. Imagens
- Usar formato WebP
- Otimizar tamanho
- Lazy loading

### 2. Cache
- Configurar cache headers
- Usar ISR para páginas dinâmicas
- Cache de APIs quando possível

### 3. Bundle Size
```bash
# Analisar bundle
npm run build
npx @next/bundle-analyzer
```

## 🔄 CI/CD

### GitHub Actions (Opcional)
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 📱 Deploy Responsável

### 1. Testes
- Testar em ambiente de staging
- Validar todas as funcionalidades
- Testar login e fluxos admin

### 2. Backup
- Backup regular do banco de dados
- Versionamento de código
- Documentação de mudanças

### 3. Monitoramento
- Configurar alertas
- Monitorar uptime
- Logs de erro

---

Para suporte adicional, consulte a [documentação da Vercel](https://vercel.com/docs).