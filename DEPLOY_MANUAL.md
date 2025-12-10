# 🚀 Guia de Deploy na Vercel (Manual)

## 📋 **PASSO A PASSO PARA DEPLOY**

### 1️⃣ **Preparar Repositório GitHub**
```bash
# Seu projeto já está pronto!
# Apenas faça commit e push para seu repositório GitHub
git add .
git commit -m "Plataforma de cursos completa"
git push origin main
```

### 2️⃣ **Configurar Vercel**
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"New Project"**
3. Conecte seu **repositório GitHub**
4. Selecione o projeto
5. Clique em **"Deploy"**

### 3️⃣ **Configurar Variáveis de Ambiente na Vercel**

No painel da Vercel, vá em:
`Settings > Environment Variables`

Adicione estas variáveis:

```env
# Banco de Dados (use Neon - é grátis e fácil)
DATABASE_URL="sua-url-do-neon-aqui"

# NextAuth
NEXTAUTH_SECRET="gerar-uma-chave-secreta-aqui"
NEXTAUTH_URL="https://seu-projeto.vercel.app"

# Admin
ADMIN_EMAIL="admin@seusite.com"
ADMIN_PASSWORD="senha-forte-123"
```

### 4️⃣ **Como Obter DATABASE_URL (Neon)**

1. Acesse [neon.tech](https://neon.tech)
2. Crie conta gratuita
3. Crie novo projeto
4. Copie a **Connection String**
5. Cole no campo `DATABASE_URL` da Vercel

### 5️⃣ **Como Gerar NEXTAUTH_SECRET**

Use um destes métodos:
```bash
# Online (mais fácil)
https://generate-secret.vercel.app/

# Ou localmente
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 6️⃣ **Deploy Automático**

Após configurar as variáveis:
1. Vá para **"Deployments"** na Vercel
2. Clique em **"Redeploy"**
3. Aguarde o deploy finalizar

## 🔧 **Configurações Importantes**

### Build Settings (Vercel configura automaticamente):
```
Build Command: npm install && npm run build
Output Directory: .next
Install Command: npm install
```

### Framework Preset:
- **Next.js** (detectado automaticamente)

## 🚨 **Possíveis Erros e Soluções**

### Erro: "NEXTAUTH_URL incorreto"
**Solução:** Verifique se a URL está exatamente igual ao domínio da Vercel

### Erro: "Database connection failed"
**Solução:** Verifique se o `DATABASE_URL` do Neon está correto

### Erro: "Build falhou"
**Solução:** Verifique se todas as dependências foram instaladas

## 📱 **Após Deploy Bem-Sucedido**

### Acessar sua Plataforma:
- **Site Público:** `https://seu-projeto.vercel.app`
- **Área Admin:** `https://seu-projeto.vercel.app/admin/login`

### Login Admin:
- **Email:** O que você configurou em `ADMIN_EMAIL`
- **Senha:** O que você configurou em `ADMIN_PASSWORD`

## 🎯 **Checklist Final Antes do Deploy**

- [ ] Repositório no GitHub atualizado
- [ ] Conta Neon criada e DATABASE_URL copiada
- [ ] NEXTAUTH_SECRET gerado
- [ ] Variáveis configuradas na Vercel
- [ ] Deploy realizado com sucesso
- [ ] Teste de login admin
- [ ] Teste de criação de curso

## 🔄 **Atualizações Futuras**

Para fazer atualizações:
1. Faça as mudanças no código
2. Commit e push para GitHub
3. Vercel faz deploy automático

## 🎉 **Pronto!**

Sua plataforma de cursos estará no ar com:
- ✅ URL profissional (.vercel.app)
- ✅ Certificado SSL grátis
- ✅ Deploy automático
- ✅ Banco de dados PostgreSQL
- ✅ Domínio customizável

---

**Parabéns! Sua plataforma de cursos online estará no ar!** 🚀