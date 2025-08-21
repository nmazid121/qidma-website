import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Calendar } from "lucide-react"

export function EventsPreview() {
  const upcomingEvents = [
    {
      title: "Community Food Drive",
      date: "March 15, 2025",
      description: "Join us for our monthly community food drive to support local families in need.",
    },
    {
      title: "Youth Mentorship Program",
      date: "March 22, 2025",
      description: "Volunteer opportunity to mentor local youth and help them achieve their goals.",
    },
    {
      title: "Spring Community Clean-up",
      date: "April 5, 2025",
      description: "Help beautify our neighborhood with our quarterly community clean-up event.",
    },
  ]

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Upcoming Events</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join us in making a difference in our community through these upcoming events and volunteer opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {upcomingEvents.map((event, index) => (
            <Card key={index} className="bg-background">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>{event.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-medium mb-2">{event.date}</p>
                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/events">View Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild>
            <Link href="/events">View All Events</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
