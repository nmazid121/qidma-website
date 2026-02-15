"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Newsletter, NewsletterArticle, NewsletterSection } from "@/lib/data/types"
import { Plus, Trash2, X } from "lucide-react"

interface NewsletterFormProps {
  newsletter?: Newsletter | null
  onClose: () => void
  onSave: () => void
}

export function NewsletterForm({ newsletter, onClose, onSave }: NewsletterFormProps) {
  const [formData, setFormData] = useState({
    issueNumber: "",
    season: "",
    year: "",
    heroTitle: "THE community ACTION",
    tagline: "Laying the groundwork for tomorrow's communities",
    heroImage: "",
  })
  const [featuredArticles, setFeaturedArticles] = useState<NewsletterArticle[]>([])
  const [sections, setSections] = useState<NewsletterSection[]>([])
  const [loading, setLoading] = useState(false)
  const [editingArticle, setEditingArticle] = useState<NewsletterArticle | null>(null)
  const [editingSection, setEditingSection] = useState<NewsletterSection | null>(null)

  useEffect(() => {
    if (newsletter) {
      setFormData({
        issueNumber: newsletter.issueNumber || "",
        season: newsletter.season || "",
        year: newsletter.year || "",
        heroTitle: newsletter.heroTitle || "THE community ACTION",
        tagline: newsletter.tagline || "Laying the groundwork for tomorrow's communities",
        heroImage: newsletter.heroImage || "",
      })
      setFeaturedArticles(newsletter.featuredArticles || [])
      setSections(newsletter.sections || [])
    }
  }, [newsletter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const newsletterData: Newsletter = {
        id: newsletter?.id || 0,
        issueNumber: formData.issueNumber,
        season: formData.season,
        year: formData.year,
        heroTitle: formData.heroTitle,
        tagline: formData.tagline,
        heroImage: formData.heroImage || undefined,
        featuredArticles,
        sections,
        createdAt: newsletter?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const url = "/api/newsletter"
      const method = newsletter ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newsletter: newsletterData }),
      })

      if (response.ok) {
        onSave()
      } else {
        alert("Failed to save newsletter")
      }
    } catch (error) {
      alert("Failed to save newsletter")
    } finally {
      setLoading(false)
    }
  }

  const addArticle = () => {
    const newArticle: NewsletterArticle = {
      id: Date.now(),
      title: "",
      content: "",
      image: "",
      link: "",
      linkText: "",
    }
    setEditingArticle(newArticle)
  }

  const saveArticle = (article: NewsletterArticle) => {
    if (editingArticle) {
      const index = featuredArticles.findIndex((a) => a.id === editingArticle.id)
      if (index >= 0) {
        setFeaturedArticles([...featuredArticles.slice(0, index), article, ...featuredArticles.slice(index + 1)])
      } else {
        setFeaturedArticles([...featuredArticles, article])
      }
    }
    setEditingArticle(null)
  }

  const deleteArticle = (id: number) => {
    setFeaturedArticles(featuredArticles.filter((a) => a.id !== id))
  }

  const addSection = (type: "featured" | "article" | "stats" | "cta") => {
    const newSection: NewsletterSection = {
      id: Date.now(),
      title: "",
      content: "",
      type,
      stats: type === "stats" ? [{ label: "", value: "" }] : undefined,
      ctaButtons: type === "cta" ? [{ text: "", link: "" }] : undefined,
    }
    setEditingSection(newSection)
  }

  const saveSection = (section: NewsletterSection) => {
    if (editingSection) {
      const index = sections.findIndex((s) => s.id === editingSection.id)
      if (index >= 0) {
        setSections([...sections.slice(0, index), section, ...sections.slice(index + 1)])
      } else {
        setSections([...sections, section])
      }
    }
    setEditingSection(null)
  }

  const deleteSection = (id: number) => {
    setSections(sections.filter((s) => s.id !== id))
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{newsletter ? "Edit Newsletter" : "Create New Newsletter"}</DialogTitle>
          <DialogDescription>
            {newsletter ? "Update the newsletter content" : "Create a new newsletter issue"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueNumber">Issue Number</Label>
              <Input
                id="issueNumber"
                value={formData.issueNumber}
                onChange={(e) => setFormData({ ...formData, issueNumber: e.target.value })}
                placeholder="e.g., 1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Input
                id="season"
                value={formData.season}
                onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                placeholder="e.g., Spring"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="e.g., 2025"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroTitle">Hero Title</Label>
            <Input
              id="heroTitle"
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              placeholder="THE community ACTION"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tagline">Tagline</Label>
            <Input
              id="tagline"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="Laying the groundwork for tomorrow's communities"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="heroImage">Hero Image URL</Label>
            <Input
              id="heroImage"
              value={formData.heroImage}
              onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
              placeholder="/images/newsletter-hero.jpg"
            />
          </div>

          {/* Featured Articles */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label>Featured Articles</Label>
              <Button type="button" variant="outline" size="sm" onClick={addArticle}>
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </div>
            {featuredArticles.map((article) => (
              <div key={article.id} className="flex items-center gap-2 p-2 border rounded">
                <div className="flex-1">
                  <p className="font-medium">{article.title || "Untitled Article"}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1">{article.content}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingArticle(article)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteArticle(article.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label>Content Sections</Label>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => addSection("article")}>
                  Add Article Section
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addSection("stats")}>
                  Add Stats Section
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => addSection("cta")}>
                  Add CTA Section
                </Button>
              </div>
            </div>
            {sections.map((section) => (
              <div key={section.id} className="flex items-center gap-2 p-2 border rounded">
                <div className="flex-1">
                  <p className="font-medium">{section.title || "Untitled Section"}</p>
                  <p className="text-xs text-muted-foreground">{section.type}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingSection(section)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteSection(section.id)}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : newsletter ? "Update Newsletter" : "Create Newsletter"}
            </Button>
          </div>
        </form>

        {/* Article Edit Dialog */}
        {editingArticle && (
          <ArticleEditDialog
            article={editingArticle}
            onSave={saveArticle}
            onClose={() => setEditingArticle(null)}
          />
        )}

        {/* Section Edit Dialog */}
        {editingSection && (
          <SectionEditDialog
            section={editingSection}
            onSave={saveSection}
            onClose={() => setEditingSection(null)}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ArticleEditDialog({
  article,
  onSave,
  onClose,
}: {
  article: NewsletterArticle
  onSave: (article: NewsletterArticle) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState(article)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Article</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={4}
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div>
            <Label>Link</Label>
            <Input
              value={formData.link || ""}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
            />
          </div>
          <div>
            <Label>Link Text</Label>
            <Input
              value={formData.linkText || ""}
              onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SectionEditDialog({
  section,
  onSave,
  onClose,
}: {
  section: NewsletterSection
  onSave: (section: NewsletterSection) => void
  onClose: () => void
}) {
  const [formData, setFormData] = useState(section)

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Section</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <Label>Subtitle</Label>
            <Input
              value={formData.subtitle || ""}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            />
          </div>
          <div>
            <Label>Content</Label>
            <Textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={6}
            />
          </div>
          <div>
            <Label>Image URL</Label>
            <Input
              value={formData.image || ""}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          {formData.type === "stats" && (
            <div>
              <Label>Stats</Label>
              {formData.stats?.map((stat, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Value"
                    value={stat.value}
                    onChange={(e) => {
                      const newStats = [...(formData.stats || [])]
                      newStats[idx].value = e.target.value
                      setFormData({ ...formData, stats: newStats })
                    }}
                  />
                  <Input
                    placeholder="Label"
                    value={stat.label}
                    onChange={(e) => {
                      const newStats = [...(formData.stats || [])]
                      newStats[idx].label = e.target.value
                      setFormData({ ...formData, stats: newStats })
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        stats: formData.stats?.filter((_, i) => i !== idx),
                      })
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    stats: [...(formData.stats || []), { label: "", value: "" }],
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Stat
              </Button>
            </div>
          )}
          {formData.type === "cta" && (
            <div>
              <Label>CTA Buttons</Label>
              {formData.ctaButtons?.map((btn, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <Input
                    placeholder="Button Text"
                    value={btn.text}
                    onChange={(e) => {
                      const newBtns = [...(formData.ctaButtons || [])]
                      newBtns[idx].text = e.target.value
                      setFormData({ ...formData, ctaButtons: newBtns })
                    }}
                  />
                  <Input
                    placeholder="Link"
                    value={btn.link}
                    onChange={(e) => {
                      const newBtns = [...(formData.ctaButtons || [])]
                      newBtns[idx].link = e.target.value
                      setFormData({ ...formData, ctaButtons: newBtns })
                    }}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        ctaButtons: formData.ctaButtons?.filter((_, i) => i !== idx),
                      })
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setFormData({
                    ...formData,
                    ctaButtons: [...(formData.ctaButtons || []), { text: "", link: "" }],
                  })
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Button
              </Button>
            </div>
          )}
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={() => onSave(formData)}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
