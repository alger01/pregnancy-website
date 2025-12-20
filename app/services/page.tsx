import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Baby, Users, Calendar, Video, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Heart,
      color: "#b73b8f",
      title: "Kujdes Prenatal",
      description: "Monitorim dhe mbështetje gjatë shtatzënisë",
      details: [
        "Vizita të rregullta prenatale",
        "Monitorim i shëndetit të nënës dhe foshnjës",
        "Plane ushqyese dhe stili i jetesës",
        "Përgatitje për lindje",
      ],
    },
    {
      icon: Baby,
      color: "#00adef",
      title: "Mbështetje Postnatale",
      description: "Kujdes pas lindjes për nënën dhe foshnjën",
      details: [
        "Mbështetje për ushqyerjen me gji",
        "Këshilla për kujdesin e foshnjës",
        "Monitorim i shëndetit postnatal",
        "Mbështetje për depresionin postnatal",
      ],
    },
    {
      icon: Users,
      color: "#b73b8f",
      title: "Konsulta Individuale",
      description: "Sesione private me ekspertët tanë",
      details: [
        "Konsulta një-për-një me obstetrikë",
        "Mbështetje psikologjike",
        "Plane të personalizuara të kujdesit",
        "Këshilla ushqyese specifike",
      ],
    },
    {
      icon: Calendar,
      color: "#00adef",
      title: "Workshop & Evente",
      description: "Sesione edukative grupore",
      details: [
        "Klasa përgatitjeje për lindje",
        "Workshop për kujdesin e foshnjës",
        "Sesione yoga për shtatzëna",
        "Grupe mbështetëse për prindër",
      ],
    },
    {
      icon: MessageCircle,
      color: "#b73b8f",
      title: "Mbështetje për Çiftin",
      description: "Sesione për prindërit e ardhshëm",
      details: [
        "Përgatitje e partnerit për lindje",
        "Komunikim efektiv si prindër",
        "Menaxhim i stresit familjar",
        "Planifikim i roleve prindërore",
      ],
    },
    {
      icon: Video,
      color: "#00adef",
      title: "Konsulta Online",
      description: "Shërbime virtuale nga shtëpia",
      details: [
        "Video konsulta me specialistë",
        "Monitorim i largët i shtatzënisë",
        "Mbështetje 24/7 online",
        "Resurse edukative digitale",
      ],
    },
  ]

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Shërbimet Tona</h1>
          <p className="text-lg text-muted-foreground">
            Mbështetje e plotë dhe profesionale për çdo fazë të udhëtimit tuaj drejt mëmësisë
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:shadow-lg transition-all">
              <CardHeader>
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <service.icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#b73b8f]/5 via-background to-[#00adef]/5 p-8 md:p-12 rounded-lg border">
          <h2 className="text-3xl font-bold mb-4">Interesuar për shërbimet tona?</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Kontaktoni ekipin tonë për të diskutuar se si mund t'ju ndihmojmë
          </p>
          <Button size="lg" asChild>
            <Link href="/#contact">Rezervo një Konsultë</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
