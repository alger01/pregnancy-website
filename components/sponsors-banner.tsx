import Image from "next/image"

const SPONSORS_WIDTH = 1599
const SPONSORS_HEIGHT = 344

export function SponsorsBanner() {
  return (
    <section
      className="w-full bg-white border-t border-zinc-200/80"
      aria-label="Project sponsors and partners"
    >
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-5 md:py-6">
        <Image
          src="/sponsors.jpg"
          alt="Supported by EU4Innovation, the European Union, German–Albanian development cooperation, Sweden, the Ministry of Economy and Innovation, and Partners Albania."
          width={SPONSORS_WIDTH}
          height={SPONSORS_HEIGHT}
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
          className="mx-auto block h-auto w-full max-w-xl select-none"
          draggable={false}
        />
      </div>
    </section>
  )
}