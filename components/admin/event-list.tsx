"use client"

import { Event } from "@/lib/data/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Calendar, Clock, MapPin, Users } from "lucide-react"

interface EventListProps {
  events: Event[]
  type: "upcoming" | "past"
  onEdit: (event: Event, type: "upcoming" | "past") => void
  onDelete: (id: number, type: "upcoming" | "past") => void
}

export function EventList({ events, onEdit, onDelete, type }: EventListProps) {
  if (events.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No {type === "upcoming" ? "upcoming" : "past"} events yet.</p>
          <p className="text-sm mt-2">Click "Add Event" to create one!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {events.map((event) => (
        <Card key={event.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg pr-2">{event.title}</CardTitle>
              <Badge variant="outline">{event.category}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              )}
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate">{event.location}</span>
                </div>
              )}
              {event.attendees && (
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} {type === "upcoming" ? "expected" : ""} attendees</span>
                </div>
              )}
            </div>
            <p className="text-sm line-clamp-3">{event.description}</p>
            {event.images && event.images.length > 0 && (
              <p className="text-xs text-muted-foreground">{event.images.length} photo(s)</p>
            )}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(event, type)}
                className="flex-1"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(event.id, type)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

