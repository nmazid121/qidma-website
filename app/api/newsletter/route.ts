import { NextRequest, NextResponse } from "next/server"
import {
  getNewsletterData,
  saveNewsletterData,
  getNextNewsletterId,
} from "@/lib/data/newsletter"
import { Newsletter } from "@/lib/data/types"

export async function GET() {
  try {
    const data = getNewsletterData()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch newsletter" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { newsletter } = body

    if (!newsletter) {
      return NextResponse.json({ error: "Missing newsletter data" }, { status: 400 })
    }

    const data = getNewsletterData()
    const newNewsletter: Newsletter = {
      ...newsletter,
      id: getNextNewsletterId(data.newsletters),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    data.newsletters.push(newNewsletter)
    data.currentNewsletter = newNewsletter

    saveNewsletterData(data)
    return NextResponse.json({ success: true, newsletter: newNewsletter })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create newsletter" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { newsletter } = body

    if (!newsletter || !newsletter.id) {
      return NextResponse.json({ error: "Missing newsletter data" }, { status: 400 })
    }

    const data = getNewsletterData()
    const index = data.newsletters.findIndex((n) => n.id === newsletter.id)

    if (index === -1) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 })
    }

    data.newsletters[index] = {
      ...newsletter,
      updatedAt: new Date().toISOString(),
    }

    if (data.currentNewsletter?.id === newsletter.id) {
      data.currentNewsletter = data.newsletters[index]
    }

    saveNewsletterData(data)
    return NextResponse.json({ success: true, newsletter: data.newsletters[index] })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update newsletter" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = parseInt(searchParams.get("id") || "")

    if (!id) {
      return NextResponse.json({ error: "Missing newsletter ID" }, { status: 400 })
    }

    const data = getNewsletterData()
    data.newsletters = data.newsletters.filter((n) => n.id !== id)

    if (data.currentNewsletter?.id === id) {
      data.currentNewsletter = data.newsletters.length > 0 ? data.newsletters[0] : undefined
    }

    saveNewsletterData(data)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete newsletter" }, { status: 500 })
  }
}
