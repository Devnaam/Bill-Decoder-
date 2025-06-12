import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bookmark, Share2, Trash2 } from "lucide-react"

export default function SavedBillsPage() {
  // In a real app, this would be fetched from a database or local storage
  const savedBills = [
    {
      id: "1",
      title: "The Digital Personal Data Protection Bill, 2023",
      category: "Technology",
      date: "August 11, 2023",
      status: "Passed",
      summary:
        "Establishes a framework for processing digital personal data that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes.",
    },
    {
      id: "3",
      title: "The Telecommunications Bill, 2023",
      category: "Communication",
      date: "December 20, 2023",
      status: "Passed",
      summary:
        "Modernizes telecom regulations, covering spectrum allocation, right of way for infrastructure, and security provisions for the digital age.",
    },
    {
      id: "uploaded",
      title: "Your Uploaded Bill",
      category: "Custom",
      date: new Date().toLocaleDateString(),
      status: "Processed",
      summary: "This is the AI-generated summary of your uploaded bill.",
    },
  ]

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
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Saved Bills</h1>
            <Bookmark className="h-6 w-6" />
          </div>

          {savedBills.length > 0 ? (
            <div className="space-y-6">
              {savedBills.map((bill) => (
                <Card key={bill.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge
                        variant={
                          bill.status === "Passed" ? "default" : bill.status === "Introduced" ? "secondary" : "outline"
                        }
                        className="mb-2"
                      >
                        {bill.status}
                      </Badge>
                      <Badge variant="outline">{bill.category}</Badge>
                    </div>
                    <CardTitle className="text-xl">
                      <Link href={`/bills/${bill.id}`} className="hover:underline">
                        {bill.title}
                      </Link>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{bill.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-3">{bill.summary}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t">
                    <Link href={`/bills/${bill.id}`}>
                      <Button variant="default" size="sm">
                        Read Simplified
                      </Button>
                    </Link>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-medium mb-2">No saved bills yet</h2>
              <p className="text-muted-foreground mb-6">When you save bills, they'll appear here for easy access</p>
              <Link href="/">
                <Button>Browse Bills</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
