import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function NewsletterSignup() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-card-foreground">Stay Connected</CardTitle>
              <p className="text-muted-foreground">
                Subscribe to our newsletter to stay updated on our latest events and community initiatives.
              </p>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Enter your email address" className="flex-1" />
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
