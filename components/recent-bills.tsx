import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bookmark, Share2 } from "lucide-react"

const recentBills = [
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
]

export default function RecentBills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {recentBills.map((bill) => (
        <Card key={bill.id} className="overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <Badge
                variant={bill.status === "Passed" ? "default" : bill.status === "Introduced" ? "secondary" : "outline"}
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
  )
}
