import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileQuestion } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <FileQuestion className="h-20 w-20 mx-auto text-muted-foreground mb-6" />
        <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">
          Sorry, we couldn't find the bill or page you're looking for. It might have been removed or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button>Go to Home</Button>
          </Link>
          <Link href="/categories">
            <Button variant="outline">Browse Categories</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
