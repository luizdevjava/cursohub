"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, PlayCircle, CheckCircle, ArrowLeft } from "lucide-react"

// Mock data para o curso
const mockCourse = {
  id: "1",
  title: "Introdução ao React",
  description: "Aprenda os fundamentos do React do zero com este curso completo. Vamos cobrir componentes, estado, props, hooks e muito mais.",
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
  createdAt: "2024-01-15",
  lessons: [
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
}

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [studentId] = useState(() => {
    // Gerar ou recuperar ID único para o aluno
    let id = localStorage.getItem('student_id')
    if (!id) {
      id = 'student_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('student_id', id)
    }
    return id
  })

  useEffect(() => {
    // Carregar progresso salvo
    const saved = localStorage.getItem(`progress_${studentId}_${params.id}`)
    if (saved) {
      setCompletedLessons(new Set(JSON.parse(saved)))
    }
  }, [studentId, params.id])

  const toggleLessonComplete = (lessonId: string) => {
    const newCompleted = new Set(completedLessons)
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId)
    } else {
      newCompleted.add(lessonId)
    }
    setCompletedLessons(newCompleted)
    
    // Salvar no localStorage
    localStorage.setItem(
      `progress_${studentId}_${params.id}`, 
      JSON.stringify(Array.from(newCompleted))
    )
  }

  const progressPercentage = (completedLessons.size / mockCourse.lessons.length) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.back()}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </Button>
            <div className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Educação Online</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Course Header */}
      <div className="bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="aspect-video relative rounded-lg overflow-hidden">
                <img
                  src={mockCourse.image}
                  alt={mockCourse.title}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-4">{mockCourse.title}</h1>
                <p className="text-muted-foreground mb-6">{mockCourse.description}</p>
              </div>

              {/* Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Seu Progresso</span>
                    <Badge variant="secondary">
                      {completedLessons.size}/{mockCourse.lessons.length} aulas
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Progress value={progressPercentage} className="mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {progressPercentage.toFixed(0)}% completo
                  </p>
                </CardContent>
              </Card>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">{mockCourse.lessons.length}</p>
                    <p className="text-sm text-muted-foreground">Aulas</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Clock className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold">2h 34min</p>
                    <p className="text-sm text-muted-foreground">Duração</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons List */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Aulas do Curso</h2>
        <div className="space-y-4">
          {mockCourse.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id)
            const isNext = index === 0 || completedLessons.has(mockCourse.lessons[index - 1].id)
            
            return (
              <Card key={lesson.id} className={`transition-all ${isCompleted ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => toggleLessonComplete(lesson.id)}
                          className="h-5 w-5"
                        />
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : (
                          <PlayCircle className={`h-6 w-6 ${isNext ? 'text-primary' : 'text-muted-foreground'}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Badge variant="outline">Aula {lesson.order}</Badge>
                          <h3 className="font-semibold">{lesson.title}</h3>
                          <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        </div>
                        <p className="text-muted-foreground mt-1">{lesson.description}</p>
                      </div>
                    </div>
                    <Link href={`/curso/${params.id}/aula/${lesson.id}`}>
                      <Button 
                        variant={isCompleted ? "secondary" : "default"}
                        disabled={!isNext && !isCompleted}
                      >
                        {isCompleted ? "Rever" : isNext ? "Assistir" : "Bloqueado"}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}