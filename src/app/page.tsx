import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users } from "lucide-react"
import Link from "next/link"

// Mock data para cursos
const mockCourses = [
  {
    id: "1",
    title: "Introdução ao React",
    description: "Aprenda os fundamentos do React do zero",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    lessonsCount: 12,
    duration: "4h 30min",
    studentsCount: 1234
  },
  {
    id: "2", 
    title: "Next.js Avançado",
    description: "Domine o Next.js com projetos práticos",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    lessonsCount: 18,
    duration: "6h 15min",
    studentsCount: 892
  },
  {
    id: "3",
    title: "TypeScript Moderno",
    description: "Aprenda TypeScript com exemplos práticos",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop",
    lessonsCount: 15,
    duration: "5h 45min",
    studentsCount: 567
  }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">Educação Online</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/admin/login">
                <Button variant="outline">Área Admin</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Aprenda com os melhores cursos online
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cursos gratuitos e de alta qualidade para impulsionar sua carreira
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Nossos Cursos</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore nossa coleção de cursos gratuitos desenvolvidos por especialistas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{course.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.lessonsCount} aulas
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </span>
                    </div>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {course.studentsCount}
                    </span>
                  </div>
                  <Link href={`/curso/${course.id}`}>
                    <Button className="w-full">
                      Começar Curso
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Educação Online. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}