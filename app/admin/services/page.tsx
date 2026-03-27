"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Modal } from "@/components/modal"
import { handleApiError } from "@/lib/api-client"
import type { Service } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { ServiceForm } from "@/components/service-form"

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const fetchServices = () => {
    fetch("/api/services")
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message || "Failed to fetch services")
        }
        return res.json()
      })
      .then((data) => setServices(data))
      .catch((error) => {
        console.error("Error fetching services:", error)
        toast({
          title: "Gabim",
          description: error.message || "Dështoi marrja e shërbimeve",
          variant: "destructive",
        })
      })
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleCreate = () => {
    setIsCreating(true)
    setSelectedService(null)
    setIsModalOpen(true)
  }

  const handleEdit = (service: Service) => {
    setIsCreating(false)
    setSelectedService(service)
    setIsModalOpen(true)
  }

  const handleDelete = async (serviceId: string) => {
    if (!confirm("Jeni të sigurt që doni të fshini këtë shërbim?")) return

    try {
      const response = await fetch(`/api/admin/services/${serviceId}`, { method: "DELETE" })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: "Sukses",
        description: "Shërbimi u fshi me sukses",
      })

      fetchServices()
    } catch (error) {
      const errorMessage = await handleApiError(error)
      toast({
        title: "Gabim",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    setSelectedService(null)
    fetchServices()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menaxho Shërbimet</h1>
          <p className="text-muted-foreground">Krijo dhe menaxho shërbimet e ofruara</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Shërbim i Ri
        </Button>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nuk ka shërbime. Krijoni të parin!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(service)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(service.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-1 text-sm text-muted-foreground">
                {(service.details || []).slice(0, 4).map((detail, idx) => (
                  <p key={idx}>• {detail}</p>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isCreating ? "Krijo Shërbim të Ri" : "Edito Shërbimin"}
      >
        <ServiceForm service={selectedService} onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}

