import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import CategoryIcons from "@/components/category-icons"

const categories = [
  {
    name: "Finance",
    slug: "finance",
    description: "Bills related to taxation, budget, banking, and financial regulations",
    billCount: 12,
  },
  {
    name: "Education",
    slug: "education",
    description: "Educational policies, reforms, and institutional frameworks",
    billCount: 8,
  },
  {
    name: "Labor",
    slug: "labor",
    description: "Employment laws, worker rights, and industrial relations",
    billCount: 6,
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    description: "Development projects, public works, and urban planning",
    billCount: 10,
  },
  {
    name: "Environment",
    slug: "environment",
    description: "Environmental protection, climate change, and sustainability",
    billCount: 7,
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    description: "Medical services, public health, and healthcare reforms",
    billCount: 9,
  },
  {
    name: "Defense",
    slug: "defense",
    description: "National security, military affairs, and defense procurement",
    billCount: 5,
  },
  {
    name: "Constitutional",
    slug: "constitutional",
    description: "Constitutional amendments and fundamental governance changes",
    billCount: 4,
  },
  {
    name: "Technology",
    slug: "technology",
    description: "Digital governance, data protection, and technology regulations",
    billCount: 11,
  },
  {
    name: "Law & Justice",
    slug: "law-justice",
    description: "Criminal law, civil procedures, and judicial reforms",
    billCount: 13,
  },
  {
    name: "Communication",
    slug: "communication",
    description: "Telecommunications, media, and information technology",
    billCount: 6,
  },
  {
    name: "Social Justice",
    slug: "social-justice",
    description: "Social welfare, minority rights, and inclusive development",
    billCount: 8,
  },
]

export default function CategoriesPage() {
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
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Browse Bills by Category</h1>
          <p className="text-muted-foreground mb-8">
            Explore Indian parliamentary bills organized by subject matter and policy areas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href={`/categories/${category.slug}`} key={category.name}>
                <Card className="hover:shadow-lg transition-all duration-200 h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-lg">{category.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {category.billCount} bills
                      </span>
                    </div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <CategoryIcons />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
