import { ContactForm } from "@/components/contact-form"
import FloatingContact from "@/components/floating-contact"

export default function ContactPage() {
  return (
    <main className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Na Kontaktoni</h1>
          <p className="text-lg text-muted-foreground">Na dërgoni mesazhin tuaj dhe ne do t'ju kontaktojmë sa më shpejt të jetë e mundur.</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="border rounded-lg p-6">
            <ContactForm />
          </div>

          <div>
            <div className="rounded-lg overflow-hidden border aspect-video">
              <iframe
                title="Location map"
                src="https://www.google.com/maps?q=Tirana%2C%20Albania&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>

            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div>
                <p className="font-medium">Adresa</p>
                <p>Tiranë, Shqipëri</p>
              </div>

              <div>
                <p className="font-medium">Telefoni</p>
                <p>+355 69 123 4567</p>
              </div>

              <div>
                <p className="font-medium">Email</p>
                <p>info@nenharmoni.al</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingContact />
    </main>
  )
}
