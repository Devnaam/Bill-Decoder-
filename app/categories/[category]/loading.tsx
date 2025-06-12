import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function CategoryLoading() {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Skeleton className="w-12 h-12 rounded-full" />
            <Skeleton className="h-10 w-64" />
          </div>

          <div className="space-y-6">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Card key={i}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Skeleton className="h-6 w-24" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-8 w-full mt-2" />
                    <Skeleton className="h-4 w-32 mt-2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-3/4 mt-2" />
                  </CardContent>
                  <CardFooter className="flex justify-between pt-3 border-t">
                    <Skeleton className="h-9 w-32" />
                    <div className="flex gap-2">
                      <Skeleton className="h-9 w-9 rounded-md" />
                      <Skeleton className="h-9 w-9 rounded-md" />
                    </div>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      </main>
    </div>
  )
}
