"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface ExplainSectionProps {
  billId: string
}

export default function ExplainSection({ billId }: ExplainSectionProps) {
  const [query, setQuery] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleExplain = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billId,
          query,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get explanation")
      }

      const data = await response.json()
      setExplanation(data.explanation)
    } catch (error) {
      console.error("Error getting explanation:", error)
      setExplanation("Sorry, we couldn't generate an explanation at this time. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ask for More Explanation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Need clarification on a specific section or term? Ask a question about this bill.
          </p>
          <Textarea
            placeholder="E.g., Explain Section 5 in simpler terms, or What does 'data fiduciary' mean?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
          />
          {explanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Explanation:</h4>
              <p className="whitespace-pre-line">{explanation}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleExplain} disabled={!query.trim() || isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get Explanation"
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
