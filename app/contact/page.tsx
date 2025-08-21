import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, Instagram, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We'd love to hear from you! Whether you have questions, want to volunteer, or need assistance, we're here
              to help.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-8">Contact Information</h2>
                <div className="space-y-6">
                  {/* Email */}
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">Email</h3>
                          <Link
                            href="mailto:qidmafranklin@gmail.com"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            qidmafranklin@gmail.com
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Phone */}
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">Phone</h3>
                          <Link
                            href="tel:732-658-2032"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            732-658-2032
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Instagram */}
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Instagram className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">Instagram</h3>
                          <Link
                            href="https://instagram.com/qidmafranklin"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors"
                          >
                            @qidmafranklin
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Office Hours */}
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">Response Time</h3>
                          <p className="text-muted-foreground">We typically respond within 24-48 hours</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Location */}
                  <Card className="bg-card">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground">Service Area</h3>
                          <p className="text-muted-foreground">Franklin, NJ and surrounding communities</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <Card className="bg-card">
                  <CardHeader>
                    <CardTitle className="text-2xl text-card-foreground">Send Us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName" className="text-card-foreground">
                            First Name *
                          </Label>
                          <Input id="firstName" required className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName" className="text-card-foreground">
                            Last Name *
                          </Label>
                          <Input id="lastName" required className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email" className="text-card-foreground">
                          Email Address *
                        </Label>
                        <Input id="email" type="email" required className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-card-foreground">
                          Phone Number
                        </Label>
                        <Input id="phone" type="tel" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="subject" className="text-card-foreground">
                          Subject *
                        </Label>
                        <Input id="subject" required className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="message" className="text-card-foreground">
                          Message *
                        </Label>
                        <Textarea id="message" required className="mt-1 min-h-[120px]" />
                      </div>

                      <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="max-w-4xl mx-auto mt-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">How Can We Help?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Volunteer Opportunities</h3>
                    <p className="text-muted-foreground text-sm">
                      Interested in volunteering? We'd love to have you join our team and make a difference in the
                      community.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Community Support</h3>
                    <p className="text-muted-foreground text-sm">
                      Need assistance or resources? We're here to help connect you with the support you need.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Partnership Inquiries</h3>
                    <p className="text-muted-foreground text-sm">
                      Looking to partner with us? Let's discuss how we can work together to serve our community.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
