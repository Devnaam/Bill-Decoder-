"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, MessageSquare } from "lucide-react"

interface ExplainSectionProps {
  billTitle: string
  billContent: string
}

export default function ExplainSectionSimplified({ billTitle, billContent }: ExplainSectionProps) {
  const [query, setQuery] = useState("")
  const [explanation, setExplanation] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [hasAsked, setHasAsked] = useState(false)

  const handleExplain = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    setHasAsked(true)

    try {
      const response = await fetch("/api/explain-simplified", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billTitle,
          billContent,
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

  const handleClear = () => {
    setQuery("")
    setExplanation("")
    setHasAsked(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Ask for More Explanation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Need clarification on a specific section or term? Ask a question about this bill and get an AI-powered
            explanation.
          </p>
          <Textarea
            placeholder="E.g., Explain Section 5 in simpler terms, or What does 'data fiduciary' mean? How will this affect small businesses?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="min-h-[100px]"
            disabled={isLoading}
          />

          {explanation && (
            <div className="mt-4 p-4 bg-muted/50 rounded-lg border">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                AI Explanation:
              </h4>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-sm leading-relaxed">{explanation}</p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Generating explanation...</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleExplain} disabled={!query.trim() || isLoading} className="flex-1">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get Explanation"
          )}
        </Button>
        {hasAsked && (
          <Button variant="outline" onClick={handleClear} disabled={isLoading}>
            Ask Another
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
