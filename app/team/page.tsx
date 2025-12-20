import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default function TeamPage() {
  const team = [
    {
      name: "Dr. Elena Krasniqi",
      role: "Obstetrike & Gjinekologë",
      bio: "Me 15 vjet përvojë në mjekësinë perinatale, Dr. Krasniqi specializohet në shtatzëni me risk të lartë dhe kujdes të personalizuar.",
      imageUrl: "/smiling-female-doctor.png",
      email: "elena.k@nenharmoni.al",
    },
    {
      name: "Arta Hoxha",
      role: "Mamia & Konsulente Gjinore",
      bio: "Arta ka mbështetur qindra familje përmes procesit të lindjes dhe periudhës postnatale me dashuri dhe ekspertizë.",
      imageUrl: "/female-midwife-caring-professional.jpg",
      email: "arta.h@nenharmoni.al",
    },
    {
      name: "Dr. Klara Berisha",
      role: "Psikologë Perinatale",
      bio: "Specializuar në shëndetin mendor perinatal, Dr. Berisha ofron mbështetje për çështje emocionale dhe psikologjike.",
      imageUrl: "/female-psychologist-warm-professional.jpg",
      email: "klara.b@nenharmoni.al",
    },
    {
      name: "Luana Shala",
      role: "Dietiste & Nutricioniste",
      bio: "Luana krijon plane ushqyese të personalizuara për shtatzëna dhe nëna të reja për të mbështetur shëndetin optimal.",
      imageUrl: "/female-nutritionist-friendly-professional.jpg",
      email: "luana.s@nenharmoni.al",
    },
    {
      name: "Dorina Meta",
      role: "Infermiere Pediatrike",
      bio: "Me pasion për kujdesin e foshnjave, Dorina ndihmon prindërit e rinj të lundrojnë muajt e parë me bebet e tyre.",
      imageUrl: "/female-pediatric-nurse-kind-professional.jpg",
      email: "dorina.m@nenharmoni.al",
    },
    {
      name: "Fjona Dervishi",
      role: "Instruktore Yoga Prenatale",
      bio: "Fjona kombinon ekspertizën e saj në yoga me njohuritë për shtatzëninë për të krijuar sesione të sigurta dhe rilaksuese.",
      imageUrl: "/female-yoga-instructor-peaceful-professional.jpg",
      email: "fjona.d@nenharmoni.al",
    },
  ]

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ekipi Ynë</h1>
          <p className="text-lg text-muted-foreground">
            Njihuni me profesionistët e dedikuar që punojnë çdo ditë për të mbështetur udhëtimin tuaj
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <Card key={index} className="overflow-hidden border-2 hover:shadow-lg transition-all">
              <div className="aspect-square w-full overflow-hidden bg-gradient-to-br from-[#b73b8f]/10 to-[#00adef]/10">
                <img
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <a
                  href={`mailto:${member.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
