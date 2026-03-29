"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Section } from "@/components/section"
import { Heart, Users, Award, Target } from "lucide-react"
import { useTranslations } from "@/components/language-provider"

export default function AboutPage() {
  const { t } = useTranslations()

  return (
    <main>
      <Section variant="paleBlue" spacing="large">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{t("about.title")}</h1>
            <p className="text-lg text-muted-foreground text-pretty">
              {t("about.intro")}
            </p>
          </div>
        </div>
      </Section>

      <Section variant="offWhite">
        <div className="container mx-auto px-4">
        {/* Video Placeholder */}
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                >
                <source src="/video_prezantuese.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

        {/* Values */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("about.valuesTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#b73b8f]/15 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-[#b73b8f]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.empathy.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.empathy.description")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-[#00adef]/15 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#00adef]" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.community.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.community.description")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.professionalism.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.professionalism.description")}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t("about.values.inclusive.title")}</h3>
                <p className="text-muted-foreground">{t("about.values.inclusive.description")}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center bg-card/80 p-8 md:p-12 rounded-2xl shadow-md border border-border/60 mt-12">
          <h2 className="text-3xl font-bold mb-4">{t("about.missionTitle")}</h2>
          <p className="text-lg text-muted-foreground text-pretty">{t("about.mission")}</p>
        </div>
        </div>
      </Section>
    </main>
  )
}
