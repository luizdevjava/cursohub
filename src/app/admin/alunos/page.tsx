"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Users, BookOpen, Clock, TrendingUp } from "lucide-react"

// Mock data para alunos
const mockStudents = [
  {
    id: "student_abc123",
    courses: [
      {
        courseId: "1",
        courseTitle: "Introdução ao React",
        completedLessons: 8,
        totalLessons: 12,
        lastAccess: "2024-01-20T10:30:00Z"
      },
      {
        courseId: "2", 
        courseTitle: "Next.js Avançado",
        completedLessons: 3,
        totalLessons: 18,
        lastAccess: "2024-01-19T15:45:00Z"
      }
    ],
    totalProgress: 47,
    totalCourses: 2,
    lastAccess: "2024-01-20T10:30:00Z"
  },
  {
    id: "student_def456",
    courses: [
      {
        courseId: "1",
        courseTitle: "Introdução ao React",
        completedLessons: 12,
        totalLessons: 12,
        lastAccess: "2024-01-21T14:20:00Z"
      }
    ],
    totalProgress: 100,
    totalCourses: 1,
    lastAccess: "2024-01-21T14:20:00Z"
  },
  {
    id: "student_ghi789",
    courses: [
      {
        courseId: "3",
        courseTitle: "TypeScript Moderno",
        completedLessons: 5,
        totalLessons: 15,
        lastAccess: "2024-01-18T09:15:00Z"
      }
    ],
    totalProgress: 33,
    totalCourses: 1,
    lastAccess: "2024-01-18T09:15:00Z"
  }
]

export default function AdminStudents() {
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredStudents = students.filter(student =>
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.courses.some(course => 
      course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const totalStudents = students.length
  const activeStudents = students.filter(s => {
    const lastAccess = new Date(s.lastAccess)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    return lastAccess > sevenDaysAgo
  }).length

  const averageProgress = students.length > 0 
    ? Math.round(students.reduce((acc, s) => acc + s.totalProgress, 0) / students.length)
    : 0

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "text-green-600"
    if (progress >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alunos</h1>
        <p className="text-muted-foreground">
          Acompanhe o progresso dos alunos na plataforma
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Alunos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              {activeStudents} ativos na última semana
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Progresso Médio</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageProgress}%</div>
            <Progress value={averageProgress} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cursos em Progresso</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {students.reduce((acc, s) => acc + s.totalCourses, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de matrículas ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar alunos por ID ou curso..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents.map((student) => (
          <Card key={student.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Aluno: {student.id}</CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>Último acesso: {formatDate(student.lastAccess)}</span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{student.totalProgress}%</div>
                  <p className="text-sm text-muted-foreground">Progresso total</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Cursos em Andamento ({student.courses.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {student.courses.map((course) => {
                      const progress = (course.completedLessons / course.totalLessons) * 100
                      return (
                        <div key={course.courseId} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium">{course.courseTitle}</h5>
                            <Badge 
                              variant={progress === 100 ? "default" : "secondary"}
                              className={getProgressColor(progress)}
                            >
                              {progress === 100 ? "Concluído" : `${Math.round(progress)}%`}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <Progress value={progress} className="h-2" />
                            <p className="text-sm text-muted-foreground">
                              {course.completedLessons} de {course.totalLessons} aulas concluídas
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            {searchTerm ? "Nenhum aluno encontrado para sua busca." : "Nenhum aluno encontrado."}
          </p>
        </div>
      )}
    </div>
  )
}