"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users, Images } from "lucide-react"
import Image from "next/image"
import { Lightbox } from "@/components/lightbox"
import { Event, EventImage } from "@/lib/data/types"

export default function EventsPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentEventImages, setCurrentEventImages] = useState<EventImage[]>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events")
      const data = await response.json()
      setUpcomingEvents(data.upcomingEvents || [])
      setPastEvents(data.pastEvents || [])
    } catch (error) {
      console.error("Failed to fetch events:", error)
    } finally {
      setLoading(false)
    }
  }

  const openLightbox = (images: EventImage[], index: number = 0) => {
    setCurrentEventImages(images)
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentEventImages.length)
  }

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentEventImages.length) % currentEventImages.length)
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Community Service": "bg-primary text-primary-foreground",
      Education: "bg-secondary text-secondary-foreground",
      Environment: "bg-green-500 text-white",
      Cultural: "bg-purple-500 text-white",
      "Community Building": "bg-orange-500 text-white",
    }
    return colors[category] || "bg-muted text-muted-foreground"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading events...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/30 to-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
            </div>
            <div className="relative">
              <div className="inline-block mb-4">
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-4">
                  Events
                </h1>
              </div>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Join us in making a difference in our community through these events and volunteer opportunities.
              </p>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Upcoming Events</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-secondary to-transparent rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="bg-card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary/20 group overflow-hidden relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl lg:text-2xl text-card-foreground group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </CardTitle>
                      <Badge className={`${getCategoryColor(event.category)} shadow-md group-hover:scale-110 transition-transform duration-300`}>
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Clock className="h-4 w-4 text-secondary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Users className="h-4 w-4 text-secondary" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                    <p className="text-card-foreground leading-relaxed">{event.description}</p>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                      Register for Event
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-secondary to-primary rounded-full"></div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Past Events</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-primary to-transparent rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pastEvents.map((event, index) => (
                <Card
                  key={event.id}
                  className="bg-gradient-to-br from-muted/50 to-muted/30 overflow-hidden border-2 border-transparent hover:border-primary/30 transition-all duration-300 hover:shadow-2xl group relative"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Decorative gradient overlay */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Event Images Gallery */}
                  {event.images && event.images.length > 0 && (
                    <div className="relative">
                      <div className="grid grid-cols-3 gap-1 p-1 bg-gradient-to-br from-muted to-muted/50">
                        {event.images.slice(0, 3).map((image, idx) => (
                          <div
                            key={idx}
                            className="relative aspect-[4/3] overflow-hidden cursor-pointer group/image"
                            onClick={() => openLightbox(event.images!, idx)}
                          >
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-all duration-500 group-hover/image:scale-125 group-hover/image:brightness-110"
                              sizes="(max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                            {idx === 2 && event.images!.length > 3 && (
                              <div className="absolute inset-0 bg-black/70 flex items-center justify-center backdrop-blur-sm">
                                <span className="text-white font-bold text-lg">+{event.images!.length - 3}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      {event.images.length > 3 && (
                        <button
                          onClick={() => openLightbox(event.images!, 0)}
                          className="absolute bottom-3 right-3 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:scale-105 transition-all duration-300 backdrop-blur-sm bg-opacity-90"
                        >
                          <Images className="h-4 w-4" />
                          View All ({event.images.length})
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Placeholder for events without images */}
                  {(!event.images || event.images.length === 0) && (
                    <div className="h-48 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,175,80,0.1),transparent)]"></div>
                      <Calendar className="h-16 w-16 text-primary/30" />
                    </div>
                  )}
                  
                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl lg:text-2xl text-foreground group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </CardTitle>
                      <Badge variant="outline" className={`${getCategoryColor(event.category)} border-2 group-hover:scale-110 transition-transform duration-300`}>
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Clock className="h-4 w-4 text-secondary" />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.attendees && (
                      <div className="flex items-center space-x-2 text-muted-foreground group-hover:text-foreground transition-colors">
                        <Users className="h-4 w-4 text-secondary" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    )}
                    <p className="text-foreground leading-relaxed">{event.description}</p>
                    {event.images && event.images.length > 0 && (
                      <Button
                        variant="outline"
                        className="w-full border-2 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
                        onClick={() => openLightbox(event.images!, 0)}
                      >
                        <Images className="h-4 w-4 mr-2" />
                        View Photos ({event.images.length})
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox for event images */}
      {lightboxOpen && currentEventImages.length > 0 && (
        <Lightbox
          images={currentEventImages.map((img) => ({ src: img.src, alt: img.alt }))}
          isOpen={lightboxOpen}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={nextImage}
          onPrevious={previousImage}
        />
      )}

      <Footer />
    </div>
  )
}
