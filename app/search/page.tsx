"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ErrorMessage } from "@/components/error-message"

interface SearchResult {
  title: string
  summary: string
  relevance: string
  slug: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState(query)

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (searchText: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchText }),
      })

      if (!response.ok) {
        throw new Error("Search failed")
      }

      const data = await response.json()

      // Add slugs to the results for linking to simplified view
      const resultsWithSlugs = data.results.map((result: any, index: number) => ({
        ...result,
        slug: generateSlug(result.title),
      }))

      setResults(resultsWithSlugs)
    } catch (err) {
      console.error("Search error:", err)
      setError("Failed to perform search. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Update URL with search query
      const url = new URL(window.location.href)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url.toString())

      performSearch(searchQuery)
    }
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Search Results</h1>

          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for bills, topics, or keywords..."
                  className="pl-10 pr-4 py-6"
                />
              </div>
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mb-6">
              <ErrorMessage message={error} />
            </div>
          )}

          {query && !loading && !error && (
            <p className="text-muted-foreground mb-6">
              {results.length > 0
                ? `Found ${results.length} results for "${query}"`
                : `No results found for "${query}"`}
            </p>
          )}

          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                    <div className="h-8 bg-muted rounded w-3/4"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-4 bg-muted rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {results.map((result, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Badge className="w-fit mb-2">Relevance: {result.relevance}</Badge>
                    <CardTitle className="text-xl">{result.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{result.summary}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/simplified?bill=${result.slug}&title=${encodeURIComponent(result.title)}`}>
                      <Button>Read Simplified</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}

          {!loading && results.length === 0 && query && !error && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">Try different keywords or browse bills by category</p>
              <Link href="/">
                <Button>Browse All Bills</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
