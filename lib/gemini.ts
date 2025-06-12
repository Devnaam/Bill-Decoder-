// This file would contain the actual implementation for calling the Gemini API

export async function summarizeBill(billText: string) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY

  if (!GEMINI_API_KEY) {
    throw new Error("Gemini API key is not configured")
  }

  try {
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
                  text: `Summarize this bill in simple terms that a layperson can understand. 
                  Explain the purpose, key provisions, and potential impact. 
                  Format your response with an overview followed by key points: ${billText}`,
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
    return {
      summary: data.candidates[0].content.parts[0].text,
      keyPoints: extractKeyPoints(data.candidates[0].content.parts[0].text),
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    throw error
  }
}

// Helper function to extract key points from the summary
function extractKeyPoints(summary: string): string[] {
  // Simple extraction of bullet points or numbered lists
  const keyPointsRegex = /(?:\d+\.|\*)\s+(.+?)(?=\n\d+\.|\n\*|\n\n|$)/gs
  const matches = [...summary.matchAll(keyPointsRegex)]

  if (matches.length > 0) {
    return matches.map((match) => match[1].trim())
  }

  // Fallback: split by newlines if no bullet points found
  const lines = summary
    .split("\n")
    .filter((line) => line.trim().length > 0 && !line.includes("Key Points") && !line.includes("Summary"))

  return lines.slice(0, 5) // Return up to 5 lines as key points
}
