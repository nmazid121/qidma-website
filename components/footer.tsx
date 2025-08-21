import Link from "next/link"
import { Instagram, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact Us</h3>
            <div className="space-y-2 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>qidmafranklin@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>732-658-2032</span>
              </div>
              <div className="flex items-center space-x-2">
                <Instagram className="h-4 w-4" />
                <Link
                  href="https://instagram.com/qidmafranklin"
                  className="hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @qidmafranklin
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About Us
              </Link>
              <Link href="/events" className="block text-muted-foreground hover:text-primary transition-colors">
                Events
              </Link>
              <Link href="/donate" className="block text-muted-foreground hover:text-primary transition-colors">
                Donate
              </Link>
              <Link href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Organization Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">QIDMA</h3>
            <p className="text-muted-foreground text-sm mb-4">Kindness through charity and service.</p>
            <p className="text-muted-foreground text-sm">Registered 501(c)(3) non-profit organization</p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} QIDMA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
