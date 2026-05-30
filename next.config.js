/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'dpgomyqzonhimempmnmh.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ['pdf-parse', 'pdfjs-dist'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  trailingSlash: false,
  async redirects() {
    return [
      {
        source: '/blog/ravana-v2-building-a-cognitive-architecture-with-bounded-agi',
        destination: '/blog/building-ravana-v2-a-proto-homeostatic-cognitive-architecture',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

