import { readFileSync, writeFileSync, existsSync } from "fs"
import { join } from "path"
import { NewsletterData, Newsletter } from "./types"

const DATA_FILE = join(process.cwd(), "lib/data/newsletter.json")

export function getNewsletterData(): NewsletterData {
  try {
    if (!existsSync(DATA_FILE)) {
      const initialData: NewsletterData = {
        newsletters: [],
        currentNewsletter: undefined,
      }
      saveNewsletterData(initialData)
      return initialData
    }
    const fileContents = readFileSync(DATA_FILE, "utf8")
    return JSON.parse(fileContents)
  } catch (error) {
    console.error("Error reading newsletter data:", error)
    return { newsletters: [], currentNewsletter: undefined }
  }
}

export function saveNewsletterData(data: NewsletterData): void {
  try {
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.error("Error saving newsletter data:", error)
    throw new Error("Failed to save newsletter data")
  }
}

export function getNextNewsletterId(newsletters: Newsletter[]): number {
  if (newsletters.length === 0) return 1
  return Math.max(...newsletters.map((n) => n.id)) + 1
}
