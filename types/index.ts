export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: "online" | "onsite"
  address?: string
  imageUrl?: string
  capacity?: number
  registrations?: Registration[]
  theme?: "girl" | "boy"
}

export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  author: string
  date: string
  imageUrl?: string
  category: string
  theme?: "girl" | "boy"
}

export interface Registration {
  id: string
  eventId: string
  name: string
  email: string
  phone: string
  message?: string
  registeredAt: string
}

export interface User {
  id: string
  email: string
  password: string
  role: "admin"
}
