"use client"

import { ContactForm } from "@/components/contact-form"
import FloatingContact from "@/components/floating-contact"
import { useTranslations } from "@/components/language-provider"

export default function ContactPage() {
  const { t } = useTranslations()

  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-lg text-muted-foreground">{t("contact.subtitle")}</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <ContactForm />
          </div>

          <div>
            <div className="rounded-lg overflow-hidden border aspect-video">
<iframe
                          title="Location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2995.6132251048516!2d19.8379232!3d41.3390231!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13503162110d8b57%3A0x52b8b61ace668d74!2sN%C3%ABn'Harmoni!5e0!3m2!1sen!2s!4v1772294523161!5m2!1sen!2s"
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
/>
            </div>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium">{t("contact.address")}</p>
                <p>{t("common.footer.address")}</p>
              </div>

              <div>
                <p className="font-medium">{t("contact.phone")}</p>
                <p>+355 69 623 4090</p>
              </div>

              <div>
                <p className="font-medium">{t("contact.email")}</p>
                <p>nenharmoni@outlook.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingContact />
    </main>
  )
}
