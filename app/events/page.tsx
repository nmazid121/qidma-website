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
      date: "March 15, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Franklin Community Center",
      description:
        "Join us for our monthly community food drive to support local families in need. We'll be collecting non-perishable food items, hygiene products, and winter clothing.",
      category: "Community Service",
      attendees: 45,
    },
    {
      id: 2,
      title: "Youth Mentorship Program Launch",
      date: "March 22, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Franklin Public Library",
      description:
        "Volunteer opportunity to mentor local youth and help them achieve their goals. Training session for new mentors and program overview.",
      category: "Education",
      attendees: 25,
    },
    {
      id: 3,
      title: "Spring Community Clean-up",
      date: "April 5, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Various locations in Franklin",
      description:
        "Help beautify our neighborhood with our quarterly community clean-up event. Tools and refreshments provided.",
      category: "Environment",
      attendees: 60,
    },
    {
      id: 4,
      title: "Cultural Heritage Festival",
      date: "April 20, 2025",
      time: "12:00 PM - 6:00 PM",
      location: "Franklin Town Square",
      description:
        "Celebrate the diverse cultures that make up our community with food, music, dance, and cultural exhibits.",
      category: "Cultural",
      attendees: 200,
    },
  ]

  const pastEvents = [
    {
      id: 5,
      title: "Winter Coat Drive",
      date: "February 10, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Franklin Community Center",
      description: "Successfully collected over 300 winter coats for families in need during the cold season.",
      category: "Community Service",
      attendees: 80,
    },
    {
      id: 6,
      title: "New Year Community Dinner",
      date: "January 15, 2025",
      time: "5:00 PM - 9:00 PM",
      location: "Franklin High School Cafeteria",
      description:
        "Brought together over 150 community members for a celebration of unity and shared goals for the new year.",
      category: "Community Building",
      attendees: 150,
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
