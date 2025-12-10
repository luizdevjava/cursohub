"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, PlayCircle } from "lucide-react"

// Mock data
const mockCourse = {
  id: "1",
  title: "Introdução ao React",
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

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [studentId] = useState(() => {
    let id = localStorage.getItem('student_id')
    if (!id) {
      id = 'student_' + Math.random().toString(36).substr(2, 9)
      localStorage.setItem('student_id', id)
    }
    return id
  })

  const currentLesson = mockCourse.lessons.find(l => l.id === params.aulaId)
  const currentIndex = mockCourse.lessons.findIndex(l => l.id === params.aulaId)
  const nextLesson = mockCourse.lessons[currentIndex + 1]
  const prevLesson = mockCourse.lessons[currentIndex - 1]

  useEffect(() => {
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
    
    localStorage.setItem(
      `progress_${studentId}_${params.id}`, 
      JSON.stringify(Array.from(newCompleted))
    )
  }

  const isCompleted = completedLessons.has(params.aulaId as string)

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Aula não encontrada</h1>
          <Link href={`/curso/${params.id}`}>
            <Button>Voltar para o curso</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Extrair ID do vídeo do Google Drive
  const getGoogleDriveEmbedUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`
    }
    return url
  }

  const embedUrl = getGoogleDriveEmbedUrl(currentLesson.videoUrl)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/curso/${params.id}`}>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Voltar</span>
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold">{currentLesson.title}</h1>
                <p className="text-sm text-muted-foreground">{mockCourse.title}</p>
              </div>
            </div>
            <Badge variant="outline">Aula {currentLesson.order} de {mockCourse.lessons.length}</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="aspect-video">
                  <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Lesson Info */}
            <Card className="mt-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-3">
                    {isCompleted ? (
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    ) : (
                      <PlayCircle className="h-6 w-6 text-primary" />
                    )}
                    <span>{currentLesson.title}</span>
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      checked={isCompleted}
                      onCheckedChange={() => toggleLessonComplete(currentLesson.id)}
                      id="completed"
                    />
                    <label htmlFor="completed" className="text-sm font-medium cursor-pointer">
                      Marcar como concluída
                    </label>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{currentLesson.description}</p>
                
                {/* Navigation */}
                <div className="flex items-center justify-between pt-4 border-t">
                  {prevLesson ? (
                    <Link href={`/curso/${params.id}/aula/${prevLesson.id}`}>
                      <Button variant="outline" className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Aula Anterior</span>
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}
                  
                  {nextLesson && (
                    <Link href={`/curso/${params.id}/aula/${nextLesson.id}`}>
                      <Button className="flex items-center space-x-2">
                        <span>Próxima Aula</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso do Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Aulas concluídas</span>
                    <span>{completedLessons.size}/{mockCourse.lessons.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(completedLessons.size / mockCourse.lessons.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* All Lessons */}
            <Card>
              <CardHeader>
                <CardTitle>Todas as Aulas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockCourse.lessons.map((lesson) => {
                    const lessonCompleted = completedLessons.has(lesson.id)
                    const isCurrent = lesson.id === currentLesson.id
                    
                    return (
                      <Link
                        key={lesson.id}
                        href={`/curso/${params.id}/aula/${lesson.id}`}
                        className={`block p-3 rounded-lg border transition-all ${
                          isCurrent 
                            ? 'bg-primary/10 border-primary' 
                            : lessonCompleted
                            ? 'bg-green-50 border-green-200 hover:bg-green-100'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          {lessonCompleted ? (
                            <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                          ) : (
                            <PlayCircle className={`h-4 w-4 flex-shrink-0 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium truncate ${isCurrent ? 'text-primary' : ''}`}>
                              Aula {lesson.order}: {lesson.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{lesson.duration}</p>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}