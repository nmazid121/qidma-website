import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { AboutSummary } from "@/components/about-summary"
import { EventsPreview } from "@/components/events-preview"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { DonationCTA } from "@/components/donation-cta"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSummary />
        <EventsPreview />
        <NewsletterSignup />
        <DonationCTA />
      </main>
      <Footer />
    </div>
  )
}
