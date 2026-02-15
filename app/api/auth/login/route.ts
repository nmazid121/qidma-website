import { NextRequest, NextResponse } from "next/server"

// Simple password-based auth (for production, use proper auth like NextAuth.js)
// Store password in environment variable
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "qidma2024"

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (password === ADMIN_PASSWORD) {
      // In production, use proper session management
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}

