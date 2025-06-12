import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CheckCircle2 } from "lucide-react"
import BillTimeline from "@/components/bill-timeline"

export default function UploadedBillPage() {
  // In a real app, this would be fetched from a database or state
  const uploadedBill = {
    id: "uploaded",
    title: "Your Uploaded Bill",
    category: "Custom",
    date: new Date().toLocaleDateString(),
    status: "Processed",
    summary: "This is the AI-generated summary of your uploaded bill.",
    simplifiedSummary: `This is a simplified explanation of the bill you uploaded. The AI has analyzed the text and broken it down into easy-to-understand language.

1. First major point about your bill in simple terms.

2. Second major point explaining a key provision.

3. Third major point about who this affects and how.

4. Fourth major point about implementation timeline.

5. Fifth major point about potential impact.

This summary helps you understand the legal language without needing specialized knowledge.`,
    keyPoints: [
      "First key point extracted from your bill",
      "Second key point extracted from your bill",
      "Third key point extracted from your bill",
      "Fourth key point extracted from your bill",
      "Fifth key point extracted from your bill",
    ],
    timeline: [
      {
        date: new Date().toLocaleDateString(),
        title: "Bill Uploaded",
        status: "completed",
      },
      {
        date: new Date().toLocaleDateString(),
        title: "AI Processing",
        status: "completed",
      },
      {
        date: new Date().toLocaleDateString(),
        title: "Summary Generated",
        status: "completed",
      },
    ],
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
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg p-6 mb-8 flex items-center gap-4">
            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
            <div>
              <h2 className="text-xl font-bold text-green-800 dark:text-green-300">Processing Complete</h2>
              <p className="text-green-700 dark:text-green-400">
                Your bill has been successfully processed and simplified
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{uploadedBill.category}</Badge>
            <Badge variant="secondary">{uploadedBill.status}</Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{uploadedBill.title}</h1>
          <p className="text-muted-foreground mb-6">Processed on {uploadedBill.date}</p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Simplified Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg font-medium mb-6">{uploadedBill.summary}</p>
                <div className="whitespace-pre-line">{uploadedBill.simplifiedSummary}</div>

                <h3 className="text-xl font-bold mt-8 mb-4">Key Points</h3>
                <ul className="space-y-2">
                  {uploadedBill.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        {index + 1}
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Processing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <BillTimeline events={uploadedBill.timeline} />
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4">
            <Button>Save This Summary</Button>
            <Button variant="outline">Share</Button>
            <Link href="/upload">
              <Button variant="outline">Upload Another Bill</Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
