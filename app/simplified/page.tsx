"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Loader2, BookOpen, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ErrorMessage } from "@/components/error-message"
import ExplainSectionSimplified from "@/components/explain-section-simplified"

// Mock bill database - in a real app, this would come from a database
const billDatabase: Record<string, any> = {
  "securities-and-exchange-board-of-india-sebi-act-1992": {
    title: "Securities and Exchange Board of India (SEBI) Act, 1992",
    category: "Finance",
    date: "1992",
    status: "Enacted",
    content: `The Securities and Exchange Board of India Act, 1992, is an Act of the Parliament of India which established the Securities and Exchange Board of India to protect the interests of investors in securities and to promote the development of, and to regulate, the securities market and for matters connected therewith or incidental thereto.

The Act provides for the establishment of SEBI as a statutory body to regulate the securities market in India. SEBI's primary functions include protecting investor interests, promoting development of securities market, and regulating the securities market.

Key provisions include:
- Establishment of SEBI as a corporate body
- Powers and functions of SEBI
- Registration and regulation of market intermediaries
- Prevention of fraudulent and unfair trade practices
- Enforcement of securities laws
- Penalties for violations

The Act empowers SEBI to:
1. Register and regulate the working of capital market intermediaries
2. Register and regulate the working of mutual funds
3. Promote and regulate self-regulatory organizations
4. Prohibit fraudulent and unfair trade practices
5. Promote investors education and training of intermediaries
6. Prohibit insider trading in securities
7. Regulate substantial acquisition of shares and takeovers of companies`,
  },
  "securities-laws-amendment-bill-2014": {
    title: "Securities Laws (Amendment) Bill, 2014",
    category: "Finance",
    date: "2014",
    status: "Passed",
    content: `The Securities Laws (Amendment) Bill, 2014 was introduced to amend the SEBI Act, the Securities Contracts (Regulation) Act, and the Depositories Act. The bill enhanced SEBI's powers to conduct search and seizure operations and empowered it to recover illegal gains from defaulters more effectively.

Key amendments include:
- Enhanced search and seizure powers for SEBI
- Power to recover illegal gains (disgorgement)
- Strengthened enforcement mechanisms
- Improved regulatory framework for market intermediaries
- Enhanced investor protection measures

The bill provides SEBI with additional powers to:
1. Conduct search and seizure operations
2. Recover illegal gains from market violations
3. Impose monetary penalties
4. Strengthen surveillance and investigation capabilities
5. Improve market integrity and transparency

These amendments were designed to make SEBI more effective in regulating the securities market and protecting investor interests.`,
  },
  "foreign-exchange-management-act-fema-1999": {
    title: "Foreign Exchange Management Act (FEMA), 1999",
    category: "Finance",
    date: "1999",
    status: "Enacted",
    content: `The Foreign Exchange Management Act, 1999 (FEMA) is an Act of the Parliament of India to consolidate and amend the law relating to foreign exchange with the objective of facilitating external trade and payments and for promoting the orderly development and maintenance of foreign exchange market in India.

FEMA replaced the Foreign Exchange Regulation Act (FERA) of 1973. The main objective of FEMA is to facilitate external trade and payments and promote orderly development and maintenance of foreign exchange market in India.

Key provisions include:
- Regulation of foreign exchange transactions
- Current account and capital account transactions
- Export and import of goods and services
- Foreign investment regulations
- Penalties for violations

FEMA covers:
1. Current account transactions
2. Capital account transactions
3. Export and import of goods and services
4. Foreign investment and borrowing
5. Acquisition and transfer of immovable property
6. Penalties and adjudication procedures`,
  },
  "digital-personal-data-protection-bill-2023": {
    title: "The Digital Personal Data Protection Bill, 2023",
    category: "Technology",
    date: "2023",
    status: "Passed",
    content: `The Digital Personal Data Protection Bill, 2023 establishes a framework for processing digital personal data that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes.

The bill creates comprehensive rules for data protection in India, covering:
- Individual rights regarding personal data
- Obligations of data fiduciaries
- Cross-border data transfers
- Penalties for non-compliance
- Establishment of Data Protection Board

Key provisions include:
1. Consent requirements for data processing
2. Rights of data principals (individuals)
3. Obligations of data fiduciaries (organizations)
4. Data localization requirements
5. Penalties up to ₹250 crore for violations
6. Government exemptions for national security`,
  },
  "telecommunications-bill-2023": {
    title: "The Telecommunications Bill, 2023",
    category: "Communication",
    date: "2023",
    status: "Passed",
    content: `The Telecommunications Bill, 2023 modernizes India's telecom regulations, replacing the Indian Telegraph Act of 1885. The bill covers spectrum allocation, right of way for infrastructure, and security provisions for the digital age.

Key features include:
- Unified licensing framework
- Spectrum management and allocation
- Infrastructure development facilitation
- Consumer protection measures
- National security provisions

The bill addresses:
1. Licensing and authorization procedures
2. Spectrum assignment and management
3. Right of way for telecom infrastructure
4. Interception and monitoring powers
5. Consumer protection and service quality
6. Penalties and enforcement mechanisms`,
  },
}

// Function to find bill by title or create a fallback
function findBillData(billSlug: string, billTitle: string) {
  // First, try to find by exact slug
  if (billDatabase[billSlug]) {
    return billDatabase[billSlug]
  }

  // Try to find by partial matching of title
  const titleLower = billTitle.toLowerCase()
  for (const [key, bill] of Object.entries(billDatabase)) {
    if (bill.title.toLowerCase().includes(titleLower) || titleLower.includes(bill.title.toLowerCase())) {
      return bill
    }
  }

  // If not found, create a fallback bill data
  return {
    title: billTitle,
    category: "Unknown",
    date: "Unknown",
    status: "Unknown",
    content: `This is a placeholder for ${billTitle}. In a real application, this content would be fetched from a comprehensive database of Indian parliamentary bills and acts. 

The bill deals with important legislative matters that affect citizens and governance in India. For the most accurate and up-to-date information, please refer to official government sources such as:

1. PRS India (www.prsindia.org)
2. India Code (www.indiacode.nic.in)
3. eGazette (www.egazette.nic.in)
4. Parliament of India website

This simplified summary is generated using AI technology to make complex legal language more accessible to the general public.`,
  }
}

export default function SimplifiedPage() {
  const searchParams = useSearchParams()
  const billSlug = searchParams.get("bill")
  const billTitle = searchParams.get("title")

  const [simplifiedData, setSimplifiedData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (billSlug && billTitle) {
      generateSimplifiedSummary()
    }
  }, [billSlug, billTitle])

  const generateSimplifiedSummary = async () => {
    setLoading(true)
    setError(null)

    try {
      // Get bill content from our database or create fallback
      const billData = findBillData(billSlug, billTitle)

      // Call our API to generate simplified summary
      const response = await fetch("/api/simplify-bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billTitle: billData.title,
          billContent: billData.content,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate simplified summary")
      }

      const data = await response.json()
      setSimplifiedData({
        ...billData,
        simplifiedSummary: data.summary,
        keyPoints: data.keyPoints,
      })
    } catch (error) {
      console.error("Error generating simplified summary:", error)
      setError("Failed to generate simplified summary. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Handle case when no query parameters are provided
  if (!billSlug || !billTitle) {
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
            <div className="flex items-center justify-center min-h-[400px]">
              <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                  <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <CardTitle>No Bill Specified</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    To view a simplified summary, please select a bill from the search results or browse our categories.
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link href="/search">
                      <Button className="w-full">Search Bills</Button>
                    </Link>
                    <Link href="/">
                      <Button variant="outline" className="w-full">
                        Browse Categories
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/search">
            <Button variant="ghost" className="flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Search
            </Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin mb-4" />
              <h2 className="text-xl font-medium mb-2">Generating Simplified Summary</h2>
              <p className="text-muted-foreground text-center">
                Our AI is analyzing "{billTitle}" and creating an easy-to-understand summary...
              </p>
            </div>
          ) : error ? (
            <div className="py-12">
              <ErrorMessage message={error} retry={generateSimplifiedSummary} />
            </div>
          ) : simplifiedData ? (
            <>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{simplifiedData.category}</Badge>
                <Badge variant="secondary">{simplifiedData.status}</Badge>
              </div>

              <h1 className="text-3xl font-bold mb-2">{simplifiedData.title}</h1>
              <p className="text-muted-foreground mb-8">
                {simplifiedData.date !== "Unknown" ? `Enacted in ${simplifiedData.date}` : "Legislative Document"}
              </p>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    AI-Generated Simplified Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line mb-8">{simplifiedData.simplifiedSummary}</div>

                    {simplifiedData.keyPoints && simplifiedData.keyPoints.length > 0 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">Key Points</h3>
                        <ul className="space-y-2">
                          {simplifiedData.keyPoints.map((point: string, index: number) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                                {index + 1}
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <ExplainSectionSimplified billTitle={simplifiedData.title} billContent={simplifiedData.content} />
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This simplified summary was generated using AI technology. While we strive for
                  accuracy, please refer to the original bill text for official information and legal purposes.
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">No Data Available</h2>
              <p className="text-muted-foreground mb-6">Unable to load bill information.</p>
              <Link href="/">
                <Button>Go to Home</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
