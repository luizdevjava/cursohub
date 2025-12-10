import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    // Adicione qualquer lógica adicional aqui se necessário
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Proteger todas as rotas que começam com /admin
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"
        }
        return true
      },
    },
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}