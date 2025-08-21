import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart, Smartphone, CreditCard, Copy, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-foreground mb-4">Support Your Community</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Your generous donation helps us continue our work in building a stronger, more inclusive community. Every
              contribution makes a meaningful difference.
            </p>
            <Badge variant="outline" className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary">
              Registered 501(c)(3) Non-Profit Organization
            </Badge>
          </div>

          {/* Donation Methods */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Choose Your Donation Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Venmo Card */}
              <Card className="bg-card">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <Smartphone className="h-6 w-6 text-primary" />
                    <span>Venmo</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-white p-4 rounded-lg inline-block">
                    <Image
                      src="/venmo-qr-placeholder.png"
                      alt="Venmo QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Scan QR code or send to:</p>
                    <div className="flex items-center justify-center space-x-2 bg-muted p-3 rounded-md">
                      <span className="font-mono text-lg">@QIDMA-Franklin</span>
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please include "Donation" in the memo for tax purposes
                  </p>
                </CardContent>
              </Card>

              {/* Zelle Card */}
              <Card className="bg-card">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center space-x-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <span>Zelle</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <div className="bg-white p-8 rounded-lg">
                    <div className="text-6xl font-bold text-primary mb-4">Z</div>
                    <p className="text-muted-foreground">Send via Zelle</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-2">Send donation to:</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2 bg-muted p-3 rounded-md">
                        <span className="font-mono">qidmafranklin@gmail.com</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-center space-x-2 bg-muted p-3 rounded-md">
                        <span className="font-mono">732-658-2032</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Please include "Donation" in the memo for tax purposes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Tax Information */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-center text-primary">Tax Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="tax-id" className="text-sm font-medium text-foreground">
                    Tax ID (EIN) for your records:
                  </Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input id="tax-id" value="XX-XXXXXXX" readOnly className="bg-background font-mono text-center" />
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="bg-background p-4 rounded-md">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Tax-Deductible Donations</p>
                      <p>
                        As a registered 501(c)(3) organization, your donation is tax-deductible to the full extent
                        allowed by law. Please keep your transaction receipt for tax purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Statement */}
          <div className="max-w-4xl mx-auto mb-16">
            <Card className="bg-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-card-foreground mb-6 text-center">Your Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$25</div>
                    <p className="text-muted-foreground">Provides meals for a family during our food drives</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$50</div>
                    <p className="text-muted-foreground">Supports educational materials for our youth programs</p>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-primary mb-2">$100</div>
                    <p className="text-muted-foreground">Funds community event supplies and resources</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact for Questions */}
          <div className="max-w-2xl mx-auto mb-16">
            <Card className="bg-muted">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Questions About Donating?</h3>
                <p className="text-muted-foreground mb-4">
                  We're here to help! Contact us if you have any questions about making a donation or need assistance.
                </p>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Email:</strong> qidmafranklin@gmail.com
                  </p>
                  <p>
                    <strong>Phone:</strong> 732-658-2032
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thank You Message */}
          <div className="text-center">
            <Card className="bg-primary/10 border-primary/20 max-w-3xl mx-auto">
              <CardContent className="p-12">
                <Heart className="h-12 w-12 text-primary mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-foreground mb-4">Thank You for Your Generosity!</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Your support enables us to continue serving our community with purpose and making a lasting impact in
                  Franklin. Together, we're building a stronger, more inclusive community for everyone.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
