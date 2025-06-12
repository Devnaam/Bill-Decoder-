"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ErrorMessage } from "@/components/error-message"

export default function UploadPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState("")
  const [billText, setBillText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("file")
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])

      // For text files, read the content immediately
      if (e.target.files[0].type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setBillText(event.target.result as string)
          }
        }
        reader.readAsText(e.target.files[0])
      }
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])

      // For text files, read the content immediately
      if (e.dataTransfer.files[0].type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (event) => {
          if (event.target?.result) {
            setBillText(event.target.result as string)
          }
        }
        reader.readAsText(e.dataTransfer.files[0])
      }
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      // For text files
      if (file.type === "text/plain") {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string)
          } else {
            reject(new Error("Failed to read file"))
          }
        }
        reader.onerror = () => reject(new Error("Failed to read file"))
        reader.readAsText(file)
      }
      // For PDF files, in a real app you would use pdf.js or similar
      else if (file.type === "application/pdf") {
        // Mock PDF extraction for demo purposes
        resolve(
          `This is extracted text from the PDF file: ${file.name}. In a real application, we would use a PDF parsing library like pdf.js to extract the actual text content.`,
        )
      }
      // For other document types
      else {
        resolve(
          `This is extracted text from the file: ${file.name}. In a real application, we would use appropriate libraries to extract text from different file formats.`,
        )
      }
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      let billTextToProcess = ""

      if (activeTab === "file" && file) {
        // Extract text from the file
        billTextToProcess = await extractTextFromFile(file)
      } else if (activeTab === "url" && url) {
        // Call the scrape API
        const response = await fetch("/api/scrape", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        })

        if (!response.ok) {
          throw new Error("Failed to scrape bill from URL")
        }

        const data = await response.json()
        billTextToProcess = data.fullText
      } else if (activeTab === "text" && billText) {
        billTextToProcess = billText
      } else {
        throw new Error("No content to process")
      }

      // Call the summarize API
      const summaryResponse = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ billText: billTextToProcess }),
      })

      if (!summaryResponse.ok) {
        throw new Error("Failed to summarize bill")
      }

      // In a real app, you would store the result and redirect to it
      router.push("/bills/uploaded")
    } catch (error) {
      console.error("Error processing bill:", error)
      setError(error instanceof Error ? error.message : "Failed to process the bill. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Upload a Bill</h1>
          <p className="text-muted-foreground mb-8">
            Upload a bill document, provide a URL, or paste the bill text to get a simplified summary.
          </p>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="url">Provide URL</TabsTrigger>
              <TabsTrigger value="text">Paste Text</TabsTrigger>
            </TabsList>

            <TabsContent value="file">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Bill Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center ${
                      file ? "border-primary" : "border-muted-foreground/20"
                    }`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                  >
                    {file ? (
                      <div className="flex flex-col items-center">
                        <FileText className="h-12 w-12 text-primary mb-4" />
                        <p className="font-medium mb-2">{file.name}</p>
                        <p className="text-sm text-muted-foreground mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                        <Button variant="outline" onClick={() => setFile(null)} className="mt-2">
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">Drag and drop a bill document</h3>
                        <p className="text-muted-foreground mb-4">Or click to browse your files (PDF, DOC, TXT)</p>
                        <Input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          id="file-upload"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <Button onClick={handleSelectFileClick}>Select File</Button>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmit} disabled={!file || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Process Bill"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="url">
              <Card>
                <CardHeader>
                  <CardTitle>Provide Bill URL</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Enter the URL of a bill from an official source like PRS India, eGazette, or India Code.
                    </p>
                    <div className="space-y-2">
                      <Label htmlFor="bill-url">Bill URL</Label>
                      <Input
                        id="bill-url"
                        placeholder="https://prsindia.org/billtrack/the-digital-personal-data-protection-bill-2023"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmit} disabled={!url || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Fetch & Process"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="text">
              <Card>
                <CardHeader>
                  <CardTitle>Paste Bill Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">Paste the full text of the bill you want to simplify.</p>
                    <div className="space-y-2">
                      <Label htmlFor="bill-text">Bill Text</Label>
                      <Textarea
                        id="bill-text"
                        placeholder="Paste the full text of the bill here..."
                        className="min-h-[300px]"
                        value={billText}
                        onChange={(e) => setBillText(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSubmit} disabled={!billText || isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Process Bill"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          {error && (
            <div className="mt-6">
              <ErrorMessage message={error} retry={() => setError(null)} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
