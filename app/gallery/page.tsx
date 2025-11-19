"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Lightbox } from "@/components/lightbox"
import Image from "next/image"

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const galleryImages = [
    {
      src: "/images/events/qidma-event-1.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-2.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-3.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-4.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-5.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-6.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-7.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-8.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-9.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-10.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/images/events/qidma-event-11.png",
      alt: "QIDMA Event Photo",
      title: "QIDMA Community Event",
    },
    {
      src: "/food-drive-sorting.png",
      alt: "Community Food Drive",
      title: "Community Food Drive - Supporting Families",
    },
    {
      src: "/community-cleanup-volunteers.png",
      alt: "Community Clean-up",
      title: "Community Clean-up Volunteers",
    },
    {
      src: "/diverse-families-festival.png",
      alt: "Community Event",
      title: "Community Gathering",
    },
    {
      src: "/youth-mentorship.png",
      alt: "Youth Program",
      title: "Youth Mentorship Program",
    },
    {
      src: "/community-dinner.png",
      alt: "Community Dinner",
      title: "Community Dinner Event",
    },
    {
      src: "/coat-drive-volunteers.png",
      alt: "Clothing Drive",
      title: "Clothing Drive at Pine Grove Elementary",
    },
    {
      src: "/community-garden-planting.png",
      alt: "Community Garden",
      title: "Community Garden Project",
    },
    {
      src: "/community-workshop.png",
      alt: "Community Workshop",
      title: "Community Workshop - La Cocina",
    },
    {
      src: "/community-event-fun.png",
      alt: "Franklin Day",
      title: "Franklin Day 2024",
    },
    {
      src: "/diverse-volunteers.png",
      alt: "Volunteers",
      title: "QIDMA Volunteers at J. Danielson's Backpack Drive",
    },
  ]

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
