import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Landmark, Banknote, BookOpen, Briefcase, Building, Globe, Heart, ShieldCheck } from "lucide-react"

const categories = [
  {
    name: "Finance",
    slug: "finance",
    icon: <Banknote className="h-6 w-6" />,
    color: "bg-yellow-100 dark:bg-yellow-900/20",
    textColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    name: "Education",
    slug: "education",
    icon: <BookOpen className="h-6 w-6" />,
    color: "bg-blue-100 dark:bg-blue-900/20",
    textColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Labor",
    slug: "labor",
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-orange-100 dark:bg-orange-900/20",
    textColor: "text-orange-600 dark:text-orange-400",
  },
  {
    name: "Infrastructure",
    slug: "infrastructure",
    icon: <Building className="h-6 w-6" />,
    color: "bg-purple-100 dark:bg-purple-900/20",
    textColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Environment",
    slug: "environment",
    icon: <Globe className="h-6 w-6" />,
    color: "bg-green-100 dark:bg-green-900/20",
    textColor: "text-green-600 dark:text-green-400",
  },
  {
    name: "Healthcare",
    slug: "healthcare",
    icon: <Heart className="h-6 w-6" />,
    color: "bg-red-100 dark:bg-red-900/20",
    textColor: "text-red-600 dark:text-red-400",
  },
  {
    name: "Defense",
    slug: "defense",
    icon: <ShieldCheck className="h-6 w-6" />,
    color: "bg-gray-100 dark:bg-gray-800",
    textColor: "text-gray-600 dark:text-gray-400",
  },
  {
    name: "Constitutional",
    slug: "constitutional",
    icon: <Landmark className="h-6 w-6" />,
    color: "bg-indigo-100 dark:bg-indigo-900/20",
    textColor: "text-indigo-600 dark:text-indigo-400",
  },
]

export default function CategoryIcons() {
  return (
    <>
      {categories.map((category) => (
        <Link href={`/categories/${category.slug}`} key={category.name}>
          <Card className="hover:shadow-md transition-shadow h-full">
            <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${category.color} flex items-center justify-center mb-2 sm:mb-3`}
              >
                <div className={category.textColor}>{category.icon}</div>
              </div>
              <span className="font-medium text-xs sm:text-sm text-center leading-tight">{category.name}</span>
            </CardContent>
          </Card>
        </Link>
      ))}
    </>
  )
}
