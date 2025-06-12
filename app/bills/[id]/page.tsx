import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Bookmark, Share2, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"
import BillTimeline from "@/components/bill-timeline"
import ExplainSection from "@/components/explain-section"

// Mock data - in a real app, this would come from an API or database
const bills = [
  {
    id: "1",
    title: "The Digital Personal Data Protection Bill, 2023",
    category: "Technology",
    date: "August 11, 2023",
    status: "Passed",
    summary:
      "Establishes a framework for processing digital personal data that recognizes both the right of individuals to protect their personal data and the need to process such data for lawful purposes.",
    simplifiedSummary: `This bill creates rules for how companies and the government can collect and use your personal data in digital form. Here's what it means for you:

1. Your Rights: You can ask what data is being collected about you, correct mistakes, and even ask for your data to be deleted.

2. Company Responsibilities: Organizations that collect your data must clearly explain why they're collecting it and get your permission. They can only use it for the purpose they stated.

3. Data Protection Board: A new government body will be created to make sure everyone follows these rules.

4. Penalties: Companies that break these rules can be fined up to ₹250 crore (2.5 billion rupees).

5. Government Exemptions: The government can exempt itself from some of these rules for national security reasons.

In simple terms, this law gives you more control over your personal information online, but also gives the government significant powers to access data when deemed necessary.`,
    keyPoints: [
      "Creates a comprehensive framework for personal data protection",
      "Establishes a Data Protection Board of India",
      "Imposes significant penalties for data breaches",
      "Requires explicit consent for data processing",
      "Includes government exemptions for national security",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "December 14, 2022",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "August 7, 2023",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "August 9, 2023",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "August 11, 2023",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Implementation",
        status: "current",
      },
    ],
    source: "https://prsindia.org/billtrack/the-digital-personal-data-protection-bill-2023",
  },
  {
    id: "2",
    title: "The Bharatiya Nyaya Sanhita Bill, 2023",
    category: "Law & Justice",
    date: "December 25, 2023",
    status: "Passed",
    summary:
      "Replaces the Indian Penal Code (IPC) with modern provisions, introducing new offenses and revising penalties for existing crimes.",
    simplifiedSummary: `This bill replaces the colonial-era Indian Penal Code (IPC) with a new criminal code. Here's what it means:

1. Modernization: Updates criminal laws that were over 150 years old to reflect contemporary needs and values.

2. New Offenses: Introduces new categories of crimes including terrorism, organized crime, and cyber crimes.

3. Harsher Penalties: Increases punishments for crimes against women and children, including sexual offenses.

4. Death Penalty: Expands the scope of capital punishment to include certain heinous crimes.

5. Procedural Changes: Streamlines investigation and trial procedures to reduce delays in the justice system.

This represents one of the most significant overhauls of India's criminal justice system since independence.`,
    keyPoints: [
      "Replaces the colonial-era Indian Penal Code",
      "Introduces new categories of offenses",
      "Increases penalties for crimes against women and children",
      "Expands the scope of capital punishment",
      "Streamlines criminal justice procedures",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "August 11, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "December 20, 2023",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "December 21, 2023",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "December 25, 2023",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "January 1, 2024",
        title: "Implementation",
        status: "current",
      },
    ],
    source: "https://prsindia.org/billtrack/the-bharatiya-nyaya-sanhita-bill-2023",
  },
  {
    id: "3",
    title: "The Telecommunications Bill, 2023",
    category: "Communication",
    date: "December 20, 2023",
    status: "Passed",
    summary:
      "Modernizes telecom regulations, covering spectrum allocation, right of way for infrastructure, and security provisions for the digital age.",
    simplifiedSummary: `This bill updates India's telecommunications laws for the digital age. Here's what it means:

1. Spectrum Management: Creates a more efficient system for allocating radio frequencies used by mobile networks, TV, and radio.

2. Infrastructure Development: Makes it easier for telecom companies to install towers and lay cables by simplifying "right of way" permissions.

3. Internet Calling: Brings services like WhatsApp calls and other internet-based communication under regulation.

4. Security Provisions: Gives the government powers to intercept communications for national security, with some safeguards.

5. Consumer Protection: Establishes new rules to protect users from spam, fraud, and unauthorized access to their communications.

This law replaces outdated regulations from the telegraph era with a framework suited for modern digital communications.`,
    keyPoints: [
      "Modernizes spectrum allocation procedures",
      "Simplifies infrastructure deployment",
      "Regulates internet-based communication services",
      "Enhances national security provisions",
      "Strengthens consumer protection measures",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "September 21, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "December 18, 2023",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "December 19, 2023",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "December 20, 2023",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "March 1, 2024",
        title: "Implementation",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-telecommunications-bill-2023",
  },
  {
    id: "4",
    title: "The Waqf (Amendment) Bill, 2024",
    category: "Social Justice",
    date: "February 8, 2024",
    status: "Introduced",
    summary:
      "Proposes changes to the administration and governance of Waqf properties in India, aiming to improve transparency and management.",
    simplifiedSummary: `This bill proposes changes to how Waqf properties (Islamic charitable endowments) are managed in India. Here's what it means:

1. Governance Reform: Restructures Waqf Boards to include more diverse representation, including women and non-Muslim members.

2. Property Registration: Introduces stricter documentation requirements for registering properties as Waqf.

3. Dispute Resolution: Creates a new mechanism to resolve disputes over Waqf property claims.

4. Financial Oversight: Enhances auditing and financial reporting requirements for better transparency.

5. Government Supervision: Increases central government oversight of Waqf Board activities.

These changes aim to address concerns about transparency, management efficiency, and disputes related to Waqf properties across India.`,
    keyPoints: [
      "Restructures Waqf Board composition",
      "Strengthens property registration requirements",
      "Establishes new dispute resolution mechanisms",
      "Enhances financial transparency measures",
      "Increases government oversight",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "February 8, 2024",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Parliamentary Committee Review",
        status: "current",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "upcoming",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
      {
        date: "Pending",
        title: "Presidential Assent",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-waqf-amendment-bill-2024",
  },
  {
    id: "5",
    title: "The Finance Bill, 2024",
    category: "Finance",
    date: "February 1, 2024",
    status: "Passed",
    summary:
      "Annual finance bill that implements the tax proposals and financial policies outlined in the Union Budget.",
    simplifiedSummary: `This bill implements the tax and financial proposals from the 2024 Union Budget. Here's what it means:

1. Income Tax Changes: Modifies personal income tax slabs and deductions, affecting how much tax individuals pay.

2. Corporate Taxation: Adjusts corporate tax rates and incentives for businesses in various sectors.

3. Customs and GST: Makes changes to import duties and Goods and Services Tax provisions.

4. Financial Sector Reforms: Introduces new regulations for banks, stock markets, and other financial institutions.

5. Economic Stimulus: Includes measures to boost economic growth and employment.

As the legislative component of the annual budget, this bill determines how the government will raise revenue and implement its financial policies for the fiscal year.`,
    keyPoints: [
      "Modifies income tax provisions",
      "Adjusts corporate taxation structure",
      "Changes import duties and GST provisions",
      "Introduces financial sector regulations",
      "Implements economic stimulus measures",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "February 1, 2024",
        title: "Bill Introduced with Budget",
        status: "completed",
      },
      {
        date: "February 15, 2024",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "February 20, 2024",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "February 25, 2024",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "April 1, 2024",
        title: "Implementation",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-finance-bill-2024",
  },
  {
    id: "6",
    title: "The National Education Policy Implementation Bill, 2023",
    category: "Education",
    date: "July 15, 2023",
    status: "Introduced",
    summary:
      "Provides a framework for implementing the National Education Policy across educational institutions in India.",
    simplifiedSummary: `This bill creates a legal framework to implement the National Education Policy (NEP) 2020. Here's what it means:

1. School Education: Restructures school education into a 5+3+3+4 format, replacing the traditional 10+2 system.

2. Higher Education: Transforms colleges and universities with a four-year undergraduate program and multiple exit options.

3. Language Policy: Promotes education in mother tongues and regional languages up to at least Grade 5.

4. Regulatory Changes: Establishes a single regulatory body for higher education, replacing multiple existing regulators.

5. Digital Education: Creates infrastructure and standards for online learning and digital education.

This bill provides the legal backing to transform India's education system as envisioned in the National Education Policy 2020.`,
    keyPoints: [
      "Restructures school education format",
      "Transforms higher education with flexible programs",
      "Promotes education in mother tongues",
      "Establishes unified regulatory framework",
      "Develops digital education infrastructure",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "July 15, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "August 10, 2023",
        title: "Referred to Standing Committee",
        status: "completed",
      },
      {
        date: "January 20, 2024",
        title: "Committee Report Submitted",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "current",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-national-education-policy-implementation-bill-2023",
  },
  {
    id: "7",
    title: "The Labor Codes Implementation Bill, 2023",
    category: "Labor",
    date: "September 5, 2023",
    status: "Passed",
    summary:
      "Consolidates and implements the four labor codes covering wages, social security, industrial relations, and occupational safety.",
    simplifiedSummary: `This bill implements the four labor codes that were previously passed to reform India's labor laws. Here's what it means:

1. Code Consolidation: Brings together 29 existing labor laws into 4 simplified codes covering wages, social security, industrial relations, and occupational safety.

2. Ease of Business: Simplifies compliance requirements for businesses by reducing paperwork and introducing digital systems.

3. Worker Benefits: Extends social security coverage to gig workers and other previously uncovered sectors of the workforce.

4. Hiring Flexibility: Allows companies more flexibility in hiring and laying off workers, with appropriate safeguards.

5. Safety Standards: Updates workplace safety standards and enforcement mechanisms.

This bill represents the final step in implementing one of the most significant labor reforms in independent India's history.`,
    keyPoints: [
      "Consolidates 29 labor laws into 4 codes",
      "Simplifies compliance for businesses",
      "Extends social security to gig workers",
      "Provides hiring flexibility with safeguards",
      "Updates workplace safety standards",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "July 10, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "August 25, 2023",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "September 2, 2023",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "September 5, 2023",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "April 1, 2024",
        title: "Implementation",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-labor-codes-implementation-bill-2023",
  },
  {
    id: "8",
    title: "The Infrastructure Development and Regulation Bill, 2023",
    category: "Infrastructure",
    date: "October 10, 2023",
    status: "Introduced",
    summary:
      "Establishes a framework for accelerating infrastructure development and regulating public-private partnerships.",
    simplifiedSummary: `This bill creates a comprehensive framework for infrastructure development in India. Here's what it means:

1. Project Approvals: Streamlines the approval process for large infrastructure projects to reduce delays.

2. Public-Private Partnerships: Establishes clear rules and regulations for PPP projects, including risk-sharing and dispute resolution.

3. Land Acquisition: Modifies procedures for acquiring land for infrastructure projects while ensuring fair compensation.

4. Financing Mechanisms: Creates new financial instruments and institutions to fund infrastructure development.

5. Quality Standards: Establishes uniform quality and safety standards for different types of infrastructure.

This bill aims to accelerate India's infrastructure development to support economic growth while ensuring proper regulation and oversight.`,
    keyPoints: [
      "Streamlines project approval processes",
      "Regulates public-private partnerships",
      "Modifies land acquisition procedures",
      "Creates infrastructure financing mechanisms",
      "Establishes quality and safety standards",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "October 10, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "November 15, 2023",
        title: "Referred to Standing Committee",
        status: "completed",
      },
      {
        date: "February 20, 2024",
        title: "Committee Report Submitted",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "current",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-infrastructure-development-and-regulation-bill-2023",
  },
  {
    id: "9",
    title: "The Environmental Protection (Amendment) Bill, 2023",
    category: "Environment",
    date: "November 20, 2023",
    status: "Introduced",
    summary:
      "Updates environmental protection laws to address climate change and promote sustainable development practices.",
    simplifiedSummary: `This bill updates India's environmental laws to address contemporary challenges. Here's what it means:

1. Climate Change: Introduces legal provisions specifically addressing climate change mitigation and adaptation.

2. Pollution Control: Strengthens regulations on air, water, and soil pollution with stricter penalties for violations.

3. Sustainable Development: Integrates environmental considerations into development planning and project approvals.

4. Biodiversity Protection: Enhances measures to protect biodiversity and natural habitats.

5. Environmental Governance: Restructures environmental regulatory bodies and improves coordination between central and state authorities.

This bill aims to modernize India's environmental framework to balance development needs with ecological sustainability and climate resilience.`,
    keyPoints: [
      "Addresses climate change legally",
      "Strengthens pollution control measures",
      "Integrates environmental considerations into development",
      "Enhances biodiversity protection",
      "Restructures environmental governance",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "November 20, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "December 15, 2023",
        title: "Referred to Standing Committee",
        status: "completed",
      },
      {
        date: "March 10, 2024",
        title: "Committee Report Submitted",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "current",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-environmental-protection-amendment-bill-2023",
  },
  {
    id: "10",
    title: "The Healthcare Reform Bill, 2024",
    category: "Healthcare",
    date: "January 15, 2024",
    status: "Introduced",
    summary:
      "Proposes comprehensive reforms to improve healthcare accessibility, affordability, and quality across India.",
    simplifiedSummary: `This bill proposes major reforms to India's healthcare system. Here's what it means:

1. Universal Coverage: Expands health insurance coverage to all citizens through a combination of public and private schemes.

2. Primary Care: Strengthens primary healthcare infrastructure, especially in rural and underserved areas.

3. Medical Education: Reforms medical education to increase the number of healthcare professionals and improve quality.

4. Digital Health: Creates a national digital health ecosystem for better patient care and health data management.

5. Pharmaceutical Regulation: Updates regulations for medicines and medical devices to ensure quality and affordability.

This bill aims to address the challenges of healthcare access, affordability, and quality that affect millions of Indians, particularly in underserved regions.`,
    keyPoints: [
      "Expands health insurance coverage",
      "Strengthens primary healthcare infrastructure",
      "Reforms medical education",
      "Creates digital health ecosystem",
      "Updates pharmaceutical regulations",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "January 15, 2024",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "February 10, 2024",
        title: "Referred to Standing Committee",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Committee Report",
        status: "current",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "upcoming",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-healthcare-reform-bill-2024",
  },
  {
    id: "11",
    title: "The Defense Procurement Reform Bill, 2023",
    category: "Defense",
    date: "August 25, 2023",
    status: "Passed",
    summary:
      "Streamlines defense procurement processes and promotes indigenous defense manufacturing under the Atmanirbhar Bharat initiative.",
    simplifiedSummary: `This bill reforms India's defense procurement system. Here's what it means:

1. Indigenous Manufacturing: Prioritizes domestic defense production under the "Make in India" and "Atmanirbhar Bharat" (Self-Reliant India) initiatives.

2. Procurement Process: Streamlines and accelerates the acquisition of military equipment and technology.

3. Technology Transfer: Creates mechanisms to facilitate technology transfer from foreign defense companies to Indian partners.

4. R&D Investment: Increases investment in defense research and development through public-private partnerships.

5. Export Promotion: Establishes a framework to promote Indian defense exports to friendly countries.

This bill aims to modernize India's armed forces while reducing dependence on imported defense equipment and building domestic manufacturing capabilities.`,
    keyPoints: [
      "Prioritizes domestic defense production",
      "Streamlines procurement processes",
      "Facilitates technology transfer",
      "Increases R&D investment",
      "Promotes defense exports",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "June 5, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "August 10, 2023",
        title: "Passed by Lok Sabha",
        status: "completed",
      },
      {
        date: "August 20, 2023",
        title: "Passed by Rajya Sabha",
        status: "completed",
      },
      {
        date: "August 25, 2023",
        title: "Presidential Assent",
        status: "completed",
      },
      {
        date: "October 1, 2023",
        title: "Implementation",
        status: "completed",
      },
    ],
    source: "https://prsindia.org/billtrack/the-defense-procurement-reform-bill-2023",
  },
  {
    id: "12",
    title: "The Constitutional (Amendment) Bill, 2023",
    category: "Constitutional",
    date: "December 5, 2023",
    status: "Introduced",
    summary: "Proposes amendments to specific constitutional provisions to address contemporary governance challenges.",
    simplifiedSummary: `This bill proposes several amendments to the Indian Constitution. Here's what it means:

1. Federal Structure: Modifies certain aspects of center-state relations to improve cooperative federalism.

2. Judicial Appointments: Reforms the process of appointing judges to the higher judiciary.

3. Local Governance: Strengthens local self-government institutions (Panchayats and Municipalities).

4. Electoral Reforms: Introduces changes to the electoral system to enhance representation and accountability.

5. Fundamental Rights: Updates certain provisions related to fundamental rights to address contemporary challenges.

As a constitutional amendment, this bill requires special majority approval in both houses of Parliament and, for certain provisions, ratification by at least half of the state legislatures.`,
    keyPoints: [
      "Modifies center-state relations",
      "Reforms judicial appointment process",
      "Strengthens local self-government",
      "Introduces electoral reforms",
      "Updates fundamental rights provisions",
    ],
    fullText: "The full legal text of the bill would be displayed here...",
    timeline: [
      {
        date: "December 5, 2023",
        title: "Bill Introduced in Lok Sabha",
        status: "completed",
      },
      {
        date: "January 10, 2024",
        title: "Referred to Joint Parliamentary Committee",
        status: "completed",
      },
      {
        date: "Pending",
        title: "Committee Report",
        status: "current",
      },
      {
        date: "Pending",
        title: "Lok Sabha Consideration",
        status: "upcoming",
      },
      {
        date: "Pending",
        title: "Rajya Sabha Consideration",
        status: "upcoming",
      },
    ],
    source: "https://prsindia.org/billtrack/the-constitutional-amendment-bill-2023",
  },
]

export default function BillPage({ params }: { params: { id: string } }) {
  const bill = bills.find((b) => b.id === params.id)

  if (!bill) {
    notFound()
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
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="outline">{bill.category}</Badge>
            <Badge
              variant={bill.status === "Passed" ? "default" : bill.status === "Introduced" ? "secondary" : "outline"}
            >
              {bill.status}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold mb-2">{bill.title}</h1>
          <p className="text-muted-foreground mb-6">Introduced on {bill.date}</p>

          <div className="flex flex-wrap gap-4 mb-8">
            <Button variant="outline" className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          <Tabs defaultValue="simplified">
            <TabsList className="mb-6 w-full flex-wrap">
              <TabsTrigger value="simplified" className="flex-1">
                Simplified
              </TabsTrigger>
              <TabsTrigger value="original" className="flex-1">
                Original Text
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-1">
                Timeline
              </TabsTrigger>
            </TabsList>

            <TabsContent value="simplified">
              <Card>
                <CardHeader>
                  <CardTitle>Simplified Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg font-medium mb-6">{bill.summary}</p>
                    <div className="whitespace-pre-line">{bill.simplifiedSummary}</div>

                    <h3 className="text-xl font-bold mt-8 mb-4">Key Points</h3>
                    <ul className="space-y-2">
                      {bill.keyPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium">
                            {index + 1}
                          </span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <ExplainSection billId={bill.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">What do you think about this bill?</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Support
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <ThumbsDown className="h-4 w-4" />
                    Oppose
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Comment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="original">
              <Card>
                <CardHeader>
                  <CardTitle>Original Bill Text</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-sm text-muted-foreground mb-4">
                      Source:{" "}
                      <a href={bill.source} target="_blank" rel="noopener noreferrer" className="underline">
                        {bill.source}
                      </a>
                    </p>
                    <pre className="p-4 bg-muted rounded-lg overflow-auto whitespace-pre-wrap">{bill.fullText}</pre>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Bill Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <BillTimeline events={bill.timeline} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
