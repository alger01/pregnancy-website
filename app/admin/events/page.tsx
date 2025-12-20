"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2, Users } from "lucide-react"
import { Modal } from "@/components/modal"
import { EventForm } from "@/components/event-form"
import type { Event } from "@/types"
import { useToast } from "@/hooks/use-toast"

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const fetchEvents = () => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleCreate = () => {
    setIsCreating(true)
    setSelectedEvent(null)
    setIsModalOpen(true)
  }

  const handleEdit = (event: Event) => {
    setIsCreating(false)
    setSelectedEvent(event)
    setIsModalOpen(true)
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm("Jeni të sigurt që doni të fshini këtë event?")) return

    try {
      const response = await fetch(`/api/admin/events/${eventId}`, { method: "DELETE" })

      if (!response.ok) throw new Error("Failed to delete")

      toast({
        title: "Sukses",
        description: "Eventi u fshi me sukses",
      })

      fetchEvents()
    } catch (error) {
      toast({
        title: "Gabim",
        description: "Ndodhi një gabim gjatë fshirjes",
        variant: "destructive",
      })
    }
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
    fetchEvents()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menaxho Eventet</h1>
          <p className="text-muted-foreground">Krijo dhe menaxho eventet dhe workshopet</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Event i Ri
        </Button>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nuk ka evente. Krijoni të parin!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.theme === "boy" ? "bg-[#00adef]/10 text-[#00adef]" : "bg-[#b73b8f]/10 text-[#b73b8f]"
                    }`}
                  >
                    {event.location === "online" ? "Online" : "Onsite"}
                  </span>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription className="line-clamp-2">{event.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {new Date(event.date).toLocaleDateString("sq-AL")} • {event.time}
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{event.registrations?.length || 0} regjistruar</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isCreating ? "Krijo Event të Ri" : "Edito Eventin"}
      >
        <EventForm event={selectedEvent} onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}
