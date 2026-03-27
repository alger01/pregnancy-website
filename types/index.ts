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
  price?: number
  discountPrice?: number
  discountUntil?: string
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

export interface Service {
  id: string
  title: string
  titleSq?: string
  description: string
  descriptionSq?: string
  details: string[]
  detailsSq?: string[]
  icon?: "heart" | "baby" | "users" | "calendar" | "message" | "video"
  color?: string
}

export interface StaffMember {
  id: string
  name: string
  role: string
  roleSq?: string
  bio: string
  bioSq?: string
  email: string
  imageUrl?: string
}
