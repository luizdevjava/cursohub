"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, Upload } from "lucide-react"
import Link from "next/link"

export default function NewCourse() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: ""
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Aqui você faria a chamada à API para criar o curso
      // const response = await fetch('/api/courses', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulação de criação
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para a lista de cursos
      router.push("/admin/cursos")
    } catch (error) {
      setError("Erro ao criar curso")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href="/admin/cursos">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Novo Curso</h1>
          <p className="text-muted-foreground">
            Crie um novo curso para a plataforma
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações do Curso</CardTitle>
              <CardDescription>
                Preencha os detalhes básicos do curso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title">Título do Curso</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Ex: Introdução ao React"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o que os alunos vão aprender neste curso..."
                    rows={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">URL da Imagem</Label>
                  <Input
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                  <p className="text-sm text-muted-foreground">
                    URL da imagem de capa do curso. Deve ser uma imagem com proporção 16:9.
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Salvando..." : "Criar Curso"}
                  </Button>
                  <Link href="/admin/cursos">
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Veja como seu curso aparecerá para os alunos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=250&fit=crop"
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      <Upload className="h-12 w-12" />
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {formData.title || "Título do Curso"}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {formData.description || "Descrição do curso aparecerá aqui..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Dicas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Título</h4>
                  <p className="text-muted-foreground">
                    Seja claro e direto. Use palavras-chave que descrevam bem o conteúdo.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Descrição</h4>
                  <p className="text-muted-foreground">
                    Explique o que os alunos vão aprender e para quem é este curso.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Imagem</h4>
                  <p className="text-muted-foreground">
                    Use uma imagem atrativa e com boa qualidade. Dimensões recomendadas: 1280x720px.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}