"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Save, HelpCircle } from "lucide-react"

const mockCourse = {
  id: "1",
  title: "Introdução ao React"
}

export default function NewLesson() {
  const params = useParams()
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    order: 1
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    // Aqui você buscaria a próxima ordem disponível
    // Por enquanto, vamos usar um valor fixo
    setFormData(prev => ({ ...prev, order: 1 }))
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Aqui você faria a chamada à API para criar a aula
      // const response = await fetch(`/api/courses/${params.id}/lessons`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // Simulação de criação
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Redirecionar para a lista de aulas
      router.push(`/admin/cursos/${params.id}/aulas`)
    } catch (error) {
      setError("Erro ao criar aula")
    } finally {
      setLoading(false)
    }
  }

  const getGoogleDriveEmbedUrl = (url: string) => {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`
    }
    return url
  }

  const embedUrl = formData.videoUrl ? getGoogleDriveEmbedUrl(formData.videoUrl) : ""

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Link href={`/admin/cursos/${params.id}/aulas`}>
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Nova Aula</h1>
          <p className="text-muted-foreground">
            Adicione uma nova aula ao curso: <span className="font-medium">{mockCourse.title}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Aula</CardTitle>
              <CardDescription>
                Preencha os detalhes da aula
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título da Aula</Label>
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
                    <Label htmlFor="order">Ordem</Label>
                    <Input
                      id="order"
                      name="order"
                      type="number"
                      value={formData.order}
                      onChange={handleChange}
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Descreva o que será ensinado nesta aula..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="videoUrl">URL do Vídeo (Google Drive)</Label>
                  <Input
                    id="videoUrl"
                    name="videoUrl"
                    value={formData.videoUrl}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/file/d/ID_DO_VIDEO/view"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Cole o URL do vídeo do Google Drive. O sistema converterá automaticamente para o formato de embed.
                  </p>
                </div>

                {/* Video Preview */}
                {embedUrl && (
                  <div className="space-y-2">
                    <Label>Preview do Vídeo</Label>
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                      <iframe
                        src={embedUrl}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4">
                  <Button type="submit" disabled={loading}>
                    <Save className="h-4 w-4 mr-2" />
                    {loading ? "Salvando..." : "Criar Aula"}
                  </Button>
                  <Link href={`/admin/cursos/${params.id}/aulas`}>
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
          {/* Google Drive Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HelpCircle className="h-5 w-5" />
                <span>Como obter URL do Google Drive</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div>
                  <h4 className="font-medium">Passo 1:</h4>
                  <p className="text-muted-foreground">
                    Faça upload do seu vídeo para o Google Drive
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Passo 2:</h4>
                  <p className="text-muted-foreground">
                    Clique com o botão direito no vídeo e selecione "Compartilhar"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Passo 3:</h4>
                  <p className="text-muted-foreground">
                    Altere as permissões para "Qualquer pessoa com o link"
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Passo 4:</h4>
                  <p className="text-muted-foreground">
                    Copie o link e cole no campo acima
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
                    Seja específico sobre o conteúdo da aula.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Descrição</h4>
                  <p className="text-muted-foreground">
                    Descreva os principais tópicos e objetivos de aprendizagem.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Ordem</h4>
                  <p className="text-muted-foreground">
                    Defina a posição desta aula na sequência do curso.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium">Vídeo</h4>
                  <p className="text-muted-foreground">
                    Use vídeos de boa qualidade e com áudio claro.
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