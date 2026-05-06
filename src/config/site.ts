export const siteConfig = {
  name: "Oxiverse",
  description: "The next generation of privacy-first infrastructure. A secure, decentralized ecosystem for pioneers of the open internet.",
  url: "https://oxiverse.com",
  ogImage: "https://oxiverse.com/og.jpg",
  links: {
    codeberg: "https://codeberg.org/oxiverse",
    search: "https://search.oxiverse.com",
    twitter: "https://twitter.com/itxLikhith",
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
        text: "Launch Search",
        href: "https://search.oxiverse.com",
      },
      secondary: {
        text: "Access Source",
        href: "https://codeberg.org/oxiverse",
      },
    },
  },
}

export type SiteConfig = typeof siteConfig
