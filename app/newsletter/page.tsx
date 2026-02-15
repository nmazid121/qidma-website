"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Newsletter } from "@/lib/data/types"

export default function NewsletterPage() {
  const [newsletter, setNewsletter] = useState<Newsletter | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchNewsletter()
  }, [])

  const fetchNewsletter = async () => {
    try {
      const response = await fetch("/api/newsletter")
      const data = await response.json()
      setNewsletter(data.currentNewsletter || null)
    } catch (error) {
      console.error("Failed to fetch newsletter:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading newsletter...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!newsletter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Newsletter</h1>
            <p className="text-muted-foreground mb-8">
              No newsletter has been created yet. Check back soon!
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Newsletter Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent">
              {newsletter.heroTitle}
            </h1>
            <p className="text-orange-600 text-lg font-medium">{newsletter.tagline}</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <span>ISSUE NO. {newsletter.issueNumber}</span> • <span>SEASON: {newsletter.season}</span> •{" "}
              <span>YEAR: {newsletter.year}</span>
            </div>
          </div>

          {/* Main Newsletter Content */}
          <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-orange-400 via-yellow-400 to-red-500 p-8 md:p-12">
              {newsletter.heroImage && (
                <div className="absolute inset-0 opacity-20">
                  <Image src={newsletter.heroImage} alt="Hero" fill className="object-cover" />
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-8 items-center relative z-10">
                {/* Left: Image Placeholder */}
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gradient-to-br from-orange-300 to-yellow-300 flex items-center justify-center">
                  {newsletter.heroImage ? (
                    <Image
                      src={newsletter.heroImage}
                      alt="Newsletter Hero"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="text-center text-white/80">
                      <p className="text-sm mb-2">Community Impact</p>
                      <p className="text-xs">Photo coming soon</p>
                    </div>
                  )}
                </div>

                {/* Right: Featured Articles */}
                <div className="space-y-4">
                  {newsletter.featuredArticles.map((article, idx) => (
                    <div key={idx} className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.content}</p>
                      {article.link && (
                        <Link
                          href={article.link}
                          className="text-orange-600 text-sm font-semibold hover:underline"
                        >
                          {article.linkText || "Read more →"}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Overlay Text */}
              <div className="mt-8 text-center relative z-10">
                <div className="inline-block bg-white/95 backdrop-blur-sm px-6 py-3 rounded-lg shadow-lg">
                  <h2 className="text-3xl md:text-4xl font-bold text-red-600">
                    {newsletter.heroTitle.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="relative mt-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                      {newsletter.heroTitle.split(" ").slice(2).join(" ") || "ACTION"}
                    </h2>
                    <div className="absolute bottom-0 left-0 right-0 h-3 bg-blue-400 rounded transform -rotate-1"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="p-8 md:p-12 grid md:grid-cols-2 gap-8">
              {newsletter.sections.map((section, idx) => (
                <div key={section.id || idx} className={idx % 2 === 0 ? "" : "md:col-start-2"}>
                  {section.type === "article" && (
                    <Card className="border-2 border-blue-100">
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-bold text-blue-900 mb-4">{section.title}</h2>
                        {section.subtitle && (
                          <p className="text-lg text-gray-600 mb-4">{section.subtitle}</p>
                        )}
                        {section.image && (
                          <div className="mb-4 h-48 relative rounded-lg overflow-hidden">
                            <Image
                              src={section.image}
                              alt={section.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div
                          className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: section.content.replace(/\n/g, "<br />") }}
                        />
                      </CardContent>
                    </Card>
                  )}

                  {section.type === "stats" && (
                    <Card className="bg-gradient-to-br from-blue-50 to-orange-50">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-blue-900 mb-4">{section.title}</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {section.stats?.map((stat, statIdx) => (
                            <div key={statIdx} className="text-center">
                              <div className="text-3xl font-bold text-orange-600">{stat.value}</div>
                              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {section.type === "cta" && (
                    <Card className="bg-gradient-to-r from-blue-500 via-orange-500 to-red-500 text-white">
                      <CardContent className="p-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{section.title}</h2>
                        {section.subtitle && <p className="text-lg mb-6 text-white/90">{section.subtitle}</p>}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                          {section.ctaButtons?.map((btn, btnIdx) => (
                            <Button
                              key={btnIdx}
                              asChild
                              size="lg"
                              className="bg-white text-orange-600 hover:bg-gray-100"
                            >
                              <Link href={btn.link}>{btn.text}</Link>
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <Card className="mt-8 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Connected</h3>
              <p className="text-gray-600 mb-6">
                Subscribe to receive our quarterly newsletter and stay updated on all QIDMA initiatives.
              </p>
              <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
