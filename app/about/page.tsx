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
      name: "Ayeshah Ali",
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
                    QIDMA is a grassroots nonprofit organization founded by a group of dedicated Franklin township residents. Inspired by the Arabic word "Qidma", meaning "service", the organization is rooted in the belief that strong communities are built through care, connection, and collective support. QIDMA's mission is to meet the diverse needs of every resident—ensuring everyone has the opportunity to grow, thrive, and access essential resources. Through local initiatives and compassionate outreach, QIDMA is committed to building a more inclusive and empowered Franklin.
                  </p>

                  <p className="mb-6 leading-relaxed">
                    The idea for QIDMA was born from the shared vision of founders Viq Pervaaz and Sara Khan Didehvar, both of whom were raised in Franklin Township and felt a deep sense of responsibility to give back to the community that shaped them. Rooted in the Islamic principles of service (khidma) and charity (sadaqah), they were inspired to turn these core values into action. QIDMA began as a grassroots effort to uplift local residents and has already led several impactful initiatives, including a meaningful collaboration with the Franklin Food Bank to support families facing food insecurity.
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
                            member.name === "Ayeshah Ali" 
                              ? "/images/ayesha_ali_profile.png" 
                              : member.name === "Rana Jawad"
                              ? "/images/rana_jawad.jpeg"
                              : member.name === "Samina Sattar"
                              ? "/images/Samina_Sattar.jpeg"
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
