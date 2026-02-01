"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award, Target } from "lucide-react"
import { useTranslations } from "@/components/language-provider"

export default function AboutPage() {
  const { t } = useTranslations()

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            {t("about.intro")}
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
              <p className="text-muted-foreground">{t("about.videoPlaceholder")}</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#b73b8f]/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#b73b8f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.empathy.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.empathy.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-[#00adef]/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#00adef]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.community.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.community.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.professionalism.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.professionalism.description")}</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.inclusive.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.inclusive.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-[#b73b8f]/5 via-background to-[#00adef]/5 p-8 md:p-12 rounded-lg border">
          <h2 className="text-3xl font-bold mb-4">{t("about.missionTitle")}</h2>
          <p className="text-lg text-muted-foreground text-pretty">{t("about.mission")}</p>
        </div>
      </div>
    </main>
  )
}
