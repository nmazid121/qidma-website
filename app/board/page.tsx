import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BoardPage() {
  const boardMembers = [
    {
      name: "Sara Kharazi Didehvar",
      title: "President and Co-Founder",
      initials: "SD",
      bio: "Sara is a passionate community leader with extensive experience in nonprofit management and community development.",
    },
    {
      name: "Viq Pervaaz",
      title: "Co-Founder",
      initials: "VP",
      bio: "Viq brings a wealth of knowledge in community organizing and has been instrumental in establishing QIDMA's foundational programs.",
    },
    {
      name: "Rana Jawad",
      title: "Vice President",
      initials: "RJ",
      bio: "Rana Jawad is the Vice President of QIDMA and serves as the administrator at a local nonprofit organization. With a deep commitment to service, she finds fulfillment in helping others and contributing to her community as an expression of her faith. Rana lives in Franklin Township with her husband and their three children.",
    },
    {
      name: "Samina Sattar",
      title: "Treasurer",
      initials: "SS",
      bio: "Samina Sattar is the Treasurer at QIDMA, and a commissioner on the Franklin Township Human Relations Commission. She is a policy researcher with a focus on workforce development, and is a board member and speaker for the New Jersey Islamic Networks Group. Samina lives in Franklin Township with her husband and two children.",
    },
    {
      name: "Ayesha Ali",
      title: "Communications Lead Officer",
      initials: "AA",
      bio: "Ayesha Ali serves as Communications Secretary at QIDMA and brings a strong background in quality assurance from the pharmaceutical industry, where she oversees clinical trials and research. She also sits on the Franklin Township Library Board and has volunteered extensively in her children's school and other community initiatives. Passionate about service and strengthening her community, Ayesha lives in Franklin Township with her husband and two children."
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">Our Board</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Meet the dedicated leaders who guide QIDMA's mission and ensure our commitment to serving the Franklin
              community with purpose and integrity.
            </p>
          </div>

          {/* Board Members Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {boardMembers.map((member, index) => (
                <Card key={index} className="bg-card">
                  <CardContent className="p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                      <Avatar className="h-24 w-24 flex-shrink-0">
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
                      <div className="text-center sm:text-left">
                        <h3 className="text-xl font-semibold text-card-foreground mb-2">{member.name}</h3>
                        <p className="text-primary font-medium mb-3">{member.title}</p>
                        <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                      </div>
                    </div>
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
