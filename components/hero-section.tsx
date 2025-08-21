import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20 lg:py-32">
      <div className="absolute inset-0 bg-[url('/diverse-volunteers.png')] bg-cover bg-center opacity-20"></div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">QIDMA</h1>
        <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">Serving with Purpose</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link href="/donate">Donate Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
