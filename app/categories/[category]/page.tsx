import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Bookmark, Share2 } from "lucide-react"
import { getCategoryIcon } from "@/lib/category-utils"

// Mock data - in a real app, this would come from an API or database
const allBills = [
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
    id: "2",
    title: "The Bharatiya Nyaya Sanhita Bill, 2023",
    category: "Law & Justice",
    date: "December 25, 2023",
    status: "Passed",
    summary:
      "Replaces the Indian Penal Code (IPC) with modern provisions, introducing new offenses and revising penalties for existing crimes.",
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
    id: "4",
    title: "The Waqf (Amendment) Bill, 2024",
    category: "Social Justice",
    date: "February 8, 2024",
    status: "Introduced",
    summary:
      "Proposes changes to the administration and governance of Waqf properties in India, aiming to improve transparency and management.",
  },
  {
    id: "5",
    title: "The Finance Bill, 2024",
    category: "Finance",
    date: "February 1, 2024",
    status: "Passed",
    summary:
      "Annual finance bill that implements the tax proposals and financial policies outlined in the Union Budget.",
  },
  {
    id: "6",
    title: "The National Education Policy Implementation Bill, 2023",
    category: "Education",
    date: "July 15, 2023",
    status: "Introduced",
    summary:
      "Provides a framework for implementing the National Education Policy across educational institutions in India.",
  },
  {
    id: "7",
    title: "The Labor Codes Implementation Bill, 2023",
    category: "Labor",
    date: "September 5, 2023",
    status: "Passed",
    summary:
      "Consolidates and implements the four labor codes covering wages, social security, industrial relations, and occupational safety.",
  },
  {
    id: "8",
    title: "The Infrastructure Development and Regulation Bill, 2023",
    category: "Infrastructure",
    date: "October 10, 2023",
    status: "Introduced",
    summary:
      "Establishes a framework for accelerating infrastructure development and regulating public-private partnerships.",
  },
  {
    id: "9",
    title: "The Environmental Protection (Amendment) Bill, 2023",
    category: "Environment",
    date: "November 20, 2023",
    status: "Introduced",
    summary:
      "Updates environmental protection laws to address climate change and promote sustainable development practices.",
  },
  {
    id: "10",
    title: "The Healthcare Reform Bill, 2024",
    category: "Healthcare",
    date: "January 15, 2024",
    status: "Introduced",
    summary:
      "Proposes comprehensive reforms to improve healthcare accessibility, affordability, and quality across India.",
  },
  {
    id: "11",
    title: "The Defense Procurement Reform Bill, 2023",
    category: "Defense",
    date: "August 25, 2023",
    status: "Passed",
    summary:
      "Streamlines defense procurement processes and promotes indigenous defense manufacturing under the Atmanirbhar Bharat initiative.",
  },
  {
    id: "12",
    title: "The Constitutional (Amendment) Bill, 2023",
    category: "Constitutional",
    date: "December 5, 2023",
    status: "Introduced",
    summary: "Proposes amendments to specific constitutional provisions to address contemporary governance challenges.",
  },
]

// Map category names to their normalized form
const categoryMap: Record<string, string> = {
  finance: "Finance",
  education: "Education",
  labor: "Labor",
  infrastructure: "Infrastructure",
  environment: "Environment",
  healthcare: "Healthcare",
  defense: "Defense",
  constitutional: "Constitutional",
  technology: "Technology",
  "law-justice": "Law & Justice",
  communication: "Communication",
  "social-justice": "Social Justice",
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  // Normalize the category parameter
  const normalizedCategory = categoryMap[params.category.toLowerCase()]

  if (!normalizedCategory) {
    notFound()
  }

  // Filter bills by category
  const bills = allBills.filter((bill) => bill.category === normalizedCategory)

  const CategoryIcon = getCategoryIcon(normalizedCategory)

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
          <div className="flex items-center gap-4 mb-8">
            <div
              className={`w-12 h-12 rounded-full bg-${normalizedCategory.toLowerCase()}-100 dark:bg-${normalizedCategory.toLowerCase()}-900/20 flex items-center justify-center`}
            >
              <CategoryIcon
                className={`h-6 w-6 text-${normalizedCategory.toLowerCase()}-600 dark:text-${normalizedCategory.toLowerCase()}-400`}
              />
            </div>
            <h1 className="text-3xl font-bold">{normalizedCategory} Bills</h1>
          </div>

          {bills.length > 0 ? (
            <div className="space-y-6">
              {bills.map((bill) => (
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
                        <Bookmark className="h-4 w-4" />
                        <span className="sr-only">Save</span>
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Share2 className="h-4 w-4" />
                        <span className="sr-only">Share</span>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No bills found in this category</h2>
              <p className="text-muted-foreground mb-6">
                We couldn't find any bills in the {normalizedCategory} category
              </p>
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
