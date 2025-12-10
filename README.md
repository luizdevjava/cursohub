# 🎓 Plataforma de Cursos Online

Uma plataforma completa de cursos em vídeo construída com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui. Sistema gratuito de educação com painel administrativo para gerenciamento de cursos e acompanhamento de progresso dos alunos.

## 🚀 Tecnologias Utilizadas

### Framework e Linguagem
- **⚡ Next.js 15** - Framework React com App Router
- **📘 TypeScript 5** - JavaScript com tipagem estática
- **🎨 Tailwind CSS 4** - Framework CSS utility-first
- **🧩 shadcn/ui** - Componentes UI acessíveis e modernos

### Banco de Dados e Backend
- **🗄️ Prisma** - ORM moderno para Node.js e TypeScript
- **🔐 NextAuth.js** - Solução completa de autenticação
- **📱 SQLite** - Banco de dados leve (para desenvolvimento)

### Funcionalidades
- **📊 Sistema de Progresso** - Acompanhamento individual por aluno
- **🎥 Player de Vídeo** - Integração com Google Drive
- **📱 Responsivo** - Design mobile-first
- **🌙 Tema Dark/Light** - Suporte a múltiplos temas

## 📋 Funcionalidades da Plataforma

### 👥 Área Pública (Gratuita)
- **Listagem de Cursos** - Visualização de todos os cursos disponíveis
- **Detalhes do Curso** - Informações completas e progresso
- **Player de Vídeo** - Reprodução de aulas com URL do Google Drive
- **Sistema de Progresso** - Salvo automaticamente no localStorage
- **Navegação entre Aulas** - Fluxo contínuo de aprendizado

### 🔐 Área Administrativa
- **Login Seguro** - Autenticação via NextAuth
- **CRUD de Cursos** - Criar, editar, remover cursos
- **Gerenciamento de Aulas** - Adicionar e organizar aulas
- **Upload de Vídeos** - Integração com Google Drive
- **Relatórios** - Acompanhamento de progresso dos alunos
- **Dashboard** - Estatísticas e métricas da plataforma

## 🏗️ Estrutura do Projeto

```
src/
├── app/                          # Páginas Next.js
│   ├── admin/                    # Área administrativa
│   │   ├── cursos/              # Gerenciamento de cursos
│   │   ├── alunos/              # Relatórios de alunos
│   │   └── login/               # Login admin
│   ├── curso/[id]/              # Página do curso
│   │   ├── page.tsx             # Detalhes do curso
│   │   └── aula/[aulaId]/       # Player de vídeo
│   └── page.tsx                 # Home pública
├── components/                   # Componentes React
│   └── ui/                      # Componentes shadcn/ui
├── lib/                         # Utilitários
│   ├── auth.ts                  # Config NextAuth
│   └── db.ts                    # Cliente Prisma
└── types/                       # Tipos TypeScript
```

## 🚀 Configuração Rápida

### 1. Instalação
```bash
# Clonar o projeto
git clone <repository-url>
cd plataforma-cursos

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local
```

### 2. Configurar Ambiente
Edite o arquivo `.env.local` com suas credenciais:

```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth
NEXTAUTH_SECRET="sua-chave-secreta-aqui"
NEXTAUTH_URL="http://localhost:3000"

# Admin Credentials
ADMIN_EMAIL="admin@seusite.com"
ADMIN_PASSWORD="senha123"
```

### 3. Configurar Banco de Dados
```bash
# Gerar cliente Prisma
npm run db:generate

# Fazer push do schema
npm run db:push
```

### 4. Iniciar Desenvolvimento
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 🔐 Acesso Administrativo

1. Acesse `/admin/login`
2. Use as credenciais configuradas no `.env.local`
3. Gerencie cursos, aulas e visualize relatórios

## 📱 Como Usar a Plataforma

### Para Alunos (Acesso Público)
1. Navegue pela home e escolha um curso
2. Acesse a página do curso para ver detalhes
3. Assista às aulas em ordem sequencial
4. Marque aulas como concluídas para acompanhar progresso
5. O progresso é salvo automaticamente no navegador

### Para Administradores
1. Faça login na área admin
2. Crie novos cursos com título, descrição e imagem
3. Adicione aulas com URLs do Google Drive
4. Organize a ordem das aulas
5. Acompanhe o progresso dos alunos

## 🎥 Configuração de Vídeos (Google Drive)

### Como obter URL do Google Drive:
1. Faça upload do vídeo para o Google Drive
2. Clique com o botão direito no vídeo
3. Selecione "Compartilhar" → "Qualquer pessoa com o link"
4. Copie o URL e cole no campo de vídeo da aula

O sistema converte automaticamente para o formato de embed.

## 🚀 Deploy na Vercel

### 1. Preparar para Deploy
```bash
# Build para produção
npm run build
```

### 2. Configurar Variáveis de Ambiente na Vercel
- `NEXTAUTH_SECRET` - Chave secreta para NextAuth
- `NEXTAUTH_URL` - URL da aplicação
- `ADMIN_EMAIL` - Email do administrador
- `ADMIN_PASSWORD` - Senha do administrador
- `DATABASE_URL` - URL do banco de dados (Neon/PostgreSQL)

### 3. Deploy Automático
Conecte seu repositório à Vercel para deploy automático a cada push.

## 🗄️ Modelo de Dados

### Course
```typescript
{
  id: string
  title: string
  description: string
  image?: string
  createdAt: Date
  updatedAt: Date
  lessons: Lesson[]
}
```

### Lesson
```typescript
{
  id: string
  title: string
  description?: string
  videoUrl: string
  order: number
  courseId: string
  createdAt: Date
  updatedAt: Date
}
```

### Progress
```typescript
{
  id: string
  studentId: string  // UUID anônimo
  lessonId: string
  completed: boolean
  createdAt: Date
  updatedAt: Date
}
```

## 🎨 Personalização

### Cores e Tema
- Edite `tailwind.config.ts` para personalizar cores
- O sistema suporta modo dark/light automático

### Componentes
- Todos os componentes usam shadcn/ui
- Localizados em `src/components/ui/`
- Fácilmente customizáveis

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run lint         # ESLint
npm run db:push      # Push schema Prisma
npm run db:generate  # Gerar cliente Prisma
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma feature branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`)
4. Push para o branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🆘 Suporte

- Para dúvidas, abra uma issue no GitHub
- Documentação completa em `/docs`
- Exemplos de uso em `/examples`

---

Built with ❤️ para educação online gratuita
