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
import { Event, EventImage } from "@/lib/data/types"
import { X, Plus, Trash2, Image as ImageIcon } from "lucide-react"

interface EventFormProps {
  event?: Event & { _type?: "upcoming" | "past" } | null
  onClose: () => void
  onSave: () => void
}

const categories = [
  "Community Service",
  "Education",
  "Environment",
  "Cultural",
  "Community Building",
]

export function EventForm({ event, onClose, onSave }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    category: "Community Service",
    attendees: "",
    type: "upcoming" as "upcoming" | "past",
  })
  const [images, setImages] = useState<EventImage[]>([])
  const [newImageSrc, setNewImageSrc] = useState("")
  const [newImageAlt, setNewImageAlt] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title || "",
        date: event.date || "",
        time: event.time || "",
        location: event.location || "",
        description: event.description || "",
        category: event.category || "Community Service",
        attendees: event.attendees?.toString() || "",
        type: (event as any)._type || "upcoming",
      })
      setImages(event.images || [])
    } else {
      setImages([])
    }
  }, [event])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const eventData = {
        id: event?.id || 0,
        title: formData.title,
        date: formData.date,
        time: formData.time || undefined,
        location: formData.location || undefined,
        description: formData.description,
        category: formData.category,
        attendees: formData.attendees ? parseInt(formData.attendees) : undefined,
        images: images,
      }

      const url = "/api/events"
      const method = event ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: formData.type,
          event: eventData,
        }),
      })

      if (response.ok) {
        onSave()
      } else {
        alert("Failed to save event")
      }
    } catch (error) {
      alert("Failed to save event")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
          <DialogDescription>
            {event ? "Update the event details below" : "Fill in the details to create a new event"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Event Type</Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as "upcoming" | "past" })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                <option value="upcoming">Upcoming Event</option>
                <option value="past">Past Event</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Event Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Community Food Drive"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                placeholder="e.g., March 15, 2025"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                placeholder="e.g., 10:00 AM - 2:00 PM"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Franklin Community Center"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the event..."
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attendees">Expected Attendees</Label>
            <Input
              id="attendees"
              type="number"
              value={formData.attendees}
              onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
              placeholder="e.g., 50"
            />
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-4 w-4" />
              <Label>Event Images</Label>
            </div>
            
            {images.length > 0 && (
              <div className="space-y-2">
                {images.map((img, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 border rounded-md">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <Input
                        value={img.src}
                        onChange={(e) => {
                          const updated = [...images]
                          updated[index].src = e.target.value
                          setImages(updated)
                        }}
                        placeholder="/images/photo.jpg"
                        className="text-sm"
                      />
                      <Input
                        value={img.alt}
                        onChange={(e) => {
                          const updated = [...images]
                          updated[index].alt = e.target.value
                          setImages(updated)
                        }}
                        placeholder="Image description"
                        className="text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setImages(images.filter((_, i) => i !== index))}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 p-3 border rounded-md bg-muted/50">
              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={newImageSrc}
                  onChange={(e) => setNewImageSrc(e.target.value)}
                  placeholder="/images/photo.jpg"
                  className="text-sm"
                />
                <Input
                  value={newImageAlt}
                  onChange={(e) => setNewImageAlt(e.target.value)}
                  placeholder="Image description"
                  className="text-sm"
                />
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newImageSrc.trim()) {
                    setImages([...images, { src: newImageSrc.trim(), alt: newImageAlt.trim() || "" }])
                    setNewImageSrc("")
                    setNewImageAlt("")
                  }
                }}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Image
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter image paths relative to the public folder (e.g., /images/event-photo.jpg)
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : event ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

