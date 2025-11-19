import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Users } from "lucide-react"

export default function EventsPage() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Community Food Drive",
      date: "TBD",
      time: "TBD",
      location: "Franklin Township",
      description:
        "Join us for our community food drive to support local families in need. We'll be collecting non-perishable food items, hygiene products, and other essential supplies.",
      category: "Community Service",
      attendees: 0,
    },
  ]

  const pastEvents = [
    {
      id: 1,
      title: "J. Danielson's Backpack Drive",
      date: "2024",
      time: "All Day",
      location: "J. Danielson School",
      description: "QIDMA donated 200 backpacks along with snacks and water to support students in need for the new school year.",
      category: "Community Service",
      attendees: 0,
    },
    {
      id: 2,
      title: "Clothing Drive at Pine Grove Elementary",
      date: "2024",
      time: "All Day",
      location: "Pine Grove Elementary School",
      description: "Organized a successful clothing drive to collect essential clothing items for families in our community.",
      category: "Community Service",
      attendees: 0,
    },
    {
      id: 3,
      title: "La Cocina Community Event",
      date: "2024",
      time: "TBD",
      location: "Franklin Township",
      description: "A community gathering celebrating food, culture, and connection within our diverse Franklin community.",
      category: "Cultural",
      attendees: 0,
    },
    {
      id: 4,
      title: "Franklin Day 2024",
      date: "2024",
      time: "All Day",
      location: "Franklin Township",
      description: "QIDMA participated in Franklin Day 2024, engaging with the community and showcasing our mission of service and support.",
      category: "Community Building",
      attendees: 0,
    },
    {
      id: 5,
      title: "RWJ Toy Drive",
      date: "2024",
      time: "All Day",
      location: "RWJ Hospital",
      description: "Organized a toy drive in collaboration with RWJ Hospital to bring joy to children during the holiday season.",
      category: "Community Service",
      attendees: 0,
    },
  ]

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Events</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join us in making a difference in our community through these events and volunteer opportunities.
            </p>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-card hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-card-foreground">{event.title}</CardTitle>
                      <Badge className={getCategoryColor(event.category)}>{event.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                    <p className="text-card-foreground leading-relaxed">{event.description}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90">Register for Event</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-8">Past Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pastEvents.map((event) => (
                <Card key={event.id} className="bg-muted/50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl text-foreground">{event.title}</CardTitle>
                      <Badge variant="outline" className={getCategoryColor(event.category)}>
                        {event.category}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                    <p className="text-foreground leading-relaxed">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
