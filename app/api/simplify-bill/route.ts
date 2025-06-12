import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { billTitle, billContent } = await request.json()

    if (!billTitle || !billContent) {
      return NextResponse.json({ error: "Bill title and content are required" }, { status: 400 })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }

    // Call Gemini API to generate simplified summary
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
                  text: `You are an expert in Indian law and legislation. Please provide a simplified summary of the following bill: "${billTitle}"

Bill content: ${billContent}

Please provide:
1. A brief overview (2-3 sentences) explaining what this bill is about
2. A detailed simplified explanation broken down into 5-7 key points that a common person can understand
3. The potential impact on citizens
4. Any important deadlines or implementation dates

Format your response in a clear, structured way that makes complex legal language accessible to everyone. Use simple language and avoid legal jargon.`,
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
    const simplifiedSummary = data.candidates[0].content.parts[0].text

    // Extract key points from the summary
    const keyPoints = extractKeyPoints(simplifiedSummary)

    return NextResponse.json({
      summary: simplifiedSummary,
      keyPoints: keyPoints,
    })
  } catch (error) {
    console.error("Error simplifying bill:", error)
    return NextResponse.json({ error: "Failed to simplify bill" }, { status: 500 })
  }
}

// Helper function to extract key points from the summary
function extractKeyPoints(summary: string): string[] {
  // Try to extract numbered or bulleted points
  const keyPointsRegex = /(?:\d+\.|\*|-)\s+(.+?)(?=\n\d+\.|\n\*|\n-|\n\n|$)/gs
  const matches = [...summary.matchAll(keyPointsRegex)]

  if (matches.length > 0) {
    return matches.map((match) => match[1].trim()).slice(0, 7) // Limit to 7 points
  }

  // Fallback: split by sentences and take meaningful ones
  const sentences = summary
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20 && !s.toLowerCase().includes("summary") && !s.toLowerCase().includes("overview"))

  return sentences.slice(0, 5) // Return up to 5 sentences as key points
}
