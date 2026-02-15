export interface EventImage {
  src: string
  alt: string
}

export interface Event {
  id: number
  title: string
  date: string
  time?: string
  location?: string
  description: string
  category: string
  attendees?: number
  images?: EventImage[]
}

export interface EventsData {
  upcomingEvents: Event[]
  pastEvents: Event[]
}

export interface NewsletterArticle {
  id: number
  title: string
  content: string
  image?: string
  link?: string
  linkText?: string
}

export interface NewsletterSection {
  id: number
  title: string
  subtitle?: string
  content: string
  image?: string
  type: "featured" | "article" | "stats" | "cta"
  stats?: Array<{ label: string; value: string }>
  ctaButtons?: Array<{ text: string; link: string }>
}

export interface Newsletter {
  id: number
  issueNumber: string
  season: string
  year: string
  heroTitle: string
  tagline: string
  heroImage?: string
  featuredArticles: NewsletterArticle[]
  sections: NewsletterSection[]
  createdAt: string
  updatedAt: string
}

export interface NewsletterData {
  newsletters: Newsletter[]
  currentNewsletter?: Newsletter
}

