# 📝 Checklist para Deploy na Vercel

## ✅ **ANTES DE FAZER O DEPLOY**

### 1. **Preparação do Código**
- [ ] Todos os arquivos foram baixados
- [ ] Estrutura de pastas está correta
- [ ] Não existe `.env.local` no projeto
- [ ] `.env.example` está presente

### 2. **Repositório GitHub**
- [ ] Repositório criado no GitHub
- [ ] Arquivos enviados para o GitHub
- [ ] Branch principal é `main`

### 3. **Conta Neon (Banco de Dados)**
- [ ] Conta criada em neon.tech
- [ ] Projeto PostgreSQL criado
- [ ] Connection String copiada

### 4. **NextAuth Secret**
- [ ] Chave secreta gerada
- [ ] Usou generate-secret.vercel.app ou similar

## 🚀 **CONFIGURAÇÃO VERCEL**

### 5. **Conexão com GitHub**
- [ ] Login na Vercel com GitHub
- [ ] Repositório conectado
- [ ] Projeto selecionado

### 6. **Variáveis de Ambiente**
- [ ] `DATABASE_URL` configurado (Neon)
- [ ] `NEXTAUTH_SECRET` configurado
- [ ] `NEXTAUTH_URL` configurado
- [ ] `ADMIN_EMAIL` configurado
- [ ] `ADMIN_PASSWORD` configurado

### 7. **Build Settings**
- [ ] Framework: Next.js (detectado)
- [ ] Build Command: `npm install && npm run build`
- [ ] Output Directory: `.next`

## 🎯 **PÓS-DEPLOY**

### 8. **Testes Finais**
- [ ] Site carrega em `https://seu-projeto.vercel.app`
- [ ] Página admin acessível
- [ ] Login admin funciona
- [ ] Criação de curso funciona
- [ ] Player de vídeo funciona

## 🔧 **CONFIGURAÇÕES EXEMPLO**

### Variáveis de Ambiente (Vercel):
```env
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
NEXTAUTH_SECRET="abc123def456ghi789..."
NEXTAUTH_URL="https://meu-cursos.vercel.app"
ADMIN_EMAIL="admin@meusite.com"
ADMIN_PASSWORD="senhaSegura123"
```

### Neon Connection String:
```
postgresql://[user]:[password]@[host]/[dbname]?sslmode=require
```

## ⚠️ **ERROS COMUNS E SOLUÇÕES**

### Erro: "Database connection failed"
**Causa:** DATABASE_URL incorreto
**Solução:** Verifique string do Neon

### Erro: "Invalid NEXTAUTH_SECRET"
**Causa:** Chave secreta inválida
**Solução:** Gere nova chave

### Erro: "Build failed"
**Causa:** Dependências ou código
**Solução:** Verifique logs de build

### Erro: "Redirect loop"
**Causa:** NEXTAUTH_URL incorreto
**Solução:** Verifique URL exata

## 🎉 **SUCESSO!**

Se tudo estiver marcado acima:
- ✅ Sua plataforma está no ar!
- ✅ Pode começar a usar!
- ✅ Pode customizar como quiser!

---

**BOA SORTE COM SEU DEPLOY!** 🚀