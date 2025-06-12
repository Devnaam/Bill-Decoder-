import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 })
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY

    if (!GEMINI_API_KEY) {
      throw new Error("Gemini API key is not configured")
    }

    // Call Gemini API for search results
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
                  text: `You are a search engine for Indian parliamentary bills and acts. 
                  A user is searching for: "${query}"
                  
                  Return 3-5 relevant bills that match this search query. Focus on real Indian bills and acts.
                  Format your response as a JSON array of objects with these fields:
                  - title: The exact title of the bill/act
                  - summary: A brief summary of the bill (2-3 sentences)
                  - relevance: How relevant this bill is to the search query (High, Medium, or Low)
                  - slug: A URL-friendly slug version of the title (lowercase, hyphens instead of spaces, no special characters)
                  
                  For example, if searching for "sebi", include bills like:
                  - Securities and Exchange Board of India (SEBI) Act, 1992
                  - Securities Laws (Amendment) Bill, 2014
                  
                  Only return the JSON array, nothing else.`,
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
    const textResponse = data.candidates[0].content.parts[0].text

    // Extract JSON from the response
    let results = []
    try {
      // Find JSON in the response text
      const jsonMatch = textResponse.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0])
      } else {
        // Fallback to parsing the entire response
        results = JSON.parse(textResponse)
      }
    } catch (error) {
      console.error("Error parsing Gemini response:", error)
      // Fallback to predefined results based on query
      results = getFallbackResults(query)
    }

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Error searching bills:", error)
    return NextResponse.json({ error: "Failed to search bills" }, { status: 500 })
  }
}

// Fallback function to provide results when API parsing fails
function getFallbackResults(query: string) {
  const queryLower = query.toLowerCase()

  if (queryLower.includes("sebi") || queryLower.includes("securities")) {
    return [
      {
        title: "Securities and Exchange Board of India (SEBI) Act, 1992",
        summary:
          "The SEBI Act, 1992 establishes the Securities and Exchange Board of India (SEBI) to protect the interests of investors in securities and to promote the development of, and to regulate, the securities market.",
        relevance: "High",
        slug: "securities-and-exchange-board-of-india-sebi-act-1992",
      },
      {
        title: "Securities Laws (Amendment) Bill, 2014",
        summary:
          "The Securities Laws (Amendment) Bill, 2014 amended the SEBI Act, the Securities Contracts (Regulation) Act, and the Depositories Act. The bill enhanced SEBI's powers to conduct search and seizure operations.",
        relevance: "High",
        slug: "securities-laws-amendment-bill-2014",
      },
      {
        title: "Foreign Exchange Management Act (FEMA), 1999",
        summary:
          "FEMA is an Act to consolidate and amend the law relating to foreign exchange with the objective of facilitating external trade and payments.",
        relevance: "Medium",
        slug: "foreign-exchange-management-act-fema-1999",
      },
    ]
  }

  // Default fallback for other queries
  return [
    {
      title: "The Digital Personal Data Protection Bill, 2023",
      summary:
        "Establishes a framework for processing digital personal data that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes.",
      relevance: "Medium",
      slug: "digital-personal-data-protection-bill-2023",
    },
    {
      title: "The Telecommunications Bill, 2023",
      summary:
        "Modernizes telecom regulations, covering spectrum allocation, right of way for infrastructure, and security provisions for the digital age.",
      relevance: "Medium",
      slug: "telecommunications-bill-2023",
    },
  ]
}
