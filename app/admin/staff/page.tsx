"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Modal } from "@/components/modal"
import { handleApiError } from "@/lib/api-client"
import type { StaffMember } from "@/types"
import { useToast } from "@/hooks/use-toast"
import { StaffForm } from "@/components/staff-form"

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const { toast } = useToast()

  const fetchStaff = () => {
    fetch("/api/staff")
      .then(async (res) => {
        if (!res.ok) {
          const error = await res.json()
          throw new Error(error.message || "Failed to fetch staff")
        }
        return res.json()
      })
      .then((data) => setStaff(data))
      .catch((error) => {
        console.error("Error fetching staff:", error)
        toast({
          title: "Gabim",
          description: error.message || "Dështoi marrja e stafit",
          variant: "destructive",
        })
      })
  }

  useEffect(() => {
    fetchStaff()
  }, [])

  const handleCreate = () => {
    setIsCreating(true)
    setSelectedMember(null)
    setIsModalOpen(true)
  }

  const handleEdit = (member: StaffMember) => {
    setIsCreating(false)
    setSelectedMember(member)
    setIsModalOpen(true)
  }

  const handleDelete = async (memberId: string) => {
    if (!confirm("Jeni të sigurt që doni të fshini këtë anëtar?")) return

    try {
      const response = await fetch(`/api/admin/staff/${memberId}`, { method: "DELETE" })

      if (!response.ok) {
        const errorMessage = await handleApiError(null, response)
        throw new Error(errorMessage)
      }

      toast({
        title: "Sukses",
        description: "Anëtari u fshi me sukses",
      })

      fetchStaff()
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
    setSelectedMember(null)
    fetchStaff()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menaxho Stafin</h1>
          <p className="text-muted-foreground">Shto dhe menaxho anëtarët e ekipit</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="h-4 w-4 mr-2" />
          Anëtar i Ri
        </Button>
      </div>

      {staff.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Nuk ka anëtarë. Shtoni të parin!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staff.map((member) => (
            <Card key={member.id} className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => handleEdit(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(member.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p className="line-clamp-3">{member.bio}</p>
                <p className="font-medium text-foreground">{member.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isCreating ? "Shto Anëtar të Ri" : "Edito Anëtarin"}
      >
        <StaffForm member={selectedMember} onSuccess={handleSuccess} />
      </Modal>
    </div>
  )
}

