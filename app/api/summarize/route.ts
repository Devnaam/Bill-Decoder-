import { type NextRequest, NextResponse } from "next/server"
import { summarizeBill } from "@/lib/gemini"

export async function POST(request: NextRequest) {
  try {
    const { billText } = await request.json()

    if (!billText) {
      return NextResponse.json({ error: "Bill text is required" }, { status: 400 })
    }

    // Use the actual Gemini API integration
    const summary = await summarizeBill(billText)

    return NextResponse.json({
      summary: summary.summary,
      keyPoints: summary.keyPoints,
    })
  } catch (error) {
    console.error("Error summarizing bill:", error)
    return NextResponse.json({ error: "Failed to summarize bill" }, { status: 500 })
  }
}
