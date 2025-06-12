import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { billTitle, billContent, query } = await request.json()

    if (!billTitle || !billContent || !query) {
      return NextResponse.json({ error: "Bill title, content, and query are required" }, { status: 400 })
    }

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
                  text: `You are an expert in Indian law and legislation. A user is asking about the bill: "${billTitle}"

Bill content: ${billContent}

User's question: "${query}"

Please provide a clear, detailed explanation that would help a layperson understand this aspect of the bill. Your response should:

1. Directly answer the user's question
2. Use simple, non-technical language
3. Provide relevant examples where helpful
4. Explain any legal terms mentioned
5. Keep the explanation focused and concise (2-4 paragraphs)

If the question is about a specific section, quote the relevant part and then explain it in simple terms. If the question is about impact or implications, explain how it would affect ordinary citizens or businesses.`,
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
