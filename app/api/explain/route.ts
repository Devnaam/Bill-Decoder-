import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { billId, query } = await request.json()

    if (!billId || !query) {
      return NextResponse.json({ error: "Bill ID and query are required" }, { status: 400 })
    }

    // In a real app, you would fetch the bill text from your database
    // and then use the Gemini API to generate an explanation

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are an expert in Indian law and legislation. A user is asking about a bill with ID ${billId}. 
                  Their question is: "${query}"
                  
                  Please provide a clear, simple explanation that would help a layperson understand this aspect of the bill.
                  Keep your answer concise but informative.`,
                },
              ],
            },
          ],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`)
    }

    const data = await response.json()
    const explanation = data.candidates[0].content.parts[0].text

    return NextResponse.json({ explanation })
  } catch (error) {
    console.error("Error explaining bill section:", error)
    return NextResponse.json({ error: "Failed to explain bill section" }, { status: 500 })
  }
}
