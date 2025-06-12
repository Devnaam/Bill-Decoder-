"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface TimelineEvent {
  date: string
  title: string
  status: "completed" | "current" | "upcoming"
}

interface BillTimelineProps {
  events: TimelineEvent[]
}

export default function BillTimeline({ events }: BillTimelineProps) {
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={index} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div
              className={`w-4 h-4 rounded-full ${
                event.status === "completed"
                  ? "bg-green-500"
                  : event.status === "current"
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
            {index < events.length - 1 && <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700" />}
          </div>
          <Card className="flex-1 mb-4">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <p className="text-sm text-muted-foreground">{event.date}</p>
                </div>
                <Badge
                  variant={
                    event.status === "completed" ? "default" : event.status === "current" ? "secondary" : "outline"
                  }
                >
                  {event.status === "completed" ? "Completed" : event.status === "current" ? "In Progress" : "Upcoming"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
