import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink } from "lucide-react"

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold mb-6">About Bill Decoder</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-xl mb-8">
              Bill Decoder is a civic tech platform that makes Indian parliamentary bills and laws accessible to
              everyone by translating complex legal language into simple, easy-to-understand terms.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">Our Mission</h2>
            <p>
              We believe that understanding the laws that govern us should not require specialized legal knowledge. Our
              mission is to bridge the gap between complex legislative language and everyday citizens, empowering people
              to participate more meaningfully in democracy.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">1</span>
                  </div>
                  <CardTitle>Bill Collection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We collect bills from official government sources like PRS India, eGazette, and India Code, ensuring
                    we have accurate and up-to-date information.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">2</span>
                  </div>
                  <CardTitle>AI Processing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our AI technology analyzes the legal text, identifies key provisions, and transforms complex
                    language into clear, concise explanations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <span className="text-primary font-bold text-xl">3</span>
                  </div>
                  <CardTitle>Civic Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Users can read, save, share, and discuss bills, fostering greater civic participation and awareness
                    of legislative developments.
                  </p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Our Technology</h2>
            <p>
              Bill Decoder uses advanced AI models, specifically Gemini 2.0 Flash, to process and simplify legal text.
              Our technology can:
            </p>
            <ul className="mt-4 space-y-2">
              <li>Extract key provisions from complex bills</li>
              <li>Identify the purpose and impact of legislation</li>
              <li>Translate legal jargon into everyday language</li>
              <li>Highlight important changes and implications for citizens</li>
              <li>Provide additional context and explanations when needed</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">Data Sources</h2>
            <p>We source our bills and legal documents from official government websites, including:</p>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://prsindia.org/billtrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  PRS India <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://egazette.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  eGazette <ExternalLink className="h-4 w-4" />
                </a>
              </li>
              <li>
                <a
                  href="https://indiacode.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  India Code <ExternalLink className="h-4 w-4" />
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-6">Disclaimer</h2>
            <div className="bg-muted p-6 rounded-lg">
              <p className="font-medium">
                Bill Decoder provides simplified explanations of bills for informational purposes only. While we strive
                for accuracy, our summaries should not be considered legal advice. Always refer to the original text for
                official information.
              </p>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">Contact Us</h2>
            <p>Have questions, feedback, or suggestions? We'd love to hear from you!</p>
            <div className="mt-4">
              <Button>Contact Us</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
