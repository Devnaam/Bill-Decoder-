"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bookmark, Share2, BookmarkCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

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

const popularBills = [
  {
    id: "5",
    title: "The Finance Bill, 2024",
    category: "Finance",
    date: "February 1, 2024",
    status: "Passed",
    summary:
      "Annual finance bill that implements the tax proposals and financial policies outlined in the Union Budget, affecting income tax and corporate taxation.",
  },
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
    id: "6",
    title: "The National Education Policy Implementation Bill, 2023",
    category: "Education",
    date: "July 15, 2023",
    status: "Introduced",
    summary:
      "Provides a framework for implementing the National Education Policy across educational institutions in India, restructuring the education system.",
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
]

const trendingBills = [
  {
    id: "8",
    title: "The Infrastructure Development and Regulation Bill, 2023",
    category: "Infrastructure",
    date: "October 10, 2023",
    status: "Introduced",
    summary:
      "Establishes a framework for accelerating infrastructure development and regulating public-private partnerships across India.",
  },
  {
    id: "9",
    title: "The Environmental Protection (Amendment) Bill, 2023",
    category: "Environment",
    date: "November 20, 2023",
    status: "Introduced",
    summary:
      "Updates environmental protection laws to address climate change and promote sustainable development practices nationwide.",
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
]

interface BillCardProps {
  bill: any
  savedBills: string[]
  onSave: (billId: string) => void
  onShare: (bill: any) => void
}

function BillCard({ bill, savedBills, onSave, onShare }: BillCardProps) {
  const isSaved = savedBills.includes(bill.id)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={bill.status === "Passed" ? "default" : bill.status === "Introduced" ? "secondary" : "outline"}
              className="text-xs"
            >
              {bill.status}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {bill.category}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-lg sm:text-xl leading-tight">
          <Link href={`/bills/${bill.id}`} className="hover:underline">
            {bill.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">{bill.date}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm sm:text-base line-clamp-3 leading-relaxed">{bill.summary}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-3 border-t flex-shrink-0">
        <Link href={`/bills/${bill.id}`} className="w-full sm:w-auto">
          <Button variant="default" size="sm" className="w-full sm:w-auto">
            Read Simplified
          </Button>
        </Link>
        <div className="flex gap-2 justify-center sm:justify-end">
          <Button variant="ghost" size="icon" onClick={() => onSave(bill.id)} className={isSaved ? "text-primary" : ""}>
            {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
            <span className="sr-only">{isSaved ? "Saved" : "Save"}</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onShare(bill)}>
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function ExploreBills() {
  const [savedBills, setSavedBills] = useState<string[]>([])
  const { toast } = useToast()

  const handleSave = (billId: string) => {
    setSavedBills((prev) => {
      const isAlreadySaved = prev.includes(billId)
      const newSavedBills = isAlreadySaved ? prev.filter((id) => id !== billId) : [...prev, billId]

      // Show toast notification
      toast({
        title: isAlreadySaved ? "Bill removed from saved" : "Bill saved successfully",
        description: isAlreadySaved
          ? "The bill has been removed from your saved bills."
          : "You can find this bill in your saved bills section.",
        duration: 3000,
      })

      // In a real app, you would also save this to localStorage or a database
      if (typeof window !== "undefined") {
        localStorage.setItem("savedBills", JSON.stringify(newSavedBills))
      }

      return newSavedBills
    })
  }

  const handleShare = async (bill: any) => {
    const shareData = {
      title: bill.title,
      text: bill.summary,
      url: `${window.location.origin}/bills/${bill.id}`,
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast({
          title: "Bill shared successfully",
          description: "The bill has been shared using your device's share feature.",
          duration: 3000,
        })
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${bill.title}\n\n${bill.summary}\n\nRead more: ${window.location.origin}/bills/${bill.id}`,
        )
        toast({
          title: "Link copied to clipboard",
          description: "The bill link has been copied to your clipboard.",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error("Error sharing:", error)
      toast({
        title: "Share failed",
        description: "Unable to share the bill. Please try again.",
        variant: "destructive",
        duration: 3000,
      })
    }
  }

  // Load saved bills from localStorage on component mount
  useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("savedBills")
      if (saved) {
        setSavedBills(JSON.parse(saved))
      }
    }
  })

  return (
    <Tabs defaultValue="recent">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="recent">Recent</TabsTrigger>
        <TabsTrigger value="popular">Popular</TabsTrigger>
        <TabsTrigger value="trending">Trending</TabsTrigger>
      </TabsList>

      <TabsContent value="recent" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {recentBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} savedBills={savedBills} onSave={handleSave} onShare={handleShare} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="popular" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {popularBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} savedBills={savedBills} onSave={handleSave} onShare={handleShare} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="trending" className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {trendingBills.map((bill) => (
            <BillCard key={bill.id} bill={bill} savedBills={savedBills} onSave={handleSave} onShare={handleShare} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}
