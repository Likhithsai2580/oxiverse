export const siteConfig = {
  name: "Oxiverse",
  description: "The next generation of privacy-first infrastructure. A secure, decentralized ecosystem for pioneers of the open internet.",
  url: "https://oxiverse.io",
  ogImage: "https://oxiverse.io/og.jpg",
  links: {
    github: "https://github.com/itxLikhith",
    twitter: "https://twitter.com/oxiverse",
  },
  mainNav: [
    {
      title: "Platform",
      href: "#platform",
    },
    {
      title: "Ecosystem",
      href: "#ecosystem",
    },
    {
      title: "Research",
      href: "#research",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ],
  hero: {
    badge: "OS System: Public Beta 2.0",
    headline: {
      gradient1: "Explore.",
      white: "Connect.",
      gradient2: "Create.",
    },
    subtitle: "The next generation of privacy-first infrastructure. A secure, decentralized ecosystem for pioneers of the open internet.",
    cta: {
      primary: {
        text: "Build the Future",
        href: "https://github.com/itxLikhith",
      },
      secondary: {
        text: "Explore Ecosystem",
        href: "#ecosystem",
      },
    },
  },
}

export type SiteConfig = typeof siteConfig
