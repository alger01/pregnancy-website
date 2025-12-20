import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Rreth Nën'Harmoni</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            Ne jemi një ekip i dedikuar profesionistësh që ofrojnë mbështetje të plotë për femrat para dhe pas
            shtatzënisë. Misioni ynë është të krijojmë një ambient të sigurt, të ngrohtë dhe gjithëpërfshirës ku çdo
            grua mund të marrë informacionin dhe mbështetjen që i nevojitet.
          </p>
        </div>

        {/* Video Placeholder */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-gradient-to-br from-[#b73b8f]/10 via-muted to-[#00adef]/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-background/80 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-muted-foreground">Video Prezantues</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Vlerat Tona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#b73b8f]/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#b73b8f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Empati & Kujdes</h3>
                <p className="text-muted-foreground">
                  Çdo grua meriton të ndihet e dëgjuar dhe e mbështetur në këtë udhëtim të veçantë.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#00adef]/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#00adef]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Komunitet</h3>
                <p className="text-muted-foreground">
                  Krijojmë një hapësirë bashkëpunimi dhe mbështetjeje midis nënave dhe familjeve.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Profesionalizëm</h3>
                <p className="text-muted-foreground">
                  Ofrojmë shërbime të bazuara në praktikat më të mira dhe hulumtimet më të fundit.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Qasje Gjithëpërfshirëse</h3>
                <p className="text-muted-foreground">
                  Mirëpresim dhe mbështesim të gjitha familjet, pavarësisht nga origjina apo situata.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#b73b8f]/5 via-background to-[#00adef]/5 p-8 md:p-12 rounded-lg border">
          <h2 className="text-3xl font-bold mb-4">Misioni Ynë</h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Të ofrojmë edukim të bazuar në evidenca, mbështetje emocionale dhe një komunitet të ngrohtë për çdo grua dhe
            familje që përballet me sfidat dhe gëzimet e shtatzënisë dhe mëmësisë së re. Ne besojmë se çdo prind meriton
            të ketë akses në informacion cilësor dhe në një rrjet mbështetës që e shoqëron gjatë gjithë udhëtimit.
          </p>
        </div>
      </div>
    </main>
  )
}
