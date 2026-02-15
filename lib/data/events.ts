import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"
import { EventsData, Event } from "./types"

const DATA_FILE = join(process.cwd(), "lib/data/events.json")

export function getEventsData(): EventsData {
  try {
    if (!existsSync(DATA_FILE)) {
      // If file doesn't exist, create it with empty data
      const initialData: EventsData = { upcomingEvents: [], pastEvents: [] }
      saveEventsData(initialData)
      return initialData
    }
    const fileContents = readFileSync(DATA_FILE, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading events data:", error)
    return { upcomingEvents: [], pastEvents: [] }
  }
}

export function saveEventsData(data: EventsData): void {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving events data:", error)
    throw new Error("Failed to save events data")
  }
}

export function getNextEventId(events: Event[]): number {
  if (events.length === 0) return 1
  return Math.max(...events.map((e) => e.id)) + 1
}

