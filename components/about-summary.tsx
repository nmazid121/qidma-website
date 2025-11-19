import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function AboutSummary() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">About QIDMA</h2>
          <Card className="bg-card">
            <CardContent className="p-8">
              <p className="text-lg text-card-foreground leading-relaxed mb-6">
                QIDMA is a grassroots nonprofit organization founded by a group of dedicated Franklin township residents. Inspired by the Arabic word "Qidma", meaning "service", the organization is rooted in the belief that strong communities are built through care, connection, and collective support. QIDMA's mission is to meet the diverse needs of every resident—ensuring everyone has the opportunity to grow, thrive, and access essential resources.
              </p>
              <Button asChild variant="outline">
                <Link href="/about">Read Our Story</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
