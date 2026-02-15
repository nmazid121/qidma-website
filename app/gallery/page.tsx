"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lightbox } from "@/components/lightbox"
import Image from "next/image"
import { Event, EventImage } from "@/lib/data/types"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<Array<{ src: string; alt: string; title: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      
      // Collect all images from past events with their event titles
      const images: Array<{ src: string; alt: string; title: string }> = []
      
      const allEvents = [...(data.pastEvents || []), ...(data.upcomingEvents || [])]
      
      allEvents.forEach((event: Event) => {
        if (event.images && event.images.length > 0) {
          event.images.forEach((image: EventImage) => {
            images.push({
              src: image.src,
              alt: image.alt,
              title: event.title + (event.date ? ` - ${event.date}` : ""),
            })
          })
        }
      })
      
      setGalleryImages(images)
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading gallery...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Photo Gallery</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore moments from our community events and initiatives that showcase the impact we're making together
              in Franklin.
            </p>
          </div>

          {/* Gallery Grid */}
          {galleryImages.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No photos available yet. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-muted cursor-pointer transition-transform hover:scale-105"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-opacity group-hover:opacity-90"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm font-medium">{image.title}</p>
                </div>
              </div>
            ))}
            </div>
          )}

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-card-foreground mb-4">Join Our Next Event</h2>
              <p className="text-muted-foreground mb-6">
                Be part of the story! Join us at our upcoming events and help us create more meaningful moments in our
                community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  View Upcoming Events
                </button>
                <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:bg-secondary/90 transition-colors">
                  Volunteer With Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        isOpen={lightboxOpen}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />

      <Footer />
    </div>
  )
}
