"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, LogOut, Calendar, Newspaper } from "lucide-react"
import Link from "next/link"
import { Event, Newsletter } from "@/lib/data/types"
import { EventForm } from "@/components/admin/event-form"
import { EventList } from "@/components/admin/event-list"
import { NewsletterForm } from "@/components/admin/newsletter-form"

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [showNewsletterForm, setShowNewsletterForm] = useState(false)
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter | null>(null)

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem("adminAuth")
    if (!auth) {
      router.push("/admin/login")
      return
    }
    setAuthenticated(true)
    fetchEvents()
  }, [router])

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

  const handleLogout = () => {
    sessionStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const handleEdit = (event: Event, type: "upcoming" | "past") => {
    setEditingEvent({ ...event, _type: type } as any)
    setShowForm(true)
  }

  const handleDelete = async (id: number, type: "upcoming" | "past") => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`/api/events?id=${id}&type=${type}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchEvents()
      } else {
        alert("Failed to delete event")
      }
    } catch (error) {
      alert("Failed to delete event")
    }
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingEvent(null)
    fetchEvents()
  }

  if (!authenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage events and content for your website</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/events">
                <Calendar className="h-4 w-4 mr-2" />
                View Site
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewsletterForm(true)
                  setCurrentNewsletter(null)
                }}
              >
                <Newspaper className="h-4 w-4 mr-2" />
                Manage Newsletter
              </Button>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>
          </div>

          <TabsContent value="upcoming">
            <EventList
              events={upcomingEvents}
              type="upcoming"
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </TabsContent>

          <TabsContent value="past">
            <EventList events={pastEvents} type="past" onEdit={handleEdit} onDelete={handleDelete} />
          </TabsContent>

          <TabsContent value="newsletter">
            <Card>
              <CardHeader>
                <CardTitle>Newsletter Management</CardTitle>
                <CardDescription>
                  Create and manage your newsletter content. The current newsletter will be displayed on the newsletter page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => {
                  setShowNewsletterForm(true)
                  setCurrentNewsletter(null)
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Newsletter
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {showForm && (
          <EventForm
            event={editingEvent}
            onClose={handleFormClose}
            onSave={handleFormClose}
          />
        )}

        {showNewsletterForm && (
          <NewsletterForm
            newsletter={currentNewsletter}
            onClose={() => {
              setShowNewsletterForm(false)
              setCurrentNewsletter(null)
            }}
            onSave={() => {
              setShowNewsletterForm(false)
              setCurrentNewsletter(null)
            }}
          />
        )}
      </main>
    </div>
  )
}

