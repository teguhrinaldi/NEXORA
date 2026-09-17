export const siteConfig = {
  name: "NEXORA",
  tagline: "Your intelligent workspace.",
  description:
    "Create, organize, and automate your work with a beautifully structured AI workspace built for modern teams.",
  url: "https://nexora.app",
  ogImage: "/og-image.png",
  links: {
    twitter: "https://twitter.com/nexora",
    github: "https://github.com/nexora",
  },
  keywords: [
    "AI workspace",
    "AI SaaS",
    "productivity",
    "automation",
    "AI dashboard",
    "team collaboration",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
