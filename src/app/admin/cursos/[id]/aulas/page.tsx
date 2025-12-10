"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, PlayCircle, GripVertical, ArrowLeft } from "lucide-react"
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

// Mock data para aulas
const mockLessons = [
  {
    id: "1",
    title: "Introdução ao React",
    description: "Conheça o que é React e por que usá-lo",
    order: 1,
    duration: "15:30",
    videoUrl: "https://drive.google.com/file/d/1ExampleID/preview"
  },
  {
    id: "2", 
    title: "Configurando o Ambiente",
    description: "Como configurar seu ambiente de desenvolvimento React",
    order: 2,
    duration: "12:45",
    videoUrl: "https://drive.google.com/file/d/2ExampleID/preview"
  },
  {
    id: "3",
    title: "Componentes e Props",
    description: "Entendendo a base do React: componentes e propriedades",
    order: 3,
    duration: "22:15",
    videoUrl: "https://drive.google.com/file/d/3ExampleID/preview"
  },
  {
    id: "4",
    title: "Estado e Eventos",
    description: "Gerenciando estado e lidando com eventos em React",
    order: 4,
    duration: "28:30",
    videoUrl: "https://drive.google.com/file/d/4ExampleID/preview"
  },
  {
    id: "5",
    title: "Hooks Fundamentais",
    description: "useState, useEffect e outros hooks essenciais",
    order: 5,
    duration: "35:20",
    videoUrl: "https://drive.google.com/file/d/5ExampleID/preview"
  }
]

const mockCourse = {
  id: "1",
  title: "Introdução ao React",
  description: "Aprenda os fundamentos do React do zero"
}

export default function CourseLessons() {
  const params = useParams()
  const router = useRouter()
  const [lessons, setLessons] = useState(mockLessons)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  const filteredLessons = lessons.filter(lesson =>
    lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (lessonId: string) => {
    setLoading(true)
    // Aqui você faria a chamada à API para deletar
    // await fetch(`/api/courses/${params.id}/lessons/${lessonId}`, { method: 'DELETE' })
    
    // Simulação de delete
    setLessons(lessons.filter(l => l.id !== lessonId))
    setLoading(false)
  }

  const handleReorder = async (draggedId: string, targetId: string) => {
    // Aqui você implementaria a lógica de reordenação
    const draggedIndex = lessons.findIndex(l => l.id === draggedId)
    const targetIndex = lessons.findIndex(l => l.id === targetId)
    
    const newLessons = [...lessons]
    const [draggedLesson] = newLessons.splice(draggedIndex, 1)
    newLessons.splice(targetIndex, 0, draggedLesson)
    
    // Atualizar ordem
    newLessons.forEach((lesson, index) => {
      lesson.order = index + 1
    })
    
    setLessons(newLessons)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/cursos">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Aulas do Curso</h1>
            <p className="text-muted-foreground">
              Gerencie as aulas do curso: <span className="font-medium">{mockCourse.title}</span>
            </p>
          </div>
        </div>
        <Link href={`/admin/cursos/${params.id}/aulas/nova`}>
          <Button className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Nova Aula</span>
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar aulas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Lessons List */}
      <Card>
        <CardHeader>
          <CardTitle>Aulas ({filteredLessons.length})</CardTitle>
          <CardDescription>
            Arraste e solte para reordenar as aulas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
                  <Badge variant="outline">Aula {lesson.order}</Badge>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{lesson.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {lesson.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <PlayCircle className="h-3 w-3 mr-1" />
                      {lesson.duration}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {lesson.videoUrl}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/cursos/${params.id}/aulas/${lesson.id}/editar`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
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
                          Esta ação não pode ser desfeita. Isso excluirá permanentemente a aula "{lesson.title}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(lesson.id)}>
                          Excluir
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>

          {filteredLessons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                {searchTerm ? "Nenhuma aula encontrada para sua busca." : "Nenhuma aula criada ainda."}
              </p>
              {!searchTerm && (
                <Link href={`/admin/cursos/${params.id}/aulas/nova`}>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Aula
                  </Button>
                </Link>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}