"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, PlayCircle, BookOpen } from "lucide-react"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Mock data para cursos
const mockCourses = [
  {
    id: "1",
    title: "Introdução ao React",
    description: "Aprenda os fundamentos do React do zero",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop",
    lessonsCount: 12,
    studentsCount: 1234,
    createdAt: "2024-01-15",
    status: "published"
  },
  {
    id: "2",
    title: "Next.js Avançado",
    description: "Domine o Next.js com projetos práticos",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
    lessonsCount: 18,
    studentsCount: 892,
    createdAt: "2024-01-10",
    status: "published"
  },
  {
    id: "3",
    title: "TypeScript Moderno",
    description: "Aprenda TypeScript com exemplos práticos",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop",
    lessonsCount: 15,
    studentsCount: 567,
    createdAt: "2024-01-05",
    status: "draft"
  }
]

export default function AdminCourses() {
  const [courses, setCourses] = useState(mockCourses)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (courseId: string) => {
    setLoading(true)
    // Aqui você faria a chamada à API para deletar
    // await fetch(`/api/courses/${courseId}`, { method: 'DELETE' })
    
    // Simulação de delete
    setCourses(courses.filter(c => c.id !== courseId))
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Cursos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os cursos da plataforma
          </p>
        </div>
        <Link href="/admin/cursos/novo">
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Novo Curso</span>
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <div className="aspect-video relative overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={course.status === "published" ? "default" : "secondary"}>
                  {course.status === "published" ? "Publicado" : "Rascunho"}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {course.lessonsCount}
                  </span>
                  <span className="flex items-center">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    {course.studentsCount}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Link href={`/admin/cursos/${course.id}/editar`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                </Link>
                
                <Link href={`/admin/cursos/${course.id}/aulas`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Aulas
                  </Button>
                </Link>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" disabled={loading}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso excluirá permanentemente o curso "{course.title}" e todas as suas aulas.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(course.id)}>
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">
            {searchTerm ? "Nenhum curso encontrado para sua busca." : "Nenhum curso criado ainda."}
          </p>
          {!searchTerm && (
            <Link href="/admin/cursos/novo">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Curso
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}