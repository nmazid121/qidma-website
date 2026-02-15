import { NextRequest, NextResponse } from "next/server"
import { getEventsData, saveEventsData, getNextEventId } from "@/lib/data/events"
import { Event } from "@/lib/data/types"

export async function GET() {
  try {
    const data = getEventsData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, event } = body // type: 'upcoming' | 'past'

    if (!type || !event) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data = getEventsData()
    const newEvent: Event = {
      ...event,
      id: getNextEventId([...data.upcomingEvents, ...data.pastEvents]),
    }

    if (type === "upcoming") {
      data.upcomingEvents.push(newEvent)
    } else {
      data.pastEvents.push(newEvent)
    }

    saveEventsData(data)
    return NextResponse.json({ success: true, event: newEvent })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, event } = body

    if (!type || !event || !event.id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data = getEventsData()
    const eventList = type === "upcoming" ? data.upcomingEvents : data.pastEvents
    const index = eventList.findIndex((e) => e.id === event.id)

    if (index === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    eventList[index] = event

    if (type === "upcoming") {
      data.upcomingEvents = eventList
    } else {
      data.pastEvents = eventList
    }

    saveEventsData(data)
    return NextResponse.json({ success: true, event })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update event" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "")
    const type = searchParams.get("type") // 'upcoming' | 'past'

    if (!id || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const data = getEventsData()
    const eventList = type === "upcoming" ? data.upcomingEvents : data.pastEvents
    const filtered = eventList.filter((e) => e.id !== id)

    if (type === "upcoming") {
      data.upcomingEvents = filtered
    } else {
      data.pastEvents = filtered
    }

    saveEventsData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete event" }, { status: 500 })
  }
}

