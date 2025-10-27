import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AboutPage() {
  const boardMembers = [
    {
      name: "Sara Kharazi Didehvar",
      title: "President and Co-Founder",
      initials: "SD",
    },
    {
      name: "Viq Pervaaz",
      title: "Co-Founder",
      initials: "VP",
    },
    {
      name: "Rana Jawad",
      title: "Vice President",
      initials: "RJ",
    },
    {
      name: "Samina Sattar",
      title: "Treasurer",
      initials: "SS",
    },
    {
      name: "Ayesha Ali",
      title: "Communications Lead Officer",
      initials: "AA",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">About QIDMA</h1>
            <p className="text-xl text-muted-foreground">Serving with Purpose</p>
          </div>

          {/* Organization Bio */}
          <div className="max-w-4xl mx-auto mb-20">
            <Card className="bg-card">
              <CardContent className="p-8">
                <div className="prose prose-lg max-w-none text-card-foreground">
                  <h2 className="text-2xl font-semibold mb-6 text-primary">Serving with Purpose</h2>

                  <p className="mb-6 leading-relaxed">
                    QIDMA is a grassroots nonprofit organization founded by a group of passionate community members who
                    recognized the need for greater support and resources in Franklin. We are committed to building a
                    more inclusive and empowered Franklin.
                  </p>

                  <p className="mb-6 leading-relaxed">
                    Our mission is rooted in the belief that every individual deserves access to opportunities that
                    foster personal growth, community connection, and social mobility. Through our various programs and
                    initiatives, we work to address systemic barriers and create pathways for success for all community
                    members, regardless of their background or circumstances.
                  </p>

                  <p className="mb-6 leading-relaxed">
                    At QIDMA, we understand that meaningful change happens when communities come together. That's why we
                    focus on collaborative approaches that bring together diverse voices, perspectives, and resources.
                    Our programs are designed not just to provide immediate assistance, but to build long-term capacity
                    and resilience within our community.
                  </p>

                  <p className="mb-6 leading-relaxed">
                    We believe in the power of kindness, service, and collective action. Through educational workshops,
                    community events, resource sharing, and advocacy efforts, we work to create an environment where
                    everyone can thrive. Our commitment extends beyond individual support to systemic change that
                    addresses the root causes of inequality and exclusion.
                  </p>

                  <p className="leading-relaxed">
                    As we continue to grow and evolve, QIDMA remains dedicated to our founding principles of compassion,
                    integrity, and community empowerment. We invite you to join us in this important work as we build a
                    stronger, more equitable Franklin for all.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Board Members Section */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Board</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our dedicated board members bring diverse expertise and unwavering commitment to QIDMA's mission of
                serving our community with purpose.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {boardMembers.map((member, index) => (
                <Card key={index} className="bg-background text-center">
                  <CardContent className="p-8">
                    <Avatar className="h-24 w-24 mx-auto mb-4">
                      <AvatarImage
                        src={
                          member.name === "Ayesha Ali" 
                            ? "/images/ayesha_ali_profile.png" 
                            : member.name === "Rana Jawad"
                            ? "/images/rana_jawad.jpeg"
                            : `/smiling-woman-curly-brown-hair-headshot.png?height=96&width=96&query=professional headshot of ${member.name}`
                        }
                      />
                      <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                    <p className="text-primary font-medium">{member.title}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
