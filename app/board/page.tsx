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
      bio: "Rana oversees strategic planning and program development, ensuring QIDMA's initiatives align with community needs.",
    },
    {
      name: "Samina Sattar",
      title: "Treasurer",
      initials: "SS",
      bio: "Samina manages QIDMA's financial operations and ensures responsible stewardship of donor contributions.",
    },
    {
      name: "Ayeshah Ali",
      title: "Communications Lead Officer",
      initials: "AA",
      bio: "Ayeshah leads QIDMA's outreach efforts and manages communications to keep the community informed and engaged.",
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
                          src={`/smiling-woman-curly-brown-hair-headshot.png?height=96&width=96&query=professional headshot of ${member.name}`}
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
