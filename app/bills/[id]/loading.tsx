import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function BillLoading() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>

          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-48 mb-6" />

          <div className="flex flex-wrap gap-4 mb-8">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-10 w-64" />
          </div>

          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-48" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-4" />

              <Skeleton className="h-8 w-48 mt-8 mb-4" />
              <div className="space-y-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-6 w-full" />
                    </div>
                  ))}
              </div>

              <div className="mt-8">
                <Skeleton className="h-64 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
